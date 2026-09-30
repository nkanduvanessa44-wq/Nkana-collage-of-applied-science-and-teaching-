import jsPDF from 'jspdf';
import { HostelHall, Room, Student, CheckInOutAlert, BedApplication, PaymentTransaction } from '../types';

export function generateDailyOccupancyReportPDF(
  halls: HostelHall[],
  rooms: Room[],
  students: Student[],
  reportDate: string = new Date().toISOString().split('T')[0]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [22, 101, 52]; // Dark Green #166534
  const accentColor = [217, 119, 6]; // Amber #d97706
  const darkTextColor = [30, 41, 59]; // Slate #1e293b
  const lightGray = [241, 245, 249];

  // Header Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 36, 'F');

  // Gold accent line
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(0, 36, 210, 2, 'F');

  // Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 105, 12, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('DIRECTORATE OF STUDENT AFFAIRS & HOSTEL ACCOMMODATION', 105, 18, { align: 'center' });
  doc.setFontSize(8);
  doc.text('Kitwe Campus, Copperbelt Province, Republic of Zambia | info@nkanacollege.edu.zm', 105, 23, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('OFFICIAL DAILY BED SPACE & ROOM OCCUPANCY REPORT', 105, 31, { align: 'center' });

  // Metadata Row
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Report Date: ${reportDate}`, 14, 45);
  doc.text(`Generated At: ${new Date().toLocaleTimeString()} (CAT)`, 14, 50);
  doc.text(`Security Level: CONFIDENTIAL (OFFICIAL USE ONLY)`, 120, 45);
  doc.text(`System Version: Nkana Hostel ERP v2.4 [Encrypted]`, 120, 50);

  // Overall Statistics Calculations
  let totalBeds = 0;
  let occupiedBeds = 0;
  let vacantBeds = 0;
  let maintenanceBeds = 0;
  let reservedBeds = 0;

  rooms.forEach(room => {
    room.beds.forEach(bed => {
      totalBeds++;
      if (bed.status === 'occupied') occupiedBeds++;
      else if (bed.status === 'vacant') vacantBeds++;
      else if (bed.status === 'maintenance') maintenanceBeds++;
      else if (bed.status === 'reserved') reservedBeds++;
    });
  });

  const occupancyRate = totalBeds > 0 ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : '0';

  // KPI Summary Boxes
  const boxY = 56;
  const boxWidth = 35;
  const boxHeight = 18;
  const gap = 3;

  const kpis = [
    { label: 'Total Capacity', value: `${totalBeds} Beds`, color: [30, 41, 59] },
    { label: 'Occupied Beds', value: `${occupiedBeds}`, color: [22, 101, 52] },
    { label: 'Vacant Spaces', value: `${vacantBeds}`, color: [2, 132, 199] },
    { label: 'Maintenance', value: `${maintenanceBeds}`, color: [220, 38, 38] },
    { label: 'Occupancy Rate', value: `${occupancyRate}%`, color: [217, 119, 6] }
  ];

  kpis.forEach((kpi, idx) => {
    const x = 14 + idx * (boxWidth + gap);
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(x, boxY, boxWidth, boxHeight, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(x, boxY, boxWidth, boxHeight, 2, 2, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(kpi.label, x + boxWidth / 2, boxY + 6, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2]);
    doc.text(kpi.value, x + boxWidth / 2, boxY + 14, { align: 'center' });
  });

  // Section 1: Hostel Hall Breakdown
  let currentY = 82;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('1. RESIDENTIAL HALL OCCUPANCY BREAKDOWN', 14, currentY);

  currentY += 4;
  // Table Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(14, currentY, 182, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('Hall Name', 16, currentY + 4.8);
  doc.text('Gender', 75, currentY + 4.8);
  doc.text('Rooms', 100, currentY + 4.8);
  doc.text('Total Beds', 120, currentY + 4.8);
  doc.text('Occupied', 142, currentY + 4.8);
  doc.text('Vacant', 162, currentY + 4.8);
  doc.text('Rate', 182, currentY + 4.8);

  currentY += 7;

  halls.forEach((hall, idx) => {
    const hallRooms = rooms.filter(r => r.hallId === hall.id);
    let hTotal = 0;
    let hOcc = 0;
    let hVac = 0;
    hallRooms.forEach(r => {
      r.beds.forEach(b => {
        hTotal++;
        if (b.status === 'occupied') hOcc++;
        if (b.status === 'vacant') hVac++;
      });
    });
    const hRate = hTotal > 0 ? ((hOcc / hTotal) * 100).toFixed(0) : '0';

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY, 182, 6, 'F');
    }

    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(hall.name, 16, currentY + 4.2);
    doc.text(hall.genderAllowed.toUpperCase(), 75, currentY + 4.2);
    doc.text(`${hallRooms.length}`, 100, currentY + 4.2);
    doc.text(`${hTotal}`, 120, currentY + 4.2);
    doc.text(`${hOcc}`, 142, currentY + 4.2);
    doc.text(`${hVac}`, 162, currentY + 4.2);
    doc.text(`${hRate}%`, 182, currentY + 4.2);

    currentY += 6;
  });

  // Section 2: Active Student Occupancy Registry (Checked-in Residents)
  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('2. REGISTERED RESIDENT STUDENTS AUDIT LIST', 14, currentY);

  currentY += 4;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(14, currentY, 182, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('Student ID', 16, currentY + 4.8);
  doc.text('Full Name', 45, currentY + 4.8);
  doc.text('Program', 85, currentY + 4.8);
  doc.text('Room', 135, currentY + 4.8);
  doc.text('Bed ID', 152, currentY + 4.8);
  doc.text('Key Code', 174, currentY + 4.8);

  currentY += 7;

  // Filter students who have bed spaces assigned
  const assignedStudents = students.filter(s => s.roomId && s.bedSpaceId).slice(0, 18);

  assignedStudents.forEach((student, idx) => {
    const room = rooms.find(r => r.id === student.roomId);
    const bed = room?.beds.find(b => b.id === student.bedSpaceId);

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY, 182, 5.5, 'F');
    }

    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(student.studentNumber, 16, currentY + 3.8);
    doc.text(student.fullName, 45, currentY + 3.8);
    doc.text(student.program.length > 26 ? student.program.slice(0, 26) + '...' : student.program, 85, currentY + 3.8);
    doc.text(room?.roomNumber || '-', 135, currentY + 3.8);
    doc.text(bed?.bedNumber || 'Bed 1', 152, currentY + 3.8);
    doc.text(student.keyNumber || 'VERIFIED', 174, currentY + 3.8);

    currentY += 5.5;
  });

  // Verification & Signatures section
  const signY = 248;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, signY, 196, signY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('VERIFICATION AND ADMINISTRATIVE ENDORSEMENT', 14, signY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Report Prepared By: Hostel Records Matron', 14, signY + 12);
  doc.text('Signature: __________________________', 14, signY + 20);
  doc.text('Date: _______________________________', 14, signY + 26);

  doc.text('Approved By: Dean of Student Affairs', 115, signY + 12);
  doc.text('Signature: __________________________', 115, signY + 20);
  doc.text('Official Seal / Stamp: [ NKANA COLLEGE VERIFIED ]', 115, signY + 26);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Nkana College of Applied Sciences and Education | P.O. Box 21992 Kitwe, Zambia | Confidential Document', 105, 290, { align: 'center' });

  doc.save(`Nkana_College_Daily_Bed_Space_Report_${reportDate}.pdf`);
}

export function generateCheckInOutMovementPDF(
  alerts: CheckInOutAlert[],
  dateStr: string = new Date().toISOString().split('T')[0]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [22, 101, 52];
  const accentColor = [217, 119, 6];

  // Header Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 32, 'F');
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(0, 32, 210, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 105, 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('HOSTEL SECURITY & STUDENT CHECK-IN / CHECK-OUT AUDIT LOG', 105, 18, { align: 'center' });
  doc.setFontSize(8);
  doc.text(`Official Log Date: ${dateStr} | Security Log ID: SEC-${Date.now().toString().slice(-6)}`, 105, 25, { align: 'center' });

  let y = 42;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(14, y, 182, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Time', 16, y + 4.8);
  doc.text('Movement', 36, y + 4.8);
  doc.text('Student Name', 60, y + 4.8);
  doc.text('Student ID', 100, y + 4.8);
  doc.text('Hall & Room', 130, y + 4.8);
  doc.text('Authorized By', 165, y + 4.8);

  y += 7;

  alerts.forEach((alert, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 10, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);

    const time = alert.timestamp.split(' ')[1] || alert.timestamp;
    doc.text(time, 16, y + 4.5);

    // Badge color for movement type
    if (alert.type === 'check_in') {
      doc.setTextColor(22, 101, 52);
      doc.text('CHECK-IN', 36, y + 4.5);
    } else if (alert.type === 'check_out') {
      doc.setTextColor(220, 38, 38);
      doc.text('CHECK-OUT', 36, y + 4.5);
    } else {
      doc.setTextColor(217, 119, 6);
      doc.text(alert.type.toUpperCase(), 36, y + 4.5);
    }

    doc.setTextColor(30, 41, 59);
    doc.text(alert.studentName, 60, y + 4.5);
    doc.text(alert.studentNumber, 100, y + 4.5);
    doc.text(`${alert.roomNumber} (${alert.bedNumber})`, 130, y + 4.5);
    doc.text(alert.staffName.length > 18 ? alert.staffName.slice(0, 18) + '...' : alert.staffName, 165, y + 4.5);

    if (alert.notes) {
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Note: ${alert.notes.slice(0, 85)}`, 36, y + 8.5);
    }

    y += 10;
  });

  // Sign off
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Certified by Chief Security Warden: ____________________ Date: ' + dateStr, 14, 275);
  doc.text('Page 1 of 1 | Nkana College Automated Movement Tracking System', 105, 285, { align: 'center' });

  doc.save(`Nkana_College_CheckInOut_Log_${dateStr}.pdf`);
}

export function generateAllocationReceiptPDF(app: BedApplication) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5'
  });

  const primaryColor = [22, 101, 52];
  const accentColor = [217, 119, 6];

  // Header Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 148, 26, 'F');
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(0, 26, 148, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 74, 9, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('OFFICIAL BED SPACE ALLOCATION PASS & PAYMENT VOUCHER', 74, 15, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('Kitwe, Zambia | Student Accommodation Directorate', 74, 21, { align: 'center' });

  let y = 35;
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('STUDENT & ALLOCATION DETAILS', 10, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  y += 6;
  doc.text(`Application Reference: ${app.applicationNumber}`, 10, y);
  doc.text(`Date Issued: ${app.submittedAt}`, 85, y);
  y += 5;
  doc.text(`Student Name: ${app.studentName}`, 10, y);
  doc.text(`Student ID: ${app.studentNumber}`, 85, y);
  y += 5;
  doc.text(`NRC Number: ${app.nrcNumber}`, 10, y);
  doc.text(`Gender: ${app.gender.toUpperCase()}`, 85, y);
  y += 5;
  doc.text(`Academic Program: ${app.program}`, 10, y);
  doc.text(`Year: ${app.yearOfStudy}`, 85, y);

  y += 8;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(10, y, 128, 28, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(10, y, 128, 28, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('OFFICIAL HOSTEL ASSIGNMENT', 15, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Assigned Hall: ${app.allocatedHallName || 'Nkana Main Residence'}`, 15, y + 13);
  doc.text(`Room Number: ${app.allocatedRoomNumber || 'Allocated at Desk'}`, 15, y + 19);
  doc.text(`Bed Space ID: ${app.allocatedBedNumber || 'Bed 1'}`, 80, y + 19);
  doc.text(`Status: ${app.status.toUpperCase()}`, 80, y + 13);
  doc.text(`Payment Verified: ${app.paymentStatus.toUpperCase()} (Ref: ${app.paymentReference || 'N/A'})`, 15, y + 25);

  y += 34;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('TERMS & CHECK-IN INSTRUCTIONS:', 10, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  y += 4;
  doc.text('1. Present this original pass alongside your valid National Registration Card (NRC) and College ID.', 10, y);
  y += 4;
  doc.text('2. Keys will only be issued upon completion of the room inventory condition inspection checklist.', 10, y);
  y += 4;
  doc.text('3. Sub-letting, unauthorized bed space swapping, or illegal guests in hostels is strictly prohibited.', 10, y);
  y += 4;
  doc.text('4. College electrical appliances regulations must be adhered to at all times.', 10, y);

  // Barcode / verification simulator
  y += 10;
  doc.setFillColor(30, 41, 59);
  for (let i = 0; i < 40; i++) {
    const barW = (i % 3 === 0 ? 1.5 : 0.8);
    doc.rect(20 + i * 2.5, y, barW, 9, 'F');
  }
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text(`* ${app.applicationNumber} * ALLOCATION VERIFIED *`, 74, y + 13, { align: 'center' });

  doc.save(`Nkana_Allocation_Pass_${app.studentNumber.replace(/\//g, '_')}.pdf`);
}

export function generateAdmissionOfferLetterPDF(app: import('../types').AdmissionApplication) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryNavy = [12, 74, 110]; // #0c4a6e
  const skyBlue = [2, 132, 199];    // #0284c7
  const textDark = [30, 41, 59];     // #1e293b

  // Top College Header
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, 210, 36, 'F');
  doc.setFillColor(skyBlue[0], skyBlue[1], skyBlue[2]);
  doc.rect(0, 36, 210, 2.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 105, 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text('OFFICE OF THE REGISTRAR & ACADEMIC ADMISSIONS BOARD', 105, 18, { align: 'center' });
  doc.setFontSize(8);
  doc.text('P.O. Box 21992, Kitwe, Copperbelt Province, Republic of Zambia | admissions@nkanacollege.edu.zm', 105, 24, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PROVISIONAL LETTER OF ADMISSION OFFER', 105, 32, { align: 'center' });

  let y = 48;
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Official Reference: ${app.applicationNumber}`, 14, y);
  doc.text(`Date of Issue: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, 130, y);

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`To: ${app.fullName.toUpperCase()}`, 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`NRC Number: ${app.nrcNumber}`, 14, y + 5);
  doc.text(`Phone: ${app.phone} | Email: ${app.email}`, 14, y + 10);
  doc.text(`Address: ${app.residentialAddress}`, 14, y + 15);

  y += 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(`RE: OFFER OF ADMISSION TO STUDY — ${app.programChoice.toUpperCase()}`, 14, y);
  doc.setDrawColor(2, 132, 199);
  doc.setLineWidth(0.5);
  doc.line(14, y + 2, 196, y + 2);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Dear ${app.fullName},`, 14, y);

  y += 6;
  const letterBody = `Following the meeting of the Admissions and Academic Vetting Committee of Nkana College of Applied Sciences and Education, we are pleased to inform you that you have been provisionally admitted into the ${app.programChoice} program for the ${app.intakeSession} academic intake at our Kitwe Campus.\n\nYour secondary education credentials from ${app.previousSchool} have been thoroughly vetted against the statutory admission benchmarks set by the Ministry of Health, Nursing and Midwifery Council of Zambia (NMCZ), and the Health Professions Council of Zambia (HPCZ).`;

  const splitBody = doc.splitTextToSize(letterBody, 182);
  doc.text(splitBody, 14, y);

  y += splitBody.length * 4.5 + 4;

  // Key Admission Terms Box
  doc.setFillColor(240, 249, 255); // light sky blue #f0f9ff
  doc.roundedRect(14, y, 182, 38, 2, 2, 'F');
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(14, y, 182, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('ADMISSION PARTICULARS & ON-CAMPUS ACCOMMODATION:', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`• Academic Program: ${app.programChoice}`, 18, y + 12);
  doc.text(`• Intake Cohort: ${app.intakeSession}`, 18, y + 17);
  doc.text(`• Application Fee Status: K${app.applicationFeeZMW} (PAID - Ref: ${app.paymentReference || 'VERIFIED'})`, 18, y + 22);
  doc.text(`• Bed Space Eligibility: ELIGIBLE — Apply via Nkana College Bed Space Management Module`, 18, y + 27);
  doc.text(`• Reporting & Registration Date: 05th January 2027 (08:30 Hours CAT)`, 18, y + 32);

  y += 46;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('CONDITIONS OF ADMISSION & ACCEPTANCE:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  y += 5;
  doc.text('1. Verification of original ECZ Grade 12 Statement of Results and NRC must be presented during orientation week.', 14, y);
  y += 4.5;
  doc.text('2. Tuition fees must be deposited into the official College Bank Account or settled through student portal payment gateways.', 14, y);
  y += 4.5;
  doc.text('3. On-campus hostel bed spaces are allocated strictly on a first-come, first-served basis through the Bed Space portal.', 14, y);

  // Signatures
  y += 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Dr. Mwamba Silungwe (PhD)', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Registrar & Academic Secretary', 14, y + 4);
  doc.text('Nkana College of Applied Sciences & Education', 14, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Sr. Florence Chanda (BSc, RN)', 125, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Dean of Nursing & Sciences', 125, y + 4);
  doc.text('Official Seal: [ NKANA COLLEGE ACCREDITED ]', 125, y + 8);

  // Bottom stamp line
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Official Document issued under authority of the Board of Governors • Verification Portal: nkanacollege.edu.zm', 105, 288, { align: 'center' });

  doc.save(`Nkana_College_Admission_Letter_${app.applicationNumber}.pdf`);
}

export function generateBedPaymentReceiptPDF(payment: PaymentTransaction, student: Student, nextExpiryDate: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5'
  });

  const primaryNavy = [12, 74, 110]; // #0c4a6e
  const goldAccent = [217, 119, 6];

  // Header Banner
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, 148, 26, 'F');
  doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.rect(0, 26, 148, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 74, 9, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('HOSTEL BED SPACE RENEWAL & PAYMENT RECEIPT', 74, 15, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('Directorate of Finance & Student Housing | Kitwe, Zambia', 74, 21, { align: 'center' });

  let y = 35;
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('RENEWAL PAYMENT VOUCHER', 10, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  y += 6;
  doc.text(`Receipt Number: ${payment.receiptNumber}`, 10, y);
  doc.text(`Transaction Ref: ${payment.reference}`, 75, y);
  y += 5;
  doc.text(`Payment Date: ${payment.timestamp}`, 10, y);
  doc.text(`Payment Gateway: ${payment.method.toUpperCase().replace('_', ' ')}`, 75, y);

  y += 8;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(10, y, 128, 48, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('STUDENT & BED ALLOCATION PARTICULARS', 14, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Student Name: ${student.fullName}`, 14, y + 13);
  doc.text(`Student Number: ${student.studentNumber}`, 75, y + 13);

  doc.text(`NRC Number: ${student.nrcNumber}`, 14, y + 19);
  doc.text(`Academic Program: ${student.program}`, 75, y + 19);

  doc.text(`Bed Space: ${student.bedSpaceId || 'Assigned Space'}`, 14, y + 25);
  doc.text(`Phone / Mobile: ${student.phone}`, 75, y + 25);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // emerald
  doc.text(`Amount Settled: ZMW ${payment.amountZMW.toLocaleString()}.00 (PAID)`, 14, y + 33);

  doc.setTextColor(12, 74, 110);
  doc.text(`NEXT EXPIRY DATE: ${nextExpiryDate} (Extended by 90 Days)`, 14, y + 41);

  y += 56;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Official Note: This receipt validates the extension of student bed space residency.', 10, y);
  doc.text('Present this slip to the Residential Hall Warden or Matron for room log clearance.', 10, y + 4.5);
  doc.text('Authorized by Bursar & Directorate of Student Accommodation', 10, y + 9);

  doc.text('System Generated Electronic Receipt • Official College Seal Affixed', 74, 195, { align: 'center' });

  doc.save(`Nkana_Bed_Renewal_Receipt_${payment.receiptNumber}.pdf`);
}

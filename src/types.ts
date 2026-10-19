export type UserRole = 'student' | 'lecturer' | 'accountant' | 'staff' | 'admin' | 'admissions';

export interface UserPrivilegeConfig {
  canApplyForBed: boolean;
  canViewResidentPass: boolean;
  canReconcilePayments: boolean;
  canViewDefaulters: boolean;
  canCheckInCheckOut: boolean;
  canIssueKeys: boolean;
  canAllocateBeds: boolean;
  canManageRoles: boolean;
  canViewFinancialAudit: boolean;
  canReviewAdmissions: boolean;
  canEnterStudentResults: boolean;
  canManageStaffMembers: boolean;
}

export interface UserRoleProfile {
  role: UserRole;
  title: string;
  shortLabel: string;
  department: string;
  defaultUserName: string;
  staffOrStudentId: string;
  badgeColor: string;
  description: string;
  allowedTabs: string[];
  privileges: UserPrivilegeConfig;
}

export type Gender = 'female' | 'male';

export type RoomType = 'single' | 'double' | 'four_bed' | 'executive';

export type BedStatus = 'vacant' | 'occupied' | 'reserved' | 'maintenance';

export type CheckInStatus = 'checked_in' | 'checked_out' | 'pending_checkin';

export interface Student {
  id: string;
  studentNumber: string; // e.g. "NK/2026/0492"
  fullName: string;
  nrcNumber: string; // National Registration Card e.g. "492817/11/1"
  gender: Gender;
  email: string;
  phone: string;
  program: string; // e.g. "Registered Nursing Diploma", "Clinical Medicine", "Primary Teachers Diploma"
  yearOfStudy: 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4';
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalNotes?: string;
  hallId?: string;
  roomId?: string;
  bedSpaceId?: string;
  checkInStatus: CheckInStatus;
  checkInDate?: string;
  checkOutDate?: string;
  keyNumber?: string;
  balanceDue: number;
  // Bed Payment & Expiry Tracking
  bedPaymentExpiryDate?: string; // YYYY-MM-DD
  bedFeeZMW?: number;
  bedTerm?: string;
  lastPaymentDate?: string;
  paymentExpiryStatus?: 'valid' | 'nearing_expiry' | 'critical' | 'expired';
}

export interface BedSpace {
  id: string;
  roomId: string;
  hallId: string;
  bedNumber: string; // e.g. "Bed 1", "Bed 2"
  status: BedStatus;
  currentStudentId?: string;
  currentStudentName?: string;
  notes?: string;
}

export interface Room {
  id: string;
  hallId: string;
  roomNumber: string; // e.g. "A101"
  floor: number; // 0 (Ground), 1, 2, 3
  roomType: RoomType;
  capacity: number;
  pricePerTermZMW: number;
  status: 'available' | 'full' | 'maintenance';
  beds: BedSpace[];
  amenities: string[];
}

export interface HostelHall {
  id: string;
  name: string;
  code: string;
  genderAllowed: 'female' | 'male' | 'mixed';
  floorsCount: number;
  totalRooms: number;
  totalBeds: number;
  description: string;
  wardenName: string;
  wardenPhone: string;
  image: string;
  amenities: string[];
}

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'allocated';

export interface BedApplication {
  id: string;
  applicationNumber: string; // e.g. "APP-2026-081"
  studentId?: string;
  studentName: string;
  studentNumber: string;
  nrcNumber: string;
  gender: Gender;
  email: string;
  phone: string;
  program: string;
  yearOfStudy: string;
  preferredHallId: string;
  preferredRoomType: RoomType;
  selectedBedSpaceId?: string;
  specialRequests?: string;
  status: ApplicationStatus;
  paymentStatus: 'unpaid' | 'paid' | 'verified';
  paymentReference?: string;
  amountPaidZMW?: number;
  paymentMethod?: 'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard';
  submittedAt: string;
  allocatedHallName?: string;
  allocatedRoomNumber?: string;
  allocatedBedNumber?: string;
  reviewNotes?: string;
}

export interface CheckInOutAlert {
  id: string;
  timestamp: string;
  type: 'check_in' | 'check_out' | 'maintenance' | 'allocation' | 'payment' | 'payment_expiry';
  studentName: string;
  studentNumber: string;
  hallName: string;
  roomNumber: string;
  bedNumber: string;
  staffName: string;
  notes?: string;
  read: boolean;
  expiryDate?: string;
  daysRemaining?: number;
  amountDueZMW?: number;
}

export interface BedPaymentExpiryAlert {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  nrcNumber: string;
  hallId?: string;
  hallName: string;
  roomNumber: string;
  bedNumber: string;
  amountDueZMW: number;
  expiryDate: string; // YYYY-MM-DD
  daysRemaining: number;
  urgency: 'warning' | 'critical' | 'expired';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  phone: string;
  smsSent?: boolean;
}

export interface ExpiryReminderLog {
  id: string;
  studentId: string;
  studentName: string;
  phone: string;
  channel: 'sms' | 'email' | 'portal_alert';
  message: string;
  sentAt: string;
  status: 'delivered' | 'sent';
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  applicationId?: string;
  studentName: string;
  studentNumber: string;
  amountZMW: number;
  method: 'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard';
  accountOrPhoneMask: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
  receiptNumber: string;
  description: string;
}

// New Student Admission Application with Document Upload & Tracking
export interface UploadedDocument {
  id: string;
  type: 'nrc' | 'ecz_results' | 'passport_photo' | 'medical_report';
  label: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  previewUrl?: string;
}

export interface AcademicSubjectResult {
  subject: string;
  grade: string; // One of 1, 2, 3, 4, 5, 6 (Credits/Distinctions)
}

export type AdmissionStatus = 'submitted' | 'under_review' | 'admitted' | 'rejected';

export interface AdmissionApplication {
  id: string;
  applicationNumber: string; // e.g. "NK-ADM-2026-0891"
  fullName: string;
  nrcNumber: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  email: string;
  residentialAddress: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  nextOfKinRelation: string;
  programChoice: string;
  intakeSession: 'January Main Intake (Full-Time)' | 'July/August Mid-Year Intake' | 'Distance / In-Service Intake' | string;
  previousSchool: string;
  completionYear: string;
  results: AcademicSubjectResult[];
  documents: UploadedDocument[];
  applicationFeeZMW: number;
  paymentStatus: 'paid' | 'unpaid';
  paymentMethod?: 'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard';
  paymentReference?: string;
  status: AdmissionStatus;
  submittedAt: string;
  reviewerRemarks?: string;
  offerLetterAvailable?: boolean;
}

export type StaffEmploymentStatus = 'active' | 'on_leave' | 'retired' | 'contract';

export type StaffCategory = 'lecturer' | 'warden' | 'matron' | 'accountant' | 'security' | 'maintenance' | 'administrative';

export interface StaffMember {
  id: string;
  employeeNumber: string; // e.g., "NK-LEC-014", "NK-STF-082"
  fullName: string;
  nrcNumber: string;
  gender: Gender;
  email: string;
  phone: string;
  category: StaffCategory;
  jobTitle: string; // e.g., "Senior Nursing Lecturer", "Lead Clinical Instructor", "Hostel Warden"
  department: string; // e.g., "School of Health Sciences", "School of Education", "Finance Directorate"
  status: StaffEmploymentStatus; // 'active' | 'on_leave' | 'retired' | 'contract'
  assignedCourses?: string[]; // e.g., ["Anatomy & Physiology", "Clinical Pharmacology"]
  dateJoined: string;
  leaveStartDate?: string;
  leaveEndDate?: string;
  retiredDate?: string;
  qualification?: string;
  notes?: string;
}

export interface StudentCourseResult {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  program: string;
  courseCode: string;
  courseTitle: string;
  semester: 'Semester 1' | 'Semester 2';
  academicYear: string;
  continuousAssessment: number; // Max 40
  clinicalOrPracticum: number; // Max 20
  finalExam: number; // Max 40
  totalScore: number; // Max 100
  letterGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  remark: 'Distinction' | 'Merit' | 'Credit' | 'Pass' | 'Fail / Supplementary';
  lecturerId: string;
  lecturerName: string;
  status: 'draft' | 'submitted' | 'approved';
  lastUpdated: string;
}


import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  HostelHall,
  Room,
  Student,
  BedApplication,
  CheckInOutAlert,
  PaymentTransaction,
  BedStatus,
  AdmissionApplication,
  BedPaymentExpiryAlert,
  ExpiryReminderLog
} from '../types';
import {
  INITIAL_HOSTEL_HALLS,
  INITIAL_ROOMS,
  INITIAL_STUDENTS,
  INITIAL_APPLICATIONS,
  INITIAL_ALERTS,
  INITIAL_PAYMENTS,
  INITIAL_ADMISSION_APPLICATIONS
} from '../data/mockData';
import { realtimeSync, encryptData, decryptData } from '../utils/securityAndSync';
import {
  generateDailyOccupancyReportPDF,
  generateCheckInOutMovementPDF,
  generateAllocationReceiptPDF,
  generateAdmissionOfferLetterPDF
} from '../utils/generateReportsPdf';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  halls: HostelHall[];
  rooms: Room[];
  students: Student[];
  applications: BedApplication[];
  alerts: CheckInOutAlert[];
  payments: PaymentTransaction[];
  currentStudent: Student;
  setCurrentStudent: (student: Student) => void;
  
  // New Student Online Admission & Tracking
  admissionApplications: AdmissionApplication[];
  submitAdmissionApplication: (app: Partial<AdmissionApplication>) => AdmissionApplication;
  downloadAdmissionOfferLetter: (appId: string) => void;

  // Real-time actions
  allocateBedSpace: (appId: string, roomId: string, bedId: string, staffName?: string) => boolean;
  rejectApplication: (appId: string, reason: string) => void;
  checkInStudent: (studentId: string, keyNumber: string, staffName: string, notes?: string) => void;
  checkOutStudent: (studentId: string, staffName: string, notes?: string) => void;
  submitBedApplication: (appData: Partial<BedApplication>) => BedApplication;
  processPayment: (paymentData: {
    applicationId: string;
    studentName: string;
    studentNumber: string;
    amountZMW: number;
    method: 'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard';
    accountOrPhoneMask: string;
    description: string;
  }) => PaymentTransaction;
  updateBedStatus: (bedId: string, status: BedStatus, notes?: string) => void;
  updateRoomStatus: (roomId: string, status: 'available' | 'full' | 'maintenance') => void;
  markAlertAsRead: (alertId: string) => void;
  clearAllAlerts: () => void;
  
  // PDF Exports
  exportDailyReport: (dateStr?: string) => void;
  exportMovementLog: (dateStr?: string) => void;
  exportAllocationPass: (appId: string) => void;

  // Bed Payment Expiry & Mock Notification System
  expiryAlerts: BedPaymentExpiryAlert[];
  activeExpiryPopup: BedPaymentExpiryAlert | null;
  expiryReminderLogs: ExpiryReminderLog[];
  triggerExpiryAlert: (studentId: string, daysRemaining?: number, customNotes?: string) => void;
  dismissExpiryPopup: () => void;
  acknowledgeExpiryAlert: (alertId: string) => void;
  renewBedPayment: (
    studentId: string,
    method?: 'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard',
    amountZMW?: number
  ) => { success: boolean; transaction: PaymentTransaction };
  sendBatchExpiryReminders: () => number;
  calculateDaysRemaining: (expiryDateStr?: string) => number;

  // Selected filters
  selectedHallId: string;
  setSelectedHallId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'nkana_college_hostel_db_v1';

export const calculateDaysRemaining = (expiryDateStr?: string, refDateStr: string = '2026-09-30'): number => {
  if (!expiryDateStr) return 999;
  const exp = new Date(expiryDateStr);
  const ref = new Date(refDateStr);
  const diffTime = exp.getTime() - ref.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedHallId, setSelectedHallId] = useState<string>('all');

  const [halls] = useState<HostelHall[]>(INITIAL_HOSTEL_HALLS);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [applications, setApplications] = useState<BedApplication[]>(INITIAL_APPLICATIONS);
  const [alerts, setAlerts] = useState<CheckInOutAlert[]>(INITIAL_ALERTS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(INITIAL_PAYMENTS);
  const [admissionApplications, setAdmissionApplications] = useState<AdmissionApplication[]>(INITIAL_ADMISSION_APPLICATIONS);

  const [currentStudent, setCurrentStudent] = useState<Student>(INITIAL_STUDENTS[0]);

  // Bed Payment Expiry & Mock Notification States
  const [expiryAlerts, setExpiryAlerts] = useState<BedPaymentExpiryAlert[]>([]);
  const [activeExpiryPopup, setActiveExpiryPopup] = useState<BedPaymentExpiryAlert | null>(null);
  const [expiryReminderLogs, setExpiryReminderLogs] = useState<ExpiryReminderLog[]>([
    {
      id: 'log-init-1',
      studentId: 'std-1',
      studentName: 'Vanessa Mwape',
      phone: '+260 977 123 456',
      channel: 'sms',
      message: 'Dear Vanessa Mwape (NK/RN/2026/0142), your bed payment for Room A-101 (Nkana Main Residence) of K2,400 expires in 3 days on 03/10/2026. Please renew via MTN MoMo to secure your bed space.',
      sentAt: '2026-09-30 07:15',
      status: 'delivered'
    },
    {
      id: 'log-init-2',
      studentId: 'std-11',
      studentName: 'Emmanuel Bwalya',
      phone: '+260 977 345 671',
      channel: 'sms',
      message: 'FINAL NOTICE: Emmanuel Bwalya, your bed payment at Dag Hammarskjöld Hall expires TODAY. Immediate settlement required to prevent bed re-allocation.',
      sentAt: '2026-09-30 06:45',
      status: 'delivered'
    }
  ]);

  // Load from local storage or initialize
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        decryptData(stored).then(decrypted => {
          if (decrypted) {
            const data = JSON.parse(decrypted);
            if (data.rooms) setRooms(data.rooms);
            if (data.students) setStudents(data.students);
            if (data.applications) setApplications(data.applications);
            if (data.alerts) setAlerts(data.alerts);
            if (data.payments) setPayments(data.payments);
          }
        });
      }
    } catch (e) {
      console.warn('Initial storage load failed, using defaults', e);
    }
  }, []);

  // Save encrypted database state whenever state changes
  useEffect(() => {
    const statePayload = {
      rooms,
      students,
      applications,
      alerts,
      payments,
      lastSaved: new Date().toISOString()
    };
    encryptData(JSON.stringify(statePayload)).then(encrypted => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, encrypted);
      } catch (e) {
        console.error('Storage write error', e);
      }
    });
  }, [rooms, students, applications, alerts, payments]);

  // Real-time synchronization listener across tabs/devices
  useEffect(() => {
    const unsubscribe = realtimeSync.subscribe((event) => {
      if (event.type === 'SYNC_STATE_UPDATE' && event.payload) {
        const { rooms: r, students: s, applications: a, alerts: al, payments: p } = event.payload;
        if (r) setRooms(r);
        if (s) setStudents(s);
        if (a) setApplications(a);
        if (al) setAlerts(al);
        if (p) setPayments(p);
      } else if (event.type === 'SYNC_NEW_ALERT' && event.payload) {
        setAlerts(prev => [event.payload, ...prev]);
      }
    });
    return () => unsubscribe();
  }, []);

  const addAlert = (newAlert: Omit<CheckInOutAlert, 'id' | 'timestamp' | 'read'>) => {
    const alert: CheckInOutAlert = {
      ...newAlert,
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      read: false
    };
    setAlerts(prev => [alert, ...prev]);
    realtimeSync.broadcast('SYNC_NEW_ALERT', alert);
  };

  const allocateBedSpace = (appId: string, targetRoomId: string, targetBedId: string, staffName = 'Hostel Administrator'): boolean => {
    const app = applications.find(a => a.id === appId);
    if (!app) return false;

    // Check if target bed is available
    const room = rooms.find(r => r.id === targetRoomId);
    if (!room) return false;
    const bed = room.beds.find(b => b.id === targetBedId);
    if (!bed || bed.status === 'occupied') return false;

    const hall = halls.find(h => h.id === room.hallId);

    // Update Bed status
    const updatedRooms = rooms.map(r => {
      if (r.id === targetRoomId) {
        const updatedBeds = r.beds.map(b => {
          if (b.id === targetBedId) {
            return {
              ...b,
              status: 'occupied' as BedStatus,
              currentStudentId: app.studentId || `std-${Date.now()}`,
              currentStudentName: app.studentName
            };
          }
          return b;
        });
        const isFull = updatedBeds.every(b => b.status === 'occupied');
        return {
          ...r,
          beds: updatedBeds,
          status: isFull ? 'full' as const : 'available' as const
        };
      }
      return r;
    });

    // Update Application status
    const updatedApps = applications.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'allocated' as const,
          selectedBedSpaceId: targetBedId,
          allocatedHallName: hall?.name,
          allocatedRoomNumber: room.roomNumber,
          allocatedBedNumber: bed.bedNumber,
          reviewNotes: `Allocated to ${hall?.name}, Room ${room.roomNumber} (${bed.bedNumber}) by ${staffName}.`
        };
      }
      return a;
    });

    // Create or update Student record
    let updatedStudents = [...students];
    const existingStudentIdx = students.findIndex(s => s.studentNumber === app.studentNumber);
    if (existingStudentIdx >= 0) {
      updatedStudents[existingStudentIdx] = {
        ...updatedStudents[existingStudentIdx],
        hallId: room.hallId,
        roomId: room.id,
        bedSpaceId: targetBedId,
        checkInStatus: 'pending_checkin',
        balanceDue: 0
      };
    } else {
      const newStudent: Student = {
        id: app.studentId || `std-${Date.now()}`,
        studentNumber: app.studentNumber,
        fullName: app.studentName,
        nrcNumber: app.nrcNumber,
        gender: app.gender,
        email: app.email,
        phone: app.phone,
        program: app.program,
        yearOfStudy: app.yearOfStudy as any,
        emergencyContact: {
          name: 'Contact Listed on App',
          relationship: 'Parent/Guardian',
          phone: app.phone
        },
        hallId: room.hallId,
        roomId: room.id,
        bedSpaceId: targetBedId,
        checkInStatus: 'pending_checkin',
        balanceDue: 0
      };
      updatedStudents.push(newStudent);
    }

    setRooms(updatedRooms);
    setApplications(updatedApps);
    setStudents(updatedStudents);

    addAlert({
      type: 'allocation',
      studentName: app.studentName,
      studentNumber: app.studentNumber,
      hallName: hall?.name || 'Residence',
      roomNumber: room.roomNumber,
      bedNumber: bed.bedNumber,
      staffName,
      notes: `Bed space allocated successfully. Student notified for physical check-in.`
    });

    realtimeSync.broadcast('SYNC_STATE_UPDATE', {
      rooms: updatedRooms,
      students: updatedStudents,
      applications: updatedApps
    });

    return true;
  };

  const rejectApplication = (appId: string, reason: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'rejected', reviewNotes: reason } : a));
  };

  const checkInStudent = (studentId: string, keyNumber: string, staffName: string, notes?: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const room = rooms.find(r => r.id === student.roomId);
    const hall = halls.find(h => h.id === student.hallId);
    const bed = room?.beds.find(b => b.id === student.bedSpaceId);

    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const updatedStudents = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          checkInStatus: 'checked_in' as const,
          checkInDate: now,
          keyNumber
        };
      }
      return s;
    });

    setStudents(updatedStudents);

    addAlert({
      type: 'check_in',
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      hallName: hall?.name || 'Hall',
      roomNumber: room?.roomNumber || 'Room',
      bedNumber: bed?.bedNumber || 'Bed',
      staffName,
      notes: notes || `Student checked in, key #${keyNumber} issued after room condition verification.`
    });

    realtimeSync.broadcast('SYNC_STATE_UPDATE', { students: updatedStudents });
  };

  const checkOutStudent = (studentId: string, staffName: string, notes?: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const room = rooms.find(r => r.id === student.roomId);
    const hall = halls.find(h => h.id === student.hallId);
    const bed = room?.beds.find(b => b.id === student.bedSpaceId);

    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);

    // Free the bed space
    const updatedRooms = rooms.map(r => {
      if (r.id === student.roomId) {
        const updatedBeds = r.beds.map(b => {
          if (b.id === student.bedSpaceId) {
            return {
              ...b,
              status: 'vacant' as BedStatus,
              currentStudentId: undefined,
              currentStudentName: undefined
            };
          }
          return b;
        });
        return {
          ...r,
          beds: updatedBeds,
          status: 'available' as const
        };
      }
      return r;
    });

    // Update student status
    const updatedStudents = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          checkInStatus: 'checked_out' as const,
          checkOutDate: now,
          keyNumber: undefined
        };
      }
      return s;
    });

    setRooms(updatedRooms);
    setStudents(updatedStudents);

    addAlert({
      type: 'check_out',
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      hallName: hall?.name || 'Residence',
      roomNumber: room?.roomNumber || 'Room',
      bedNumber: bed?.bedNumber || 'Bed',
      staffName,
      notes: notes || `Check-out completed, key surrendered, bed space cleared for sanitization.`
    });

    realtimeSync.broadcast('SYNC_STATE_UPDATE', {
      rooms: updatedRooms,
      students: updatedStudents
    });
  };

  const submitBedApplication = (appData: Partial<BedApplication>): BedApplication => {
    const newApp: BedApplication = {
      id: `app-${Date.now()}`,
      applicationNumber: `APP-NK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: appData.studentName || '',
      studentNumber: appData.studentNumber || '',
      nrcNumber: appData.nrcNumber || '',
      gender: appData.gender || 'female',
      email: appData.email || '',
      phone: appData.phone || '',
      program: appData.program || '',
      yearOfStudy: appData.yearOfStudy || 'Year 1',
      preferredHallId: appData.preferredHallId || halls[0].id,
      preferredRoomType: appData.preferredRoomType || 'double',
      selectedBedSpaceId: appData.selectedBedSpaceId,
      specialRequests: appData.specialRequests,
      status: 'pending',
      paymentStatus: appData.paymentStatus || 'unpaid',
      paymentReference: appData.paymentReference,
      amountPaidZMW: appData.amountPaidZMW,
      paymentMethod: appData.paymentMethod,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);

    addAlert({
      type: 'allocation',
      studentName: newApp.studentName,
      studentNumber: newApp.studentNumber,
      hallName: halls.find(h => h.id === newApp.preferredHallId)?.name || 'Hostel',
      roomNumber: 'Pending',
      bedNumber: 'Pending',
      staffName: 'Online Admission Portal',
      notes: `New bed space application submitted for ${newApp.program}. Status: Pending Verification.`
    });

    realtimeSync.broadcast('SYNC_STATE_UPDATE', { applications: updatedApps });
    return newApp;
  };

  const processPayment = (paymentData: {
    applicationId: string;
    studentName: string;
    studentNumber: string;
    amountZMW: number;
    method: 'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard';
    accountOrPhoneMask: string;
    description: string;
  }): PaymentTransaction => {
    const prefixMap = {
      mtn_momo: 'MOMO-NK',
      airtel_money: 'AIRTEL-NK',
      zamtel_kwacha: 'ZAMTEL-NK',
      visa_mastercard: 'CARD-NK'
    };
    const reference = `${prefixMap[paymentData.method]}-${Math.floor(100000 + Math.random() * 900000)}`;
    const receiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: PaymentTransaction = {
      id: `pay-${Date.now()}`,
      reference,
      applicationId: paymentData.applicationId,
      studentName: paymentData.studentName,
      studentNumber: paymentData.studentNumber,
      amountZMW: paymentData.amountZMW,
      method: paymentData.method,
      accountOrPhoneMask: paymentData.accountOrPhoneMask,
      status: 'success',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      receiptNumber,
      description: paymentData.description
    };

    const updatedPayments = [newPayment, ...payments];
    setPayments(updatedPayments);

    // Update application payment status
    const updatedApps = applications.map(a => {
      if (a.id === paymentData.applicationId) {
        return {
          ...a,
          paymentStatus: 'paid' as const,
          paymentReference: reference,
          paymentMethod: paymentData.method,
          amountPaidZMW: paymentData.amountZMW
        };
      }
      return a;
    });
    setApplications(updatedApps);

    addAlert({
      type: 'payment',
      studentName: paymentData.studentName,
      studentNumber: paymentData.studentNumber,
      hallName: 'Hostel Finance',
      roomNumber: 'Fee Portal',
      bedNumber: 'Verified',
      staffName: 'Electronic Payment Gateway',
      notes: `ZMW ${paymentData.amountZMW.toLocaleString()} paid via ${paymentData.method.replace('_', ' ').toUpperCase()} (Ref: ${reference}).`
    });

    realtimeSync.broadcast('SYNC_STATE_UPDATE', {
      payments: updatedPayments,
      applications: updatedApps
    });

    return newPayment;
  };

  const updateBedStatus = (bedId: string, status: BedStatus, notes?: string) => {
    const updatedRooms = rooms.map(r => {
      const bedIndex = r.beds.findIndex(b => b.id === bedId);
      if (bedIndex >= 0) {
        const updatedBeds = [...r.beds];
        updatedBeds[bedIndex] = {
          ...updatedBeds[bedIndex],
          status,
          notes: notes || updatedBeds[bedIndex].notes
        };
        return {
          ...r,
          beds: updatedBeds
        };
      }
      return r;
    });

    setRooms(updatedRooms);
    realtimeSync.broadcast('SYNC_STATE_UPDATE', { rooms: updatedRooms });
  };

  const updateRoomStatus = (roomId: string, status: Room['status']) => {
    const updatedRooms = rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, status };
      }
      return r;
    });
    setRooms(updatedRooms);
    realtimeSync.broadcast('SYNC_STATE_UPDATE', { rooms: updatedRooms });
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, read: true } : a));
  };

  const clearAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const exportDailyReport = (dateStr?: string) => {
    generateDailyOccupancyReportPDF(halls, rooms, students, dateStr || new Date().toISOString().split('T')[0]);
  };

  const exportMovementLog = (dateStr?: string) => {
    generateCheckInOutMovementPDF(alerts, dateStr || new Date().toISOString().split('T')[0]);
  };

  const exportAllocationPass = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (app) {
      generateAllocationReceiptPDF(app);
    }
  };

  const submitAdmissionApplication = (appData: Partial<AdmissionApplication>): AdmissionApplication => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newApp: AdmissionApplication = {
      id: `adm-${Date.now()}`,
      applicationNumber: `NK-ADM-${new Date().getFullYear()}-${randNum}`,
      fullName: appData.fullName || '',
      nrcNumber: appData.nrcNumber || '',
      dateOfBirth: appData.dateOfBirth || '2005-01-01',
      gender: appData.gender || 'female',
      phone: appData.phone || '',
      email: appData.email || '',
      residentialAddress: appData.residentialAddress || 'Kitwe, Zambia',
      nextOfKinName: appData.nextOfKinName || '',
      nextOfKinPhone: appData.nextOfKinPhone || '',
      nextOfKinRelation: appData.nextOfKinRelation || 'Guardian',
      programChoice: appData.programChoice || 'Registered Nursing Diploma',
      intakeSession: appData.intakeSession || 'January 2027 Full-Time',
      previousSchool: appData.previousSchool || '',
      completionYear: appData.completionYear || '2024',
      results: appData.results || [],
      documents: appData.documents || [],
      applicationFeeZMW: 150,
      paymentStatus: 'paid',
      paymentMethod: appData.paymentMethod || 'mtn_momo',
      paymentReference: appData.paymentReference || `MOMO-ADM-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'admitted', // auto-admit qualified applicants with offer letter in prototype
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      reviewerRemarks: 'Qualifications verified against NMCZ/HPCZ statutory entry requirements. Provisional admission granted.',
      offerLetterAvailable: true
    };

    const updated = [newApp, ...admissionApplications];
    setAdmissionApplications(updated);

    addAlert({
      type: 'payment',
      studentName: newApp.fullName,
      studentNumber: newApp.applicationNumber,
      hallName: 'Admissions Office',
      roomNumber: 'Enrollment Desk',
      bedNumber: 'Document Verified',
      staffName: 'Online Admission Portal',
      notes: `New admission application & K150 fee paid for ${newApp.programChoice}. Documents uploaded.`
    });

    realtimeSync.broadcast('SYNC_STATE_UPDATE', { admissionApplications: updated });
    return newApp;
  };

  const downloadAdmissionOfferLetter = (appId: string) => {
    const app = admissionApplications.find(a => a.id === appId || a.applicationNumber === appId);
    if (app) {
      generateAdmissionOfferLetterPDF(app);
    }
  };

  // Generate/sync expiry alerts whenever students, rooms, or halls change
  useEffect(() => {
    const list: BedPaymentExpiryAlert[] = [];
    students.forEach(student => {
      if (student.checkInStatus === 'checked_in' && student.bedPaymentExpiryDate) {
        const days = calculateDaysRemaining(student.bedPaymentExpiryDate);
        if (days <= 7) {
          const room = rooms.find(r => r.id === student.roomId);
          const hall = halls.find(h => h.id === student.hallId);
          const bed = room?.beds.find(b => b.id === student.bedSpaceId);
          const urgency: 'warning' | 'critical' | 'expired' =
            days <= 0 ? 'expired' : days <= 3 ? 'critical' : 'warning';
          const amountDueZMW = student.bedFeeZMW || room?.pricePerTermZMW || 2400;

          list.push({
            id: `exp-alert-${student.id}`,
            studentId: student.id,
            studentName: student.fullName,
            studentNumber: student.studentNumber,
            nrcNumber: student.nrcNumber,
            hallId: student.hallId,
            hallName: hall?.name || 'Nkana Main Residence',
            roomNumber: room?.roomNumber || 'Room',
            bedNumber: bed?.bedNumber || 'Bed 1',
            amountDueZMW,
            expiryDate: student.bedPaymentExpiryDate,
            daysRemaining: days,
            urgency,
            message: days <= 0
              ? `Your bed allocation expired on ${student.bedPaymentExpiryDate}. Immediate settlement is required to prevent bed forfeiture.`
              : days === 1
              ? `Final Reminder: Bed allocation payment expires tomorrow. Please settle K${amountDueZMW.toLocaleString()} to retain your space.`
              : `Bed allocation payment of K${amountDueZMW.toLocaleString()} is due in ${days} days (${student.bedPaymentExpiryDate}).`,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            acknowledged: false,
            phone: student.phone
          });
        }
      }
    });

    list.sort((a, b) => a.daysRemaining - b.daysRemaining);
    setExpiryAlerts(list);
  }, [students, rooms, halls]);

  const triggerExpiryAlert = (studentId: string, customDaysRemaining?: number, customNotes?: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const room = rooms.find(r => r.id === student.roomId);
    const hall = halls.find(h => h.id === student.hallId);
    const bed = room?.beds.find(b => b.id === student.bedSpaceId);

    const daysRemaining = customDaysRemaining !== undefined
      ? customDaysRemaining
      : calculateDaysRemaining(student.bedPaymentExpiryDate);

    const urgency: 'warning' | 'critical' | 'expired' =
      daysRemaining <= 0 ? 'expired' : daysRemaining <= 3 ? 'critical' : 'warning';
    const amountDueZMW = student.bedFeeZMW || room?.pricePerTermZMW || 2400;

    const alertItem: BedPaymentExpiryAlert = {
      id: `exp-${student.id}-${Date.now()}`,
      studentId: student.id,
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      nrcNumber: student.nrcNumber,
      hallId: student.hallId,
      hallName: hall?.name || 'Nkana Residential Hall',
      roomNumber: room?.roomNumber || 'A-101',
      bedNumber: bed?.bedNumber || 'Bed 1',
      amountDueZMW,
      expiryDate: student.bedPaymentExpiryDate || '2026-10-03',
      daysRemaining,
      urgency,
      message: customNotes || (daysRemaining <= 0
        ? `Notice: Bed allocation expired on ${student.bedPaymentExpiryDate || 'recent date'}. Immediate renewal required to prevent eviction and bed re-assignment.`
        : daysRemaining === 1
        ? `Urgent Notice: Bed space payment expires tomorrow. Settle K${amountDueZMW.toLocaleString()} to secure your residency.`
        : `Accommodation Notice: Bed space payment of K${amountDueZMW.toLocaleString()} is due in ${daysRemaining} days.`),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      acknowledged: false,
      phone: student.phone
    };

    setExpiryAlerts(prev => [alertItem, ...prev.filter(a => a.studentId !== student.id)]);
    setActiveExpiryPopup(alertItem);

    addAlert({
      type: 'payment_expiry',
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      hallName: hall?.name || 'Residence',
      roomNumber: room?.roomNumber || 'Room',
      bedNumber: bed?.bedNumber || 'Bed',
      staffName: 'Automated Bed Expiry Monitoring System',
      notes: alertItem.message,
      expiryDate: alertItem.expiryDate,
      daysRemaining,
      amountDueZMW
    });
  };

  const dismissExpiryPopup = () => {
    setActiveExpiryPopup(null);
  };

  const acknowledgeExpiryAlert = (alertId: string) => {
    setExpiryAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
    if (activeExpiryPopup?.id === alertId) {
      setActiveExpiryPopup(null);
    }
  };

  const renewBedPayment = (
    studentId: string,
    method: 'mtn_momo' | 'airtel_money' | 'zamtel_kwacha' | 'visa_mastercard' = 'mtn_momo',
    amountZMW?: number
  ) => {
    const student = students.find(s => s.id === studentId);
    if (!student) {
      return { success: false, transaction: null as any };
    }

    const room = rooms.find(r => r.id === student.roomId);
    const hall = halls.find(h => h.id === student.hallId);
    const bed = room?.beds.find(b => b.id === student.bedSpaceId);
    const finalAmount = amountZMW || student.bedFeeZMW || room?.pricePerTermZMW || 2400;

    const baseDate = student.bedPaymentExpiryDate ? new Date(student.bedPaymentExpiryDate) : new Date('2026-09-30');
    const startPoint = baseDate < new Date('2026-09-30') ? new Date('2026-09-30') : baseDate;
    const newExpiry = new Date(startPoint);
    newExpiry.setDate(newExpiry.getDate() + 90);
    const newExpiryStr = newExpiry.toISOString().split('T')[0];

    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const updatedStudents = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          bedPaymentExpiryDate: newExpiryStr,
          lastPaymentDate: now.split(' ')[0],
          paymentExpiryStatus: 'valid' as const,
          balanceDue: 0
        };
      }
      return s;
    });
    setStudents(updatedStudents);

    if (currentStudent.id === studentId) {
      setCurrentStudent(prev => ({
        ...prev,
        bedPaymentExpiryDate: newExpiryStr,
        lastPaymentDate: now.split(' ')[0],
        paymentExpiryStatus: 'valid',
        balanceDue: 0
      }));
    }

    const prefixMap = {
      mtn_momo: 'MOMO-NK',
      airtel_money: 'AIRTEL-NK',
      zamtel_kwacha: 'ZAMTEL-NK',
      visa_mastercard: 'CARD-NK'
    };
    const reference = `${prefixMap[method]}-${Math.floor(100000 + Math.random() * 900000)}`;
    const receiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: PaymentTransaction = {
      id: `pay-renew-${Date.now()}`,
      reference,
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      amountZMW: finalAmount,
      method,
      accountOrPhoneMask: student.phone ? `+260 ${student.phone.slice(5, 7)}* ***${student.phone.slice(-3)}` : '+260 97* ***456',
      status: 'success',
      timestamp: now,
      receiptNumber,
      description: `Bed Space Renewal (Term 2) - ${hall?.name || 'Residence Hall'} Room ${room?.roomNumber || 'Room'}`
    };

    setPayments(prev => [newPayment, ...prev]);

    setExpiryAlerts(prev => prev.filter(a => a.studentId !== studentId));
    if (activeExpiryPopup?.studentId === studentId) {
      setActiveExpiryPopup(null);
    }

    addAlert({
      type: 'payment',
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      hallName: hall?.name || 'Residence',
      roomNumber: room?.roomNumber || 'Room',
      bedNumber: bed?.bedNumber || 'Bed',
      staffName: 'Online Bed Renewal Payment Gateway',
      notes: `Bed space fee K${finalAmount.toLocaleString()} renewed successfully via ${method.replace('_', ' ').toUpperCase()} (Ref: ${reference}). Next expiry extended to ${newExpiryStr}.`
    });

    realtimeSync.broadcast('SYNC_STATE_UPDATE', {
      students: updatedStudents,
      payments: [newPayment, ...payments]
    });

    return { success: true, transaction: newPayment };
  };

  const sendBatchExpiryReminders = (): number => {
    const expiring = students.filter(s => calculateDaysRemaining(s.bedPaymentExpiryDate) <= 7);
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newLogs: ExpiryReminderLog[] = expiring.map(s => {
      const days = calculateDaysRemaining(s.bedPaymentExpiryDate);
      return {
        id: `sms-${Date.now()}-${s.id}`,
        studentId: s.id,
        studentName: s.fullName,
        phone: s.phone,
        channel: 'sms',
        message: `Dear ${s.fullName} (${s.studentNumber}), your bed space fee of K${s.bedFeeZMW || 2400} at Nkana College expires in ${days} days on ${s.bedPaymentExpiryDate}. Pay via MTN/Airtel MoMo to secure your bed.`,
        sentAt: now,
        status: 'delivered'
      };
    });

    setExpiryReminderLogs(prev => [...newLogs, ...prev]);

    addAlert({
      type: 'payment_expiry',
      studentName: 'Bulk Notification Dispatch',
      studentNumber: `${expiring.length} Students`,
      hallName: 'Hostel Administration',
      roomNumber: 'All Wings',
      bedNumber: 'Automated SMS Gateway',
      staffName: 'Automated Bed Expiry Monitoring System',
      notes: `Dispatched ${expiring.length} automated expiry SMS reminders to students nearing bed payment due date.`
    });

    return expiring.length;
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        halls,
        rooms,
        students,
        applications,
        alerts,
        payments,
        admissionApplications,
        submitAdmissionApplication,
        downloadAdmissionOfferLetter,
        currentStudent,
        setCurrentStudent,
        allocateBedSpace,
        rejectApplication,
        checkInStudent,
        checkOutStudent,
        submitBedApplication,
        processPayment,
        updateBedStatus,
        updateRoomStatus,
        markAlertAsRead,
        clearAllAlerts,
        exportDailyReport,
        exportMovementLog,
        exportAllocationPass,
        expiryAlerts,
        activeExpiryPopup,
        expiryReminderLogs,
        triggerExpiryAlert,
        dismissExpiryPopup,
        acknowledgeExpiryAlert,
        renewBedPayment,
        sendBatchExpiryReminders,
        calculateDaysRemaining,
        selectedHallId,
        setSelectedHallId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import { UserRole, UserRoleProfile, UserPrivilegeConfig } from '../types';

export interface PrivilegeItem {
  key: keyof UserPrivilegeConfig;
  label: string;
  category: 'Accommodation' | 'Finance & Bursar' | 'Welfare & Roll-Call' | 'Academics & Faculty' | 'Administrative Control';
  description: string;
}

export const PRIVILEGE_DEFINITIONS: PrivilegeItem[] = [
  {
    key: 'canApplyForBed',
    label: 'Apply for Bed Space',
    category: 'Accommodation',
    description: 'Submit an online hostel bed reservation and choose preferred hall and room'
  },
  {
    key: 'canViewResidentPass',
    label: 'Digital Resident Pass & Room Voucher',
    category: 'Accommodation',
    description: 'Access digital verification QR/barcode, key voucher, and room rules'
  },
  {
    key: 'canReconcilePayments',
    label: 'Mobile Money & Fee Reconciliation',
    category: 'Finance & Bursar',
    description: 'Verify MTN MoMo, Airtel Money, Zamtel, Visa transactions & generate official receipts'
  },
  {
    key: 'canViewDefaulters',
    label: 'Payment Expiries & Defaulter Registry',
    category: 'Finance & Bursar',
    description: 'Monitor students nearing bed fee expiration, send SMS reminders & issue notices'
  },
  {
    key: 'canCheckInCheckOut',
    label: 'Physical Check-In & Check-Out Desk',
    category: 'Welfare & Roll-Call',
    description: 'Verify physical student presence, register arrival dates, and log departures'
  },
  {
    key: 'canIssueKeys',
    label: 'Room Key Issuance & Tag Assignment',
    category: 'Welfare & Roll-Call',
    description: 'Assign physical brass room keys and maintain dormitory key registry'
  },
  {
    key: 'canEnterStudentResults',
    label: 'Student Exam & CA Results Entry',
    category: 'Academics & Faculty',
    description: 'Enter continuous assessments, practical bedside OSCE marks, and semester exam grades'
  },
  {
    key: 'canManageStaffMembers',
    label: 'Staff Roster & HR Control (Add/Delete/Status)',
    category: 'Administrative Control',
    description: 'Add new lecturers and workers, delete staff, update status (Active, On Leave, Retired)'
  },
  {
    key: 'canAllocateBeds',
    label: 'Bed Space Allocation & Override',
    category: 'Administrative Control',
    description: 'Approve or reject bed applications and assign students to rooms/beds'
  },
  {
    key: 'canViewFinancialAudit',
    label: 'Revenue Analytics & Audit Ledger',
    category: 'Finance & Bursar',
    description: 'Review total fees collected, hall revenue breakdown, and export CSV/PDF audits'
  },
  {
    key: 'canManageRoles',
    label: 'User Roles & Privilege Management',
    category: 'Administrative Control',
    description: 'Control access policies, inspect active user sessions, and audit RBAC permissions'
  },
  {
    key: 'canReviewAdmissions',
    label: 'Academic Admissions & Document Verification',
    category: 'Administrative Control',
    description: 'Assess applicant ECZ certificates, NRC credentials, and issue admission letters'
  }
];

export const ROLE_PROFILES: Record<UserRole, UserRoleProfile> = {
  student: {
    role: 'student',
    title: 'Student Resident',
    shortLabel: 'Student',
    department: 'Student Body / Residential Dorms',
    defaultUserName: 'Vanessa Mwape',
    staffOrStudentId: 'NK/RN/2026/0142',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Registered student resident. Can apply for accommodation, view assigned bed pass, and pay bed fees.',
    allowedTabs: ['home', 'about', 'programs', 'online_admission', 'application_tracker', 'bed_spaces', 'apply_bed', 'student_resident_pass', 'faq', 'contact', 'portal_login'],
    privileges: {
      canApplyForBed: true,
      canViewResidentPass: true,
      canReconcilePayments: false,
      canViewDefaulters: false,
      canCheckInCheckOut: false,
      canIssueKeys: false,
      canAllocateBeds: false,
      canManageRoles: false,
      canViewFinancialAudit: false,
      canReviewAdmissions: false,
      canEnterStudentResults: false,
      canManageStaffMembers: false
    }
  },
  lecturer: {
    role: 'lecturer',
    title: 'Lecturer / Academic Faculty',
    shortLabel: 'Lecturer',
    department: 'School of Health Sciences & Education',
    defaultUserName: 'Dr. Mwape Chanda',
    staffOrStudentId: 'NK-LEC-014',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
    description: 'Academic instructor responsible for lecturing, OSCE clinical assessments, and entering student exam/continuous assessment marks.',
    allowedTabs: ['home', 'programs', 'lecturer_results', 'user_roles', 'portal_login'],
    privileges: {
      canApplyForBed: false,
      canViewResidentPass: false,
      canReconcilePayments: false,
      canViewDefaulters: false,
      canCheckInCheckOut: false,
      canIssueKeys: false,
      canAllocateBeds: false,
      canManageRoles: false,
      canViewFinancialAudit: false,
      canReviewAdmissions: false,
      canEnterStudentResults: true, // Key privilege for lecturers
      canManageStaffMembers: false
    }
  },
  accountant: {
    role: 'accountant',
    title: 'Bursar & Finance Officer',
    shortLabel: 'Accountant',
    department: 'Finance & Accounts Directorate',
    defaultUserName: 'Chileshe Mulenga',
    staffOrStudentId: 'NK-FIN-084',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Bursary officer handling student fee reconciliation, MTN/Airtel MoMo settlements, and defaulter tracking. Does NOT apply for student bed spaces.',
    allowedTabs: ['home', 'bed_spaces', 'accountant_finance', 'daily_reports', 'user_roles', 'portal_login'],
    privileges: {
      canApplyForBed: false,
      canViewResidentPass: false,
      canReconcilePayments: true,
      canViewDefaulters: true,
      canCheckInCheckOut: false,
      canIssueKeys: false,
      canAllocateBeds: false,
      canManageRoles: false,
      canViewFinancialAudit: true,
      canReviewAdmissions: false,
      canEnterStudentResults: false,
      canManageStaffMembers: false
    }
  },
  staff: {
    role: 'staff',
    title: 'Hostel Warden / Duty Matron',
    shortLabel: 'Hostel Staff',
    department: 'Hostel Custody & Student Welfare',
    defaultUserName: 'Mrs. Grace Phiri',
    staffOrStudentId: 'NK-STF-029',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    description: 'Hostel custodian responsible for physical student check-ins, room key issuance, roll-call, and daily occupancy reports.',
    allowedTabs: ['home', 'bed_spaces', 'daily_reports', 'user_roles', 'portal_login'],
    privileges: {
      canApplyForBed: false,
      canViewResidentPass: true,
      canReconcilePayments: false,
      canViewDefaulters: true,
      canCheckInCheckOut: true,
      canIssueKeys: true,
      canAllocateBeds: false,
      canManageRoles: false,
      canViewFinancialAudit: false,
      canReviewAdmissions: false,
      canEnterStudentResults: false,
      canManageStaffMembers: false
    }
  },
  admin: {
    role: 'admin',
    title: 'Dean of Students / Housing Administrator',
    shortLabel: 'Dean / Admin',
    department: 'Directorate of Student Affairs & Administration',
    defaultUserName: 'Dr. Bwalya Kangwa',
    staffOrStudentId: 'NK-ADM-003',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    description: 'Executive administrator with complete authority over staff rosters, bed allocations, academic grades, user privileges, and college policies.',
    allowedTabs: ['home', 'about', 'programs', 'online_admission', 'application_tracker', 'bed_spaces', 'daily_reports', 'accountant_finance', 'admin_staff', 'lecturer_results', 'user_roles', 'portal_login'],
    privileges: {
      canApplyForBed: false,
      canViewResidentPass: true,
      canReconcilePayments: true,
      canViewDefaulters: true,
      canCheckInCheckOut: true,
      canIssueKeys: true,
      canAllocateBeds: true,
      canManageRoles: true,
      canViewFinancialAudit: true,
      canReviewAdmissions: true,
      canEnterStudentResults: true,
      canManageStaffMembers: true // Admin user control: add/delete/retire staff
    }
  },
  admissions: {
    role: 'admissions',
    title: 'Admissions Registrar',
    shortLabel: 'Admissions Officer',
    department: 'Academic Registry & Admissions',
    defaultUserName: 'Kelvin Musonda',
    staffOrStudentId: 'NK-REG-017',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    description: 'Academic admissions officer reviewing online applications, verifying ECZ results & NRCs, and enrolling new candidates.',
    allowedTabs: ['home', 'programs', 'online_admission', 'application_tracker', 'user_roles', 'portal_login'],
    privileges: {
      canApplyForBed: false,
      canViewResidentPass: false,
      canReconcilePayments: false,
      canViewDefaulters: false,
      canCheckInCheckOut: false,
      canIssueKeys: false,
      canAllocateBeds: false,
      canManageRoles: false,
      canViewFinancialAudit: false,
      canReviewAdmissions: true,
      canEnterStudentResults: false,
      canManageStaffMembers: false
    }
  }
};

export const getRoleProfile = (role: UserRole): UserRoleProfile => {
  return ROLE_PROFILES[role] || ROLE_PROFILES.student;
};

export const hasPrivilege = (role: UserRole, privilegeKey: keyof UserPrivilegeConfig): boolean => {
  const profile = getRoleProfile(role);
  return Boolean(profile.privileges[privilegeKey]);
};

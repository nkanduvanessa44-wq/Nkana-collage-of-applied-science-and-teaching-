import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StaffMember, StaffEmploymentStatus, StaffCategory, Gender } from '../types';
import {
  Users,
  UserPlus,
  Trash2,
  Edit2,
  Search,
  Filter,
  GraduationCap,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Archive,
  Phone,
  Mail,
  ShieldCheck,
  FileDown,
  X,
  AlertTriangle,
  Building2,
  BookOpen
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export const AdminStaffManagement: React.FC = () => {
  const { staffMembers, addStaffMember, updateStaffMember, deleteStaffMember, setStaffStatus, setActiveTab } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusTargetStaff, setStatusTargetStaff] = useState<StaffMember | null>(null);
  const [newStatus, setNewStatus] = useState<StaffEmploymentStatus>('active');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [retiredDate, setRetiredDate] = useState('');
  const [statusNotes, setStatusNotes] = useState('');

  // Delete confirmation
  const [staffToDelete, setStaffToDelete] = useState<StaffMember | null>(null);

  // New staff form state
  const [formData, setFormData] = useState<{
    employeeNumber: string;
    fullName: string;
    nrcNumber: string;
    gender: Gender;
    email: string;
    phone: string;
    category: StaffCategory;
    jobTitle: string;
    department: string;
    status: StaffEmploymentStatus;
    assignedCoursesText: string;
    qualification: string;
    notes: string;
  }>({
    employeeNumber: `NK-${Date.now().toString().slice(-4)}`,
    fullName: '',
    nrcNumber: '',
    gender: 'female',
    email: '',
    phone: '+260 ',
    category: 'lecturer',
    jobTitle: '',
    department: 'School of Health Sciences',
    status: 'active',
    assignedCoursesText: '',
    qualification: '',
    notes: ''
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Filter staff
  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || staff.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || staff.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Metrics
  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter(s => s.status === 'active').length;
  const onLeaveStaff = staffMembers.filter(s => s.status === 'on_leave').length;
  const retiredStaff = staffMembers.filter(s => s.status === 'retired').length;
  const lecturerCount = staffMembers.filter(s => s.category === 'lecturer').length;

  const handleOpenAddModal = (presetCategory?: StaffCategory) => {
    const isLec = presetCategory === 'lecturer';
    const isWarden = presetCategory === 'warden' || presetCategory === 'matron';
    const isMaint = presetCategory === 'maintenance';
    const isSec = presetCategory === 'security';
    const isAcc = presetCategory === 'accountant';

    setFormData({
      employeeNumber: isLec
        ? `NK-LEC-${Math.floor(100 + Math.random() * 900)}`
        : `NK-STF-${Math.floor(100 + Math.random() * 900)}`,
      fullName: '',
      nrcNumber: '',
      gender: 'female',
      email: '',
      phone: '+260 97',
      category: presetCategory || 'lecturer',
      jobTitle: isLec
        ? 'Lecturer in Registered Nursing'
        : isWarden
        ? 'Hostel Resident Matron'
        : isMaint
        ? 'Campus Electrician & Maintenance'
        : isSec
        ? 'Campus Security Officer'
        : isAcc
        ? 'Assistant Bursar'
        : 'Support Staff',
      department: isLec
        ? 'School of Health Sciences'
        : isWarden
        ? 'Hostel Custody & Student Welfare'
        : isMaint
        ? 'Facilities & Grounds Directorate'
        : isSec
        ? 'Campus Security & Gatehouse'
        : isAcc
        ? 'Finance Directorate'
        : 'Administrative Support',
      status: 'active',
      assignedCoursesText: isLec ? 'NUR-101, NUR-102' : '',
      qualification: isLec ? 'BSc Nursing / Clinical Education' : 'Certificate / Trade Diploma',
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  const handleSaveNewStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.jobTitle.trim()) {
      alert('Please provide full name and job designation.');
      return;
    }

    const assignedCourses = formData.assignedCoursesText
      ? formData.assignedCoursesText.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    const created = addStaffMember({
      employeeNumber: formData.employeeNumber,
      fullName: formData.fullName,
      nrcNumber: formData.nrcNumber || 'Pending NRC',
      gender: formData.gender,
      email: formData.email || `${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@nkanacollege.edu.zm`,
      phone: formData.phone,
      category: formData.category,
      jobTitle: formData.jobTitle,
      department: formData.department,
      status: formData.status,
      assignedCourses,
      qualification: formData.qualification,
      dateJoined: new Date().toISOString().split('T')[0],
      notes: formData.notes
    });

    setIsAddModalOpen(false);
    setNotification(`Successfully added ${created.fullName} (${created.employeeNumber}) to institutional roster.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenStatusModal = (staff: StaffMember) => {
    setStatusTargetStaff(staff);
    setNewStatus(staff.status);
    setLeaveStart(staff.leaveStartDate || '');
    setLeaveEnd(staff.leaveEndDate || '');
    setRetiredDate(staff.retiredDate || new Date().toISOString().split('T')[0]);
    setStatusNotes('');
    setIsStatusModalOpen(true);
  };

  const handleSaveStatus = () => {
    if (!statusTargetStaff) return;
    setStaffStatus(statusTargetStaff.id, newStatus, {
      leaveStart: newStatus === 'on_leave' ? leaveStart : undefined,
      leaveEnd: newStatus === 'on_leave' ? leaveEnd : undefined,
      retiredDate: newStatus === 'retired' ? retiredDate : undefined,
      notes: statusNotes
    });
    setIsStatusModalOpen(false);
    setNotification(`Updated employment status of ${statusTargetStaff.fullName} to: ${newStatus.replace('_', ' ').toUpperCase()}`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleConfirmDelete = () => {
    if (!staffToDelete) return;
    deleteStaffMember(staffToDelete.id);
    const deletedName = staffToDelete.fullName;
    setStaffToDelete(null);
    setNotification(`Staff record for ${deletedName} has been archived and removed from active roster.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleExportStaffPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 111, 191);
    doc.rect(0, 0, 210, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 14, 12);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('HUMAN RESOURCES & EMPLOYEE ROSTER DIRECTORY', 14, 20);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`Official Export Date: ${new Date().toLocaleDateString('en-GB')} | Total Staff: ${staffMembers.length}`, 14, 38);
    doc.text(`Active / On Duty: ${activeStaff} | On Leave: ${onLeaveStaff} | Retired: ${retiredStaff} | Lecturers: ${lecturerCount}`, 14, 45);

    let y = 56;
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y - 5, 182, 8, 'F');
    doc.text('Emp ID', 16, y);
    doc.text('Full Name', 45, y);
    doc.text('Role & Department', 100, y);
    doc.text('Status', 170, y);

    y += 8;
    doc.setFont('helvetica', 'normal');
    filteredStaff.forEach((s) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(s.employeeNumber, 16, y);
      doc.text(s.fullName.substring(0, 26), 45, y);
      doc.text(`${s.jobTitle.substring(0, 30)} (${s.department.substring(0, 15)})`, 100, y);
      doc.text(s.status.toUpperCase(), 170, y);
      y += 7;
    });

    doc.save(`Nkana_Staff_Roster_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F0FF] text-[#0F6FBF] border border-[#BFDBFE]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin User Control & HR Management Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A1931] tracking-tight">
              Staff & Academic Personnel Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Maintain institutional human resources across Nkana College. Add and delete lecturers and staff, manage statuses (Active On-Duty, On Leave, Retired), and supervise department assignments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenAddModal('lecturer')}
              className="px-3.5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>+ Add Lecturer</span>
            </button>
            <button
              onClick={() => handleOpenAddModal('warden')}
              className="px-3.5 py-2.5 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Worker</span>
            </button>
            <button
              onClick={() => setActiveTab('lecturer_results')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-teal-300" />
              <span>Student Results Entry</span>
            </button>
            <button
              onClick={handleExportStaffPDF}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <FileDown className="w-4 h-4 text-[#0F6FBF]" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-gray-100">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Personnel</span>
            <span className="text-xl font-black text-[#0A1931] mt-0.5 block">{totalStaff}</span>
            <span className="text-[10px] text-slate-500">All Departments</span>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Active / On Duty</span>
            <span className="text-xl font-black text-emerald-900 mt-0.5 block">{activeStaff}</span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> On Live
            </span>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">On Leave</span>
            <span className="text-xl font-black text-amber-900 mt-0.5 block">{onLeaveStaff}</span>
            <span className="text-[10px] text-amber-700">Study / Annual Leave</span>
          </div>

          <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Retired</span>
            <span className="text-xl font-black text-slate-800 mt-0.5 block">{retiredStaff}</span>
            <span className="text-[10px] text-slate-500">Honorary Alumni</span>
          </div>

          <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100">
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">Lecturers</span>
            <span className="text-xl font-black text-teal-900 mt-0.5 block">{lecturerCount}</span>
            <span className="text-[10px] text-teal-700">Academic Faculty</span>
          </div>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, job title..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F6FBF]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
            >
              <option value="all">All Categories</option>
              <option value="lecturer">Academic Lecturers</option>
              <option value="matron">Hostel Matrons</option>
              <option value="warden">Hostel Wardens</option>
              <option value="accountant">Finance / Bursars</option>
              <option value="maintenance">Maintenance & Works</option>
              <option value="security">Campus Security</option>
            </select>

            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active (On Duty / On Live)</option>
              <option value="on_leave">On Leave</option>
              <option value="retired">Retired</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-3 px-3">Employee No.</th>
                <th className="py-3 px-3">Full Name & Contact</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Job Title & Faculty</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Assigned Courses / Notes</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No staff members match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {staff.employeeNumber}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-[#0A1931]">{staff.fullName}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" /> {staff.phone}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> {staff.email}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        staff.category === 'lecturer'
                          ? 'bg-teal-100 text-teal-900 border border-teal-200'
                          : staff.category === 'matron' || staff.category === 'warden'
                          ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                          : staff.category === 'accountant'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {staff.category.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{staff.jobTitle}</div>
                      <div className="text-[10px] text-slate-500">{staff.department}</div>
                    </td>

                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleOpenStatusModal(staff)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all hover:scale-105 ${
                          staff.status === 'active'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : staff.status === 'on_leave'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : staff.status === 'retired'
                            ? 'bg-slate-200 text-slate-800 border border-slate-300'
                            : 'bg-sky-100 text-sky-900'
                        }`}
                        title="Click to toggle or update status"
                      >
                        {staff.status === 'active' && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
                        {staff.status === 'on_leave' && <Clock className="w-3 h-3 text-amber-700" />}
                        {staff.status === 'retired' && <Archive className="w-3 h-3 text-slate-700" />}
                        <span>{staff.status === 'active' ? 'Active / On Live' : staff.status === 'on_leave' ? 'On Leave' : staff.status.toUpperCase()}</span>
                      </button>
                    </td>

                    <td className="py-3 px-3 max-w-xs">
                      {staff.category === 'lecturer' && staff.assignedCourses && staff.assignedCourses.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {staff.assignedCourses.map((c, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 text-[9px] font-medium border border-teal-200 truncate">
                              {c}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">
                          {staff.notes || 'General staff duties'}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {staff.category === 'lecturer' && (
                          <button
                            onClick={() => setActiveTab('lecturer_results')}
                            className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-[10px] font-bold border border-teal-200 flex items-center gap-1 transition-colors"
                            title="Enter Student Marks for this Lecturer"
                          >
                            <BookOpen className="w-3 h-3 text-teal-700" />
                            <span>Enter Results</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenStatusModal(staff)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Change Employment Status (Active On Live / On Leave / Retired)"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setStaffToDelete(staff)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete / Archive Staff Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 my-8 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F6FBF] text-white flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A1931]">Add New Staff Member</h3>
                  <p className="text-xs text-slate-500">Register a new academic lecturer or administrative worker.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewStaff} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Employee Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.employeeNumber}
                    onChange={e => setFormData({ ...formData, employeeNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Staff Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as StaffCategory })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
                  >
                    <option value="lecturer">Academic Lecturer (Nursing, Midwifery, etc.)</option>
                    <option value="matron">Hostel Matron (Welfare)</option>
                    <option value="warden">Hostel Warden (Administration)</option>
                    <option value="accountant">Accountant / Bursar (Finance)</option>
                    <option value="security">Campus Security Officer</option>
                    <option value="maintenance">Maintenance / Facilities Specialist</option>
                    <option value="administrative">General Administrative Officer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kabwe Mwansa"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">NRC Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 482019/11/1"
                    value={formData.nrcNumber}
                    onChange={e => setFormData({ ...formData, nrcNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Job Designation / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Nursing Lecturer / Ward Warden"
                    value={formData.jobTitle}
                    onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Faculty / Department *</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="School of Health Sciences">School of Health Sciences</option>
                    <option value="School of Education">School of Education</option>
                    <option value="Hostel Custody & Student Welfare">Hostel Custody & Student Welfare</option>
                    <option value="Finance & Accounts Directorate">Finance & Accounts Directorate</option>
                    <option value="Campus Security & Gate Control">Campus Security & Gate Control</option>
                    <option value="Physical Works & Maintenance">Physical Works & Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@nkanacollege.edu.zm"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as StaffEmploymentStatus })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-emerald-800"
                  >
                    <option value="active">Active (On Duty / On Live)</option>
                    <option value="on_leave">On Leave</option>
                    <option value="contract">Contract</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
              </div>

              {formData.category === 'lecturer' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Assigned Courses / Subject Codes (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NUR-101 Anatomy, CLM-202 Pharmacology"
                    value={formData.assignedCoursesText}
                    onChange={e => setFormData({ ...formData, assignedCoursesText: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    These courses will appear in the Lecturer Student Results Entry module.
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold shadow-xs active:scale-95 transition-all"
                >
                  Save & Register Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Modal (Active / On Leave / Retired) */}
      {isStatusModalOpen && statusTargetStaff && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0A1931]">Update Employment Status</h3>
                <p className="text-xs text-slate-500">{statusTargetStaff.fullName} ({statusTargetStaff.employeeNumber})</p>
              </div>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Selection *</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewStatus('active')}
                    className={`p-3 rounded-xl border-2 text-center font-bold transition-all ${
                      newStatus === 'active'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>Active (On Live)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewStatus('on_leave')}
                    className={`p-3 rounded-xl border-2 text-center font-bold transition-all ${
                      newStatus === 'on_leave'
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <span>On Leave</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewStatus('retired')}
                    className={`p-3 rounded-xl border-2 text-center font-bold transition-all ${
                      newStatus === 'retired'
                        ? 'border-slate-700 bg-slate-100 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <Archive className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                    <span>Retired</span>
                  </button>
                </div>
              </div>

              {newStatus === 'on_leave' && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <span className="font-bold text-amber-900 block">Leave Schedule Details</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-amber-800 block">Leave Start Date</label>
                      <input
                        type="date"
                        value={leaveStart}
                        onChange={e => setLeaveStart(e.target.value)}
                        className="w-full p-2 rounded-lg border border-amber-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-amber-800 block">Expected Return Date</label>
                      <input
                        type="date"
                        value={leaveEnd}
                        onChange={e => setLeaveEnd(e.target.value)}
                        className="w-full p-2 rounded-lg border border-amber-300 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {newStatus === 'retired' && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block">Retirement Records</span>
                  <div>
                    <label className="text-[10px] text-slate-600 block">Official Retirement Date</label>
                    <input
                      type="date"
                      value={retiredDate}
                      onChange={e => setRetiredDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Administrative Remarks / Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Study leave at UNZA / Superannuation pension approved"
                  value={statusNotes}
                  onChange={e => setStatusNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 text-xs">
              <button
                type="button"
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveStatus}
                className="px-5 py-2 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {staffToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-red-100 space-y-4 text-center animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Staff Record?</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete <strong>{staffToDelete.fullName}</strong> ({staffToDelete.employeeNumber})? This will archive their institutional profile.
            </p>
            <div className="flex justify-center gap-2 pt-2 text-xs">
              <button
                onClick={() => setStaffToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-xs"
              >
                Yes, Delete Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

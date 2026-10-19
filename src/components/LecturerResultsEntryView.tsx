import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentCourseResult } from '../types';
import { AVAILABLE_COURSES } from '../data/mockStaffData';
import {
  BookOpen,
  GraduationCap,
  Save,
  CheckCircle2,
  FileDown,
  Search,
  Filter,
  AlertTriangle,
  Award,
  Sparkles,
  Send,
  Building2,
  Users
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export const LecturerResultsEntryView: React.FC = () => {
  const { students, studentResults, saveStudentResult, submitCourseResults, approveCourseResults, currentRole, setActiveTab } = useApp();

  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('NUR-101');
  const [selectedSemester, setSelectedSemester] = useState<'Semester 1' | 'Semester 2'>('Semester 1');
  const [academicYear, setAcademicYear] = useState<string>('2026/2027');
  const [notification, setNotification] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentCourse = AVAILABLE_COURSES.find(c => c.code === selectedCourseCode) || AVAILABLE_COURSES[0];

  // Local editable marks state map
  const [marksState, setMarksState] = useState<Record<string, { ca: number; clinical: number; exam: number }>>(() => {
    const map: Record<string, { ca: number; clinical: number; exam: number }> = {};
    studentResults.forEach(r => {
      map[`${r.studentId}-${r.courseCode}`] = {
        ca: r.continuousAssessment,
        clinical: r.clinicalOrPracticum,
        exam: r.finalExam
      };
    });
    return map;
  });

  // Calculate grading criteria
  const calculateGrade = (total: number) => {
    if (total >= 75) return { grade: 'A+', remark: 'Distinction', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
    if (total >= 70) return { grade: 'A', remark: 'Merit', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    if (total >= 65) return { grade: 'B+', remark: 'Credit', color: 'bg-sky-100 text-sky-900 border-sky-300' };
    if (total >= 50) return { grade: 'B', remark: 'Pass', color: 'bg-yellow-50 text-yellow-800 border-yellow-200' };
    if (total >= 40) return { grade: 'C', remark: 'Fail / Supp', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    return { grade: 'F', remark: 'Fail / Repeat', color: 'bg-red-100 text-red-900 border-red-300' };
  };

  const handleMarkChange = (studentId: string, field: 'ca' | 'clinical' | 'exam', value: number) => {
    const key = `${studentId}-${selectedCourseCode}`;
    const current = marksState[key] || { ca: 0, clinical: 0, exam: 0 };
    const maxVal = field === 'clinical' ? 20 : 40;
    const cleanVal = Math.min(maxVal, Math.max(0, isNaN(value) ? 0 : value));

    setMarksState(prev => ({
      ...prev,
      [key]: {
        ...current,
        [field]: cleanVal
      }
    }));
  };

  const handleSaveStudentMark = (student: typeof students[0]) => {
    const key = `${student.id}-${selectedCourseCode}`;
    const m = marksState[key] || { ca: 25, clinical: 15, exam: 25 };
    const existing = studentResults.find(r => r.studentId === student.id && r.courseCode === selectedCourseCode);

    saveStudentResult({
      id: existing?.id,
      studentId: student.id,
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      program: student.program,
      courseCode: currentCourse.code,
      courseTitle: currentCourse.title,
      semester: selectedSemester,
      academicYear,
      continuousAssessment: m.ca,
      clinicalOrPracticum: m.clinical,
      finalExam: m.exam,
      totalScore: m.ca + m.clinical + m.exam,
      letterGrade: 'B',
      remark: 'Pass',
      lecturerId: 'staff-lec-1',
      lecturerName: 'Dr. Mwape Chanda',
      status: existing?.status || 'draft'
    });

    setNotification(`Marks saved for ${student.fullName} in ${currentCourse.code}.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBatchSaveAll = () => {
    students.forEach(student => {
      const key = `${student.id}-${selectedCourseCode}`;
      const m = marksState[key] || { ca: 28, clinical: 14, exam: 28 };
      const existing = studentResults.find(r => r.studentId === student.id && r.courseCode === selectedCourseCode);

      saveStudentResult({
        id: existing?.id,
        studentId: student.id,
        studentName: student.fullName,
        studentNumber: student.studentNumber,
        program: student.program,
        courseCode: currentCourse.code,
        courseTitle: currentCourse.title,
        semester: selectedSemester,
        academicYear,
        continuousAssessment: m.ca,
        clinicalOrPracticum: m.clinical,
        finalExam: m.exam,
        totalScore: m.ca + m.clinical + m.exam,
        letterGrade: 'B',
        remark: 'Pass',
        lecturerId: 'staff-lec-1',
        lecturerName: 'Dr. Mwape Chanda',
        status: existing?.status || 'draft'
      });
    });

    setNotification(`Successfully saved all student grades for ${currentCourse.code}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSubmitToSenate = () => {
    handleBatchSaveAll();
    submitCourseResults(selectedCourseCode);
    setNotification(`Official marks for ${selectedCourseCode} submitted to the Academic Registrar and Dean.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePopulateSampleMarks = () => {
    const updatedMap = { ...marksState };
    students.forEach((st, idx) => {
      const key = `${st.id}-${selectedCourseCode}`;
      const baseCA = 24 + ((idx * 3) % 15);
      const baseClin = 12 + ((idx * 2) % 8);
      const baseExam = 22 + ((idx * 4) % 18);
      updatedMap[key] = { ca: baseCA, clinical: baseClin, exam: baseExam };
    });
    setMarksState(updatedMap);
    setNotification('Sample assessment marks populated across student roster.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportGradeSheetPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 111, 191);
    doc.rect(0, 0, 210, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('NKANA COLLEGE OF APPLIED SCIENCES AND EDUCATION', 14, 12);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`OFFICIAL SEMESTER GRADE SHEET • ${currentCourse.department.toUpperCase()}`, 14, 20);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`Course: ${currentCourse.code} - ${currentCourse.title}`, 14, 36);
    doc.text(`Academic Session: ${academicYear} • ${selectedSemester} | Lecturer: Dr. Mwape Chanda`, 14, 43);

    let y = 54;
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y - 5, 182, 8, 'F');
    doc.text('Student No.', 16, y);
    doc.text('Student Name', 52, y);
    doc.text('CA (40)', 115, y);
    doc.text('Prac (20)', 133, y);
    doc.text('Exam (40)', 152, y);
    doc.text('Total', 172, y);
    doc.text('Grade', 186, y);

    y += 8;
    doc.setFont('helvetica', 'normal');
    students.slice(0, 24).forEach((st) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      const key = `${st.id}-${selectedCourseCode}`;
      const m = marksState[key] || { ca: 28, clinical: 14, exam: 28 };
      const tot = m.ca + m.clinical + m.exam;
      const { grade } = calculateGrade(tot);

      doc.text(st.studentNumber, 16, y);
      doc.text(st.fullName.substring(0, 24), 52, y);
      doc.text(String(m.ca), 118, y);
      doc.text(String(m.clinical), 136, y);
      doc.text(String(m.exam), 155, y);
      doc.setFont('helvetica', 'bold');
      doc.text(String(tot), 174, y);
      doc.text(grade, 188, y);
      doc.setFont('helvetica', 'normal');
      y += 7;
    });

    // Signature blocks
    y += 10;
    if (y < 260) {
      doc.setDrawColor(180, 180, 180);
      doc.line(16, y + 15, 80, y + 15);
      doc.text('Course Lecturer Signature', 16, y + 20);

      doc.line(125, y + 15, 190, y + 15);
      doc.text('Dean of Academic Affairs Signature', 125, y + 20);
    }

    doc.save(`Nkana_Grades_${selectedCourseCode}_${selectedSemester.replace(' ', '_')}.pdf`);
  };

  const filteredStudents = students.filter(st =>
    st.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    st.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lecturer Academic Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A1931] tracking-tight">
              Student Results & Continuous Assessment Entry
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Record student marks for continuous assessments (CA), clinical bedside practicals, and semester examinations. Automatically calculates distinctions, credits, and GPA remarks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePopulateSampleMarks}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Auto-Fill Sample Marks</span>
            </button>
            <button
              onClick={handleBatchSaveAll}
              className="px-4 py-2.5 rounded-xl bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Marks Draft</span>
            </button>
            <button
              onClick={handleExportGradeSheetPDF}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF Grade Sheet</span>
            </button>
          </div>
        </div>

        {/* Course & Session Selector Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Select Course Subject:
            </label>
            <select
              value={selectedCourseCode}
              onChange={e => setSelectedCourseCode(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs text-[#0A1931]"
            >
              {AVAILABLE_COURSES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.code} • {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Academic Semester:
            </label>
            <select
              value={selectedSemester}
              onChange={e => setSelectedSemester(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs text-[#0A1931]"
            >
              <option value="Semester 1">Semester 1 (Main Session)</option>
              <option value="Semester 2">Semester 2 (Mid-Year Session)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Assigned Lecturer:
            </label>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Dr. Mwape Chanda (NK-LEC-014)</span>
              <span className="text-[10px] text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-bold">Authorized</span>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Gradebook Table */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-base font-bold text-[#0A1931]">
              Enrolled Student Roster ({filteredStudents.length} Students)
            </h2>
            <p className="text-xs text-slate-500">
              Grading formula: CA (Max 40) + Clinical OSCE (Max 20) + Final Exam (Max 40) = Total Score (Max 100).
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search student..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
            <button
              onClick={handleSubmitToSenate}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Dean</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold bg-slate-50/70">
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Student No.</th>
                <th className="py-3 px-3 text-center">CA Mark (40)</th>
                <th className="py-3 px-3 text-center">Clinical OSCE (20)</th>
                <th className="py-3 px-3 text-center">Final Exam (40)</th>
                <th className="py-3 px-3 text-center font-black">Total (100)</th>
                <th className="py-3 px-3 text-center">Grade & Remark</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.map((student) => {
                const key = `${student.id}-${selectedCourseCode}`;
                const m = marksState[key] || { ca: 26, clinical: 14, exam: 25 };
                const total = m.ca + m.clinical + m.exam;
                const { grade, remark, color } = calculateGrade(total);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#0A1931]">{student.fullName}</div>
                      <div className="text-[10px] text-slate-500">{student.program}</div>
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-600 font-semibold">
                      {student.studentNumber}
                    </td>

                    {/* CA input */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={m.ca}
                        onChange={e => handleMarkChange(student.id, 'ca', parseInt(e.target.value) || 0)}
                        className="w-16 p-1.5 text-center font-bold font-mono rounded-lg border border-slate-200 focus:border-[#0F6FBF] bg-white text-xs"
                      />
                    </td>

                    {/* Clinical / OSCE input */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={m.clinical}
                        onChange={e => handleMarkChange(student.id, 'clinical', parseInt(e.target.value) || 0)}
                        className="w-16 p-1.5 text-center font-bold font-mono rounded-lg border border-slate-200 focus:border-[#0F6FBF] bg-white text-xs"
                      />
                    </td>

                    {/* Final Exam input */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={m.exam}
                        onChange={e => handleMarkChange(student.id, 'exam', parseInt(e.target.value) || 0)}
                        className="w-16 p-1.5 text-center font-bold font-mono rounded-lg border border-slate-200 focus:border-[#0F6FBF] bg-white text-xs"
                      />
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 text-center font-mono font-black text-sm text-slate-900">
                      {total}%
                    </td>

                    {/* Grade & Remark */}
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${color}`}>
                        <Award className="w-3 h-3" />
                        <span>{grade} ({remark})</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleSaveStudentMark(student)}
                        className="px-2.5 py-1 bg-[#0F6FBF] hover:bg-[#0c5a9c] text-white rounded-lg text-[10px] font-bold transition-all active:scale-95"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

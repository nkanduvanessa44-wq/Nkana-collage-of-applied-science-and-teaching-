import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Bed,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Users,
  Eye,
  UserCheck,
  FileDown,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Key,
  DoorOpen,
  X,
  Lock
} from 'lucide-react';
import { Room, BedSpace, Student, UserRole, BedStatus } from '../types';
import { maskNRC, maskPhone } from '../utils/securityAndSync';

export const DormStatusDashboard: React.FC = () => {
  const {
    halls,
    rooms,
    students,
    currentRole,
    updateBedStatus,
    checkInStudent,
    checkOutStudent,
    exportDailyReport,
    setActiveTab,
    selectedHallId,
    setSelectedHallId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'vacant' | 'occupied' | 'maintenance'>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [selectedBedModal, setSelectedBedModal] = useState<{ room: Room; bed: BedSpace; student?: Student } | null>(null);

  // Check-in modal state
  const [checkInKey, setCheckInKey] = useState('');
  const [checkInNotes, setCheckInNotes] = useState('');
  const [checkOutNotes, setCheckOutNotes] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Calculate high-level metrics
  let totalBeds = 0;
  let occupiedBeds = 0;
  let vacantBeds = 0;
  let maintenanceBeds = 0;
  let reservedBeds = 0;

  rooms.forEach(r => {
    r.beds.forEach(b => {
      totalBeds++;
      if (b.status === 'occupied') occupiedBeds++;
      else if (b.status === 'vacant') vacantBeds++;
      else if (b.status === 'maintenance') maintenanceBeds++;
      else if (b.status === 'reserved') reservedBeds++;
    });
  });

  const overallOccupancyRate = totalBeds > 0 ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : '0';

  // Filtered rooms
  const filteredRooms = rooms.filter(room => {
    if (selectedHallId !== 'all' && room.hallId !== selectedHallId) return false;
    if (floorFilter !== 'all' && room.floor !== parseInt(floorFilter)) return false;

    if (statusFilter !== 'all') {
      const hasStatusBed = room.beds.some(b => b.status === statusFilter);
      if (!hasStatusBed) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRoom = room.roomNumber.toLowerCase().includes(q);
      const matchStudent = room.beds.some(b =>
        b.currentStudentName?.toLowerCase().includes(q)
      );
      if (!matchRoom && !matchStudent) return false;
    }

    return true;
  });

  const handleBedClick = (room: Room, bed: BedSpace) => {
    let student: Student | undefined = undefined;
    if (bed.currentStudentId) {
      student = students.find(s => s.id === bed.currentStudentId || s.fullName === bed.currentStudentName);
    }
    setSelectedBedModal({ room, bed, student });
    setCheckInKey(student?.keyNumber || `${room.roomNumber}-KEY-${bed.bedNumber.replace(/\D/g, '') || '1'}`);
    setCheckInNotes('');
    setCheckOutNotes('');
  };

  const handlePerformCheckIn = () => {
    if (!selectedBedModal?.student) return;
    checkInStudent(
      selectedBedModal.student.id,
      checkInKey,
      currentRole === 'admin' ? 'Hostel Warden' : 'Duty Matron',
      checkInNotes
    );
    setActionSuccessMessage(`Check-In confirmed for ${selectedBedModal.student.fullName}. Alert dispatched!`);
    setTimeout(() => {
      setActionSuccessMessage(null);
      setSelectedBedModal(null);
    }, 2000);
  };

  const handlePerformCheckOut = () => {
    if (!selectedBedModal?.student) return;
    checkOutStudent(
      selectedBedModal.student.id,
      currentRole === 'admin' ? 'Hostel Warden' : 'Duty Matron',
      checkOutNotes
    );
    setActionSuccessMessage(`Check-Out processed for ${selectedBedModal.student.fullName}. Bed space is now vacant.`);
    setTimeout(() => {
      setActionSuccessMessage(null);
      setSelectedBedModal(null);
    }, 2000);
  };

  const handleToggleMaintenance = (bedId: string, currentStatus: BedStatus) => {
    const newStatus = currentStatus === 'maintenance' ? 'vacant' : 'maintenance';
    updateBedStatus(bedId, newStatus, newStatus === 'maintenance' ? 'Scheduled maintenance repair' : undefined);
    if (selectedBedModal) {
      setSelectedBedModal({
        ...selectedBedModal,
        bed: { ...selectedBedModal.bed, status: newStatus }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner in Light Blue / Sky Palette */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-sky-700/80 text-sky-100 border border-sky-400/40">
              Live Monitoring System
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sky-200">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              Synchronized Across Campus
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Bed Space Management Module & Dorm Availability
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-2xl">
            Real-time occupancy tracking for Nkana College residential halls. Track student details, manage vacant bed spaces, process assignments, and view check-in alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => exportDailyReport()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-sky-900 font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            <FileDown className="w-4 h-4 text-sky-600" />
            <span>Export Daily PDF Report</span>
          </button>

          <button
            onClick={() => setActiveTab('apply_bed')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Bed className="w-4 h-4 text-white" />
            <span>Apply For Bed Space</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Bed Capacity</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalBeds}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Across {halls.length} halls & {rooms.length} rooms</p>
        </div>

        <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200 shadow-xs">
          <div className="flex items-center justify-between text-sky-800 text-xs font-medium">
            <span>Occupied Beds</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-950 mt-1">{occupiedBeds}</div>
          <p className="text-[11px] text-sky-700 mt-0.5">{overallOccupancyRate}% current occupancy</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-sky-200 shadow-xs ring-2 ring-sky-100">
          <div className="flex items-center justify-between text-sky-700 text-xs font-medium">
            <span>Vacant Bed Spaces</span>
            <Bed className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-700 mt-1">{vacantBeds}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Available for student booking</p>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-medium">
            <span>Reserved / Pending</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1">{reservedBeds}</div>
          <p className="text-[11px] text-amber-700 mt-0.5">Application under review</p>
        </div>

        <div className="bg-red-50/70 p-4 rounded-xl border border-red-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-red-800 text-xs font-medium">
            <span>Under Maintenance</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-900 mt-1">{maintenanceBeds}</div>
          <p className="text-[11px] text-red-700 mt-0.5">Repairs & sanitization</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs space-y-3">
        {/* Hall Selection Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Hostel Halls:
          </span>
          <button
            onClick={() => setSelectedHallId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedHallId === 'all'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Hostels ({rooms.length} Rooms)
          </button>

          {halls.map(hall => {
            const isSelected = selectedHallId === hall.id;
            const hallBeds = rooms.filter(r => r.hallId === hall.id).reduce((acc, r) => acc + r.beds.length, 0);
            return (
              <button
                key={hall.id}
                onClick={() => setSelectedHallId(hall.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{hall.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-sky-800 text-sky-100' : 'bg-slate-200 text-slate-600'}`}>
                  {hall.genderAllowed === 'female' ? '♀ Female' : hall.genderAllowed === 'male' ? '♂ Male' : '⚥ Mixed'} • {hallBeds} Beds
                </span>
              </button>
            );
          })}
        </div>

        {/* Authentic Hostel Facility Showcase Banner */}
        {selectedHallId !== 'all' && (() => {
          const currentHall = halls.find(h => h.id === selectedHallId);
          if (!currentHall) return null;
          return (
            <div className="bg-slate-50/80 rounded-2xl border border-sky-100 p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in">
              <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                <img
                  src={currentHall.image}
                  alt={currentHall.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md border border-sky-200">
                    {currentHall.code}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {currentHall.genderAllowed === 'female' ? 'Female Residence' : currentHall.genderAllowed === 'male' ? 'Male Residence' : 'Co-ed Block'} • {currentHall.floorsCount} Floors
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">{currentHall.name}</h3>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed">{currentHall.description}</p>
              </div>
            </div>
          );
        })()}

        {/* Secondary filters: Status, Floor, Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          {/* Search box */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search room (e.g. A-101) or resident name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-4 flex items-center gap-1">
            <span className="text-xs text-slate-500 font-medium shrink-0 mr-1">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Bed Statuses</option>
              <option value="vacant">Vacant Beds Only (Ready to Book)</option>
              <option value="occupied">Occupied Beds</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>

          {/* Floor Filter */}
          <div className="lg:col-span-3 flex items-center gap-1">
            <span className="text-xs text-slate-500 font-medium shrink-0 mr-1">Floor:</span>
            <select
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Floors</option>
              <option value="0">Ground Floor (Floor 0)</option>
              <option value="1">1st Floor</option>
              <option value="2">2nd Floor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms & Bed Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-slate-900">
              Interactive Room Floorplan & Vacant Bed Spaces
            </h2>
            <span className="text-xs text-slate-500">
              Showing {filteredRooms.length} room(s)
            </span>
          </div>

          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-md bg-sky-500"></span> Vacant Bed
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-md bg-slate-800"></span> Occupied
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-md bg-amber-500"></span> Reserved
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-md bg-red-500"></span> Maintenance
            </span>
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-sky-100">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No rooms matching current filters</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your hall selection, floor, or clearing the search keyword.
            </p>
            <button
              onClick={() => {
                setSelectedHallId('all');
                setStatusFilter('all');
                setFloorFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-500"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRooms.map(room => {
              const hall = halls.find(h => h.id === room.hallId);
              const isRoomFull = room.beds.every(b => b.status === 'occupied');
              const hasVacant = room.beds.some(b => b.status === 'vacant');

              return (
                <div
                  key={room.id}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                    room.status === 'maintenance'
                      ? 'border-red-200 bg-red-50/10'
                      : hasVacant
                      ? 'border-sky-300 ring-1 ring-sky-100 hover:border-sky-500'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Room Card Header */}
                  <div className="p-3.5 bg-sky-50/50 border-b border-sky-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base">
                          {room.roomNumber}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                          Floor {room.floor === 0 ? 'G' : room.floor}
                        </span>
                        <span className="text-[10px] text-slate-500 capitalize">
                          {room.roomType.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate max-w-[170px] mt-0.5">
                        {hall?.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-sky-700">
                        K{room.pricePerTermZMW.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-slate-400">per term</p>
                    </div>
                  </div>

                  {/* Bed Slots */}
                  <div className="p-3.5 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Bed Allocation ({room.beds.filter(b => b.status === 'occupied').length}/{room.capacity} occupied):
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {room.beds.map((bed, bedIdx) => {
                        const isVacant = bed.status === 'vacant';
                        const isOccupied = bed.status === 'occupied';
                        const isReserved = bed.status === 'reserved';
                        const isMaint = bed.status === 'maintenance';

                        return (
                          <div
                            key={bed.id}
                            onClick={() => handleBedClick(room, bed)}
                            className={`p-2.5 rounded-lg border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                              isVacant
                                ? 'bg-sky-50 border-sky-300 hover:bg-sky-100/70 hover:border-sky-500'
                                : isOccupied
                                ? 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                                : isReserved
                                ? 'bg-amber-50/50 border-amber-200 hover:bg-amber-100'
                                : 'bg-red-50/40 border-red-200 hover:bg-red-100'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                                  isVacant
                                    ? 'bg-sky-600 text-white'
                                    : isOccupied
                                    ? 'bg-slate-800 text-white'
                                    : isReserved
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-red-600 text-white'
                                }`}
                              >
                                {bedIdx + 1}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{bed.bedNumber}</span>
                                </div>
                                <div className="text-[11px] truncate max-w-[130px]">
                                  {isOccupied ? (
                                    <span className="text-slate-800 font-medium">
                                      {bed.currentStudentName}
                                    </span>
                                  ) : isVacant ? (
                                    <span className="text-sky-700 font-bold flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                                      Vacant • Available
                                    </span>
                                  ) : isReserved ? (
                                    <span className="text-amber-700 font-medium">
                                      Reserved Space
                                    </span>
                                  ) : (
                                    <span className="text-red-700 font-medium">
                                      Under Repair
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button className="text-[11px] font-semibold text-sky-700 hover:underline px-1 py-0.5">
                              View →
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Room Amenities preview */}
                  <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 flex flex-wrap gap-1">
                    {room.amenities.slice(0, 2).map((amenity, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-white rounded border border-slate-200">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 2 && (
                      <span className="px-1 py-0.5 text-slate-400">+{room.amenities.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bed Details Drilldown Modal */}
      {selectedBedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-sky-100 animate-in fade-in zoom-in-95">
            {/* Modal Header in Light Blue / Sky */}
            <div className="bg-gradient-to-r from-sky-900 to-sky-800 p-5 text-white flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white text-sky-900">
                  {selectedBedModal.bed.status.toUpperCase()}
                </span>
                <h3 className="text-lg font-black mt-1">
                  Room {selectedBedModal.room.roomNumber} — {selectedBedModal.bed.bedNumber}
                </h3>
                <p className="text-xs text-sky-200">
                  {halls.find(h => h.id === selectedBedModal.room.hallId)?.name} (Floor {selectedBedModal.room.floor})
                </p>
              </div>

              <button
                onClick={() => setSelectedBedModal(null)}
                className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-sky-700/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success message banner */}
            {actionSuccessMessage && (
              <div className="bg-sky-50 border-b border-sky-200 text-sky-900 px-4 py-2 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{actionSuccessMessage}</span>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Resident details if occupied */}
              {selectedBedModal.bed.status === 'occupied' && selectedBedModal.student ? (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Current Occupant</span>
                      <h4 className="text-base font-extrabold text-slate-900">{selectedBedModal.student.fullName}</h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        selectedBedModal.student.checkInStatus === 'checked_in'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {selectedBedModal.student.checkInStatus === 'checked_in' ? '✓ Checked In' : 'Pending Check-In'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Student ID:</span>
                      <span className="font-semibold text-slate-800">{selectedBedModal.student.studentNumber}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Program:</span>
                      <span className="font-semibold text-slate-800">{selectedBedModal.student.program}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">National Reg (NRC):</span>
                      <span className="font-semibold text-slate-800">
                        {maskNRC(selectedBedModal.student.nrcNumber, currentRole === 'admin')}
                        {currentRole !== 'admin' && (
                          <span className="text-[9px] text-amber-700 ml-1 font-normal">(Encrypted)</span>
                        )}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Emergency Phone:</span>
                      <span className="font-semibold text-slate-800">
                        {maskPhone(selectedBedModal.student.emergencyContact.phone, currentRole === 'admin')}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Check-In Timestamp:</span>
                      <span className="text-slate-700 font-medium">
                        {selectedBedModal.student.checkInDate || 'Not yet logged'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Issued Room Key:</span>
                      <span className="text-slate-900 font-bold">
                        {selectedBedModal.student.keyNumber || 'None'}
                      </span>
                    </div>
                  </div>

                  {selectedBedModal.student.medicalNotes && (
                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs">
                      <span className="font-bold text-amber-900 block text-[11px]">Confidential Health / Bed Note:</span>
                      <p className="text-amber-800 mt-0.5">{selectedBedModal.student.medicalNotes}</p>
                    </div>
                  )}

                  {/* Actions for Occupied Bed: Check-In or Check-Out */}
                  {(currentRole === 'admin' || currentRole === 'staff') && (
                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-700">Hostel Movement Control:</div>

                      {selectedBedModal.student.checkInStatus !== 'checked_in' ? (
                        <div className="space-y-2 bg-sky-50/70 p-3 rounded-lg border border-sky-200">
                          <label className="text-xs font-semibold text-sky-950 block">
                            Verify Physical Student Arrival & Issue Room Key:
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Key Code (e.g. A101-KEY-1)"
                            value={checkInKey}
                            onChange={(e) => setCheckInKey(e.target.value)}
                            className="w-full text-xs p-2 rounded border border-sky-300 bg-white"
                          />
                          <input
                            type="text"
                            placeholder="Inspection notes (e.g. Mattress inspected, no damages)"
                            value={checkInNotes}
                            onChange={(e) => setCheckInNotes(e.target.value)}
                            className="w-full text-xs p-2 rounded border border-sky-300 bg-white"
                          />
                          <button
                            onClick={handlePerformCheckIn}
                            className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Confirm Student Check-In & Send Alert</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 bg-red-50/60 p-3 rounded-lg border border-red-200">
                          <label className="text-xs font-semibold text-red-950 block">
                            Student End of Term / Graduation Check-Out:
                          </label>
                          <input
                            type="text"
                            placeholder="Check-out remarks (e.g. Key returned, room cleared)"
                            value={checkOutNotes}
                            onChange={(e) => setCheckOutNotes(e.target.value)}
                            className="w-full text-xs p-2 rounded border border-red-300 bg-white"
                          />
                          <button
                            onClick={handlePerformCheckOut}
                            className="w-full py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <DoorOpen className="w-3.5 h-3.5" />
                            <span>Execute Formal Check-Out & Vacate Bed</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : selectedBedModal.bed.status === 'vacant' ? (
                /* Vacant Bed Space Details */
                <div className="bg-sky-50/60 rounded-xl p-5 border border-sky-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto">
                    <Bed className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-sky-950">This Bed Space Is Vacant</h4>
                    <p className="text-xs text-sky-800 mt-1">
                      Ready for room assignment or direct student online application.
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-sky-200">
                    <div className="flex justify-between py-0.5">
                      <span>Term Fee:</span>
                      <span className="font-bold text-slate-900">K{selectedBedModal.room.pricePerTermZMW.toLocaleString()} ZMW</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span>Room Configuration:</span>
                      <span className="font-bold text-slate-900">{selectedBedModal.room.capacity} Beds ({selectedBedModal.room.roomType})</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => {
                        setSelectedBedModal(null);
                        setActiveTab('apply_bed');
                      }}
                      className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
                    >
                      Book This Bed Space (Application Portal) →
                    </button>

                    {(currentRole === 'admin' || currentRole === 'staff') && (
                      <button
                        onClick={() => handleToggleMaintenance(selectedBedModal.bed.id, selectedBedModal.bed.status)}
                        className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs"
                      >
                        Mark Bed As Under Maintenance
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Maintenance or Reserved */
                <div className="bg-amber-50/70 rounded-xl p-5 border border-amber-200 text-center space-y-3">
                  <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto" />
                  <h4 className="text-base font-extrabold text-amber-950">
                    Bed Status: {selectedBedModal.bed.status.toUpperCase()}
                  </h4>
                  {selectedBedModal.bed.notes && (
                    <p className="text-xs text-amber-800 bg-white p-2.5 rounded border border-amber-200">
                      Note: "{selectedBedModal.bed.notes}"
                    </p>
                  )}

                  {(currentRole === 'admin' || currentRole === 'staff') && (
                    <button
                      onClick={() => handleToggleMaintenance(selectedBedModal.bed.id, selectedBedModal.bed.status)}
                      className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs"
                    >
                      Resolve & Restore Bed Space to Vacant
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedBedModal(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

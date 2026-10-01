import { HostelHall, Room, Student, BedApplication, CheckInOutAlert, PaymentTransaction } from '../types';

export const INITIAL_HOSTEL_HALLS: HostelHall[] = [
  {
    id: 'hall-1',
    name: 'Nkana Main Residence (Female Wing)',
    code: 'NMR-F',
    genderAllowed: 'female',
    floorsCount: 3,
    totalRooms: 12,
    totalBeds: 36,
    description: 'Premier female residential hall located directly behind the administration complex with wide veranda balconies and scenic courtyard views.',
    wardenName: 'Matron Charity Chilufya',
    wardenPhone: '+260 977 441 298',
    image: '/src/assets/images/nkana_hostel_grounds_1790779008294.jpg',
    amenities: ['Solar Hot Water', 'High-Speed Campus Wi-Fi', '24/7 Security Matron', 'Laundry Facilities', 'Common Study Lounge']
  },
  {
    id: 'hall-2',
    name: 'Florence Nightingale Hall (Clinical & Nursing)',
    code: 'FNH-C',
    genderAllowed: 'female',
    floorsCount: 3,
    totalRooms: 10,
    totalBeds: 28,
    description: 'Dedicated residency for registered nursing and midwifery students, strategically positioned adjacent to clinical laboratories and study halls.',
    wardenName: 'Sister Brenda Mutale (RN)',
    wardenPhone: '+260 966 820 114',
    image: '/src/assets/images/nkana_clinical_students_1790778996968.jpg',
    amenities: ['Quiet Study Rooms', 'Backup Generator', 'Clinical Kit Storage', 'Filtered Water Dispenser', 'Emergency Transport Standby']
  },
  {
    id: 'hall-3',
    name: 'Dag Hammarskjöld Hall (Male Residency)',
    code: 'DHH-M',
    genderAllowed: 'male',
    floorsCount: 3,
    totalRooms: 12,
    totalBeds: 34,
    description: 'Modern men’s residential block featuring spacious ventilated rooms, outdoor sports pavilion access, and proximity to lecture theaters.',
    wardenName: 'Mr. Peter Mwewa',
    wardenPhone: '+260 978 305 672',
    image: '/src/assets/images/nkana_dormitory_hostel_1790746770090.jpg',
    amenities: ['Fiber Internet', 'Table Tennis & Recreation', 'DSTV Common Room', 'Borehole Water Backup', 'Card-Access Entry']
  },
  {
    id: 'hall-4',
    name: 'Victoria Chitepo Executive Wing (Single & Double)',
    code: 'VCW-E',
    genderAllowed: 'mixed',
    floorsCount: 2,
    totalRooms: 6,
    totalBeds: 10,
    description: 'Executive accommodation for final-year primary teaching diplomates and clinical officers seeking quiet, self-contained living spaces.',
    wardenName: 'Dean Joseph Kabwe',
    wardenPhone: '+260 955 119 403',
    image: '/src/assets/images/nkana_campus_main_1790746724657.jpg',
    amenities: ['Self-Contained En-Suite', 'Study Desks & Bookshelves', 'Daily Housekeeping', 'Priority Maintenance', 'Air Circulation System']
  }
];

export const INITIAL_ROOMS: Room[] = [
  // Hall 1 (Female) - Floor 0
  {
    id: 'room-101',
    hallId: 'hall-1',
    roomNumber: 'A-101',
    floor: 0,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2400,
    status: 'available',
    amenities: ['Ceiling Fan', 'Double Wardrobe', 'Balcony Access'],
    beds: [
      { id: 'bed-101-a', roomId: 'room-101', hallId: 'hall-1', bedNumber: 'Bed 1 (Window)', status: 'occupied', currentStudentId: 'std-1', currentStudentName: 'Vanessa Mwape' },
      { id: 'bed-101-b', roomId: 'room-101', hallId: 'hall-1', bedNumber: 'Bed 2 (Door)', status: 'vacant' }
    ]
  },
  {
    id: 'room-102',
    hallId: 'hall-1',
    roomNumber: 'A-102',
    floor: 0,
    roomType: 'four_bed',
    capacity: 4,
    pricePerTermZMW: 1800,
    status: 'available',
    amenities: ['Bunk Beds', 'Study Desks', 'Large Locker'],
    beds: [
      { id: 'bed-102-a', roomId: 'room-102', hallId: 'hall-1', bedNumber: 'Bed 1 (Lower)', status: 'occupied', currentStudentId: 'std-2', currentStudentName: 'Chileshe Musonda' },
      { id: 'bed-102-b', roomId: 'room-102', hallId: 'hall-1', bedNumber: 'Bed 2 (Upper)', status: 'vacant' },
      { id: 'bed-102-c', roomId: 'room-102', hallId: 'hall-1', bedNumber: 'Bed 3 (Lower)', status: 'occupied', currentStudentId: 'std-3', currentStudentName: 'Grace Tembo' },
      { id: 'bed-102-d', roomId: 'room-102', hallId: 'hall-1', bedNumber: 'Bed 4 (Upper)', status: 'reserved', notes: 'Reserved for incoming diploma transfer' }
    ]
  },
  {
    id: 'room-103',
    hallId: 'hall-1',
    roomNumber: 'A-103',
    floor: 0,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2400,
    status: 'full',
    amenities: ['Corner View', 'Twin Closets'],
    beds: [
      { id: 'bed-103-a', roomId: 'room-103', hallId: 'hall-1', bedNumber: 'Bed 1', status: 'occupied', currentStudentId: 'std-4', currentStudentName: 'Agness Phiri' },
      { id: 'bed-103-b', roomId: 'room-103', hallId: 'hall-1', bedNumber: 'Bed 2', status: 'occupied', currentStudentId: 'std-5', currentStudentName: 'Natasha Banda' }
    ]
  },
  {
    id: 'room-104',
    hallId: 'hall-1',
    roomNumber: 'A-104',
    floor: 0,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2400,
    status: 'maintenance',
    amenities: ['Under Renovation'],
    beds: [
      { id: 'bed-104-a', roomId: 'room-104', hallId: 'hall-1', bedNumber: 'Bed 1', status: 'maintenance', notes: 'Window frame repair & painting' },
      { id: 'bed-104-b', roomId: 'room-104', hallId: 'hall-1', bedNumber: 'Bed 2', status: 'maintenance', notes: 'Electrical socket inspection' }
    ]
  },
  // Hall 1 - Floor 1
  {
    id: 'room-201',
    hallId: 'hall-1',
    roomNumber: 'A-201',
    floor: 1,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2500,
    status: 'available',
    amenities: ['1st Floor Veranda', 'Quiet Wing'],
    beds: [
      { id: 'bed-201-a', roomId: 'room-201', hallId: 'hall-1', bedNumber: 'Bed 1', status: 'vacant' },
      { id: 'bed-201-b', roomId: 'room-201', hallId: 'hall-1', bedNumber: 'Bed 2', status: 'vacant' }
    ]
  },
  {
    id: 'room-202',
    hallId: 'hall-1',
    roomNumber: 'A-202',
    floor: 1,
    roomType: 'four_bed',
    capacity: 4,
    pricePerTermZMW: 1850,
    status: 'available',
    amenities: ['Bunk Beds', 'Individual Reading Lamps'],
    beds: [
      { id: 'bed-202-a', roomId: 'room-202', hallId: 'hall-1', bedNumber: 'Bed 1 (Lower)', status: 'occupied', currentStudentId: 'std-6', currentStudentName: 'Miriam Lungu' },
      { id: 'bed-202-b', roomId: 'room-202', hallId: 'hall-1', bedNumber: 'Bed 2 (Upper)', status: 'vacant' },
      { id: 'bed-202-c', roomId: 'room-202', hallId: 'hall-1', bedNumber: 'Bed 3 (Lower)', status: 'vacant' },
      { id: 'bed-202-d', roomId: 'room-202', hallId: 'hall-1', bedNumber: 'Bed 4 (Upper)', status: 'vacant' }
    ]
  },

  // Hall 2 (Nursing & Healthcare - Female)
  {
    id: 'room-f101',
    hallId: 'hall-2',
    roomNumber: 'FN-101',
    floor: 0,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2600,
    status: 'available',
    amenities: ['Near Clinical Ward', 'Direct Garden Access'],
    beds: [
      { id: 'bed-f101-a', roomId: 'room-f101', hallId: 'hall-2', bedNumber: 'Bed 1', status: 'occupied', currentStudentId: 'std-7', currentStudentName: 'Ruth Mwansa' },
      { id: 'bed-f101-b', roomId: 'room-f101', hallId: 'hall-2', bedNumber: 'Bed 2', status: 'vacant' }
    ]
  },
  {
    id: 'room-f102',
    hallId: 'hall-2',
    roomNumber: 'FN-102',
    floor: 0,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2600,
    status: 'full',
    amenities: ['Study Desk Set', 'Lockable Cabinets'],
    beds: [
      { id: 'bed-f102-a', roomId: 'room-f102', hallId: 'hall-2', bedNumber: 'Bed 1', status: 'occupied', currentStudentId: 'std-8', currentStudentName: 'Prudence Mulenga' },
      { id: 'bed-f102-b', roomId: 'room-f102', hallId: 'hall-2', bedNumber: 'Bed 2', status: 'occupied', currentStudentId: 'std-9', currentStudentName: 'Naomi Chipoya' }
    ]
  },
  {
    id: 'room-f201',
    hallId: 'hall-2',
    roomNumber: 'FN-201',
    floor: 1,
    roomType: 'four_bed',
    capacity: 4,
    pricePerTermZMW: 1900,
    status: 'available',
    amenities: ['Airy Balcony', 'Spacious Lockers'],
    beds: [
      { id: 'bed-f201-a', roomId: 'room-f201', hallId: 'hall-2', bedNumber: 'Bed 1', status: 'vacant' },
      { id: 'bed-f201-b', roomId: 'room-f201', hallId: 'hall-2', bedNumber: 'Bed 2', status: 'vacant' },
      { id: 'bed-f201-c', roomId: 'room-f201', hallId: 'hall-2', bedNumber: 'Bed 3', status: 'occupied', currentStudentId: 'std-10', currentStudentName: 'Dorothy Silwamba' },
      { id: 'bed-f201-d', roomId: 'room-f201', hallId: 'hall-2', bedNumber: 'Bed 4', status: 'vacant' }
    ]
  },

  // Hall 3 (Male Hall)
  {
    id: 'room-m101',
    hallId: 'hall-3',
    roomNumber: 'DH-101',
    floor: 0,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2300,
    status: 'available',
    amenities: ['Courtyard View', 'Bookshelf Rack'],
    beds: [
      { id: 'bed-m101-a', roomId: 'room-m101', hallId: 'hall-3', bedNumber: 'Bed 1', status: 'occupied', currentStudentId: 'std-11', currentStudentName: 'Emmanuel Bwalya' },
      { id: 'bed-m101-b', roomId: 'room-m101', hallId: 'hall-3', bedNumber: 'Bed 2', status: 'vacant' }
    ]
  },
  {
    id: 'room-m102',
    hallId: 'hall-3',
    roomNumber: 'DH-102',
    floor: 0,
    roomType: 'four_bed',
    capacity: 4,
    pricePerTermZMW: 1750,
    status: 'available',
    amenities: ['Bunk Beds', 'Reading Desk'],
    beds: [
      { id: 'bed-m102-a', roomId: 'room-m102', hallId: 'hall-3', bedNumber: 'Bed 1', status: 'occupied', currentStudentId: 'std-12', currentStudentName: 'Kelvin Chanda' },
      { id: 'bed-m102-b', roomId: 'room-m102', hallId: 'hall-3', bedNumber: 'Bed 2', status: 'vacant' },
      { id: 'bed-m102-c', roomId: 'room-m102', hallId: 'hall-3', bedNumber: 'Bed 3', status: 'occupied', currentStudentId: 'std-13', currentStudentName: 'Brian Mutale' },
      { id: 'bed-m102-d', roomId: 'room-m102', hallId: 'hall-3', bedNumber: 'Bed 4', status: 'vacant' }
    ]
  },
  {
    id: 'room-m201',
    hallId: 'hall-3',
    roomNumber: 'DH-201',
    floor: 1,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 2400,
    status: 'vacant' as any,
    amenities: ['Sunny Balcony', 'High Ceiling'],
    beds: [
      { id: 'bed-m201-a', roomId: 'room-m201', hallId: 'hall-3', bedNumber: 'Bed 1', status: 'vacant' },
      { id: 'bed-m201-b', roomId: 'room-m201', hallId: 'hall-3', bedNumber: 'Bed 2', status: 'vacant' }
    ]
  },

  // Hall 4 (Executive Wing)
  {
    id: 'room-e101',
    hallId: 'hall-4',
    roomNumber: 'EX-101',
    floor: 0,
    roomType: 'single',
    capacity: 1,
    pricePerTermZMW: 3800,
    status: 'full',
    amenities: ['Private Bath', 'Executive Desk', 'Fridge', 'Patio'],
    beds: [
      { id: 'bed-e101-a', roomId: 'room-e101', hallId: 'hall-4', bedNumber: 'Single King-Bed', status: 'occupied', currentStudentId: 'std-14', currentStudentName: 'Dr. Joseph Kangwa' }
    ]
  },
  {
    id: 'room-e102',
    hallId: 'hall-4',
    roomNumber: 'EX-102',
    floor: 0,
    roomType: 'single',
    capacity: 1,
    pricePerTermZMW: 3800,
    status: 'available',
    amenities: ['Private Bath', 'Executive Desk', 'Mini Kitchenette'],
    beds: [
      { id: 'bed-e102-a', roomId: 'room-e102', hallId: 'hall-4', bedNumber: 'Single King-Bed', status: 'vacant' }
    ]
  },
  {
    id: 'room-e201',
    hallId: 'hall-4',
    roomNumber: 'EX-201',
    floor: 1,
    roomType: 'double',
    capacity: 2,
    pricePerTermZMW: 3200,
    status: 'available',
    amenities: ['Attached Washroom', 'Twin Desks', 'Balcony'],
    beds: [
      { id: 'bed-e201-a', roomId: 'room-e201', hallId: 'hall-4', bedNumber: 'Bed 1', status: 'vacant' },
      { id: 'bed-e201-b', roomId: 'room-e201', hallId: 'hall-4', bedNumber: 'Bed 2', status: 'vacant' }
    ]
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    studentNumber: 'NK/RN/2026/0142',
    fullName: 'Vanessa Mwape',
    nrcNumber: '392817/11/1',
    gender: 'female',
    email: 'vanessa.mwape@student.nkanacollege.edu.zm',
    phone: '+260 977 123 456',
    program: 'Registered Nursing Diploma',
    yearOfStudy: 'Year 2',
    emergencyContact: {
      name: 'Mrs. Mary Mwape',
      relationship: 'Mother',
      phone: '+260 978 998 877'
    },
    medicalNotes: 'Mild asthma, carries inhaler. Requires dust-free lower bunk.',
    hallId: 'hall-1',
    roomId: 'room-101',
    bedSpaceId: 'bed-101-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-15 08:30',
    keyNumber: 'A101-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-10-03', // 3 days left - Critical Nearing Expiry!
    bedFeeZMW: 2400,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-06-30',
    paymentExpiryStatus: 'critical'
  },
  {
    id: 'std-2',
    studentNumber: 'NK/EDU/2026/0309',
    fullName: 'Chileshe Musonda',
    nrcNumber: '410982/67/1',
    gender: 'female',
    email: 'chileshe.m@student.nkanacollege.edu.zm',
    phone: '+260 966 234 567',
    program: 'Primary Teachers Diploma',
    yearOfStudy: 'Year 1',
    emergencyContact: {
      name: 'Elder Moses Musonda',
      relationship: 'Father',
      phone: '+260 966 554 433'
    },
    hallId: 'hall-1',
    roomId: 'room-102',
    bedSpaceId: 'bed-102-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-16 10:15',
    keyNumber: 'A102-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-10-05', // 5 days left - Nearing Expiry Warning!
    bedFeeZMW: 1800,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-07-05',
    paymentExpiryStatus: 'nearing_expiry'
  },
  {
    id: 'std-3',
    studentNumber: 'NK/MID/2026/0211',
    fullName: 'Grace Tembo',
    nrcNumber: '298711/10/1',
    gender: 'female',
    email: 'grace.tembo@student.nkanacollege.edu.zm',
    phone: '+260 955 345 678',
    program: 'Certified Midwifery Diploma',
    yearOfStudy: 'Year 3',
    emergencyContact: {
      name: 'Dr. Kennedy Tembo',
      relationship: 'Uncle',
      phone: '+260 977 443 322'
    },
    hallId: 'hall-1',
    roomId: 'room-102',
    bedSpaceId: 'bed-102-c',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-14 14:00',
    keyNumber: 'A102-KEY-3',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-11-20',
    bedFeeZMW: 1800,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-08-20',
    paymentExpiryStatus: 'valid'
  },
  {
    id: 'std-4',
    studentNumber: 'NK/RN/2026/0188',
    fullName: 'Agness Phiri',
    nrcNumber: '321456/11/1',
    gender: 'female',
    email: 'agness.phiri@student.nkanacollege.edu.zm',
    phone: '+260 971 456 789',
    program: 'Registered Nursing Diploma',
    yearOfStudy: 'Year 2',
    emergencyContact: {
      name: 'Agatha Phiri',
      relationship: 'Sister',
      phone: '+260 971 998 877'
    },
    hallId: 'hall-1',
    roomId: 'room-103',
    bedSpaceId: 'bed-103-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-15 09:20',
    keyNumber: 'A103-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-10-01', // 1 day left!
    bedFeeZMW: 2400,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-07-01',
    paymentExpiryStatus: 'critical'
  },
  {
    id: 'std-5',
    studentNumber: 'NK/LAB/2026/0074',
    fullName: 'Natasha Banda',
    nrcNumber: '509823/12/1',
    gender: 'female',
    email: 'natasha.banda@student.nkanacollege.edu.zm',
    phone: '+260 967 567 890',
    program: 'Biomedical Laboratory Sciences',
    yearOfStudy: 'Year 1',
    emergencyContact: {
      name: 'Godfrey Banda',
      relationship: 'Guardian',
      phone: '+260 967 112 233'
    },
    hallId: 'hall-1',
    roomId: 'room-103',
    bedSpaceId: 'bed-103-b',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-15 11:45',
    keyNumber: 'A103-KEY-2',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-12-15',
    bedFeeZMW: 2400,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-09-15',
    paymentExpiryStatus: 'valid'
  },
  {
    id: 'std-6',
    studentNumber: 'NK/EDU/2026/0412',
    fullName: 'Miriam Lungu',
    nrcNumber: '289104/11/1',
    gender: 'female',
    email: 'miriam.lungu@student.nkanacollege.edu.zm',
    phone: '+260 979 678 901',
    program: 'Primary Teachers Diploma',
    yearOfStudy: 'Year 2',
    emergencyContact: {
      name: 'Evelyn Lungu',
      relationship: 'Mother',
      phone: '+260 979 445 566'
    },
    hallId: 'hall-1',
    roomId: 'room-202',
    bedSpaceId: 'bed-202-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-16 16:30',
    keyNumber: 'A202-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-10-04', // 4 days left - Nearing Expiry!
    bedFeeZMW: 1850,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-07-04',
    paymentExpiryStatus: 'nearing_expiry'
  },
  {
    id: 'std-7',
    studentNumber: 'NK/RN/2026/0091',
    fullName: 'Ruth Mwansa',
    nrcNumber: '445678/11/1',
    gender: 'female',
    email: 'ruth.mwansa@student.nkanacollege.edu.zm',
    phone: '+260 973 789 012',
    program: 'Registered Nursing Diploma',
    yearOfStudy: 'Year 3',
    emergencyContact: {
      name: 'Pastor Peter Mwansa',
      relationship: 'Father',
      phone: '+260 973 887 766'
    },
    hallId: 'hall-2',
    roomId: 'room-f101',
    bedSpaceId: 'bed-f101-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-14 08:00',
    keyNumber: 'FN101-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-11-15',
    bedFeeZMW: 2600,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-08-15',
    paymentExpiryStatus: 'valid'
  },
  {
    id: 'std-8',
    studentNumber: 'NK/MID/2026/0155',
    fullName: 'Prudence Mulenga',
    nrcNumber: '378901/11/1',
    gender: 'female',
    email: 'prudence.mulenga@student.nkanacollege.edu.zm',
    phone: '+260 962 890 123',
    program: 'Certified Midwifery Diploma',
    yearOfStudy: 'Year 2',
    emergencyContact: {
      name: 'Joyce Mulenga',
      relationship: 'Mother',
      phone: '+260 962 334 455'
    },
    hallId: 'hall-2',
    roomId: 'room-f102',
    bedSpaceId: 'bed-f102-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-15 13:10',
    keyNumber: 'FN102-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-11-28',
    bedFeeZMW: 2600,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-08-28',
    paymentExpiryStatus: 'valid'
  },
  {
    id: 'std-9',
    studentNumber: 'NK/RN/2026/0173',
    fullName: 'Naomi Chipoya',
    nrcNumber: '409123/11/1',
    gender: 'female',
    email: 'naomi.chipoya@student.nkanacollege.edu.zm',
    phone: '+260 950 901 234',
    program: 'Registered Nursing Diploma',
    yearOfStudy: 'Year 1',
    emergencyContact: {
      name: 'Lillian Chipoya',
      relationship: 'Sister',
      phone: '+260 950 223 344'
    },
    hallId: 'hall-2',
    roomId: 'room-f102',
    bedSpaceId: 'bed-f102-b',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-15 15:40',
    keyNumber: 'FN102-KEY-2',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-12-01',
    bedFeeZMW: 2600,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-09-01',
    paymentExpiryStatus: 'valid'
  },
  {
    id: 'std-10',
    studentNumber: 'NK/MID/2026/0204',
    fullName: 'Dorothy Silwamba',
    nrcNumber: '312890/11/1',
    gender: 'female',
    email: 'dorothy.s@student.nkanacollege.edu.zm',
    phone: '+260 976 012 345',
    program: 'Certified Midwifery Diploma',
    yearOfStudy: 'Year 3',
    emergencyContact: {
      name: 'Mr. B. Silwamba',
      relationship: 'Father',
      phone: '+260 976 990 011'
    },
    hallId: 'hall-2',
    roomId: 'room-f201',
    bedSpaceId: 'bed-f201-c',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-14 11:00',
    keyNumber: 'FN201-KEY-3',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-10-06', // 6 days left - Nearing Expiry!
    bedFeeZMW: 1900,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-07-06',
    paymentExpiryStatus: 'nearing_expiry'
  },
  {
    id: 'std-11',
    studentNumber: 'NK/CLIN/2026/0088',
    fullName: 'Emmanuel Bwalya',
    nrcNumber: '290145/11/1',
    gender: 'male',
    email: 'emmanuel.bwalya@student.nkanacollege.edu.zm',
    phone: '+260 977 345 671',
    program: 'Clinical Medicine Diploma',
    yearOfStudy: 'Year 2',
    emergencyContact: {
      name: 'Mr. Charles Bwalya',
      relationship: 'Brother',
      phone: '+260 977 889 900'
    },
    hallId: 'hall-3',
    roomId: 'room-m101',
    bedSpaceId: 'bed-m101-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-15 08:45',
    keyNumber: 'DH101-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-09-30', // Expires TODAY!
    bedFeeZMW: 2300,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-06-30',
    paymentExpiryStatus: 'critical'
  },
  {
    id: 'std-12',
    studentNumber: 'NK/EDU/2026/0290',
    fullName: 'Kelvin Chanda',
    nrcNumber: '423189/11/1',
    gender: 'male',
    email: 'kelvin.chanda@student.nkanacollege.edu.zm',
    phone: '+260 968 456 782',
    program: 'Primary Teachers Diploma',
    yearOfStudy: 'Year 1',
    emergencyContact: {
      name: 'Grace Chanda',
      relationship: 'Mother',
      phone: '+260 968 112 244'
    },
    hallId: 'hall-3',
    roomId: 'room-m102',
    bedSpaceId: 'bed-m102-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-16 11:20',
    keyNumber: 'DH102-KEY-1',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-09-28', // Expired 2 days ago!
    bedFeeZMW: 1750,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-06-28',
    paymentExpiryStatus: 'expired'
  },
  {
    id: 'std-13',
    studentNumber: 'NK/CLIN/2026/0115',
    fullName: 'Brian Mutale',
    nrcNumber: '389012/11/1',
    gender: 'male',
    email: 'brian.mutale@student.nkanacollege.edu.zm',
    phone: '+260 954 567 893',
    program: 'Clinical Medicine Diploma',
    yearOfStudy: 'Year 3',
    emergencyContact: {
      name: 'James Mutale',
      relationship: 'Father',
      phone: '+260 954 776 655'
    },
    hallId: 'hall-3',
    roomId: 'room-m102',
    bedSpaceId: 'bed-m102-c',
    checkInStatus: 'pending_checkin',
    keyNumber: undefined,
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-11-10',
    bedFeeZMW: 1750,
    bedTerm: 'Term 1 Residential Fee',
    lastPaymentDate: '2026-08-10',
    paymentExpiryStatus: 'valid'
  },
  {
    id: 'std-14',
    studentNumber: 'NK/POST/2026/0019',
    fullName: 'Dr. Joseph Kangwa',
    nrcNumber: '198702/11/1',
    gender: 'male',
    email: 'joseph.kangwa@nkanacollege.edu.zm',
    phone: '+260 971 678 904',
    program: 'Higher Diploma in Health Education',
    yearOfStudy: 'Year 4',
    emergencyContact: {
      name: 'Miriam Kangwa',
      relationship: 'Spouse',
      phone: '+260 971 334 455'
    },
    hallId: 'hall-4',
    roomId: 'room-e101',
    bedSpaceId: 'bed-e101-a',
    checkInStatus: 'checked_in',
    checkInDate: '2026-09-12 09:00',
    keyNumber: 'EX101-VIP',
    balanceDue: 0,
    bedPaymentExpiryDate: '2026-12-31',
    bedFeeZMW: 3800,
    bedTerm: 'Term 1 Executive Suite Fee',
    lastPaymentDate: '2026-09-12',
    paymentExpiryStatus: 'valid'
  }
];

export const INITIAL_APPLICATIONS: BedApplication[] = [
  {
    id: 'app-1',
    applicationNumber: 'APP-NK-2026-0041',
    studentId: 'std-new-1',
    studentName: 'Mercy Katongo',
    studentNumber: 'NK/RN/2026/0512',
    nrcNumber: '489021/11/1',
    gender: 'female',
    email: 'mercy.katongo@gmail.com',
    phone: '+260 974 551 230',
    program: 'Registered Nursing Diploma',
    yearOfStudy: 'Year 1',
    preferredHallId: 'hall-1',
    preferredRoomType: 'double',
    selectedBedSpaceId: 'bed-101-b',
    specialRequests: 'Prefers quiet study environment, allergic to strong chemicals',
    status: 'pending',
    paymentStatus: 'paid',
    paymentReference: 'MOMO-NK-892104',
    amountPaidZMW: 2400,
    paymentMethod: 'mtn_momo',
    submittedAt: '2026-09-28 14:22'
  },
  {
    id: 'app-2',
    applicationNumber: 'APP-NK-2026-0042',
    studentId: 'std-new-2',
    studentName: 'Felix Mwila',
    studentNumber: 'NK/CLIN/2026/0401',
    nrcNumber: '378129/11/1',
    gender: 'male',
    email: 'felix.mwila@gmail.com',
    phone: '+260 965 442 819',
    program: 'Clinical Medicine Diploma',
    yearOfStudy: 'Year 1',
    preferredHallId: 'hall-3',
    preferredRoomType: 'double',
    selectedBedSpaceId: 'bed-m101-b',
    specialRequests: 'Requesting room close to campus gate for hospital shifts',
    status: 'pending',
    paymentStatus: 'paid',
    paymentReference: 'AIRTEL-NK-332918',
    amountPaidZMW: 2300,
    paymentMethod: 'airtel_money',
    submittedAt: '2026-09-29 09:15'
  },
  {
    id: 'app-3',
    applicationNumber: 'APP-NK-2026-0043',
    studentId: 'std-new-3',
    studentName: 'Tendai Zulu',
    studentNumber: 'NK/EDU/2026/0619',
    nrcNumber: '512093/11/1',
    gender: 'female',
    email: 'tendai.zulu@gmail.com',
    phone: '+260 955 889 102',
    program: 'Primary Teachers Diploma',
    yearOfStudy: 'Year 2',
    preferredHallId: 'hall-1',
    preferredRoomType: 'four_bed',
    selectedBedSpaceId: 'bed-102-b',
    specialRequests: 'Prefers upper bunk bed',
    status: 'allocated',
    paymentStatus: 'paid',
    paymentReference: 'CARD-NK-992140',
    amountPaidZMW: 1800,
    paymentMethod: 'visa_mastercard',
    submittedAt: '2026-09-27 16:40',
    allocatedHallName: 'Nkana Main Residence (Female Wing)',
    allocatedRoomNumber: 'A-102',
    allocatedBedNumber: 'Bed 2 (Upper)',
    reviewNotes: 'Allocated upon successful payment verification.'
  }
];

export const INITIAL_ALERTS: CheckInOutAlert[] = [
  {
    id: 'alert-exp-1',
    timestamp: '2026-09-30 07:15',
    type: 'payment_expiry',
    studentName: 'Vanessa Mwape',
    studentNumber: 'NK/RN/2026/0142',
    hallName: 'Nkana Main Residence (Female Wing)',
    roomNumber: 'A-101',
    bedNumber: 'Bed 1 (Window)',
    staffName: 'Automated Bed Expiry Monitoring System',
    notes: 'Urgent: Bed payment of K2,400 expires in 3 days (03 Oct 2026). Renewal reminder triggered.',
    read: true,
    expiryDate: '2026-10-03',
    daysRemaining: 3,
    amountDueZMW: 2400
  },
  {
    id: 'alert-exp-2',
    timestamp: '2026-09-30 06:45',
    type: 'payment_expiry',
    studentName: 'Emmanuel Bwalya',
    studentNumber: 'NK/CLIN/2026/0088',
    hallName: 'Dag Hammarskjöld Hall (Male Residency)',
    roomNumber: 'DH-101',
    bedNumber: 'Bed 1',
    staffName: 'Automated Bed Expiry Monitoring System',
    notes: 'Critical Final Notice: Bed payment expires TODAY (30 Sep 2026). Immediate renewal required.',
    read: true,
    expiryDate: '2026-09-30',
    daysRemaining: 0,
    amountDueZMW: 2300
  },
  {
    id: 'alert-1',
    timestamp: '2026-09-29 16:45',
    type: 'check_in',
    studentName: 'Miriam Lungu',
    studentNumber: 'NK/EDU/2026/0412',
    hallName: 'Nkana Main Residence (Female Wing)',
    roomNumber: 'A-202',
    bedNumber: 'Bed 1',
    staffName: 'Matron Charity Chilufya',
    notes: 'Checked in, student ID verified, room key A202-1 issued, mattress condition good.',
    read: true
  },
  {
    id: 'alert-2',
    timestamp: '2026-09-29 14:10',
    type: 'payment',
    studentName: 'Felix Mwila',
    studentNumber: 'NK/CLIN/2026/0401',
    hallName: 'Dag Hammarskjöld Hall (Male Residency)',
    roomNumber: 'DH-101',
    bedNumber: 'Bed 2',
    staffName: 'Automated Airtel MoMo Gateway',
    notes: 'Payment of K2,300 received via Airtel Money. Reference AIRTEL-NK-332918.',
    read: true
  },
  {
    id: 'alert-3',
    timestamp: '2026-09-29 11:30',
    type: 'check_out',
    studentName: 'Chanda Bwalya (Alumni)',
    studentNumber: 'NK/RN/2025/0022',
    hallName: 'Florence Nightingale Hall',
    roomNumber: 'FN-104',
    bedNumber: 'Bed 2',
    staffName: 'Sister Brenda Mutale',
    notes: 'Official check-out completed upon program graduation. Key returned, room inspected with zero damages.',
    read: true
  },
  {
    id: 'alert-4',
    timestamp: '2026-09-29 09:00',
    type: 'maintenance',
    studentName: 'N/A',
    studentNumber: 'N/A',
    hallName: 'Nkana Main Residence (Female Wing)',
    roomNumber: 'A-104',
    bedNumber: 'All Beds',
    staffName: 'Campus Works Dept',
    notes: 'Room A-104 taken offline for window frame rehabilitation and repaint.',
    read: true
  }
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'pay-1',
    reference: 'MOMO-NK-892104',
    applicationId: 'app-1',
    studentName: 'Mercy Katongo',
    studentNumber: 'NK/RN/2026/0512',
    amountZMW: 2400,
    method: 'mtn_momo',
    accountOrPhoneMask: '+260 97* ***230',
    status: 'success',
    timestamp: '2026-09-28 14:25',
    receiptNumber: 'REC-2026-0981',
    description: 'Term 1 Bed Space Fee - Nkana Hall A (Double Room)'
  },
  {
    id: 'pay-2',
    reference: 'AIRTEL-NK-332918',
    applicationId: 'app-2',
    studentName: 'Felix Mwila',
    studentNumber: 'NK/CLIN/2026/0401',
    amountZMW: 2300,
    method: 'airtel_money',
    accountOrPhoneMask: '+260 96* ***819',
    status: 'success',
    timestamp: '2026-09-29 09:18',
    receiptNumber: 'REC-2026-0982',
    description: 'Term 1 Bed Space Fee - Dag Hammarskjöld Hall'
  },
  {
    id: 'pay-3',
    reference: 'CARD-NK-992140',
    applicationId: 'app-3',
    studentName: 'Tendai Zulu',
    studentNumber: 'NK/EDU/2026/0619',
    amountZMW: 1800,
    method: 'visa_mastercard',
    accountOrPhoneMask: '**** **** **** 4819',
    status: 'success',
    timestamp: '2026-09-27 16:42',
    receiptNumber: 'REC-2026-0979',
    description: 'Term 1 Bed Space Fee - Nkana Hall A (4-Bed Room)'
  }
];

export const INITIAL_ADMISSION_APPLICATIONS: import('../types').AdmissionApplication[] = [
  {
    id: 'adm-1',
    applicationNumber: 'NK-ADM-2026-0891',
    fullName: 'Limbikani Banda',
    nrcNumber: '491028/11/1',
    dateOfBirth: '2005-04-18',
    gender: 'male',
    phone: '+260 976 441 902',
    email: 'limbikani.banda@gmail.com',
    residentialAddress: 'Plot 482, Riverside, Copperbelt, Zambia',
    nextOfKinName: 'Pastor Patrick Banda',
    nextOfKinPhone: '+260 977 882 110',
    nextOfKinRelation: 'Father',
    programChoice: 'Registered Nursing Diploma',
    intakeSession: 'January 2027 Full-Time',
    previousSchool: 'Nkana Secondary School',
    completionYear: '2024',
    results: [
      { subject: 'English Language', grade: 'Two (2)' },
      { subject: 'Mathematics', grade: 'Three (3)' },
      { subject: 'Biology', grade: 'One (1)' },
      { subject: 'Science (Physics/Chem)', grade: 'Two (2)' },
      { subject: 'Civic Education', grade: 'Two (2)' },
      { subject: 'Geography', grade: 'Three (3)' }
    ],
    documents: [
      { id: 'doc-1', type: 'nrc', label: 'National Registration Card (NRC)', fileName: 'nrc_front_back_banda.pdf', fileSize: '1.4 MB', uploadedAt: '2026-09-28 10:14' },
      { id: 'doc-2', type: 'ecz_results', label: 'ECZ Grade 12 Statement of Results', fileName: 'ecz_grade12_statement_2024.pdf', fileSize: '2.1 MB', uploadedAt: '2026-09-28 10:16' },
      { id: 'doc-3', type: 'passport_photo', label: 'Passport Photo', fileName: 'limbikani_portrait.jpg', fileSize: '850 KB', uploadedAt: '2026-09-28 10:18' },
      { id: 'doc-4', type: 'medical_report', label: 'Medical Fitness Examination Report', fileName: 'certified_hospital_medical_fit.pdf', fileSize: '1.8 MB', uploadedAt: '2026-09-28 10:20' }
    ],
    applicationFeeZMW: 150,
    paymentStatus: 'paid',
    paymentMethod: 'mtn_momo',
    paymentReference: 'MOMO-ADM-918234',
    status: 'admitted',
    submittedAt: '2026-09-28 10:22',
    reviewerRemarks: 'Meets Nursing & Midwifery Council of Zambia (NMCZ) direct entry requirements with distinctions in Biology & Sciences. Admission offer letter generated.',
    offerLetterAvailable: true
  },
  {
    id: 'adm-2',
    applicationNumber: 'NK-ADM-2026-0914',
    fullName: 'Mapalo Chishimba',
    nrcNumber: '382910/11/1',
    dateOfBirth: '2006-02-11',
    gender: 'female',
    phone: '+260 965 229 841',
    email: 'mapalo.chishimba@outlook.com',
    residentialAddress: 'House 14, Nkana West, Zambia',
    nextOfKinName: 'Mrs. Gertrude Chishimba',
    nextOfKinPhone: '+260 966 331 442',
    nextOfKinRelation: 'Mother',
    programChoice: 'Clinical Medicine Diploma',
    intakeSession: 'January 2027 Full-Time',
    previousSchool: 'Mukuba Secondary School',
    completionYear: '2025',
    results: [
      { subject: 'English Language', grade: 'One (1)' },
      { subject: 'Mathematics', grade: 'Two (2)' },
      { subject: 'Biology', grade: 'Two (2)' },
      { subject: 'Science', grade: 'Two (2)' },
      { subject: 'Chemistry', grade: 'Three (3)' }
    ],
    documents: [
      { id: 'doc-5', type: 'nrc', label: 'National Registration Card (NRC)', fileName: 'mapalo_nrc_certified.pdf', fileSize: '1.2 MB', uploadedAt: '2026-09-29 11:00' },
      { id: 'doc-6', type: 'ecz_results', label: 'ECZ Certificate Verification Slip', fileName: 'ecz_results_certified.pdf', fileSize: '2.4 MB', uploadedAt: '2026-09-29 11:02' }
    ],
    applicationFeeZMW: 150,
    paymentStatus: 'paid',
    paymentMethod: 'airtel_money',
    paymentReference: 'AIRTEL-ADM-554109',
    status: 'under_review',
    submittedAt: '2026-09-29 11:05',
    reviewerRemarks: 'Application received. Pending HPCZ health officer review.',
    offerLetterAvailable: false
  }
];


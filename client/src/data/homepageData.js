import posterBanner from '/admission-promo.png';
import classroomImage from '/assets/classroom.png';
import labCollageImage from '/assets/lab_demo.png';
import instituteBuildingImage from '/assets/course-images/building.png';
import classroomStudents1 from '/assets/course-images/classroom.png';
import classroomStudents2 from '/assets/course-images/classroom.png';
import classroomStudents3 from '/assets/course-images/classroom.png';
import buildingImage from '/assets/course-images/building.png';

import inquiryCounselingImage from '../../enquiry1.webp';
import eligibilityCheckImage from '../../documents.webp';
import applicationFormImage from '../../form.webp';
import documentSubmissionImage from '../../marksheet.webp';
import feePaymentImage from '../../fees.webp';
import confirmationImage from '../../receipt.webp';

import admissionSupportImage from '/assets/teacher.png';
import admissionCampusImage from '/assets/course-images/new_building.png';
import newsImage from '/assets/hero_bg.png';
export const heroSlides = [
  {
    eyebrow: 'Admissions Open 2026',
    title: 'Advance Your Career in Medical and Paramedical Sciences',
    description:
      'APJ Institute Raipur offers practical training, experienced faculty, and career-focused programs for the next generation of healthcare professionals.',
    image: classroomStudents1,
    cta: 'Apply for Admission',
    link: '/admission',
  },
  {
    eyebrow: 'Modern Lab Training',
    title: 'Hands-on Learning in Realistic Medical Laboratory Environments',
    description:
      'Learn with modern equipment, guided lab sessions, and structured academic support across all key paramedical streams.',
    image: classroomStudents2,
    cta: 'Explore Courses',
    link: '/courses',
  },
  {
    eyebrow: 'Student Success',
    title: 'Professional Guidance for Strong Placement and Career Growth',
    description:
      'Build confidence through expert mentorship, practical exposure, and a curriculum aligned with real healthcare requirements.',
    image: classroomStudents3,
    cta: 'View Facilities',
    link: '/facilities',
  },
];

export const highlights = [
  { title: 'Modern Smart Classrooms', description: 'Comfortable, technology-enabled classrooms designed for focused and interactive learning.', icon: 'faculty' },
  { title: 'Advanced Computer & Digital Lab', description: 'Hands-on computer and digital lab access for practical skill development and modern training.', icon: 'excellence' },
  { title: 'Experienced & Qualified Teachers', description: 'Dedicated faculty members who guide students with clarity, care, and subject expertise.', icon: 'activity' },
  { title: 'Safe Hostel Facility', description: 'Secure and student-friendly hostel support exclusively for boys with a disciplined environment.', icon: 'placement' },
  { title: 'Library & E-Learning Access', description: 'Study resources, reference books, and digital learning support to strengthen academic performance.', icon: 'package' },
];

export const admissionSteps = [
  {
    title: 'Inquiry & Counseling',
    description: 'Connect with the admissions team for guidance and program selection.',
    image: inquiryCounselingImage,
  },
  {
    title: 'Eligibility Check',
    description: 'Verify academic requirements and course eligibility details.',
    image: eligibilityCheckImage,
  },
  {
    title: 'Application Form',
    description: 'Submit the application form through a simple admission process.',
    image: applicationFormImage,
  },
  {
    title: 'Document Submission',
    description: 'Provide required certificates and supporting documents.',
    image: documentSubmissionImage,
  },
  {
    title: 'Fee Payment',
    description: 'Pay admission and tuition fees to proceed with enrollment.',
    image: feePaymentImage,
  },
  {
    title: 'Confirmation',
    description: 'Receive your admission confirmation and student ID.',
    image: confirmationImage,
  },
  {
    title: 'Admission Support',
    description: 'Get onboarding support and complete your joining guidance.',
    image: admissionSupportImage,
  },
  {
    title: 'Campus Orientation',
    description: 'Visit the campus and complete your final orientation process.',
    image: admissionCampusImage,
  },
];

export const courses = [
  { title: 'BMLT', duration: '3 Years', description: 'Bachelor-level training in medical diagnostics and laboratory sciences.', image: new12 },
  { title: 'DMLT', duration: '3 Years', description: 'Diploma program for foundation skills in clinical laboratory work.', image: new13 },
  { title: 'DOA', duration: '2 Years', description: 'Specialized eye care training for assisting in ophthalmic diagnostics and clinic operations.', image: new16 },
  { title: 'CCH', duration: '6 Months', description: 'Certificate program for primary healthcare, community health, and first-aid support.', image: new16_png },
];

export const galleryImages = [
  buildingImage,
  instituteBuildingImage,
  labCollageImage,
  classroomImage,
  instituteBuildingImage,
];

export { posterBanner };

export const testimonials = [
  { name: 'Aditi Sahu', role: 'BMLT Student', quote: 'The labs, faculty support, and disciplined environment helped me gain practical confidence for my career.', image: classroomStudents1 },
  { name: 'Rohit Kumar', role: 'DMLT Student', quote: 'The teaching approach is structured and professional. Every class feels focused on real medical practice.', image: classroomStudents2 },
  { name: 'Pooja Verma', role: 'DOA Student', quote: 'APJ Institute gives a genuine institute atmosphere with strong guidance and meaningful exposure.', image: classroomStudents3 },
];

export const quickLinks = ['About', 'Courses', 'Admission', 'Gallery', 'Contact'];
export const courseNames = ['BMLT', 'DMLT', 'DOA', 'CCH'];
export const liveTickerNotices = [
  { id: 'ticker-1', label: 'ADMISSION OPEN 2026-27 — Apply Now', category: 'Admission', emphasis: 'Open' },
  { id: 'ticker-2', label: 'BMLT (3Y), DMLT (3Y), DOA (2Y), CCH (6M)', category: 'Courses', emphasis: 'Info' },
  { id: 'ticker-3', label: 'Eligibility: 12th Pass (Biology)', category: 'Eligibility', emphasis: 'Info' },
  { id: 'ticker-4', label: 'Limited Seats — Contact: 9243758191', category: 'Admission', emphasis: 'Alert' },
  { id: 'ticker-5', label: 'Download Admission Form / Apply via WhatsApp', category: 'Applications', emphasis: 'Action' },
];

export const liveNotificationCards = [
  {
    id: 'notice-1',
    date: 'Now — Apply before 31 August 2026',
    category: 'Admission Notice',
    title: 'ADMISSION OPEN 2026-27',
    description:
      'Apply now for BMLT (3 Years), DMLT (3 Years), DOA (2 Years) and CCH (6 Months). Limited seats available with scholarship options.',
    isNew: true,
    important: true,
    pdfUrl: '#admission',
    viewUrl: '#admission',
    image: newsImage,
    courses: [
      { name: 'BMLT', duration: '3 Years' },
      { name: 'DMLT', duration: '2 Years' },
      { name: 'X-RAY', duration: '2 Years' },
      { name: 'Lab Technician', duration: 'Certificate' },
    ],
    eligibility: '12th Pass (Biology)',
    contact: {
      whatsapp: ['9243758191', '9243758191'],
      phone: ['9243758191', '9243758191'],
      address: 'Sector 9, Raghuraj Tower (Opposite MMR Hospital), Kamal Vihar, Raipur',
    },
  },
  {
    id: 'notice-2',
    date: '17 May 2026',
    category: 'Application Update',
    title: 'BMLT & DMLT Applications Started',
    description:
      'Submission windows are now active with streamlined form filling and document verification support.',
    isNew: true,
    important: false,
    pdfUrl: '#courses',
    viewUrl: '#courses',
  },
  {
    id: 'notice-4',
    date: '15 May 2026',
    category: 'Placement Cell',
    title: 'New Placement Drive Announcement',
    description:
      'Industry partners have confirmed a new placement drive for final-year students and recent graduates.',
    isNew: false,
    important: false,
    pdfUrl: '#facilities',
    viewUrl: '#facilities',
  },
  {
    id: 'notice-5',
    date: '14 May 2026',
    category: 'Exam Notice',
    title: 'Exam Schedule Released',
    description:
      'The examination timetable has been published. Students should review the schedule and prepare accordingly.',
    isNew: false,
    important: true,
    pdfUrl: '#contact',
    viewUrl: '#contact',
  },
];

export const sidebarUpdateGroups = [
  {
    id: 'sidebar-1',
    title: 'Latest News',
    icon: 'news',
    items: [
      { title: 'Campus notice board refreshed', meta: 'Updated today' },
      { title: 'New circulars uploaded for students', meta: '2 files available' },
    ],
  },
  {
    id: 'sidebar-2',
    title: 'Admission Alerts',
    icon: 'admission',
    items: [
      { title: 'Applications open for all major courses', meta: 'Admission cycle 2026' },
      { title: 'Document verification slots released', meta: 'Book your slot' },
    ],
  },
  {
    id: 'sidebar-3',
    title: 'Upcoming Events',
    icon: 'events',
    items: [
      { title: 'Orientation for new batch', meta: '24 May 2026' },
      { title: 'Parent-teacher meeting', meta: '28 May 2026' },
    ],
  },
  {
    id: 'sidebar-4',
    title: 'Exam Notifications',
    icon: 'exam',
    items: [
      { title: 'Practical exam instructions issued', meta: 'Read before exam day' },
      { title: 'Hall tickets to be downloaded online', meta: 'Portal active now' },
    ],
  },
];

export const liveUpdateCounters = [
  { id: 'counter-1', label: 'Live notices', value: '24+' },
  { id: 'counter-2', label: 'Important alerts', value: '08' },
  { id: 'counter-3', label: 'Updates today', value: '05' },
];

export const admissionVideo = {
  title: 'APJ Institute Raipur — Virtual Tour',
  description: 'Take a virtual tour of our campus, labs, classrooms, and facilities to get a real feel of APJ Institute Raipur.',
  // Replace VIDEO_ID with actual YouTube id or use a hosted mp4 URL
  src: 'https://www.youtube.com/embed/VIDEO_ID',
  poster: buildingImage,
};
export { buildingImage, newsImage };
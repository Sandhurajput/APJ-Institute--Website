import { BadgeCheck, BookOpen, Building2, CreditCard, FileText, GraduationCap, ScrollText, ShieldCheck, UserRoundCheck, ClipboardCheck } from 'lucide-react';

export const dashboardTiles = [
  { title: 'Student Login', path: 'student-login', icon: GraduationCap, gradient: 'from-sky-500 to-blue-600' },
  { title: 'Student Signup', path: 'student-signup', icon: UserRoundCheck, gradient: 'from-cyan-500 to-sky-500' },
  { title: 'Admin Login', path: 'admin-login', icon: ShieldCheck, gradient: 'from-violet-500 to-fuchsia-600' },
  { title: 'Teacher Login', path: 'teacher-login', icon: UserRoundCheck, gradient: 'from-orange-500 to-amber-500' },
  { title: 'Department Login', path: 'student-login', icon: Building2, gradient: 'from-emerald-500 to-teal-500' },
  { title: 'Admission Portal', path: 'forms', icon: BadgeCheck, gradient: 'from-pink-500 to-rose-500' },
  { title: 'Results', path: 'results', icon: BookOpen, gradient: 'from-indigo-500 to-cyan-500' },
  { title: 'Certificates', path: 'notices', icon: ScrollText, gradient: 'from-purple-500 to-indigo-500' },
  { title: 'Examination Form', path: 'forms', icon: FileText, gradient: 'from-sky-500 to-cyan-500' },
  { title: 'Attendance Portal', path: 'admin-panel', icon: ClipboardCheck, gradient: 'from-lime-500 to-emerald-500' },
  { title: 'Fee Payment', path: 'contact', icon: CreditCard, gradient: 'from-orange-500 to-red-500' },
];

export const heroMetrics = [
  { label: 'Active Students', value: '1,240+' },
  { label: 'Departments', value: '12' },
  { label: 'Exam Notices', value: '48' },
  { label: 'Result Cycles', value: '4/Year' },
];

export const initialNotices = [
  { id: 1, title: 'Mid-term examination schedule published', category: 'Examination', date: '2026-05-25', pdf: 'mid-term-schedule.pdf', important: true },
  { id: 2, title: 'Hall ticket download opens on Friday', category: 'Student', date: '2026-05-23', pdf: 'hall-ticket.pdf', important: true },
  { id: 3, title: 'Fee payment window extended for one week', category: 'Fee', date: '2026-05-24', pdf: 'fee-update.pdf', important: false },
  { id: 4, title: 'Certificate verification desk new timings', category: 'Certificates', date: '2026-05-27', pdf: 'verification.pdf', important: false },
];

export const initialForms = [
  { id: 1, name: 'Examination Form', description: 'Fill and submit before the last date.', type: 'Examination', file: 'exam-form.pdf' },
  { id: 2, name: 'Admission Form', description: 'New admissions and re-admission forms.', type: 'Admission', file: 'admission-form.pdf' },
  { id: 3, name: 'Scholarship Form', description: 'Scholarship applications for eligible students.', type: 'Scholarship', file: 'scholarship-form.pdf' },
];

export const importantDates = [
  { id: 1, academicYear: '2025-26', event: 'Form Submission Begins', startDate: '2026-05-18', endDate: '2026-05-24' },
  { id: 2, academicYear: '2025-26', event: 'Admit Card Release', startDate: '2026-05-28', endDate: '2026-05-28' },
  { id: 3, academicYear: '2025-26', event: 'Theory Examination', startDate: '2026-06-01', endDate: '2026-06-10' },
  { id: 4, academicYear: '2025-26', event: 'Practical Examination', startDate: '2026-06-12', endDate: '2026-06-15' },
];

export const resultsData = [
  { id: 1, roll: 'APJ-2026-101', name: 'Aditi Sahu', course: 'BMLT', status: 'Passed', marks: '82%', semester: 'Sem 4' },
  { id: 2, roll: 'APJ-2026-108', name: 'Rohit Kumar', course: 'DMLT', status: 'Passed', marks: '76%', semester: 'Sem 2' },
  { id: 3, roll: 'APJ-2026-115', name: 'Pooja Verma', course: 'Pharmacy', status: 'Passed', marks: '88%', semester: 'Sem 6' },
  { id: 4, roll: 'APJ-2026-129', name: 'Anil Das', course: 'X-Ray Technician', status: 'Withheld', marks: '—', semester: 'Sem 1' },
];

export const contactCards = [
  { title: 'Examination Cell', value: '+91 78945 11223', note: 'Mon-Sat, 10:00 AM - 4:00 PM' },
  { title: 'Email', value: 'exam@apjinstitute.edu', note: 'Response within 24 hours' },
  { title: 'Campus Address', value: 'APJ Institute Raipur', note: 'Main campus, Raipur, Chhattisgarh' },
];

export const footerLinks = [
  { title: 'Dashboard', href: '/examination-dashboard' },
  { title: 'Notices', href: '/examination-dashboard/notices' },
  { title: 'Forms', href: '/examination-dashboard/forms' },
  { title: 'Results', href: '/examination-dashboard/results' },
  { title: 'Contact', href: '/examination-dashboard/contact' },
];

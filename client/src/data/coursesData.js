export const initialCourses = [
  {
    id: 1,
    title: "BMLT (Bachelor of Medical Laboratory Technology)",
    category: "Degree",
    description: "Advanced degree program focusing on clinical laboratory testing, pathology, and diagnostic procedures.",
    duration: "3 Years",
    fees: "₹45,000/year",
    seats: 60,
    eligibility: "10+2 (Science/PCB)",
    salary: "₹3-6 LPA",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
    iconName: "Microscope"
  },
  {
    id: 2,
    title: "DMLT (Diploma in Medical Laboratory Technology)",
    category: "Diploma",
    description: "Intensive diploma covering fundamental lab techniques, hematology, and microbiology.",
    duration: "3 Years",
    fees: "₹35,000/year",
    seats: 50,
    eligibility: "10+2 (Science)",
    salary: "₹2-4 LPA",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop",
    iconName: "Activity"
  },
  {
    id: 3,
    title: "DOA (Diploma in Ophthalmic Assistant)",
    category: "Diploma",
    description: "Comprehensive training in ophthalmic assistance, vision testing, eye care diagnostics, and optics.",
    duration: "2 Years",
    fees: "₹38,000/year",
    seats: 40,
    eligibility: "10+2 (Science/PCB)",
    salary: "₹2.5-5 LPA",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
    iconName: "HeartPulse"
  },
  {
    id: 4,
    title: "CCH (Certificate in Community Health)",
    category: "Certification",
    description: "Short-term program providing foundation skills in primary healthcare, preventive medicine, and community health service.",
    duration: "6 Months",
    fees: "₹20,000",
    seats: 40,
    eligibility: "10th/12th Pass",
    salary: "₹1.5-3 LPA",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    iconName: "Users"
  }
];

export const getCourses = () => {
  const stored = localStorage.getItem('apj_courses');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const hasOldCourses = parsed.some(c => c.title.includes("Pharmacy") || c.title.includes("Nursing") || c.title.includes("X-Ray") || c.duration === "2 Years" && c.title.includes("DMLT"));
      const hasNewCourses = parsed.some(c => c.title.includes("DOA") || c.title.includes("CCH"));
      if (!hasOldCourses && hasNewCourses && parsed.length === 4) {
        return parsed;
      }
    } catch (e) {
      // ignore
    }
  }
  localStorage.setItem('apj_courses', JSON.stringify(initialCourses));
  return initialCourses;
};

export const saveCourses = (courses) => {
  localStorage.setItem('apj_courses', JSON.stringify(courses));
};

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
    duration: "2 Years",
    fees: "₹35,000/year",
    seats: 50,
    eligibility: "10+2 (Science)",
    salary: "₹2-4 LPA",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop",
    iconName: "Activity"
  },
  {
    id: 3,
    title: "X-Ray / Radiography Technician",
    category: "Diploma",
    description: "Specialized training in radiology, MRI, CT Scans, and imaging technology.",
    duration: "2 Years",
    fees: "₹40,000/year",
    seats: 40,
    eligibility: "10+2 (Science)",
    salary: "₹2.5-5 LPA",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
    iconName: "HeartPulse"
  },
  {
    id: 4,
    title: "OT Technician (Operation Theatre)",
    category: "Diploma",
    description: "Critical care training focusing on surgical equipment, anesthesia assistance, and OT management.",
    duration: "2 Years",
    fees: "₹42,000/year",
    seats: 30,
    eligibility: "10+2 (Science)",
    salary: "₹3-5.5 LPA",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?q=80&w=800&auto=format&fit=crop",
    iconName: "ActivitySquare"
  },
  {
    id: 5,
    title: "B.Sc. Nursing",
    category: "Degree",
    description: "Comprehensive nursing program preparing students for professional healthcare services.",
    duration: "4 Years",
    fees: "₹65,000/year",
    seats: 100,
    eligibility: "10+2 (PCB, 50%)",
    salary: "₹3.5-7 LPA",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=800&auto=format&fit=crop",
    iconName: "Stethoscope"
  },
  {
    id: 6,
    title: "Hospital Assistant Certification",
    category: "Certification",
    description: "Short-term course for entry-level patient care, ward management, and basic medical support.",
    duration: "6 Months",
    fees: "₹20,000",
    seats: 40,
    eligibility: "10th/12th Pass",
    salary: "₹1.5-2.5 LPA",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    iconName: "Users"
  }
];

export const getCourses = () => {
  const stored = localStorage.getItem('apj_courses');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('apj_courses', JSON.stringify(initialCourses));
  return initialCourses;
};

export const saveCourses = (courses) => {
  localStorage.setItem('apj_courses', JSON.stringify(courses));
};

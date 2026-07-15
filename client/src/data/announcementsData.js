const STORAGE_KEY = 'apj_announcements';

const initialAnnouncements = [
  {
    id: 1,
    title: "Annual Tech Symposium 2026",
    date: "May 25, 2026",
    audience: "All Students & Staff",
    views: 1240,
    image: null,
    tag: "Event"
  },
  {
    id: 2,
    title: "End Semester Examination Schedule Released",
    date: "May 22, 2026",
    audience: "Students Only",
    views: 3450,
    image: null,
    tag: "Academic"
  },
  {
    id: 3,
    title: "Campus Placement Drive - Google & Microsoft",
    date: "May 20, 2026",
    audience: "Final Year Students",
    views: 890,
    image: null,
    tag: "Placement"
  }
];

export const getAnnouncements = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  saveAnnouncements(initialAnnouncements);
  return initialAnnouncements;
};

export const saveAnnouncements = (announcements) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
};

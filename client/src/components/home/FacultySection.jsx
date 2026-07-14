import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { resolveMediaUrl } from '../../utils/media';

function pickList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

const fallbackFaculty = [
  {
    id: 'faculty-fallback-1',
    name: 'Dr. Aarti Verma',
    role: 'Senior Lecturer',
    department: 'Medical Laboratory Technology',
    bio: 'Focuses on practical lab training, student mentoring, and academic support.',
  },
  {
    id: 'faculty-fallback-2',
    name: 'Mr. Rohit Sahu',
    role: 'Program Coordinator',
    department: 'Paramedical Sciences',
    bio: 'Guides course planning, student activities, and professional skill development.',
  },
  {
    id: 'faculty-fallback-3',
    name: 'Ms. Neha Patle',
    role: 'Clinical Instructor',
    department: 'Patient Care Skills',
    bio: 'Supports classroom learning with patient-care focused demonstrations and mentorship.',
  },
];

export default function FacultySection() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    let isMounted = true;

    api
      .get('/faculty/active/all')
      .then((response) => {
        if (!isMounted) return;
        setFaculty(pickList(response.data));
      })
      .catch(() => {
        if (isMounted) setFaculty([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayFaculty = faculty.length ? faculty : fallbackFaculty;

  return (
    <section id="faculty" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Faculty</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">Learn from experienced educators and mentors</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Our faculty members combine subject expertise with hands-on guidance so students build confidence for real healthcare work.
            </p>
          </div>

          <Link to="/academics/faculty" className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50">
            View full faculty page
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayFaculty.map((person, index) => {
            const image = resolveMediaUrl(person.image);
            const bio = person.bio || 'Supporting students with practical guidance and academic mentorship.';

            return (
              <motion.article
                key={person.id || person.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="overflow-hidden rounded-[1.8rem] border border-blue-100 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]"
              >
                <div className="flex items-center gap-4 border-b border-slate-100 p-5">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-sky-100 ring-4 ring-white">
                    {image ? <img src={image} alt={person.name} className="h-full w-full object-cover" loading="lazy" /> : null}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{person.name}</h3>
                    <p className="text-sm font-semibold text-blue-700">{person.role}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{person.department || 'Faculty'}</p>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <p className="text-sm leading-7 text-slate-600">{bio}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                    {person.email ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2">
                        <FaEnvelope className="text-blue-600" />
                        {person.email}
                      </span>
                    ) : null}
                    {person.phone ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2">
                        <FaPhoneAlt className="text-blue-600" />
                        {person.phone}
                      </span>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

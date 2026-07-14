import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { resolveMediaUrl } from '../../utils/media';

function pickList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function formatDate(value) {
  if (!value) return 'Date TBA';

  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return 'Date TBA';
  }
}

const fallbackEvents = [
  {
    id: 'event-fallback-1',
    title: 'Campus Orientation Program',
    description: 'A welcome session for new students with campus tour, department introductions, and academic guidance.',
    date: new Date().toISOString(),
    location: 'APJ Institute Raipur',
  },
  {
    id: 'event-fallback-2',
    title: 'Skill Development Workshop',
    description: 'A practical workshop focused on medical lab basics, communication skills, and career readiness.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Seminar Hall',
  },
  {
    id: 'event-fallback-3',
    title: 'Parent-Teacher Interaction',
    description: 'A discussion session covering progress, attendance, and student support plans.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Main Campus',
  },
];

export default function EventsSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let isMounted = true;

    api
      .get('/events/upcoming/list?limit=6')
      .then((response) => {
        if (!isMounted) return;
        setEvents(pickList(response.data));
      })
      .catch(() => {
        if (isMounted) setEvents([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayEvents = events.length ? events : fallbackEvents;

  return (
    <section id="events" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Events</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">Stay updated with campus activities and upcoming programs</h2>
          </div>

          <Link to="/events" className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
            View all events
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayEvents.map((event, index) => {
            const image = resolveMediaUrl(event.image);

            return (
              <motion.article
                key={event.id || event.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="overflow-hidden rounded-[1.8rem] border border-slate-100 bg-slate-50 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.25)]"
              >
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100">
                  {image ? <img src={image} alt={event.title} className="h-full w-full object-cover" loading="lazy" /> : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-700 backdrop-blur">
                    {formatDate(event.date)}
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{event.description || 'Upcoming institute activity and student engagement program.'}</p>
                  <div className="space-y-2 text-sm text-slate-500">
                    <div className="inline-flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-600" />
                      {formatDate(event.date)}
                    </div>
                    {event.location ? (
                      <div className="inline-flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        {event.location}
                      </div>
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

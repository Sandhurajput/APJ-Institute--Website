import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import socket from '../../socket/socket';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'inquiries', label: 'Inquiries' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'courses', label: 'Courses' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faculty', label: 'Faculty' },
];

const emptyForms = {
  notification: { title: '', message: '', type: 'info', priority: '0', isActive: true },
  course: { title: '', duration: '', eligibility: '', description: '' },
  testimonial: { name: '', message: '', course: '', approved: false },
  faq: { question: '', answer: '' },
  event: { title: '', description: '', date: '', location: '', isActive: true },
  gallery: { title: '', category: '', isActive: true },
  faculty: { name: '', role: '', email: '', phone: '', department: '', bio: '', isActive: true },
};

function toList(response) {
  return Array.isArray(response?.data?.data) ? response.data.data : [];
}

function formatDate(value) {
  if (!value) return 'Not available';

  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function buildImageUrl(value) {
  if (!value) return '';
  if (value.startsWith('http')) return value;
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return `${baseUrl.replace('/api', '')}${value}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location?.state?.tab || 'overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    inquiries: [],
    notifications: [],
    courses: [],
    testimonials: [],
    faqs: [],
    events: [],
    gallery: [],
    faculty: [],
  });
  const [analytics, setAnalytics] = useState({
    inquiries: 0,
    notifications: 0,
    events: 0,
    gallery: 0,
    faculty: 0,
    courses: 0,
    testimonials: 0,
    faqs: 0,
  });
  const [forms, setForms] = useState(emptyForms);
  const [editingIds, setEditingIds] = useState({
    notification: null,
    course: null,
    testimonial: null,
    faq: null,
    event: null,
    gallery: null,
    faculty: null,
  });
  const [files, setFiles] = useState({
    course: null,
    event: null,
    gallery: null,
    faculty: null,
  });

  useEffect(() => {
    loadDashboard();
    if (location?.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, []);

  useEffect(() => {
    function handleNewInquiry(data) {
      setMessage('New inquiry received');
      loadDashboard();
      setTimeout(() => setMessage(''), 5000);
    }

    function handleNewNotification(data) {
      setMessage('New notification published');
      loadDashboard();
      setTimeout(() => setMessage(''), 5000);
    }

    function handleNewEvent(data) {
      setMessage('New event created');
      loadDashboard();
      setTimeout(() => setMessage(''), 5000);
    }

    try {
      socket.on('new_inquiry', handleNewInquiry);
      socket.on('new_notification', handleNewNotification);
      socket.on('new_event', handleNewEvent);
    } catch (e) {
      // ignore
    }

    return () => {
      try {
        socket.off('new_inquiry', handleNewInquiry);
        socket.off('new_notification', handleNewNotification);
        socket.off('new_event', handleNewEvent);
      } catch (e) { }
    };
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError('');

    try {
      const [analyticsRes, inquiriesRes, notificationsRes, coursesRes, testimonialsRes, faqsRes, eventsRes, galleryRes, facultyRes] = await Promise.all([
        api.get('/admin/summary'),
        api.get('/inquiries?limit=100'),
        api.get('/notifications?limit=100'),
        api.get('/courses?limit=100'),
        api.get('/testimonials/admin/all'),
        api.get('/faqs?limit=100'),
        api.get('/events?limit=100'),
        api.get('/gallery?limit=100'),
        api.get('/faculty?limit=100'),
      ]);

      setAnalytics(analyticsRes.data?.data || analytics);
      setData({
        inquiries: toList(inquiriesRes),
        notifications: toList(notificationsRes),
        courses: toList(coursesRes),
        testimonials: toList(testimonialsRes),
        faqs: toList(faqsRes),
        events: toList(eventsRes),
        gallery: toList(galleryRes),
        faculty: toList(facultyRes),
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { title: 'Inquiries', value: analytics.inquiries ?? data.inquiries.length, tone: 'from-sky-500 to-cyan-500' },
    { title: 'Students', value: analytics.testimonials ?? data.testimonials.length, tone: 'from-blue-500 to-indigo-500' },
    { title: 'Courses', value: analytics.courses ?? data.courses.length, tone: 'from-emerald-500 to-teal-500' },
    { title: 'Notifications', value: analytics.notifications ?? data.notifications.length, tone: 'from-amber-500 to-orange-500' },
    { title: 'Events', value: analytics.events ?? data.events.length, tone: 'from-fuchsia-500 to-pink-500' },
  ];

  function updateForm(section, field, value) {
    setForms((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  function resetSection(section) {
    setForms((prev) => ({
      ...prev,
      [section]: emptyForms[section],
    }));
    setEditingIds((prev) => ({ ...prev, [section]: null }));
    setFiles((prev) => ({ ...prev, [section]: null }));
  }

  function startEdit(section, item) {
    setActiveTab(section);
    setMessage('');

    if (section === 'notification') {
      setForms((prev) => ({
        ...prev,
        notification: {
          title: item.title || '',
          message: item.message || '',
          type: item.type || 'info',
          priority: String(item.priority ?? 0),
          isActive: Boolean(item.isActive),
        },
      }));
    }

    if (section === 'course') {
      setForms((prev) => ({
        ...prev,
        course: {
          title: item.title || '',
          duration: item.duration || '',
          eligibility: item.eligibility || '',
          description: item.description || '',
        },
      }));
      setFiles((prev) => ({ ...prev, course: null }));
    }

    if (section === 'testimonial') {
      setForms((prev) => ({
        ...prev,
        testimonial: {
          name: item.name || '',
          message: item.message || '',
          course: item.course || '',
          approved: Boolean(item.approved),
        },
      }));
    }

    if (section === 'faq') {
      setForms((prev) => ({
        ...prev,
        faq: {
          question: item.question || '',
          answer: item.answer || '',
        },
      }));
    }

    if (section === 'event') {
      setForms((prev) => ({
        ...prev,
        event: {
          title: item.title || '',
          description: item.description || '',
          date: item.date ? new Date(item.date).toISOString().slice(0, 16) : '',
          location: item.location || '',
          isActive: Boolean(item.isActive),
        },
      }));
      setFiles((prev) => ({ ...prev, event: null }));
    }

    if (section === 'gallery') {
      setForms((prev) => ({
        ...prev,
        gallery: {
          title: item.title || '',
          category: item.category || '',
          isActive: Boolean(item.isActive),
        },
      }));
      setFiles((prev) => ({ ...prev, gallery: null }));
    }

    if (section === 'faculty') {
      setForms((prev) => ({
        ...prev,
        faculty: {
          name: item.name || '',
          role: item.role || '',
          email: item.email || '',
          phone: item.phone || '',
          department: item.department || '',
          bio: item.bio || '',
          isActive: Boolean(item.isActive),
        },
      }));
      setFiles((prev) => ({ ...prev, faculty: null }));
    }

    setEditingIds((prev) => ({ ...prev, [section]: item.id }));
  }

  async function refreshAfterSave(section, successMessage) {
    await loadDashboard();
    setSaving('');
    setMessage(successMessage);
    resetSection(section);
  }

  async function saveNotification(event) {
    event.preventDefault();
    setSaving('notification');
    setError('');

    try {
      const payload = {
        title: forms.notification.title.trim(),
        message: forms.notification.message.trim(),
        type: forms.notification.type,
        priority: Number(forms.notification.priority),
        isActive: forms.notification.isActive,
      };

      if (editingIds.notification) {
        await api.put(`/notifications/${editingIds.notification}`, payload);
        await refreshAfterSave('notification', 'Notification updated successfully.');
      } else {
        await api.post('/notifications', payload);
        await refreshAfterSave('notification', 'Notification created successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save notification');
      setSaving('');
    }
  }

  async function saveMultipart(section, endpoint, payloadFields) {
    const formData = new FormData();

    Object.entries(payloadFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, String(value));
      }
    });

    const imageFile = files[section];
    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (editingIds[section]) {
      await api.put(`${endpoint}/${editingIds[section]}`, formData);
    } else {
      await api.post(endpoint, formData);
    }
  }

  async function saveCourse(event) {
    event.preventDefault();
    setSaving('course');
    setError('');

    try {
      await saveMultipart('course', '/courses', {
        title: forms.course.title.trim(),
        duration: forms.course.duration.trim(),
        eligibility: forms.course.eligibility.trim(),
        description: forms.course.description.trim(),
      });

      await refreshAfterSave('course', editingIds.course ? 'Course updated successfully.' : 'Course created successfully.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save course');
      setSaving('');
    }
  }

  async function saveTestimonial(event) {
    event.preventDefault();
    setSaving('testimonial');
    setError('');

    try {
      const payload = {
        name: forms.testimonial.name.trim(),
        message: forms.testimonial.message.trim(),
        course: forms.testimonial.course.trim(),
        approved: forms.testimonial.approved,
      };

      if (editingIds.testimonial) {
        await api.put(`/testimonials/${editingIds.testimonial}`, payload);
        await refreshAfterSave('testimonial', 'Testimonial updated successfully.');
      } else {
        await api.post('/testimonials', payload);
        await refreshAfterSave('testimonial', 'Testimonial created successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save testimonial');
      setSaving('');
    }
  }

  async function saveFAQ(event) {
    event.preventDefault();
    setSaving('faq');
    setError('');

    try {
      const payload = {
        question: forms.faq.question.trim(),
        answer: forms.faq.answer.trim(),
      };

      if (editingIds.faq) {
        await api.put(`/faqs/${editingIds.faq}`, payload);
        await refreshAfterSave('faq', 'FAQ updated successfully.');
      } else {
        await api.post('/faqs', payload);
        await refreshAfterSave('faq', 'FAQ created successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save FAQ');
      setSaving('');
    }
  }

  async function saveEvent(event) {
    event.preventDefault();
    setSaving('event');
    setError('');

    try {
      await saveMultipart('event', '/events', {
        title: forms.event.title.trim(),
        description: forms.event.description.trim(),
        date: forms.event.date,
        location: forms.event.location.trim(),
        isActive: forms.event.isActive,
      });

      await refreshAfterSave('event', editingIds.event ? 'Event updated successfully.' : 'Event created successfully.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save event');
      setSaving('');
    }
  }

  async function saveGallery(event) {
    event.preventDefault();
    setSaving('gallery');
    setError('');

    try {
      await saveMultipart('gallery', '/gallery', {
        title: forms.gallery.title.trim(),
        category: forms.gallery.category.trim(),
        isActive: forms.gallery.isActive,
      });

      await refreshAfterSave('gallery', editingIds.gallery ? 'Gallery item updated successfully.' : 'Gallery item uploaded successfully.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save gallery item');
      setSaving('');
    }
  }

  async function saveFaculty(event) {
    event.preventDefault();
    setSaving('faculty');
    setError('');

    try {
      await saveMultipart('faculty', '/faculty', {
        name: forms.faculty.name.trim(),
        role: forms.faculty.role.trim(),
        email: forms.faculty.email.trim(),
        phone: forms.faculty.phone.trim(),
        department: forms.faculty.department.trim(),
        bio: forms.faculty.bio.trim(),
        isActive: forms.faculty.isActive,
      });

      await refreshAfterSave('faculty', editingIds.faculty ? 'Faculty member updated successfully.' : 'Faculty member created successfully.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save faculty member');
      setSaving('');
    }
  }

  async function updateInquiryStatus(id, status) {
    setSaving(`inquiry-${id}`);
    setError('');

    try {
      await api.put(`/inquiries/${id}`, { status });
      await loadDashboard();
      setMessage(`Inquiry marked as ${status}.`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update inquiry');
    } finally {
      setSaving('');
    }
  }

  async function deleteItem(endpoint, id, label) {
    if (!window.confirm(`Delete this ${label}?`)) {
      return;
    }

    setSaving(`${label}-${id}`);
    setError('');

    try {
      await api.delete(`${endpoint}/${id}`);
      await loadDashboard();
      setMessage(`${label} deleted successfully.`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || `Failed to delete ${label}`);
    } finally {
      setSaving('');
    }
  }

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Admin Control Center</p>
              <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">APJ Institute Admin Panel</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                Manage inquiries, publish notifications, create events, maintain gallery content, and control faculty data from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadDashboard}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Return to Site
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((item) => (
              <StatCard key={item.title} title={item.title} value={item.value} tone={item.tone} />
            ))}
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
            <p className="px-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Sections</p>
            <div className="mt-3 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === tab.id
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-xs opacity-70">{activeTab === tab.id ? 'Active' : ''}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Access scope</p>
              <p className="mt-2 leading-6">
                This panel connects to the protected admin APIs, so the logged-in admin can view, create, update, and delete all primary institute content.
              </p>
            </div>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-slate-950/20 backdrop-blur-xl sm:p-6">
            {loading && <p className="text-sm text-slate-300">Loading admin data...</p>}
            {error && <Alert kind="error" text={error} />}
            {message && <Alert kind="success" text={message} />}

            {!loading && activeTab === 'overview' && renderOverview(data, startEdit, setActiveTab)}
            {!loading && activeTab === 'inquiries' && renderInquiries(data.inquiries, saving, updateInquiryStatus, deleteItem)}
            {!loading && activeTab === 'notifications' && renderNotifications(
              data.notifications,
              forms.notification,
              editingIds.notification,
              saving,
              updateForm,
              saveNotification,
              resetSection,
              startEdit
            )}
            {!loading && activeTab === 'courses' && renderCourses(
              data.courses,
              forms.course,
              editingIds.course,
              files.course,
              saving,
              updateForm,
              setFiles,
              saveCourse,
              resetSection,
              startEdit
            )}
            {!loading && activeTab === 'testimonials' && renderTestimonials(
              data.testimonials,
              forms.testimonial,
              editingIds.testimonial,
              saving,
              updateForm,
              saveTestimonial,
              resetSection,
              startEdit,
              deleteItem
            )}
            {!loading && activeTab === 'faqs' && renderFAQs(
              data.faqs,
              forms.faq,
              editingIds.faq,
              saving,
              updateForm,
              saveFAQ,
              resetSection,
              startEdit,
              deleteItem
            )}
            {!loading && activeTab === 'events' && renderEvents(
              data.events,
              forms.event,
              editingIds.event,
              files.event,
              saving,
              updateForm,
              setFiles,
              saveEvent,
              resetSection,
              startEdit
            )}
            {!loading && activeTab === 'gallery' && renderGallery(
              data.gallery,
              forms.gallery,
              editingIds.gallery,
              files.gallery,
              saving,
              updateForm,
              setFiles,
              saveGallery,
              resetSection,
              startEdit
            )}
            {!loading && activeTab === 'faculty' && renderFaculty(
              data.faculty,
              forms.faculty,
              editingIds.faculty,
              files.faculty,
              saving,
              updateForm,
              setFiles,
              saveFaculty,
              resetSection,
              startEdit
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, tone }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-lg shadow-slate-950/20">
      <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${tone}`} />
      <p className="mt-4 text-sm font-medium text-slate-300">{title}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </article>
  );
}

function Alert({ kind, text }) {
  const styles =
    kind === 'success'
      ? 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100'
      : 'border-rose-400/30 bg-rose-500/15 text-rose-100';

  return <div className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${styles}`}>{text}</div>;
}

function SectionBlock({ title, subtitle, children, action }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Panel({ children }) {
  return <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4 shadow-lg shadow-slate-950/20">{children}</div>;
}

function Label({ children }) {
  return <label className="mb-1 block text-sm font-medium text-slate-200">{children}</label>;
}

function Input(props) {
  return <input {...props} className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400 ${props.className || ''}`} />;
}

function TextArea(props) {
  return <textarea {...props} className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400 ${props.className || ''}`} />;
}

function Select(props) {
  return <select {...props} className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-sky-400 ${props.className || ''}`} />;
}

function Button({ children, variant = 'primary', ...props }) {
  const styles =
    variant === 'secondary'
      ? 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
      : variant === 'danger'
        ? 'bg-rose-500 text-white hover:bg-rose-600'
        : 'bg-sky-500 text-white hover:bg-sky-600';

  return (
    <button
      {...props}
      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${props.className || ''}`}
    >
      {children}
    </button>
  );
}

function MiniCard({ title, value, meta }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">{title}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
      {meta && <p className="mt-1 text-xs text-slate-400">{meta}</p>}
    </div>
  );
}

function renderOverview(data, startEdit, setActiveTab) {
  const latestInquiries = data.inquiries.slice(0, 4);
  const latestNotifications = data.notifications.slice(0, 4);

  return (
    <SectionBlock
      title="Overview"
      subtitle="Quick access to the latest records and management sections."
      action={
        <div className="flex flex-wrap gap-2">
          {tabs
            .filter((tab) => tab.id !== 'overview')
            .map((tab) => (
              <Button key={tab.id} type="button" variant="secondary" onClick={() => setActiveTab(tab.id)}>
                Open {tab.label}
              </Button>
            ))}
        </div>
      }
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <h3 className="text-lg font-semibold text-white">Recent Inquiries</h3>
          <div className="mt-4 space-y-3">
            {latestInquiries.length ? latestInquiries.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-300">{item.email} · {item.phone}</p>
                  </div>
                  <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200">{item.status}</span>
                </div>
                <p className="mt-3 text-sm text-slate-300 line-clamp-3">{item.message}</p>
                <div className="mt-3 flex gap-2">
                  <Button type="button" variant="secondary" onClick={() => setActiveTab('inquiries')}>
                    Open list
                  </Button>
                </div>
              </div>
            )) : <p className="text-sm text-slate-400">No inquiries yet.</p>}
          </div>
        </Panel>

        <Panel>
          <h3 className="text-lg font-semibold text-white">Recent Notifications</h3>
          <div className="mt-4 space-y-3">
            {latestNotifications.length ? latestNotifications.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-300">{item.type}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Priority {item.priority}</span>
                </div>
                <p className="mt-3 text-sm text-slate-300 line-clamp-3">{item.message}</p>
              </div>
            )) : <p className="text-sm text-slate-400">No notifications yet.</p>}
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:col-span-2">
          <MiniCard title="Events" value="Manage event posts" meta="Create, update, and publish institute events." />
          <MiniCard title="Gallery" value="Manage gallery assets" meta="Upload and curate campus visuals." />
          <MiniCard title="Faculty" value="Manage staff data" meta="Add professors, roles, and departments." />
          <MiniCard title="Inquiries" value="Handle admissions" meta="Read, resolve, or remove incoming requests." />
        </div>
      </div>
    </SectionBlock>
  );
}

function renderInquiries(inquiries, saving, updateInquiryStatus, deleteItem) {
  return (
    <SectionBlock title="Inquiries" subtitle="Review incoming messages and keep the status in sync.">
      <Panel>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-slate-400">
              <tr>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Contact</th>
                <th className="py-3 pr-4">Message</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length ? inquiries.map((item) => (
                <tr key={item.id} className="border-b border-white/10 align-top text-slate-200">
                  <td className="py-4 pr-4 font-semibold text-white">{item.name}</td>
                  <td className="py-4 pr-4">
                    <div>{item.email}</div>
                    <div className="text-xs text-slate-400">{item.phone}</div>
                  </td>
                  <td className="py-4 pr-4 text-slate-300 line-clamp-3">{item.message}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200">{item.status}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="secondary" disabled={saving === `inquiry-${item.id}`} onClick={() => updateInquiryStatus(item.id, 'read')}>
                        Read
                      </Button>
                      <Button type="button" variant="secondary" disabled={saving === `inquiry-${item.id}`} onClick={() => updateInquiryStatus(item.id, 'resolved')}>
                        Resolve
                      </Button>
                      <Button type="button" variant="danger" disabled={saving === `inquiry-${item.id}`} onClick={() => deleteItem('/inquiries', item.id, 'inquiry')}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400">No inquiries available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </SectionBlock>
  );
}

function renderNotifications(notifications, form, editingId, saving, updateForm, saveNotification, resetSection, startEdit) {
  return (
    <SectionBlock
      title="Notifications"
      subtitle="Publish notices for students, parents, and staff."
      action={<Button type="button" variant="secondary" onClick={() => resetSection('notification')}>New notification</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Panel>
          <div className="space-y-3">
            {notifications.length ? notifications.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-sky-300">{item.type}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Priority {item.priority}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.isActive ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-500/15 text-slate-300'}`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.message}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" onClick={() => startEdit('notification', item)}>Edit</Button>
                  <Button type="button" variant="danger" onClick={() => deleteItem('/notifications', item.id, 'notification')}>Delete</Button>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">No notifications yet.</p>}
          </div>
        </Panel>

        <Panel>
          <form onSubmit={saveNotification} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => updateForm('notification', 'title', e.target.value)} placeholder="Notification title" />
            </div>
            <div>
              <Label>Message</Label>
              <TextArea rows="5" value={form.message} onChange={(e) => updateForm('notification', 'message', e.target.value)} placeholder="Write the notification message" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onChange={(e) => updateForm('notification', 'type', e.target.value)}>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onChange={(e) => updateForm('notification', 'priority', e.target.value)}>
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">High</option>
                </Select>
              </div>
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <input type="checkbox" checked={form.isActive} onChange={(e) => updateForm('notification', 'isActive', e.target.checked)} />
              Active notification
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving === 'notification'}>{editingId ? 'Update Notification' : 'Create Notification'}</Button>
              {editingId && <Button type="button" variant="secondary" onClick={() => resetSection('notification')}>Cancel Edit</Button>}
            </div>
          </form>
        </Panel>
      </div>
    </SectionBlock>
  );
}

function renderCourses(courses, form, editingId, fileValue, saving, updateForm, setFiles, saveCourse, resetSection, startEdit) {
  return (
    <SectionBlock
      title="Courses"
      subtitle="Create and manage the public course catalog."
      action={<Button type="button" variant="secondary" onClick={() => resetSection('course')}>New course</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {courses.length ? courses.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {item.image ? <img src={buildImageUrl(item.image)} alt={item.title} className="h-40 w-full object-cover" /> : <div className="h-40 bg-slate-800" />}
                <div className="p-4">
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-sky-300">{item.duration}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.eligibility}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-3">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" onClick={() => startEdit('course', item)}>Edit</Button>
                    <Button type="button" variant="danger" onClick={() => deleteItem('/courses', item.id, 'course')}>Delete</Button>
                  </div>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">No courses available.</p>}
          </div>
        </Panel>

        <Panel>
          <form onSubmit={saveCourse} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => updateForm('course', 'title', e.target.value)} placeholder="Course title" />
            </div>
            <div>
              <Label>Duration</Label>
              <Input value={form.duration} onChange={(e) => updateForm('course', 'duration', e.target.value)} placeholder="2 Years" />
            </div>
            <div>
              <Label>Eligibility</Label>
              <Input value={form.eligibility} onChange={(e) => updateForm('course', 'eligibility', e.target.value)} placeholder="10+2 (Science)" />
            </div>
            <div>
              <Label>Description</Label>
              <TextArea rows="5" value={form.description} onChange={(e) => updateForm('course', 'description', e.target.value)} placeholder="Course description" />
            </div>
            <div>
              <Label>Course Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setFiles((prev) => ({ ...prev, course: e.target.files?.[0] || null }))} />
              <p className="mt-1 text-xs text-slate-400">{fileValue ? fileValue.name : 'Optional course image.'}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving === 'course'}>{editingId ? 'Update Course' : 'Create Course'}</Button>
              {editingId && <Button type="button" variant="secondary" onClick={() => resetSection('course')}>Cancel Edit</Button>}
            </div>
          </form>
        </Panel>
      </div>
    </SectionBlock>
  );
}

function renderTestimonials(testimonials, form, editingId, saving, updateForm, saveTestimonial, resetSection, startEdit, deleteItem) {
  return (
    <SectionBlock
      title="Testimonials"
      subtitle="Approve or manage student feedback from the website."
      action={<Button type="button" variant="secondary" onClick={() => resetSection('testimonial')}>New testimonial</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel>
          <div className="space-y-3">
            {testimonials.length ? testimonials.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-sky-300">{item.course}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.approved ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'}`}>
                    {item.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-4">{item.message}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" onClick={() => startEdit('testimonial', item)}>Edit / Approve</Button>
                  <Button type="button" variant="danger" onClick={() => deleteItem('/testimonials', item.id, 'testimonial')}>Delete</Button>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">No testimonials available.</p>}
          </div>
        </Panel>

        <Panel>
          <form onSubmit={saveTestimonial} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => updateForm('testimonial', 'name', e.target.value)} placeholder="Student name" />
            </div>
            <div>
              <Label>Course</Label>
              <Input value={form.course} onChange={(e) => updateForm('testimonial', 'course', e.target.value)} placeholder="BMLT / DMLT / Pharmacy" />
            </div>
            <div>
              <Label>Message</Label>
              <TextArea rows="5" value={form.message} onChange={(e) => updateForm('testimonial', 'message', e.target.value)} placeholder="Student feedback" />
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <input type="checkbox" checked={form.approved} onChange={(e) => updateForm('testimonial', 'approved', e.target.checked)} />
              Approved testimonial
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving === 'testimonial'}>{editingId ? 'Update Testimonial' : 'Create Testimonial'}</Button>
              {editingId && <Button type="button" variant="secondary" onClick={() => resetSection('testimonial')}>Cancel Edit</Button>}
            </div>
          </form>
        </Panel>
      </div>
    </SectionBlock>
  );
}

function renderFAQs(faqs, form, editingId, saving, updateForm, saveFAQ, resetSection, startEdit, deleteItem) {
  return (
    <SectionBlock
      title="FAQs"
      subtitle="Manage the frequently asked questions shown on the public site."
      action={<Button type="button" variant="secondary" onClick={() => resetSection('faq')}>New FAQ</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel>
          <div className="space-y-3">
            {faqs.length ? faqs.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg font-semibold text-white">{item.question}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" onClick={() => startEdit('faq', item)}>Edit</Button>
                  <Button type="button" variant="danger" onClick={() => deleteItem('/faqs', item.id, 'faq')}>Delete</Button>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">No FAQs available.</p>}
          </div>
        </Panel>

        <Panel>
          <form onSubmit={saveFAQ} className="space-y-4">
            <div>
              <Label>Question</Label>
              <TextArea rows="3" value={form.question} onChange={(e) => updateForm('faq', 'question', e.target.value)} placeholder="Write the question" />
            </div>
            <div>
              <Label>Answer</Label>
              <TextArea rows="6" value={form.answer} onChange={(e) => updateForm('faq', 'answer', e.target.value)} placeholder="Write the answer" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving === 'faq'}>{editingId ? 'Update FAQ' : 'Create FAQ'}</Button>
              {editingId && <Button type="button" variant="secondary" onClick={() => resetSection('faq')}>Cancel Edit</Button>}
            </div>
          </form>
        </Panel>
      </div>
    </SectionBlock>
  );
}

function renderEvents(events, form, editingId, fileValue, saving, updateForm, setFiles, saveEvent, resetSection, startEdit) {
  return (
    <SectionBlock
      title="Events"
      subtitle="Create institute events and keep the upcoming list current."
      action={<Button type="button" variant="secondary" onClick={() => resetSection('event')}>New event</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel>
          <div className="space-y-3">
            {events.length ? events.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {item.image ? <img src={buildImageUrl(item.image)} alt={item.title} className="h-48 w-full object-cover" /> : null}
                <div className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-sky-300">{formatDate(item.date)}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.isActive ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-500/15 text-slate-300'}`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-3">{item.description}</p>
                  <p className="mt-2 text-xs text-slate-400">{item.location}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" onClick={() => startEdit('event', item)}>Edit</Button>
                    <Button type="button" variant="danger" onClick={() => deleteItem('/events', item.id, 'event')}>Delete</Button>
                  </div>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">No events available.</p>}
          </div>
        </Panel>

        <Panel>
          <form onSubmit={saveEvent} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => updateForm('event', 'title', e.target.value)} placeholder="Event title" />
            </div>
            <div>
              <Label>Description</Label>
              <TextArea rows="5" value={form.description} onChange={(e) => updateForm('event', 'description', e.target.value)} placeholder="Describe the event" />
            </div>
            <div>
              <Label>Date and time</Label>
              <Input type="datetime-local" value={form.date} onChange={(e) => updateForm('event', 'date', e.target.value)} />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => updateForm('event', 'location', e.target.value)} placeholder="Event location" />
            </div>
            <div>
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setFiles((prev) => ({ ...prev, event: e.target.files?.[0] || null }))} />
              <p className="mt-1 text-xs text-slate-400">{fileValue ? fileValue.name : 'Optional for events. Leave empty to keep existing image.'}</p>
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <input type="checkbox" checked={form.isActive} onChange={(e) => updateForm('event', 'isActive', e.target.checked)} />
              Active event
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving === 'event'}>{editingId ? 'Update Event' : 'Create Event'}</Button>
              {editingId && <Button type="button" variant="secondary" onClick={() => resetSection('event')}>Cancel Edit</Button>}
            </div>
          </form>
        </Panel>
      </div>
    </SectionBlock>
  );
}

function renderGallery(gallery, form, editingId, fileValue, saving, updateForm, setFiles, saveGallery, resetSection, startEdit) {
  return (
    <SectionBlock
      title="Gallery"
      subtitle="Upload and curate campus images for the public gallery."
      action={<Button type="button" variant="secondary" onClick={() => resetSection('gallery')}>New gallery item</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.length ? gallery.map((item) => (
              <article key={item.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {/* Edit overlay button (always visible) */}
                <button
                  type="button"
                  onClick={() => startEdit('gallery', item)}
                  className="absolute top-3 right-3 z-20 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white hover:bg-white/20"
                  title="Edit gallery item"
                >
                  Edit
                </button>

                {item.image ? (
                  <img src={buildImageUrl(item.image)} alt={item.title} className="h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 bg-slate-800" />
                )}

                <div className="p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-sky-300">{item.category || 'uncategorized'}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" onClick={() => startEdit('gallery', item)}>Edit</Button>
                    <Button type="button" variant="danger" onClick={() => deleteItem('/gallery', item.id, 'gallery item')}>Delete</Button>
                  </div>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">No gallery items available.</p>}
          </div>
        </Panel>

        <Panel>
          <form onSubmit={saveGallery} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => updateForm('gallery', 'title', e.target.value)} placeholder="Gallery item title" />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => updateForm('gallery', 'category', e.target.value)} placeholder="campus, event, lab, etc." />
            </div>
            <div>
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setFiles((prev) => ({ ...prev, gallery: e.target.files?.[0] || null }))} required={!editingId} />
              <p className="mt-1 text-xs text-slate-400">{fileValue ? fileValue.name : 'Image required for new gallery items.'}</p>
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <input type="checkbox" checked={form.isActive} onChange={(e) => updateForm('gallery', 'isActive', e.target.checked)} />
              Active gallery item
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving === 'gallery'}>{editingId ? 'Update Gallery' : 'Upload Image'}</Button>
              {editingId && <Button type="button" variant="secondary" onClick={() => resetSection('gallery')}>Cancel Edit</Button>}
            </div>
          </form>
        </Panel>
      </div>
    </SectionBlock>
  );
}

function renderFaculty(faculty, form, editingId, fileValue, saving, updateForm, setFiles, saveFaculty, resetSection, startEdit) {
  return (
    <SectionBlock
      title="Faculty"
      subtitle="Maintain staff profiles, roles, and department details."
      action={<Button type="button" variant="secondary" onClick={() => resetSection('faculty')}>New faculty</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel>
          <div className="space-y-3">
            {faculty.length ? faculty.map((item) => (
              <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row">
                {item.image ? <img src={buildImageUrl(item.image)} alt={item.name} className="h-28 w-28 rounded-2xl object-cover" /> : <div className="h-28 w-28 rounded-2xl bg-slate-800" />}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-sky-300">{item.role}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.isActive ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-500/15 text-slate-300'}`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-1 text-sm text-slate-300">
                    <p>{item.email || 'No email'}</p>
                    <p>{item.phone || 'No phone'}</p>
                    <p>{item.department || 'No department'}</p>
                  </div>
                  {item.bio ? <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-3">{item.bio}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" onClick={() => startEdit('faculty', item)}>Edit</Button>
                    <Button type="button" variant="danger" onClick={() => deleteItem('/faculty', item.id, 'faculty member')}>Delete</Button>
                  </div>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">No faculty data available.</p>}
          </div>
        </Panel>

        <Panel>
          <form onSubmit={saveFaculty} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => updateForm('faculty', 'name', e.target.value)} placeholder="Faculty name" />
            </div>
            <div>
              <Label>Role</Label>
              <Input value={form.role} onChange={(e) => updateForm('faculty', 'role', e.target.value)} placeholder="Professor, Lecturer, Assistant, etc." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Email</Label>
                <Input value={form.email} onChange={(e) => updateForm('faculty', 'email', e.target.value)} placeholder="faculty@email.com" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => updateForm('faculty', 'phone', e.target.value)} placeholder="Phone number" />
              </div>
            </div>
            <div>
              <Label>Department</Label>
              <Input value={form.department} onChange={(e) => updateForm('faculty', 'department', e.target.value)} placeholder="Department name" />
            </div>
            <div>
              <Label>Bio</Label>
              <TextArea rows="4" value={form.bio} onChange={(e) => updateForm('faculty', 'bio', e.target.value)} placeholder="Short faculty bio" />
            </div>
            <div>
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setFiles((prev) => ({ ...prev, faculty: e.target.files?.[0] || null }))} />
              <p className="mt-1 text-xs text-slate-400">{fileValue ? fileValue.name : 'Optional faculty portrait.'}</p>
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <input type="checkbox" checked={form.isActive} onChange={(e) => updateForm('faculty', 'isActive', e.target.checked)} />
              Active faculty profile
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving === 'faculty'}>{editingId ? 'Update Faculty' : 'Create Faculty'}</Button>
              {editingId && <Button type="button" variant="secondary" onClick={() => resetSection('faculty')}>Cancel Edit</Button>}
            </div>
          </form>
        </Panel>
      </div>
    </SectionBlock>
  );
}

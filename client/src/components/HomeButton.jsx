import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function HomeButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenRoutes = [
    '/gallery',
    '/notices',
    '/portal',
    '/admin/announcements',
    '/admin/finance',
    '/admin/help',
    '/admin/queries',
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  if (location.pathname === '/') {
    return null;
  }

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminDashboard = location.pathname === '/admin-dashboard';
  const positionClass = isAdminDashboard
    ? 'left-1/2 top-3 -translate-x-1/2 sm:top-4'
    : isAdminRoute
      ? 'left-4 top-2 sm:left-6 sm:top-3'
      : 'left-4 top-4 sm:left-6 sm:top-6';

  return (
    <div className={`fixed ${positionClass} z-50 flex items-center gap-2 rounded-full bg-transparent p-0 shadow-none transition-all ${location.pathname === '/' ? 'opacity-80' : ''}`}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go to previous page"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-[#f5f5f5]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </button>

      <Link
        to="/"
        aria-label="Back to home page"
        className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#333333]"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
    </div>
  );
}
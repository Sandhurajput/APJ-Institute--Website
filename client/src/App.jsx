import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminLogin from './pages/AdminLogin';
import AdminSignUp from './pages/AdminSignUp';
import AuthSplitScreen from './pages/AuthSplitScreen';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CoursesPage from './pages/CoursesPage';
import FacilitiesPage from './pages/FacilitiesPage';
import AdmissionPage from './pages/AdmissionPage';
import CinematicGallery from './pages/CinematicGallery';
import ContactPage from './pages/ContactPage';
import AdminFinance from './pages/AdminFinance';
import AdminAnnouncements from './pages/AdminAnnouncements';
import AdminQueries from './pages/AdminQueries';
import AdminSettings from './pages/AdminSettings';
import AdminHelp from './pages/AdminHelp';
import AdminCourses from './pages/AdminCourses';
import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import PortalDashboard from './pages/PortalDashboard';
import Notices from './pages/Notices';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Website Routes wrapped with Layout (Navbar + Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="facilities" element={<FacilitiesPage />} />
          <Route path="admission" element={<AdmissionPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/gallery" element={<CinematicGallery />} />

        {/* Auth & Dashboard Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/auth" element={<AuthSplitScreen />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/portal" element={<PortalDashboard />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/finance" element={<AdminFinance />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/queries" element={<AdminQueries />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/help" element={<AdminHelp />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
      </Routes>
    </Router>
  );
}

export default App;

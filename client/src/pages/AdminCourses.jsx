import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, UserPlus, BookOpen, DollarSign, Megaphone, 
  Settings, LogOut, Search, Bell, Menu, X, Plus, Edit, Trash2, Image as ImageIcon, Users
} from 'lucide-react';
import { getCourses, saveCourses } from '../data/coursesData';

export default function AdminCourses() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Degree',
    description: '',
    duration: '',
    fees: '',
    seats: '',
    eligibility: '',
    salary: '',
    image: '',
    iconName: 'BookOpen'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }
    if (userData) setUser(JSON.parse(userData));
    
    setCourses(getCourses());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, path: '/admin-dashboard' },
    { name: 'Admissions', icon: UserPlus, active: false, path: '/admission' },
    { name: 'Courses', icon: BookOpen, active: true, path: '/admin/courses' },
    { name: 'Fees & Finance', icon: DollarSign, active: false, path: '/admin/finance' },
    { name: 'Announcements', icon: Megaphone, active: false, path: '/admin/announcements' },
    { name: 'Settings', icon: Settings, active: false, path: '/admin/settings' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setFormData({
      title: '', category: 'Degree', description: '', duration: '',
      fees: '', seats: '', eligibility: '', salary: '', image: '', iconName: 'BookOpen'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const newCourses = courses.filter(c => c.id !== id);
      setCourses(newCourses);
      saveCourses(newCourses);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let newCourses;
    if (editingCourse) {
      newCourses = courses.map(c => c.id === editingCourse.id ? { ...formData, id: c.id } : c);
    } else {
      const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
      newCourses = [...courses, { ...formData, id: newId }];
    }
    setCourses(newCourses);
    saveCourses(newCourses);
    setIsModalOpen(false);
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-full p-6 justify-between flex-shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-sm tracking-wide">APJ</span>
            </div>
            <div>
              <h1 className="text-md font-bold text-slate-900 tracking-tight">APJ Panel</h1>
              <p className="text-xs text-slate-400 font-medium">Dantewada Portal</p>
            </div>
          </div>
          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-3 px-2">MAIN MENU</p>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  item.active ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-brand-600' : 'text-slate-400'}`} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between p-2 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-200 to-violet-200 flex items-center justify-center text-brand-700 font-extrabold text-sm flex-shrink-0">
              {user.fullName ? user.fullName[0].toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate leading-none">{user.fullName || 'Admin User'}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate mt-1">{user.email || 'admin@apjinstitute.com'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-red-500">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 bg-white border border-slate-200 rounded-xl">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Courses Management 📚</h2>
              <p className="text-xs text-slate-400 font-medium">Add, edit, or remove programs offered by the institute</p>
            </div>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Course
          </button>
        </header>

        {/* Dashboard Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Courses */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Programs</p>
              <h3 className="text-3xl font-black text-slate-800">{courses.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          {/* Total Capacity */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Capacity</p>
              <h3 className="text-3xl font-black text-slate-800">
                {courses.reduce((acc, curr) => acc + (parseInt(curr.seats) || 0), 0)}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>

          {/* Active Enrollments (Mock Calculation: 85% of capacity) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Enrolled Students</p>
              <h3 className="text-3xl font-black text-slate-800">
                {Math.floor(courses.reduce((acc, curr) => acc + (parseInt(curr.seats) || 0), 0) * 0.85)}
              </h3>
            </div>
            <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Program Types */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Categories</p>
              <div className="flex gap-2 text-xs font-bold text-slate-700">
                <span>{courses.filter(c => c.category === 'Degree').length} Deg</span>
                <span>•</span>
                <span>{courses.filter(c => c.category === 'Diploma').length} Dip</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="flex items-center justify-between mb-4 px-1">
           <h3 className="text-lg font-extrabold text-slate-800">Active Programs Directory</h3>
           <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{courses.length} Listed</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {courses.map(course => (
            <div key={course.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-40 w-full overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <span className="absolute bottom-3 left-3 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {course.category}
                </span>
              </div>
              <div className="p-5 relative">
                <h3 className="font-bold text-slate-900 text-lg mb-2 leading-tight">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{course.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 mb-5 bg-slate-50 p-3 rounded-xl">
                  <div>⏱️ {course.duration}</div>
                  <div>💰 {course.fees}</div>
                  <div>🎓 {course.eligibility}</div>
                  <div>💼 {course.salary}</div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button onClick={() => openEditModal(course)} className="flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="flex items-center gap-1.5 text-sm font-bold text-rose-500 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-extrabold text-slate-900">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="courseForm" onSubmit={handleSave} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Course Title</label>
                    <input required name="title" value={formData.title} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" placeholder="e.g. B.Sc. Nursing" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
                    <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500">
                      <option value="Degree">Degree</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Certification">Certification</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
                  <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" placeholder="Course overview..." />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Duration</label>
                    <input required name="duration" value={formData.duration} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500" placeholder="e.g. 3 Years" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Fees</label>
                    <input required name="fees" value={formData.fees} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500" placeholder="e.g. ₹45,000/yr" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Eligibility</label>
                    <input required name="eligibility" value={formData.eligibility} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500" placeholder="e.g. 10+2 PCB" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Expected Salary</label>
                    <input required name="salary" value={formData.salary} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500" placeholder="e.g. ₹3-6 LPA" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Image URL</label>
                    <input required name="image" value={formData.image} onChange={handleInputChange} type="url" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500" placeholder="https://images.unsplash.com/..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Icon Selection</label>
                    <select required name="iconName" value={formData.iconName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500">
                      <option value="Microscope">Microscope</option>
                      <option value="Activity">Activity Heart</option>
                      <option value="HeartPulse">Heart Pulse</option>
                      <option value="ActivitySquare">Activity Square</option>
                      <option value="Stethoscope">Stethoscope</option>
                      <option value="Users">Users</option>
                      <option value="BookOpen">Book</option>
                    </select>
                  </div>
                </div>

              </form>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
              <button type="submit" form="courseForm" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-md transition-colors">
                {editingCourse ? 'Save Changes' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Bell, User } from 'lucide-react';

/**
 * Advanced Navbar Component with Additional Features
 * Includes:
 * - Logo/Branding
 * - Multi-level dropdown menus
 * - Mobile responsive hamburger menu
 * - Search functionality
 * - User profile icon
 * - Notification bell
 */
export default function AdvancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add your search logic here
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: '🏠' },
    {
      label: 'About',
      href: '/about',
      submenu: [
        { label: 'Our Story', href: '/about/story', icon: '📖' },
        { label: 'Leadership', href: '/about/leadership', icon: '👥' },
        { label: 'Departments', href: '/about/departments', icon: '🏢' },
        { label: 'Achievements', href: '/about/achievements', icon: '🏆' },
      ],
    },
    {
      label: 'Academics',
      href: '/academics',
      submenu: [
        { label: 'Programs', href: '/academics/programs', icon: '📚' },
        { label: 'Admissions', href: '/academics/admissions', icon: '📝' },
        { label: 'Faculty', href: '/academics/faculty', icon: '👨‍🏫' },
        { label: 'Placements', href: '/academics/placements', icon: '💼' },
      ],
    },
    { label: 'Events', href: '/events', icon: '📅' },
    { label: 'News', href: '/news', icon: '📰' },
    { label: 'Contact', href: '/contact', icon: '📞' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primary Navigation Bar */}
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg">APJ</span>
              </div>
              <div className="absolute inset-0 bg-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-gray-900">APJ Institute</h1>
              <p className="text-xs text-gray-500 -mt-1">Raipur</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() =>
                  link.submenu && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>{link.icon}</span>
                  {link.label}
                  {link.submenu && (
                    <ChevronDown
                      size={16}
                      className="group-hover:rotate-180 transition-transform"
                    />
                  )}
                </Link>

                {/* Desktop Dropdown Menu */}
                {link.submenu && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {link.submenu.map((item, index) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={`px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3 ${
                          index === 0 ? 'rounded-t-lg' : ''
                        } ${index === link.submenu.length - 1 ? 'rounded-b-lg' : ''}`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section - Search, Notifications, Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Bar - Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-48"
              />
              <button
                type="submit"
                className="text-gray-500 hover:text-blue-600 transition-colors p-1"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Notification Bell */}
            <button className="hidden md:flex relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors">
              <User size={20} />
              <span className="text-sm font-medium hidden lg:inline">Profile</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 max-h-96 overflow-y-auto">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="px-2 py-2 mb-4"
          >
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 flex-1"
              />
              <button
                type="submit"
                className="text-gray-500 hover:text-blue-600 transition-colors p-1"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Mobile Menu Items */}
          {navLinks.map((link) => (
            <div key={link.label} className="space-y-1">
              <button
                onClick={() => {
                  if (!link.submenu) {
                    setIsOpen(false);
                  } else {
                    handleDropdownToggle(link.label);
                  }
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
              >
                <Link
                  to={link.href}
                  onClick={(e) => !link.submenu && setIsOpen(false)}
                  className="flex items-center gap-2 flex-1"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
                {link.submenu && (
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform ${
                      activeDropdown === link.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Mobile Dropdown */}
              {link.submenu && activeDropdown === link.label && (
                <div className="bg-gray-50 rounded-lg ml-4 py-1 space-y-1">
                  {link.submenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Bottom Actions */}
          <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
            <button className="w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
              <Bell size={18} />
              Notifications
              {notifications > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2">
              <User size={18} />
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

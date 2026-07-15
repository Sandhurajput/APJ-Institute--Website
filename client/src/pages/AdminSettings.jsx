import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, ChevronDown, ChevronLeft, 
  Info, Sliders, Shield, BellRing, User, UserCheck, CreditCard,
  Upload, Key, Smartphone, Globe, CheckCircle, Plus, Trash2, Download, LogOut
} from 'lucide-react';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [activeInnerTab, setActiveInnerTab] = useState('general');
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@apjinstitute.com', role: 'Super Admin', lastActive: 'Currently Online', status: 'Active' },
    { id: 2, name: 'Sarah Smith', email: 'finance@apjinstitute.com', role: 'Finance Manager', lastActive: '2 hours ago', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'support@apjinstitute.com', role: 'Support Agent', lastActive: '5 days ago', status: 'Offline' },
  ]);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [newStaffForm, setNewStaffForm] = useState({ name: '', email: '', role: 'Support Agent' });
  
  // General Form State
  const [formData, setFormData] = useState({
    businessName: 'APJ Institute',
    emailAddress: 'admin@apjinstitute.com',
    phoneNumber: '+91 9876543210',
    fax: 'None',
    country: 'India',
    city: 'Dantewada',
    postcode: '494449',
    state: 'Chhattisgarh'
  });

  // Toggles State
  const [toggles, setToggles] = useState({
    twoFactor: false,
    emailAdmissions: true,
    emailPayments: true,
    emailAlerts: false,
    pushUpdates: true,
    darkMode: false
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (key) => {
    setToggles(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      if (key === 'darkMode') {
        if (newState.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return newState;
    });
  };

  const handleSave = () => {
    alert('Changes saved successfully!');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setAvatar(event.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeletePhoto = () => {
    if (window.confirm('Are you sure you want to delete your profile photo?')) {
      setAvatar(null);
    }
  };

  const innerSidebarItems = [
    { id: 'general', name: 'General Information', icon: Info },
    { id: 'preferences', name: 'Preferences', icon: Sliders },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: BellRing },
    { id: 'account', name: 'Account', icon: User },
    { id: 'account-manager', name: 'Account Manager', icon: UserCheck },
    { id: 'billings', name: 'Billings', icon: CreditCard },
  ];

  // Helper for toggle UI
  const ToggleSwitch = ({ checked, onChange }) => (
    <div 
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-[#4a148c]' : 'bg-slate-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans text-slate-800 overflow-hidden">
      
      {/* Main Content Area (Full Width since dark sidebar is removed) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Navbar */}
        <header className="bg-white h-[72px] flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin-dashboard')}
              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#4a148c] focus:bg-white transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute 1 top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-slate-100">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                 {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    <span className="text-xs font-bold text-slate-500">JD</span>
                 )}
              </div>
              <span className="text-sm font-semibold text-slate-700">John Doe</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Settings Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Header Row */}
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your administrative preferences and configurations.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/admin-dashboard')}
                className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold text-sm rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#4a148c] text-white font-semibold text-sm rounded-lg shadow-sm hover:bg-[#3a0f6c] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Settings Box */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 flex overflow-hidden min-h-[700px]">
            
            {/* Inner Sidebar */}
            <div className="w-64 border-r border-slate-100 py-6 px-4 flex flex-col gap-2 flex-shrink-0 bg-white">
               {innerSidebarItems.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => setActiveInnerTab(item.id)}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                     activeInnerTab === item.id 
                       ? 'bg-[#f4ebff] text-[#4a148c]' 
                       : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                   }`}
                 >
                   <item.icon className={`w-5 h-5 ${activeInnerTab === item.id ? 'text-[#4a148c]' : 'text-slate-400'}`} />
                   {item.name}
                 </button>
               ))}
            </div>

            {/* Inner Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              
              {/* TAB: GENERAL */}
              {activeInnerTab === 'general' && (
                <div className="w-full animate-in fade-in duration-300">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900">General Information</h3>
                    <p className="text-sm text-slate-500 mt-1">Update your institute's public identity and basic details.</p>
                  </div>
                  <hr className="border-slate-100 mb-8" />
                  
                  {/* Profile Picture */}
                  <div className="mb-10">
                    <h4 className="text-sm font-bold text-slate-900 mb-4">Profile picture upload</h4>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center relative">
                         {avatar ? (
                            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                         ) : (
                            <User className="w-8 h-8 text-slate-400" />
                         )}
                         <div className="absolute bottom-0 right-0 bg-slate-700 text-white p-1 rounded-full cursor-pointer hover:bg-slate-900" onClick={handleUploadClick}>
                           <Upload className="w-3 h-3" />
                         </div>
                      </div>
                      <div>
                         <h5 className="font-bold text-slate-900">John Doe</h5>
                         <p className="text-xs text-slate-500 mb-3">System Administrator<br/>Dantewada HQ</p>
                         <div className="flex gap-3">
                           <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                           <button onClick={handleUploadClick} className="px-4 py-2 bg-[#4a148c] text-white text-xs font-semibold rounded-lg hover:bg-[#3a0f6c] transition-colors">Upload New Photo</button>
                           <button onClick={handleDeletePhoto} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">Delete</button>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Organization Form */}
                  <div className="mb-10">
                    <h4 className="text-sm font-bold text-slate-900 mb-4">Organization Information</h4>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500">Business Name</label>
                         <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500">Email Address</label>
                         <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500">Phone Number</label>
                         <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                       </div>
                       <div className="space-y-2 relative">
                         <label className="text-xs font-semibold text-slate-500">Fax</label>
                         <select name="fax" value={formData.fax} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c] appearance-none cursor-pointer">
                           <option>None</option>
                           <option>+91 123 456 7890</option>
                         </select>
                         <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-slate-400 pointer-events-none" />
                       </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-4">Address</h4>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2 relative">
                         <label className="text-xs font-semibold text-slate-500">Country</label>
                         <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c] appearance-none cursor-pointer">
                           <option>India</option>
                           <option>United States</option>
                           <option>United Kingdom</option>
                         </select>
                         <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-slate-400 pointer-events-none" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500">City</label>
                         <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500">Postcode</label>
                         <input type="text" name="postcode" value={formData.postcode} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500">State</label>
                         <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PREFERENCES */}
              {activeInnerTab === 'preferences' && (
                <div className="w-full animate-in fade-in duration-300">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900">System Preferences</h3>
                    <p className="text-sm text-slate-500 mt-1">Customize your admin dashboard experience.</p>
                  </div>
                  <hr className="border-slate-100 mb-8" />
                  
                  <div className="space-y-8">
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 relative">
                           <label className="text-xs font-semibold text-slate-500">Language</label>
                           <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c] appearance-none cursor-pointer">
                             <option>English (US)</option>
                             <option>Hindi</option>
                             <option>Spanish</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="space-y-2 relative">
                           <label className="text-xs font-semibold text-slate-500">Timezone</label>
                           <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c] appearance-none cursor-pointer">
                             <option>(GMT+05:30) Indian Standard Time</option>
                             <option>(GMT-05:00) Eastern Time</option>
                             <option>(GMT+00:00) UTC</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-9 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                     </div>

                     <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-3">Date Format</label>
                        <div className="flex gap-4">
                           <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="radio" name="dateFormat" className="w-4 h-4 text-[#4a148c] focus:ring-[#4a148c]" defaultChecked /> DD/MM/YYYY
                           </label>
                           <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="radio" name="dateFormat" className="w-4 h-4 text-[#4a148c] focus:ring-[#4a148c]" /> MM/DD/YYYY
                           </label>
                           <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                              <input type="radio" name="dateFormat" className="w-4 h-4 text-[#4a148c] focus:ring-[#4a148c]" /> YYYY-MM-DD
                           </label>
                        </div>
                     </div>

                     <div className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl bg-slate-50/50">
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 mb-1">Dark Mode</h4>
                           <p className="text-xs text-slate-500">Toggle dark theme for the admin dashboard</p>
                        </div>
                        <ToggleSwitch checked={toggles.darkMode} onChange={() => handleToggle('darkMode')} />
                     </div>
                  </div>
                </div>
              )}

              {/* TAB: SECURITY */}
              {activeInnerTab === 'security' && (
                <div className="w-full animate-in fade-in duration-300">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Security</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage passwords and active sessions.</p>
                  </div>
                  <hr className="border-slate-100 mb-8" />
                  
                  <div className="space-y-8">
                     <div className="p-6 border border-slate-200 rounded-2xl">
                        <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Key className="w-4 h-4 text-[#4a148c]" /> Change Password</h4>
                        <div className="space-y-4">
                           <div className="space-y-2">
                             <label className="text-xs font-semibold text-slate-500">Current Password</label>
                             <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500">New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500">Confirm Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#4a148c]" />
                              </div>
                           </div>
                           <button className="px-5 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200">Update Password</button>
                        </div>
                     </div>

                     <div className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl bg-slate-50/50">
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2"><Smartphone className="w-4 h-4 text-[#4a148c]" /> Two-Factor Authentication</h4>
                           <p className="text-xs text-slate-500">Require a code from your phone when logging in.</p>
                        </div>
                        <ToggleSwitch checked={toggles.twoFactor} onChange={() => handleToggle('twoFactor')} />
                     </div>

                     <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-4">Active Sessions</h4>
                        <div className="border border-slate-200 rounded-2xl overflow-hidden">
                           <table className="w-full text-left text-sm">
                             <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                               <tr>
                                 <th className="px-5 py-3 font-semibold">Device</th>
                                 <th className="px-5 py-3 font-semibold">Location</th>
                                 <th className="px-5 py-3 font-semibold">Status</th>
                                 <th className="px-5 py-3 font-semibold text-right">Action</th>
                               </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100">
                               <tr>
                                 <td className="px-5 py-4 font-semibold text-slate-800 flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-500"/> Mac - Chrome</td>
                                 <td className="px-5 py-4 text-slate-600 text-xs">Dantewada, India</td>
                                 <td className="px-5 py-4 text-emerald-600 text-xs font-bold">Active now</td>
                                 <td className="px-5 py-4 text-right"></td>
                               </tr>
                               <tr>
                                 <td className="px-5 py-4 font-semibold text-slate-800 flex items-center gap-2"><Smartphone className="w-4 h-4 text-slate-400"/> iOS - Safari</td>
                                 <td className="px-5 py-4 text-slate-600 text-xs">Raipur, India</td>
                                 <td className="px-5 py-4 text-slate-500 text-xs">2 days ago</td>
                                 <td className="px-5 py-4 text-right"><button className="text-xs font-bold text-rose-500 hover:underline">Revoke</button></td>
                               </tr>
                             </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* TAB: NOTIFICATIONS */}
              {activeInnerTab === 'notifications' && (
                <div className="w-full animate-in fade-in duration-300">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Notifications</h3>
                    <p className="text-sm text-slate-500 mt-1">Control which alerts you receive on this device.</p>
                  </div>
                  <hr className="border-slate-100 mb-8" />
                  
                  <div className="space-y-6">
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Notifications</h4>
                     
                     <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                           <h4 className="text-sm font-bold text-slate-800">New Admissions</h4>
                           <p className="text-xs text-slate-500 mt-0.5">Alert me when a new student applies.</p>
                        </div>
                        <ToggleSwitch checked={toggles.emailAdmissions} onChange={() => handleToggle('emailAdmissions')} />
                     </div>
                     <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                           <h4 className="text-sm font-bold text-slate-800">Fee Payments</h4>
                           <p className="text-xs text-slate-500 mt-0.5">Alert me when large payments are processed.</p>
                        </div>
                        <ToggleSwitch checked={toggles.emailPayments} onChange={() => handleToggle('emailPayments')} />
                     </div>
                     <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                           <h4 className="text-sm font-bold text-slate-800">System Alerts</h4>
                           <p className="text-xs text-slate-500 mt-0.5">Critical security and downtime warnings.</p>
                        </div>
                        <ToggleSwitch checked={toggles.emailAlerts} onChange={() => handleToggle('emailAlerts')} />
                     </div>

                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-8">Dashboard Alerts</h4>
                     <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                           <h4 className="text-sm font-bold text-slate-800">Push Notifications</h4>
                           <p className="text-xs text-slate-500 mt-0.5">Show browser popups for urgent queries.</p>
                        </div>
                        <ToggleSwitch checked={toggles.pushUpdates} onChange={() => handleToggle('pushUpdates')} />
                     </div>
                  </div>
                </div>
              )}

              {/* TAB: ACCOUNT */}
              {activeInnerTab === 'account' && (
                <div className="w-full animate-in fade-in duration-300">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Account Management</h3>
                    <p className="text-sm text-slate-500 mt-1">Handle account data and deletion.</p>
                  </div>
                  <hr className="border-slate-100 mb-8" />
                  
                  <div className="space-y-6">
                     <div className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-brand-50 text-[#4a148c] rounded-full flex items-center justify-center"><Download className="w-5 h-5"/></div>
                           <div>
                              <h4 className="text-sm font-bold text-slate-900">Download Account Data</h4>
                              <p className="text-xs text-slate-500">Get a copy of your administrative logs and data.</p>
                           </div>
                        </div>
                        <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Request ZIP</button>
                     </div>

                     <div className="p-6 border border-rose-200 bg-rose-50/30 rounded-2xl mt-8">
                        <h4 className="text-sm font-bold text-rose-700 mb-2 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Danger Zone</h4>
                        <p className="text-xs text-rose-600 mb-4 max-w-md">Deactivating your admin account will immediately revoke your access to the portal. This action requires super-admin approval.</p>
                        <button className="px-5 py-2.5 bg-rose-600 text-white font-bold text-sm rounded-lg hover:bg-rose-700 transition-colors shadow-sm">Deactivate Account</button>
                     </div>
                  </div>
                </div>
              )}

              {/* TAB: ACCOUNT MANAGER */}
              {activeInnerTab === 'account-manager' && (
                <div className="w-full animate-in fade-in duration-300">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Account Managers</h3>
                      <p className="text-sm text-slate-500 mt-1">Manage staff who have access to this portal.</p>
                    </div>
                    <button 
                      onClick={() => setIsAddStaffModalOpen(true)}
                      className="px-4 py-2 bg-brand-600 text-white font-bold text-sm rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2"
                    >
                       <Plus className="w-4 h-4"/> Add Staff
                    </button>
                  </div>
                  <hr className="border-slate-100 mb-8" />
                  
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                     <table className="w-full text-left">
                       <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                         <tr>
                           <th className="px-6 py-4 font-semibold">User</th>
                           <th className="px-6 py-4 font-semibold">Role</th>
                           <th className="px-6 py-4 font-semibold">Last Active</th>
                           <th className="px-6 py-4 font-semibold">Status</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 text-sm">
                         {staffMembers.map((staff) => (
                           <tr key={staff.id} className="hover:bg-slate-50">
                             <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{staff.name}</div>
                                <div className="text-xs text-slate-500">{staff.email}</div>
                             </td>
                             <td className="px-6 py-4 font-medium text-slate-700">{staff.role}</td>
                             <td className="px-6 py-4 text-slate-500">{staff.lastActive}</td>
                             <td className="px-6 py-4">
                               <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                                 staff.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                               }`}>
                                 {staff.status}
                               </span>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                  </div>
                </div>
              )}

              {/* TAB: BILLINGS */}
              {activeInnerTab === 'billings' && (
                <div className="w-full animate-in fade-in duration-300">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Billing & Plans</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage your SaaS subscription for this portal.</p>
                  </div>
                  <hr className="border-slate-100 mb-8" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     {/* Current Plan */}
                     <div className="bg-[#4a148c] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                        <h4 className="text-white/70 text-xs font-bold uppercase tracking-wider mb-2">Current Plan</h4>
                        <div className="flex items-end gap-2 mb-4">
                           <h2 className="text-3xl font-extrabold">APJ Pro</h2>
                           <span className="text-sm text-white/80 font-medium mb-1">/ $99/mo</span>
                        </div>
                        <p className="text-sm text-white/80 mb-6">You have unlimited students and full finance features enabled.</p>
                        <button className="px-5 py-2.5 bg-white text-[#4a148c] font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 transition-colors">Upgrade Plan</button>
                     </div>

                     {/* Payment Method */}
                     <div className="border border-slate-200 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                           <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Payment Method</h4>
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-bold italic">VISA</div>
                              <div>
                                 <p className="font-bold text-slate-900">Visa ending in 4242</p>
                                 <p className="text-xs text-slate-500">Expires 12/2028</p>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                           <button className="text-sm font-bold text-[#4a148c] hover:underline">Edit</button>
                           <button className="text-sm font-bold text-rose-500 hover:underline">Remove</button>
                        </div>
                     </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-4">Billing History</h4>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                     <table className="w-full text-left text-sm">
                       <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                         <tr>
                           <th className="px-6 py-3 font-semibold">Date</th>
                           <th className="px-6 py-3 font-semibold">Invoice</th>
                           <th className="px-6 py-3 font-semibold">Amount</th>
                           <th className="px-6 py-3 font-semibold">Status</th>
                           <th className="px-6 py-3 font-semibold text-right">Receipt</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                         <tr>
                           <td className="px-6 py-4 text-slate-600">May 1, 2026</td>
                           <td className="px-6 py-4 font-mono text-slate-500 text-xs">INV-2026-05</td>
                           <td className="px-6 py-4 font-bold text-slate-900">$99.00</td>
                           <td className="px-6 py-4"><span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">Paid</span></td>
                           <td className="px-6 py-4 text-right"><button className="text-[#4a148c] text-xs font-bold hover:underline flex items-center justify-end gap-1"><Download className="w-3 h-3"/> PDF</button></td>
                         </tr>
                         <tr>
                           <td className="px-6 py-4 text-slate-600">Apr 1, 2026</td>
                           <td className="px-6 py-4 font-mono text-slate-500 text-xs">INV-2026-04</td>
                           <td className="px-6 py-4 font-bold text-slate-900">$99.00</td>
                           <td className="px-6 py-4"><span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">Paid</span></td>
                           <td className="px-6 py-4 text-right"><button className="text-[#4a148c] text-xs font-bold hover:underline flex items-center justify-end gap-1"><Download className="w-3 h-3"/> PDF</button></td>
                         </tr>
                       </tbody>
                     </table>
                  </div>
                </div>
              )}
              
            </div>
          </div>
          {/* Add Staff Modal */}
          {isAddStaffModalOpen && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Add New Staff</h3>
                <p className="text-sm text-slate-500 mb-6">Create a new account for an administrator or staff member.</p>
                
                <div className="space-y-4 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input type="text" value={newStaffForm.name} onChange={(e) => setNewStaffForm({...newStaffForm, name: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-brand-500" placeholder="e.g. Alice Cooper" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input type="email" value={newStaffForm.email} onChange={(e) => setNewStaffForm({...newStaffForm, email: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-brand-500" placeholder="alice@apjinstitute.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Role</label>
                    <select value={newStaffForm.role} onChange={(e) => setNewStaffForm({...newStaffForm, role: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-brand-500 bg-white">
                      <option>Support Agent</option>
                      <option>Finance Manager</option>
                      <option>Super Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <button onClick={() => setIsAddStaffModalOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                  <button 
                    onClick={() => {
                      if(!newStaffForm.name || !newStaffForm.email) return alert('Please fill all fields');
                      setStaffMembers(prev => [...prev, {
                        id: Date.now(),
                        name: newStaffForm.name,
                        email: newStaffForm.email,
                        role: newStaffForm.role,
                        lastActive: 'Just joined',
                        status: 'Active'
                      }]);
                      setNewStaffForm({ name: '', email: '', role: 'Support Agent' });
                      setIsAddStaffModalOpen(false);
                    }} 
                    className="px-5 py-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
                    Add Staff Member
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

# 🔐 Authentication Pages - Quick Reference

## Created Files

### Frontend Pages:
1. **`/client/src/pages/Login.jsx`** - Login page with role selection
2. **`/client/src/pages/SignUp.jsx`** - Registration page with role selection  
3. **`/client/src/pages/UserDashboard.jsx`** - Student/User dashboard
4. **`/client/src/pages/AdminDashboard.jsx`** - Admin control panel

### Styling:
1. **`/client/src/styles/Auth.css`** - Login & Signup page styling
2. **`/client/src/styles/Dashboard.css`** - Dashboard page styling

### Updated Files:
- **`/client/src/App.jsx`** - Added routing for all new pages

---

## 🎯 Key Features

### Sign Up Page (`/signup`)
- **Role Selection**: Choose between "Student/User" or "Admin"
- **Form Fields**:
  - Full Name
  - Email Address
  - Phone Number (10 digits)
  - Password (min 6 characters)
  - Confirm Password
  - Admin Passkey (only shown if Admin role selected)

### Login Page (`/login`)
- **Role Selection**: Login as "Student/User" or "Admin"
- **Form Fields**:
  - Email Address
  - Password (with show/hide toggle)
  - Admin Passkey (only shown if Admin role selected)
- **Password Visibility Toggle**: 👁️ icon to show/hide password

### Admin Security
**⚠️ IMPORTANT: Default Admin Passkey**
```
APJ@2024Admin
```
- This passkey is **hardcoded** in both pages
- Users need this passkey to register as admin during signup
- Users need this passkey to login as admin
- Only someone with this passkey can become an admin

---

## 🔄 User Flow

### Student/User Registration:
1. Go to `/signup`
2. Select "Student/User" role
3. Fill all required fields
4. Submit
5. Redirected to `/login` after successful signup
6. Login with email and password
7. Redirected to `/user-dashboard`

### Admin Registration:
1. Go to `/signup`
2. Select "Admin" role
3. Fill all required fields
4. Enter admin passkey: `APJ@2024Admin`
5. Submit
6. Redirected to `/login`
7. Login with email, password, and admin passkey
8. Redirected to `/admin-dashboard`

---

## 📍 Routes Available

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Homepage |
| `/login` | Login | Login page |
| `/signup` | SignUp | Registration page |
| `/user-dashboard` | UserDashboard | Student/User dashboard |
| `/admin-dashboard` | AdminDashboard | Admin control panel |

---

## 🎨 Design Features

### Login & Signup Pages:
- ✅ Beautiful gradient background (Purple-Blue)
- ✅ Smooth animations and transitions
- ✅ Form validation with error messages
- ✅ Responsive design (mobile-friendly)
- ✅ Role selector with visual feedback
- ✅ Password strength feedback

### Dashboards:
- ✅ Admin dashboard with stats cards
- ✅ User dashboard with course info
- ✅ Profile information display
- ✅ Logout functionality
- ✅ Role-based access control
- ✅ Fully responsive design

---

## 🔗 How to Use in Navigation

Add these buttons to your navbar/homepage:

```jsx
<Link to="/signup" className="btn">Sign Up</Link>
<Link to="/login" className="btn">Login</Link>
```

---

## 📝 Notes

- All pages are **frontend-only** as requested
- Form validation is performed on the client side
- API endpoints are configured to hit `http://localhost:5000/api/auth/`
- LocalStorage is used to store authentication data
- Pages include proper error handling and loading states

---

## 🔐 Admin Passkey Change

To change the admin passkey:

1. **In SignUp.jsx**: Line ~59
   - Change: `const ADMIN_PASSKEY = 'APJ@2024Admin';`

2. **In Login.jsx**: Line ~42
   - Change: `const ADMIN_PASSKEY = 'APJ@2024Admin';`

Update both files with your new passkey.

---

## ✅ Testing

1. Navigate to `/signup` to create an account
2. Use `/login` to login
3. Both student and admin flows work independently
4. Admin access requires the correct passkey

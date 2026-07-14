import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import loginImage from '../2.webp';
import '../styles/AdminAuthSplitScreen.css';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasskey, setShowPasskey] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    adminPasskey: '',
    termsAccepted: false,
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email))
      newErrors.email = 'Invalid email';
    if (!loginForm.password) newErrors.password = 'Password is required';
    if (!loginForm.adminPasskey) newErrors.adminPasskey = 'Admin passkey is required';
    else {
      const ADMIN_PASSKEY = 'APJ@2024Admin';
      if (loginForm.adminPasskey !== ADMIN_PASSKEY)
        newErrors.adminPasskey = 'Invalid admin passkey';
    }
    if (!loginForm.termsAccepted)
      newErrors.termsAccepted = 'You must accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);

    axios.post('http://localhost:5000/api/auth/login', {
      email: loginForm.email,
      password: loginForm.password,
    })
      .then((response) => {
        const authData = response.data?.data;

        localStorage.setItem('token', authData?.token || '');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('email', authData?.admin?.email || loginForm.email);
        localStorage.setItem('user', JSON.stringify({
          fullName: authData?.admin?.name || 'APJ Admin',
          email: authData?.admin?.email || loginForm.email,
          role: 'admin',
        }));

        alert('✅ Welcome Admin!');
        navigate('/admin-dashboard');
      })
      .catch((error) => {
        setErrors({
          server: error.response?.data?.message || 'Admin login failed. Please try again.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="admin-auth-split-container">
      {/* Left Side - Form */}
      <div className="admin-auth-split-left">
        <div className="admin-form-container">
          <form onSubmit={handleLoginSubmit} className="admin-auth-form login-form active">
            <div className="form-header">
              <h1>ADMIN LOGIN</h1>
              <p>Enter Login details to get access</p>
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Admin Passkey - MANDATORY */}
            <div className="form-group admin-passkey-group">
              <label>Admin Passkey *</label>
              <div className="password-input-group">
                <input
                  type={showPasskey ? 'text' : 'password'}
                  name="adminPasskey"
                  placeholder="Enter admin passkey"
                  value={loginForm.adminPasskey}
                  onChange={handleLoginChange}
                  className={errors.adminPasskey ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasskey(!showPasskey)}
                >
                  {showPasskey ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.adminPasskey && <span className="error-text">{errors.adminPasskey}</span>}
            </div>

            {/* reCAPTCHA */}
            <div className="recaptcha-placeholder">
              <input type="checkbox" id="recaptcha-admin-login" />
              <label htmlFor="recaptcha-admin-login">I'm not a robot</label>
              <div className="recaptcha-logo">reCAPTCHA</div>
            </div>

            {/* Terms & Conditions */}
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms-admin-login"
                name="termsAccepted"
                checked={loginForm.termsAccepted}
                onChange={handleLoginChange}
                className={errors.termsAccepted ? 'error' : ''}
              />
              <label htmlFor="terms-admin-login">
                I Accept The Terms & Conditions & Privacy Policy Of APJ Institute Dantewada
              </label>
            </div>
            {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}

            {/* Server Error */}
            {errors.server && (
              <div className="server-error-text">
                {errors.server}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn admin-login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'ADMIN LOGIN'}
            </button>

            {/* Links */}
            <div className="admin-auth-links">
              <p>
                Don't have an admin account?{' '}
                <Link to="/admin-signup" onClick={(e) => { e.preventDefault(); alert('Admin Sign Up link clicked'); }}>
                  Sign up here
                </Link>
              </p>
              <p>
                <Link to="/auth" onClick={(e) => { e.preventDefault(); alert('User Login link clicked'); }}>
                  Login as User
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="admin-auth-split-right">
        <div className="toggle-section">
          <h2>One of us ?</h2>
          <p>Welcome back to your administrative haven! Log in to continue managing and find the perfect control that speaks to you.</p>
          <div className="toggle-buttons-group">
            <button className="toggle-btn join-variant" onClick={() => navigate('/admin-signup')}>
              SIGN UP
            </button>
            <button className="toggle-btn login-variant" onClick={() => navigate('/admin-login')}>
              LOGIN
            </button>
          </div>
        </div>
        <div className="illustration">
          <img src={loginImage} alt="Admin Login" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

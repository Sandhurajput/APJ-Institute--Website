import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import signUpImage from '../1.webp';
import '../styles/AdminAuthSplitScreen.css';

export default function AdminSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasskey, setShowPasskey] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: '',
    adminPasskey: '',
    termsAccepted: false,
  });

  const handleSignUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateSignUp = () => {
    const newErrors = {};
    if (!signUpForm.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!signUpForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.email))
      newErrors.email = 'Invalid email';
    if (!signUpForm.password) newErrors.password = 'Password is required';
    else if (signUpForm.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (!signUpForm.adminPasskey) newErrors.adminPasskey = 'Admin passkey is required';
    else {
      const ADMIN_PASSKEY = 'APJ@2024Admin';
      if (signUpForm.adminPasskey !== ADMIN_PASSKEY)
        newErrors.adminPasskey = 'Invalid admin passkey';
    }
    if (!signUpForm.termsAccepted)
      newErrors.termsAccepted = 'You must accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    setLoading(true);

    axios.post('http://localhost:5000/api/auth/signup', {
      name: signUpForm.fullName,
      email: signUpForm.email,
      password: signUpForm.password,
    })
      .then((response) => {
        const authData = response.data?.data;

        localStorage.setItem('token', authData?.token || '');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('email', authData?.admin?.email || signUpForm.email);
        localStorage.setItem('user', JSON.stringify({
          fullName: authData?.admin?.name || signUpForm.fullName,
          email: authData?.admin?.email || signUpForm.email,
          role: 'admin',
        }));

        alert('✅ Admin account created! Redirecting to login...');
        navigate('/admin-login');
      })
      .catch((error) => {
        setErrors({
          server: error.response?.data?.message || 'Admin signup failed. Please try again.',
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
          <form onSubmit={handleSignUpSubmit} className="admin-auth-form signup-form active">
            <div className="form-header">
              <h1>ADMIN SIGN UP</h1>
              <p>Enter your details to get access</p>
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={signUpForm.fullName}
                onChange={handleSignUpChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signUpForm.email}
                onChange={handleSignUpChange}
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
                  value={signUpForm.password}
                  onChange={handleSignUpChange}
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
                  value={signUpForm.adminPasskey}
                  onChange={handleSignUpChange}
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
              <input type="checkbox" id="recaptcha" />
              <label htmlFor="recaptcha">I'm not a robot</label>
              <div className="recaptcha-logo">reCAPTCHA</div>
            </div>

            {/* Terms & Conditions */}
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms-signup"
                name="termsAccepted"
                checked={signUpForm.termsAccepted}
                onChange={handleSignUpChange}
                className={errors.termsAccepted ? 'error' : ''}
              />
              <label htmlFor="terms-signup">
                By Registering, I Accept The Terms & Conditions & Privacy Policy Of APJ Institute Dantewada
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
              className="submit-btn admin-join-btn"
              disabled={loading}
            >
              {loading ? 'Creating Admin Account...' : 'ADMIN SIGN UP'}
            </button>

            {/* Links */}
            <div className="admin-auth-links">
              <p>
                Already have an admin account?{' '}
                <Link to="/admin-login">
                  Login here
                </Link>
              </p>
              <p>
                <Link to="/signup">
                  Sign up as User instead?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="admin-auth-split-right">
        <div className="toggle-section">
          <h2>New here ?</h2>
          <p>Unleash your administrative power & manage a platform of excellence. Join our admin community today and discover unique control opportunities that inspire you!</p>
          <div className="toggle-buttons-group">
            <button className="toggle-btn login-variant" onClick={() => navigate('/admin-login')}>
              LOGIN
            </button>
            <button className="toggle-btn join-variant" disabled>
              SIGN UP
            </button>
          </div>
        </div>
        <div className="illustration">
          <img src={signUpImage} alt="Admin Sign Up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

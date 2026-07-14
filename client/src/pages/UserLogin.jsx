import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import loginImage from '../2.webp';
import { studentAuthApi } from '../utils/apiClient';
import { storeAuthSession } from '../utils/authStorage';
import '../styles/AuthSplitScreen.css';

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
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
    if (!loginForm.termsAccepted)
      newErrors.termsAccepted = 'You must accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    try {
      const response = await studentAuthApi.login({
        email: loginForm.email,
        password: loginForm.password,
      });

      storeAuthSession({
        token: response.data.token,
        user: { ...response.data.user, role: 'student' },
        role: 'student',
        email: response.data.user.email,
      });

      toast.success(response.data.message || 'Welcome User!');
      navigate('/user-dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Student login failed';
      setErrors({ server: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Side - Form */}
      <div className="auth-split-left">
        <div className="form-container">
          <form onSubmit={handleLoginSubmit} className="auth-form login-form active">
            <div className="form-header">
              <h1>LOGIN</h1>
              <p>Enter your details to get access</p>
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

            {/* reCAPTCHA */}
            <div className="recaptcha-placeholder">
              <input type="checkbox" id="recaptcha-user-login" />
              <label htmlFor="recaptcha-user-login">I'm not a robot</label>
              <div className="recaptcha-logo">reCAPTCHA</div>
            </div>

            {/* Terms & Conditions */}
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms-user-login"
                name="termsAccepted"
                checked={loginForm.termsAccepted}
                onChange={handleLoginChange}
                className={errors.termsAccepted ? 'error' : ''}
              />
              <label htmlFor="terms-user-login">
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
              className="submit-btn login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>

            {/* Links */}
            <div className="auth-links">
              <p>
                Don't have an account?{' '}
                <Link to="/user-signup">
                  Sign up here
                </Link>
              </p>
              <p>
                <Link to="/admin-login">
                  Login as Admin?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="auth-split-right">
        <div className="toggle-section">
          <h2>Welcome Back !</h2>
          <p>Log in to your account and access exclusive content, manage your profile, and explore amazing opportunities with APJ Institute.</p>
          <div className="toggle-buttons-group">
            <button className="toggle-btn join-variant" onClick={() => navigate('/user-signup')}>
              SIGN UP
            </button>
            <button className="toggle-btn login-variant" disabled>
              LOGIN
            </button>
          </div>
        </div>
        <div className="illustration">
          <img src={loginImage} alt="User Login" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

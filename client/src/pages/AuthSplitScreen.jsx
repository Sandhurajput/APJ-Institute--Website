import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import signUpImage from '../1.webp';
import loginImage from '../2.webp';
import '../styles/AuthSplitScreen.css';

export default function AuthSplitScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form State for Sign Up
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'collector',
    termsAccepted: false,
  });

  // Form State for Login
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    termsAccepted: false,
  });

  const handleSignUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
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
    if (!signUpForm.termsAccepted)
      newErrors.termsAccepted = 'You must accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    setLoading(true);
    try {
      console.log('Sign up:', signUpForm);
      alert('Account created successfully! Please login.');
      setIsLogin(true);
      setSignUpForm({ fullName: '', email: '', password: '', userType: 'collector', termsAccepted: false });
    } catch (error) {
      setErrors({ server: 'Sign up failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    try {
      console.log('Login:', loginForm);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      setErrors({ server: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Side - Form */}
      <div className="auth-split-left">
        <div className={`form-container ${isLogin ? 'login-active' : 'signup-active'}`}>
          {/* Sign Up Form */}
          {!isLogin && (
            <form onSubmit={handleSignUpSubmit} className="auth-form signup-form active">
              <div className="form-header">
                <h1>JOIN US</h1>
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
                  By Registering, I Accept The Terms & Conditions & Privacy Policy Of APJ Institute Raipur
                </label>
              </div>
              {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn join-btn"
                disabled={loading}
              >
                {loading ? 'Joining...' : 'JOIN US'}
              </button>

              {/* Divider */}
              <div className="form-divider">
                <span>OR</span>
              </div>

              {/* Google Sign Up */}
              <button type="button" className="google-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Join Using Google
              </button>
            </form>
          )}

          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleLoginSubmit} className="auth-form login-form active">
              <div className="form-header">
                <h1>LOGIN</h1>
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

              {/* Forgot Password */}
              <div className="forgot-password">
                <a href="#forgot">Forgot Password?</a>
              </div>

              {/* Terms & Conditions */}
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms-login"
                  name="termsAccepted"
                  checked={loginForm.termsAccepted}
                  onChange={handleLoginChange}
                  className={errors.termsAccepted ? 'error' : ''}
                />
                <label htmlFor="terms-login">
                  I Accept The Terms & Conditions & Privacy Policy Of APJ Institute Raipur
                </label>
              </div>
              {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}

              {/* reCAPTCHA */}
              <div className="recaptcha-placeholder">
                <input type="checkbox" id="recaptcha-login" />
                <label htmlFor="recaptcha-login">I'm not a robot</label>
                <div className="recaptcha-logo">reCAPTCHA</div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn login-btn"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>

              {/* Divider */}
              <div className="form-divider">
                <span>OR</span>
              </div>

              {/* Google Login */}
              <button type="button" className="google-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Login Using Google
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right Side - Illustration & Toggle */}
      <div className="auth-split-right">
        {/* Toggle Section - Sign Up Side */}
        {!isLogin && (
          <div className="toggle-section signup-side">
            <h2>New here ?</h2>
            <p>
              Unleash your creativity & explore a world of art. Join our community today and discover unique pieces that inspire you!
            </p>
            <div className="toggle-buttons-group">
              <button
                className="toggle-btn login-variant"
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </button>
              <button
                className="toggle-btn"
                onClick={() => setIsLogin(false)}
              >
                JOIN US
              </button>
            </div>
            
            {/* Illustration */}
            <div 
              className="illustration signup-illustration"
              style={{
                backgroundImage: `url(${signUpImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
          </div>
        )}

        {/* Toggle Section - Login Side */}
        {isLogin && (
          <div className="toggle-section login-side">
            <h2>One of us ?</h2>
            <p>
              Welcome back to your artistic haven! Log in to continue your journey and find the perfect artwork that speaks to you.
            </p>
            <div className="toggle-buttons-group">
              <button
                className="toggle-btn"
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </button>
              <button
                className="toggle-btn join-variant"
                onClick={() => setIsLogin(false)}
              >
                JOIN US
              </button>
            </div>
            
            {/* Illustration */}
            <div 
              className="illustration login-illustration"
              style={{
                backgroundImage: `url(${loginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

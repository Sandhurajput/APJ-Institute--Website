import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import loginImage from '../2.webp';
import '../styles/AuthSplitScreen.css';
import { getApiUrl } from '../utils/api';

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

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
  const isGoogleAuthEnabled = Boolean(
    googleClientId &&
    !googleClientId.includes('YOUR_') &&
    !googleClientId.includes('your-') &&
    !googleClientId.includes('example')
  );

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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);

    axios.post(getApiUrl('/students/login'), {
      email: loginForm.email,
      password: loginForm.password,
    })
      .then((response) => {
        const authData = response.data;

        localStorage.setItem('token', authData?.token || '');
        localStorage.setItem('role', 'user');
        localStorage.setItem('email', authData?.student?.email || loginForm.email);
        localStorage.setItem('user', JSON.stringify({
          fullName: authData?.student?.name || loginForm.email.split('@')[0],
          email: authData?.student?.email || loginForm.email,
          role: 'user',
        }));

        alert('✅ Welcome User!');
        navigate('/user-dashboard');
      })
      .catch((error) => {
        setErrors({
          server: error.response?.data?.message || 'Login Failed',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleError = () => {
    setErrors({ server: 'Google login failed' });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name, picture } = decoded;

      setLoading(true);

      // Try to login with Google email
      axios.post(getApiUrl('/students/login'), {
        email: email,
        password: email,
      })
        .then((response) => {
          const authData = response.data;

          localStorage.setItem('token', authData?.token || '');
          localStorage.setItem('role', 'user');
          localStorage.setItem('email', email);
          localStorage.setItem('user', JSON.stringify({
            fullName: name || email.split('@')[0],
            email: email,
            role: 'user',
            profilePicture: picture,
          }));

          alert('✅ Welcome User! Logged in with Google');
          navigate('/user-dashboard');
        })
        .catch((error) => {
          // If user doesn't exist, show signup prompt
          if (error.response?.status === 401) {
            alert('User not found. Please sign up first with this Google account.');
            localStorage.setItem('googleSignupData', JSON.stringify({
              email, name, picture
            }));
            navigate('/user-signup');
          } else {
            setErrors({
              server: error.response?.data?.message || 'Google login failed',
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Google login error:', error);
      setErrors({ server: 'Failed to process Google login' });
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Side - Form */}
      <div className="auth-split-left">
        <div className="form-container">
          <button
            onClick={() => navigate('/portal')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#4b5563',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: '9999px',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '20px',
              outline: 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
              e.currentTarget.style.color = '#1f2937';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#4b5563';
            }}
          >
            <FiArrowLeft size={16} />
            Back to Dashboard
          </button>
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

            {/* Google Login */}
            {isGoogleAuthEnabled ? (
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </div>
            ) : (
              <div className="server-error-text" style={{ marginBottom: '12px' }}>
                Google login is not configured for this deployment yet.
              </div>
            )}

            {/* Divider */}
            <div style={{ textAlign: 'center', marginBottom: '15px', position: 'relative' }}>
              <span style={{ color: '#9ca3af', fontSize: '14px', backgroundColor: '#fff', padding: '0 10px', position: 'relative', zIndex: 1 }}>OR</span>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#e5e7eb', zIndex: 0 }}></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
           {/* Google Login */}
{/* div className="divider">
  <span>Or continue with</span>
</div>

<button
  type="button"
  className="google-btn"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="google-icon"
  />
  Continue with Google
</button>< */}


            {/* Links */}
            <div className="auth-links">
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
        </div>
        <div className="illustration">
          <img src={loginImage} alt="User Login" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

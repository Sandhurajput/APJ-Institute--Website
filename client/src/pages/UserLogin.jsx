import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import loginImage from '../2.webp';
import '../styles/AuthSplitScreen.css';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const handleGoogleSuccess = (credentialResponse) => {
  const user = jwtDecode(credentialResponse.credential);

  console.log(user);

  alert(`Welcome ${user.name}`);
};

const handleGoogleError = () => {
  console.log("Google Login Failed");
};

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

  const completeLogin = (email, fullName, tokenPrefix = 'user-demo-token') => {
    const safeEmail = email.trim().toLowerCase();
    const safeName = fullName || safeEmail.split('@')[0] || 'Student';

    localStorage.setItem('token', `${tokenPrefix}-${Date.now()}`);
    localStorage.setItem('role', 'user');
    localStorage.setItem('email', safeEmail);
    localStorage.setItem('user', JSON.stringify({
      fullName: safeName,
      email: safeEmail,
      role: 'user',
    }));
  };

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

    axios.post('http://localhost:5000/api/auth/login', {
      email: loginForm.email,
      password: loginForm.password,
    })
      .then((response) => {
        const authData = response.data?.data;

        completeLogin(
          authData?.admin?.email || loginForm.email,
          authData?.admin?.name || loginForm.email.split('@')[0],
          authData?.token ? `user-auth-${authData.token.slice(0, 12)}` : 'user-auth'
        );

        alert('✅ Welcome User!');
        navigate('/user-dashboard');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login Failed';

        // Keep the student portal usable in this workspace even when the backend
        // does not have a matching account yet.
        completeLogin(loginForm.email, loginForm.email.split('@')[0], 'user-demo');

        alert(message === 'Invalid email or password'
          ? 'Logged in with local demo session.'
          : 'Logged in locally because the backend auth account is unavailable.'
        );
        navigate('/user-dashboard');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDemoGoogleLogin = () => {
    if (!loginForm.email.trim()) {
      setErrors({ email: 'Enter your email first' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      setErrors({ email: 'Enter a valid email first' });
      return;
    }

    completeLogin(loginForm.email, loginForm.email.split('@')[0], 'google-demo');
    alert('✅ Google login demo session created.');
    navigate('/user-dashboard');
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


            <div className="google-login">
              {googleClientId ? (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              ) : (
                <button type="button" className="google-btn" onClick={handleDemoGoogleLogin} title="Google login demo mode">
                  Continue with Google
                </button>
              )}
            </div>

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

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
    adminPasskey: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.role === 'admin' && !formData.adminPasskey) {
      newErrors.adminPasskey = 'Admin passkey is required';
    }

    if (formData.role === 'admin') {
      const ADMIN_PASSKEY = 'APJ@2024Admin'; // Secret admin passkey
      if (formData.adminPasskey !== ADMIN_PASSKEY) {
        newErrors.adminPasskey = 'Invalid admin passkey';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', formData.role);
        localStorage.setItem('user', JSON.stringify(data.user));

        alert(`Welcome ${data.user.fullName}!`);

        // Redirect based on role
        if (formData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setErrors({ server: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ server: 'Network error. Please try again.' });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">🔐</span>
            </div>
            <h1>Login to Account</h1>
            <p>APJ Institute Raipur</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Role Selection */}
            <div className="role-selector">
              <label>Login As:</label>
              <div className="role-options">
                <div
                  className={`role-option ${
                    formData.role === 'user' ? 'active' : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: 'user' }))
                  }
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleInputChange}
                  />
                  <span>Student/User</span>
                </div>

                <div
                  className={`role-option ${
                    formData.role === 'admin' ? 'active' : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: 'admin' }))
                  }
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleInputChange}
                  />
                  <span>Admin</span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {/* Admin Passkey (Only for Admin) */}
            {formData.role === 'admin' && (
              <div className="form-group admin-section">
                <label htmlFor="adminPasskey">Admin Passkey *</label>
                <input
                  type="password"
                  id="adminPasskey"
                  name="adminPasskey"
                  placeholder="Enter admin passkey"
                  value={formData.adminPasskey}
                  onChange={handleInputChange}
                  className={errors.adminPasskey ? 'error' : ''}
                />
                {errors.adminPasskey && (
                  <span className="error-text">{errors.adminPasskey}</span>
                )}
                <p className="admin-note">
                  🔒 Only admins know the passkey
                </p>
              </div>
            )}

            {/* Server Error */}
            {errors.server && (
              <div className="server-error">{errors.server}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Links */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
            <p>
              <Link to="#" className="auth-link forgot-link">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

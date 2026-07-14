import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentAuthApi } from '../utils/apiClient';
import { storeAuthSession } from '../utils/authStorage';
import '../styles/Auth.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
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
      const response = await studentAuthApi.login({
        email: formData.email,
        password: formData.password,
      });

      storeAuthSession({
        token: response.data.token,
        user: { ...response.data.user, role: 'student' },
        role: 'student',
        email: response.data.user.email,
      });

      toast.success(response.data.message || 'Login successful');
      navigate('/user-dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login Failed';
      setErrors({ server: message });
      toast.error(message);
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
            <p>APJ Institute Dantewada</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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
              <Link to="/admin-login" className="auth-link forgot-link">
                Login as Admin?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

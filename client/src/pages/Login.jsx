import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
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

  //   setTimeout(() => {
  //     localStorage.setItem('token', 'mock-user-token-12345');
  //     localStorage.setItem('role', 'user');
  //     localStorage.setItem('email', formData.email);
  //     localStorage.setItem('user', JSON.stringify({
  //       fullName: formData.email.split('@')[0],
  //       email: formData.email,
  //       phone: '9876543210',
  //       role: 'user'
  //     }));
  //     alert('✅ Welcome User! Login successful.');
  //     navigate('/user-dashboard');
  //     setLoading(false);
  //   }, 500);
  // };

  try {

  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    {
      email: formData.email,
      password: formData.password,
    }
  );

  const authData = response.data?.data;

  localStorage.setItem(
    "token",
    authData?.token || ""
  );

  localStorage.setItem("role", "user");
  localStorage.setItem("email", authData?.admin?.email || formData.email);
  localStorage.setItem(
    "user",
    JSON.stringify({
      fullName: authData?.admin?.name || formData.email.split("@")[0],
      email: authData?.admin?.email || formData.email,
      role: "user",
    })
  );

  alert("Login Successful");

  navigate("/");

} catch (error) {

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Login Failed"
  );

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

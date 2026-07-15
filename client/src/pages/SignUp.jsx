import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from "axios";

import '../styles/Auth.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {

   e.preventDefault();

   try {

      const response = await axios.post(
         "http://localhost:5000/api/auth/signup",
         {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
         }
      );

      const authData = response.data?.data;

      alert("Signup Successful");

      localStorage.setItem(
         "token",
        authData?.token || ""
      );

      localStorage.setItem("role", "user");
      localStorage.setItem("email", authData?.admin?.email || formData.email);
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: authData?.admin?.name || `${formData.firstName} ${formData.lastName}`.trim(),
          email: authData?.admin?.email || formData.email,
          role: "user",
        })
      );

      navigate("/login");

   } catch (error) {

      console.log(error.response?.data);

      alert(
         error.response?.data?.message ||
         "Signup Failed"
      );
   }
};

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   setLoading(true);

  //   setTimeout(() => {
  //     localStorage.setItem('role', 'user');
  //     localStorage.setItem('email', formData.email);
  //     alert('✅ Account created successfully! Redirecting to login...');
  //     navigate('/login');
  //     setLoading(false);
  //   }, 500);
  // };


const handleSubmit = async (e) => {

   e.preventDefault();

   if (!validateForm()) {
      return;
   }

   try {

      setLoading(true);

      const response = await axios.post(
         "http://localhost:5000/api/auth/signup",
         {
            name: `${formData.firstName} ${formData.lastName}`,
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
          fullName: authData?.admin?.name || `${formData.firstName} ${formData.lastName}`.trim(),
          email: authData?.admin?.email || formData.email,
          role: "user",
        })
      );

      alert("Signup Successful");

      navigate("/login");

   } catch (error) {

      console.log(error.response?.data);

      alert(
         error.response?.data?.message ||
         "Signup Failed"
      );

   } finally {

      setLoading(false);
   }
};


  return (
    <div className="auth-container signup-page">
      <div className="auth-wrapper">
        <div className="auth-card signup-card">
          {/* Close Button */}
          <button className="close-btn" onClick={() => navigate('/')}>
            <FiX size={24} />
          </button>

          {/* Header */}
          <div className="signup-header">
            <h1>Sign up</h1>
          </div>

          <form onSubmit={handleSubmit} className="auth-form signup-form">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            {/* Birth Date */}
            <div className="form-group">
              <label htmlFor="birthDate">Birth date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className={errors.birthDate ? 'error' : ''}
              />
              {errors.birthDate && (
                <span className="error-text">{errors.birthDate}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Server Error */}
            {errors.server && (
              <div className="server-error">{errors.server}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn signup-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign up'}
            </button>
          </form>

          {/* Login Link */}
          <div className="signup-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Log in
              </Link>
            </p>
            <p>
              <Link to="/admin-signup" className="auth-link">
                Sign up as Admin?
              </Link>
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button className="google-signup-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

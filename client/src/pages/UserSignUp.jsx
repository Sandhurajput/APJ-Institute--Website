import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import signUpImage from '../1.webp';
import '../styles/AuthSplitScreen.css';
import { getApiUrl } from '../utils/api';

export default function UserSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [signUpForm, setSignUpForm] = useState({
    firstName: '',
    lastName: '',
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

  const validateSignUp = () => {
    const newErrors = {};

    if (!signUpForm.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!signUpForm.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!signUpForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!signUpForm.password) {
      newErrors.password = 'Password is required';
    } else if (signUpForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!signUpForm.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!validateSignUp()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        getApiUrl('/students/signup'),
        {
          name: `${signUpForm.firstName} ${signUpForm.lastName}`.trim(),
          email: signUpForm.email,
          password: signUpForm.password,
        }
      );

      const authData = response.data;

      localStorage.setItem('token', authData?.token || '');
      localStorage.setItem('role', 'user');
      localStorage.setItem(
        'email',
        authData?.student?.email || signUpForm.email
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          fullName:
            authData?.student?.name ||
            `${signUpForm.firstName} ${signUpForm.lastName}`.trim(),
          email:
            authData?.student?.email ||
            signUpForm.email,
          role: 'user',
        })
      );

      alert('✅ Account created successfully!');

    } catch (error) {
      setErrors({
        server:
          error.response?.data?.message ||
          'Signup Failed',
      });

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-split-container">

      <div className="auth-split-left">

        <div className="form-container">

          <form
            onSubmit={handleSignUpSubmit}
            className="auth-form signup-form active"
          >

            <div className="form-header">
              <h1>SIGN UP</h1>
              <p>Create your account to get started</p>
            </div>


            <div className="form-group">
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={signUpForm.firstName}
                onChange={handleSignUpChange}
              />

              {errors.firstName &&
                <span className="error-text">
                  {errors.firstName}
                </span>
              }
            </div>


            <div className="form-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={signUpForm.lastName}
                onChange={handleSignUpChange}
              />

              {errors.lastName &&
                <span className="error-text">
                  {errors.lastName}
                </span>
              }
            </div>


            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signUpForm.email}
                onChange={handleSignUpChange}
              />

              {errors.email &&
                <span className="error-text">
                  {errors.email}
                </span>
              }
            </div>


            <div className="form-group">

              <label>Password</label>

              <div className="password-input-group">

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={signUpForm.password}
                  onChange={handleSignUpChange}
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? <FiEyeOff />
                    : <FiEye />
                  }

                </button>

              </div>


              {errors.password &&
                <span className="error-text">
                  {errors.password}
                </span>
              }

            </div>


            <div className="recaptcha-placeholder">

              <input
                type="checkbox"
                id="recaptcha-user-signup"
              />

              <label htmlFor="recaptcha-user-signup">
                I'm not a robot
              </label>

              <div className="recaptcha-logo">
                reCAPTCHA
              </div>

            </div>


            <div className="terms-checkbox">

              <input
                type="checkbox"
                id="terms-user-signup"
                name="termsAccepted"
                checked={signUpForm.termsAccepted}
                onChange={handleSignUpChange}
              />


              <label htmlFor="terms-user-signup">

                By Registering, I Accept The Terms &
                Conditions & Privacy Policy Of APJ Institute Dantewada

              </label>

            </div>


            {errors.termsAccepted &&
              <span className="error-text">
                {errors.termsAccepted}
              </span>
            }


            {errors.server &&
              <div className="server-error-text">
                {errors.server}
              </div>
            }



            <button
              type="submit"
              className="submit-btn join-btn"
              disabled={loading}
            >

              {loading
                ? 'Creating Account...'
                : 'SIGN UP'
              }

            </button>



            <div className="auth-links">

              <p>
                <Link to="/admin-signup">
                  Sign up as Admin instead?
                </Link>
              </p>

            </div>


          </form>

        </div>

      </div>




      <div className="auth-split-right">

        <div className="toggle-section">

          <h2>Join Us !</h2>

          <p>
            Create an account to unlock exclusive features,
            connect with our community, and explore endless
            possibilities with APJ Institute.
          </p>


          <div className="toggle-buttons-group">

            <button
              className="toggle-btn login-variant"
              disabled
            >
              LOGIN
            </button>


            <button
              className="toggle-btn join-variant"
              disabled
            >
              SIGN UP
            </button>


          </div>

        </div>


        <div className="illustration">

          <img
            src={signUpImage}
            alt="User Sign Up"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

        </div>


      </div>


    </div>
  );
}
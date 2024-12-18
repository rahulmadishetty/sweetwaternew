import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import { EyeIcon, EyeOffIcon, LockClosedIcon, MailIcon } from '@heroicons/react/solid';

import ForgotPassword from './ForgotPassword';
import Signup from './Signup';

interface LoginProps {
  onLoginSuccess: (userData: { name: string; email: string; role: string }, isAdminLogin: boolean) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSignupOpen, setIsSignupOpen] = useState(false); // State for managing Signup modal
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // State for managing Forgot Password modal

  const validateEmail = (emailToCheck: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToCheck);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail) || newEmail === '');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // API POST request for login
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });

      if (response && response.data) {
        const { name, email, role } = response.data; // Extract name, email, role
        const isAdmin = role === 'admin'; // Check if role is 'admin'
        onLoginSuccess({ name, email, role }, isAdmin); // Pass the role and user data
        onClose();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative'>
      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative bg-white p-6 rounded-lg'>
            <button
              onClick={() => setIsForgotPasswordOpen(false)}
              className='absolute top-0 right-0 m-4 text-black hover:text-gray-300'
            >
              X
            </button>
            <ForgotPassword onClose={() => setIsForgotPasswordOpen(false)} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative bg-white p-6 rounded-lg'>
            <button
              onClick={() => setIsSignupOpen(false)}
              className='absolute top-0 right-0 m-4 text-black hover:text-gray-300'
            >
              X
            </button>
            <Signup onSignupSuccess={() => setIsSignupOpen(false)} />
          </div>
        </div>
      )}

      {/* Close button for the login modal */}
      <button
        onClick={onClose}
        className='absolute top-0 right-0 m-4 text-black hover:text-gray-300'
      >
        X
      </button>

      <h2 className='text-center text-2xl font-bold mb-6'>Welcome Back!</h2>

      <form className='space-y-6' onSubmit={handleLogin}>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email address
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MailIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={handleEmailChange}
              className={`block w-full pl-10 pr-3 py-2 border ${
                isEmailValid ? 'border-gray-300' : 'border-red-300 text-red-900'
              } rounded-md`}
              placeholder='you@example.com'
            />
          </div>
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <LockClosedIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md'
              placeholder='Enter your password'
            />
            <div
              className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              ) : (
                <EyeIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              )}
            </div>
          </div>
        </div>

        {error && (
          <div
            className='bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative'
            role='alert'
          >
            <span className='block sm:inline'>{error}</span>
          </div>
        )}

        <div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark'
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Forgot Password link */}
      <div className='mt-4 text-left'>
        <a
          onClick={() => setIsForgotPasswordOpen(true)} // Open Forgot Password modal
          className='text-red-600 text-sm hover:text-red-800 cursor-pointer'
        >
          Forgot Password?
        </a>
      </div>

      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>Don't have an account?</span>
          </div>
        </div>

        <button
          onClick={() => setIsSignupOpen(true)} // Open Signup modal
          className='mt-4 w-full flex justify-center py-2 px-4 border border-primary-600 rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-gray-50'
        >
          Create a new account
        </button>
      </div>
    </div>
  );
};

export default Login;

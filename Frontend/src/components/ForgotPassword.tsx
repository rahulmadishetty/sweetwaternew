import React, { useState } from 'react';

import { MailIcon } from '@heroicons/react/solid';

interface ForgotPasswordProps {
  onClose: () => void; // Callback to close the modal
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (emailToCheck: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToCheck);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail) || newEmail === '');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      console.log('Password reset requested', { email });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Password reset failed. Please try again.');
      console.error(err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold">Check Your Email</h2>
        <p className="text-center text-sm mt-4">
          We've sent a password reset link to {email}. Please check your inbox and follow the instructions.
        </p>
        <div className="mt-6 text-center">
          <button
            onClick={onClose} // Close the modal
            className="py-2 px-4 border border-primary-600 rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-50"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold">Forgot Password</h2>
      <p className="text-center text-sm mt-4">Enter your email to reset your password.</p>
      <form className="mt-6 space-y-4" onSubmit={handleForgotPassword}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              className={`block w-full pl-10 pr-3 py-2 border ${isEmailValid ? 'border-gray-300' : 'border-red-500'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          {!isEmailValid && email && (
            <p className="mt-2 text-sm text-red-500">Please enter a valid email address</p>
          )}
        </div>
        {error && (
          <div className="text-sm text-red-500 mt-2">
            <p>{error}</p>
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Password Reset Link
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={onClose} // Close the modal
          className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;

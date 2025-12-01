import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: 'Email is required' });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Email is invalid' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Password reset request for:', email);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-jumia-light-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/" className="flex justify-center">
              <h1 className="text-4xl font-bold text-jumia-orange">Jumia</h1>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Check your email
            </h2>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700 mb-4">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Please check your email and click on the link to reset your password. If you don't see the email, check your spam folder.
            </p>
            <Link
              to="/login"
              className="inline-block w-full bg-jumia-orange text-white py-3 px-4 rounded-lg font-medium hover:bg-jumia-orange-dark transition text-center"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jumia-light-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center">
            <h1 className="text-4xl font-bold text-jumia-orange">Jumia</h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-jumia-gray">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {errors.general}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleChange}
              className={`appearance-none relative block w-full px-4 py-3 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange focus:border-jumia-orange`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-jumia-orange hover:bg-jumia-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jumia-orange disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-jumia-orange hover:text-jumia-orange-dark"
            >
              ← Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

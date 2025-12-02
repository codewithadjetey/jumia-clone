import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  
  const errorMessage = error?.statusText || error?.message || 'An unexpected error occurred';
  const errorStatus = error?.status || 500;

  return (
    <div className="min-h-screen bg-jumia-light-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">{errorStatus}</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something Went Wrong</h2>
            <p className="text-jumia-gray text-lg mb-2">
              {errorMessage}
            </p>
            <p className="text-sm text-jumia-gray">
              We're sorry for the inconvenience. Please try again later or contact support if the problem persists.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/"
              className="bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Homepage
            </Link>
            <Link
              to="/contact"
              className="border-2 border-jumia-orange text-jumia-orange px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange hover:text-white transition inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Contact Support
            </Link>
          </div>

          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-xs font-mono text-gray-600 break-all">
                {JSON.stringify(error, null, 2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;


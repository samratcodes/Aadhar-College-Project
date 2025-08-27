'use client';

import Link from 'next/link';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-4">
          <svg
            className="w-full h-full text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Congratulations!
        </h1>
        <p className="text-gray-600 mb-6">Payment Successful.</p>
        <Link
          href="/profile"
          className="inline-block w-full bg-green-600 hover:bg-green-700 text-white text-base py-2 px-4 rounded-xl text-center transition duration-300"
        >
          Go to Profile to Check Appointment
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

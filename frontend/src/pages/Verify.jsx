import React from "react";

const Verify = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-green-500 mb-4 font-semibold text-2xl">✅Check Your Email</h2>
          <p className="text-gray-400 text-sm">
            We've sent you the Email to verify your account. Plaese check your email and clivk on
            the verification link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;

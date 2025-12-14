import React from "react";
import { useNavigate } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="max-w-xl w-full bg-white p-10 rounded-xl shadow-2xl text-center border-t-4 border-yellow-500">
        <FaTimesCircle className="text-yellow-500 w-20 h-20 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-4 text-yellow-700">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your donation process was cancelled. No charge has been made. If you
          change your mind, please try again!
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/support-us")}
            className="w-full py-3 px-4 rounded-lg font-semibold transition duration-300 bg-red-600 hover:bg-red-700 text-white"
          >
            Try Donating Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-4 rounded-lg font-semibold transition duration-300 bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const SupportUs = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-extrabold text-red-600 mb-8 border-b-4 border-red-100 pb-2 flex items-center">
        <FaHeart className="mr-3" /> Support Our Foundation
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Every fund helps us maintain our operations, host blood drives, and
        provide essential resources to connect donors with patients in critical
        need. Your generosity saves lives!
      </p>

      <Link
        to={`/payment-form`}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl transition duration-300 ease-in-out mb-10 transform hover:scale-[1.02]"
      >
        Give Fund Now
      </Link>
    </div>
  );
};

export default SupportUs;

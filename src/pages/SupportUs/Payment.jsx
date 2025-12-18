import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaDollarSign, FaUser, FaEnvelope } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donationAmount, setDonationAmount] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
        <p className="ml-2">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">
          You must be logged in to make a donation.
        </p>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    const amount = parseFloat(donationAmount);

    if (isNaN(amount) || amount < 1 || amount < 0.5) {
      // Stripe minimum is $0.50
      return Swal.fire(
        "Invalid Amount",
        "Please enter a valid amount (minimum $1 recommended).",
        "warning"
      );
    }

    setIsSubmitting(true);

    try {
      const checkoutData = {
        amount: amount.toFixed(2),
        donatorEmail: user.email,
        donatorName: user.displayName || "Anonymous Donor",
      };

      const res = await axiosSecure.post(
        "/create-funding-checkout-session",
        checkoutData
      );

      // Redirect to Stripe
      window.location.assign(res.data.url);
    } catch (error) {
      console.error("Error initiating funding:", error);
      Swal.fire(
        "Payment Failed",
        error.response?.data?.message ||
          "Could not initiate Stripe payment. Please check console for details.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-12 max-w-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">
        Make a Generous Donation
      </h2>

      <form
        onSubmit={handlePayment}
        className="bg-white p-6 rounded-lg shadow-xl border border-red-100"
      >
        {/* User Information */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            <FaUser className="inline mr-2 text-red-500" /> Donor Name
          </label>
          <input
            type="text"
            value={user.displayName || "Anonymous Donor"}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            <FaEnvelope className="inline mr-2 text-red-500" /> Donor Email
          </label>
          <input
            type="email"
            value={user.email}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            readOnly
          />
        </div>

        {/* Donation Amount Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-bold mb-3"
            htmlFor="donationAmount"
          >
            <FaDollarSign className="inline mr-2 text-green-600" /> Donation
            Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-2xl font-bold text-gray-500">
              $
            </span>
            <input
              id="donationAmount"
              type="number"
              step="1"
              min="1"
              placeholder="10"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="shadow-inner appearance-none border border-gray-300 rounded w-full py-4 pl-10 pr-4 text-gray-700 text-xl leading-tight focus:outline-none focus:ring-4 focus:ring-red-200 transition duration-150"
              required
            />
          </div>
        </div>

        {/* Payment Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
        >
          {isSubmitting
            ? "Redirecting to Stripe..."
            : "Proceed to Secure Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;

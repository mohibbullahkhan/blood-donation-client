import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router";
import { FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";

const BACKEND_BASE_URL = "https://blood-donation-server-alpha.vercel.app";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  const hasVerified = useRef(false);

  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState(
    "Verifying your payment and recording your fund..."
  );
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    if (!sessionId) {
      setStatus("error");
      setMessage("Invalid payment session. Please check your link.");
      return;
    }

    axios
      .get(
        `${BACKEND_BASE_URL}/funding/payment-success-handler?session_id=${sessionId}`
      )
      .then((res) => {
        if (res.data.success) {
          setStatus("success");
          setMessage(
            res.data.message ||
              "Your generous donation has been successfully recorded! Thank you for supporting us."
          );
          setTransactionId(res.data.transactionId);
        } else {
          setStatus("error");
          setMessage(
            res.data.message || "Payment verification failed at the server."
          );
        }
      })
      .catch((err) => {
        console.error("Error confirming payment:", err);
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "A server error occurred while confirming your fund. Please contact support."
        );
      });
  }, [sessionId]);

  const handleButtonClick = () => {
    if (status === "success") {
      navigate("/support-us");
    } else {
      navigate("/");
    }
  };

  let icon, title, bgColor, buttonText;

  if (status === "processing") {
    icon = <FaSpinner className="text-red-600 w-20 h-20 mb-4 animate-spin" />;
    title = "Processing Payment";
    bgColor = "bg-gray-50";
    buttonText = "Checking Status...";
  } else if (status === "success") {
    icon = <FaCheckCircle className="text-green-500 w-20 h-20 mb-4" />;
    title = "Fund Successful!";
    bgColor = "bg-green-50";
    buttonText = "Back to Support Page";
  } else {
    icon = <FaTimesCircle className="text-red-500 w-20 h-20 mb-4" />;
    title = "Payment Error";
    bgColor = "bg-red-50";
    buttonText = "Go Home";
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${bgColor}`}>
      <div className="max-w-xl w-full bg-white p-10 rounded-xl shadow-2xl text-center">
        {icon}

        <h1
          className={`text-3xl font-bold mb-4 ${
            status === "success"
              ? "text-green-700"
              : status === "error"
              ? "text-red-700"
              : "text-gray-700"
          }`}
        >
          {title}
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        {transactionId && (
          <p className="text-sm font-mono bg-gray-100 p-2 rounded mb-6 inline-block">
            Transaction ID: {transactionId}
          </p>
        )}

        <button
          onClick={handleButtonClick}
          disabled={status === "processing"}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
            status === "success"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : status === "error"
              ? "bg-gray-500 hover:bg-gray-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Clock,
  Droplet,
  User,
  MessageSquare,
  Building,
  AlertTriangle,
  HeartHandshake,
  Loader2,
  X,
  CheckCircle,
  Mail,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";


const API_BASE_URL = "https://blood-donation-server-alpha.vercel.app";



// Modal Component 
const DonateModal = ({ request, donor, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100 border-t-8 border-red-600">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-red-700 flex items-center">
            <HeartHandshake className="w-6 h-6 mr-2" /> Confirm Donation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          You are about to pledge to donate blood for **{request.recipientName}{" "}
          ({request.bloodGroup})**.
          <br />
          Please ensure you are able to fulfill this commitment.
        </p>

        {/* Donation Form (Read-only fields) */}
        <div className="space-y-4">
          <div className="border p-3 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-500">
              Your Name (Read Only)
            </label>
            <p className="text-gray-800 font-semibold">{donor.displayName}</p>
          </div>
          <div className="border p-3 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-500">
              Your Email (Read Only)
            </label>
            <p className="text-gray-800 font-semibold">{donor.email}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" /> Confirm Donation
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const DonationRequestDetails = () => {
  const { id } = useParams(); 

  const navigate = useNavigate();
  const { user } = useAuth();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { redirectTo: `/donation-requests/${id}` } });
    }
  }, [user, navigate, id]);

  const fetchRequest = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/donation-requests/${id}`
      );
      setRequest(response.data);
    } catch (err) {
      console.error("Error fetching request details:", err);
      setError(
        err.response?.data?.message || "Failed to fetch request details."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      fetchRequest();
    }
  }, [user, fetchRequest]);

  // --- Donation Handler ---
  const handleConfirmDonation = async () => {
    if (!request || !user) return;

    setIsUpdating(true);
    setUpdateMessage(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/donation-requests/assign-donor/${id}`,
        {
          donorName: user.displayName,
          donorEmail: user.email,
        }
      );

      setRequest((prev) => ({
        ...prev,
        donationStatus: "inprogress",
        donorInformation: {
          donorName: user.displayName,
          donorEmail: user.email,
        },
      }));

      setUpdateMessage({ type: "success", text: response.data.message });
      setIsModalOpen(false); // Close the modal
    } catch (err) {
      console.error("Error assigning donor:", err);
      setUpdateMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to confirm donation. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {

    return (
      <div className="p-8 text-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center py-20 text-red-600 font-semibold flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Loading donation request details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center py-20 text-white bg-red-600 rounded-xl max-w-2xl mx-auto mt-10 shadow-lg">
        <AlertTriangle className="w-10 h-10 mx-auto mb-4" />
        <p className="text-xl font-bold">Error Loading Request</p>
        <p>{error}</p>
      </div>
    );
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const isPending = request?.donationStatus === "pending";
  const isInProgress = request?.donationStatus === "inprogress";

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-2xl border-t-8 border-red-600">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Donation Request Details
          </h1>
          <p className="text-sm text-gray-500">Request ID: {id}</p>
        </header>

        {updateMessage && (
          <div
            className={`p-4 rounded-lg mb-6 text-white ${
              updateMessage.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {updateMessage.text}
          </div>
        )}

        {/* Status Indicator */}
        <div
          className={`p-3 rounded-lg mb-6 font-bold text-center ${
            isPending
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          Status: {request.donationStatus.toUpperCase()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Recipient and Blood Info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-red-700 border-b pb-2">
              Recipient Information
            </h2>

            <DetailItem
              icon={<User />}
              label="Recipient Name"
              value={request.recipientName}
            />
            <DetailItem
              icon={<Droplet />}
              label="Blood Group"
              value={
                <span className="text-2xl font-extrabold text-red-600">
                  {request.bloodGroup}
                </span>
              }
            />
            <DetailItem
              icon={<MessageSquare />}
              label="Reason/Message"
              value={request.requestMessage || "N/A"}
            />

            <h2 className="text-xl font-bold text-red-700 border-b pb-2 mt-8">
              Requester Contact
            </h2>
            <DetailItem
              icon={<User />}
              label="Requester Name"
              value={request.requesterName}
            />
            <DetailItem
              icon={<Mail />}
              label="Requester Email"
              value={request.requesterEmail}
            />
          </div>

          {/* Right Column: Location and Time Info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-red-700 border-b pb-2">
              Donation Details
            </h2>

            <DetailItem
              icon={<Calendar />}
              label="Required Date"
              value={formatDate(request.donationDate)}
            />
            <DetailItem
              icon={<Clock />}
              label="Required Time"
              value={request.donationTime}
            />
            <DetailItem
              icon={<Building />}
              label="Hospital Name"
              value={request.hospitalName}
            />
            <DetailItem
              icon={<MapPin />}
              label="Address"
              value={`${request.fullAddressLine}, ${request.recipientUpazila}, ${request.recipientDistrict}`}
            />

            {/* Donor Information (if assigned) */}
            {isInProgress && request.donorInformation && (
              <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  Donor Assigned
                </h3>
                <p className="text-sm">
                  Name:{" "}
                  <span className="font-semibold">
                    {request.donorInformation.donorName}
                  </span>
                </p>
                <p className="text-sm">
                  Email:{" "}
                  <span className="font-semibold">
                    {request.donorInformation.donorEmail}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Donate Button Section */}
        <div className="mt-10 pt-6 border-t flex justify-center">
          {isPending ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-red-600 text-white font-bold px-8 py-3 rounded-full text-lg shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <HeartHandshake className="w-6 h-6 mr-3" />
              )}
              {isUpdating ? "Pledging..." : "I Want to Donate!"}
            </button>
          ) : (
            <p
              className={`text-xl font-bold ${
                isInProgress ? "text-green-600" : "text-gray-500"
              }`}
            >
              This request is {request.donationStatus.toUpperCase()}. Thank you!
            </p>
          )}
        </div>
      </div>

      {/* Donation Modal */}
      <DonateModal
        request={request}
        donor={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDonation}
      />
    </div>
  );
};

// Helper component 
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="text-red-500 mt-1 mr-3 flex-shrink-0">{icon}</div>
    <div>
      <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium break-words">{value}</p>
    </div>
  </div>
);

export default DonationRequestDetails;

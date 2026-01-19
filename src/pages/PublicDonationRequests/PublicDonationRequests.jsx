import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Droplet,
  Eye,
  Loader2,
  Mail,
  Lock,
  WifiOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const API_BASE_URL = "https://blood-donation-server-alpha.vercel.app";

// const RequestCard = ({ request, onDetailsClick }) => {
//   const {
//     recipientName,
//     bloodGroup,
//     recipientDistrict,
//     donationDate,
//     donationTime,
//     _id,
//   } = request;

//   const formatDate = (dateString) =>
//     new Date(donationDate).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   return (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-red-600">
//       <div className="p-6 space-y-4">
//         {/* Blood Group and Recipient */}
//         <div className="flex justify-between items-center border-b pb-3 border-gray-100">
//           <span className="text-4xl font-extrabold text-red-700 flex items-center">
//             <Droplet className="w-7 h-7 mr-2 text-red-500" /> {bloodGroup}
//           </span>
//           <h3 className="text-xl font-bold text-gray-800">{recipientName}</h3>
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
//           <div className="flex items-center">
//             <MapPin className="w-4 h-4 mr-2 text-red-500" /> Location:{" "}
//             <span className="font-semibold text-gray-800 ml-1">
//               {recipientDistrict}
//             </span>
//           </div>
//           <div className="flex items-center">
//             <Calendar className="w-4 h-4 mr-2 text-red-500" /> Date:{" "}
//             <span className="font-semibold text-gray-800 ml-1">
//               {formatDate(donationDate)}
//             </span>
//           </div>
//           <div className="flex items-center">
//             <Clock className="w-4 h-4 mr-2 text-red-500" /> Time:{" "}
//             <span className="font-semibold text-gray-800 ml-1">
//               {donationTime}
//             </span>
//           </div>
//           <div className="flex items-center">
//             <Heart className="w-4 h-4 mr-2 text-yellow-600" /> Status:{" "}
//             <span className="font-bold text-yellow-600 ml-1">PENDING</span>
//           </div>
//         </div>

//         {/* View Button */}
//         <div className="pt-4">
//           <Link
//             onClick={() => onDetailsClick(_id)}
//             className="w-full flex items-center justify-center bg-red-600 text-white font-semibold py-2.5 rounded-lg hover:bg-red-700 transition duration-200 shadow-md shadow-red-300"
//           >
//             <Eye className="w-5 h-5 mr-2" /> View Details (Login Required)
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// --- Main Component ---

const RequestCard = ({ request, onDetailsClick }) => {
  const {
    recipientName,
    bloodGroup,
    recipientDistrict,
    donationDate,
    donationTime,
    _id,
  } = request;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600 group">
      <div className="p-6 flex flex-col gap-5">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-xl">
              <Droplet className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-4xl font-extrabold text-red-700">
              {bloodGroup}
            </span>
          </div>

          <span className="text-xs font-bold tracking-wide px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
            PENDING
          </span>
        </div>

        {/* Recipient */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Recipient
          </p>
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {recipientName}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Info Blocks */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-red-50 p-2 rounded-lg">
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="font-semibold text-gray-800">{recipientDistrict}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-red-50 p-2 rounded-lg">
              <Calendar className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Donation Date</p>
              <p className="font-semibold text-gray-800">
                {formatDate(donationDate)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-red-50 p-2 rounded-lg">
              <Clock className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Donation Time</p>
              <p className="font-semibold text-gray-800">{donationTime}</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onDetailsClick(_id)}
          className="mt-2 w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 flex items-center justify-center gap-2 shadow-lg shadow-red-300 transition-all duration-300 group-hover:scale-[1.02]"
        >
          <Eye className="w-5 h-5" />
          <span>View Full Request</span>

          {/* Hover Glow */}
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
        </button>
      </div>
    </div>
  );
};

const PublicDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchPendingRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/blood-requests/public-pending`,
      );

      setRequests(response.data);
    } catch (err) {
      console.error("Error fetching public requests:", err);
      setRequests([]);
      setError(err.message || "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  const handleViewDetails = (requestId) => {
    if (user) {
      navigate(`/donation-requests/${requestId}`);
    } else {
      navigate("/login", {
        state: { redirectTo: `/donation-requests/${requestId}` },
      });
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 border-b-4 border-red-500 inline-block pb-2">
          Blood Requests: Urgent Need
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Browse all current **pending** donation requests in your area.
        </p>
        <p className="mt-4 text-orange-600 font-semibold flex items-center justify-center">
          <Lock className="w-5 h-5 mr-2" /> Log in to view full contact details
          and pledge to donate.
        </p>
      </header>

      {/* --- Conditional Rendering --- */}
      {loading ? (
        <div className="text-center py-20 text-red-600 font-semibold flex flex-col items-center justify-center bg-white rounded-xl shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Loading urgent requests...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-white bg-red-600 border-4 border-dashed border-red-800 rounded-xl shadow-lg">
          <WifiOff className="w-10 h-10 mx-auto mb-4" />
          <p className="text-xl font-bold mb-2">Connection Error</p>
          <p className="text-sm">{error}. Cannot fetch blood requests.</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-20 text-gray-600 border-4 border-dashed border-red-300 bg-white rounded-xl shadow-lg transition duration-300 hover:border-red-500">
          <Mail className="w-10 h-10 mx-auto mb-4 text-red-500" />
          <p className="text-xl font-medium">
            Great news! No urgent pending requests right now.
          </p>
          <p className="text-sm mt-1">
            Check back later or create a request if you need blood.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onDetailsClick={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicDonationRequests;

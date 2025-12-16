// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//   Eye,
//   XCircle,
//   CheckCircle,
//   UserPlus,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Loader2,
//   Heart,
//   Clock,
//   Mail,
// } from "lucide-react";

// // Assume a base URL for your backend
// const API_BASE_URL = "https://blood-donation-server-alpha.vercel.app";

// // --- Component Definition: Donation Status Badge ---
// const StatusBadge = ({ status }) => {
//   let colorClass = "";
//   let icon = null;
//   let text = status.charAt(0).toUpperCase() + status.slice(1);

//   switch (status) {
//     case "pending":
//       colorClass = "bg-yellow-100 text-yellow-800 border-yellow-300";
//       icon = <Clock className="w-3 h-3 mr-1" />;
//       break;
//     case "inprogress":
//       colorClass = "bg-blue-100 text-blue-800 border-blue-300";
//       icon = <Heart className="w-3 h-3 mr-1" />;
//       text = "In Progress";
//       break;
//     case "done":
//       colorClass = "bg-green-100 text-green-800 border-green-300";
//       icon = <CheckCircle className="w-3 h-3 mr-1" />;
//       break;
//     case "canceled":
//       colorClass = "bg-red-100 text-red-800 border-red-300";
//       icon = <XCircle className="w-3 h-3 mr-1" />;
//       break;
//     default:
//       colorClass = "bg-gray-100 text-gray-800 border-gray-300";
//       break;
//   }
//   return (
//     <span
//       className={`flex items-center px-2 py-0.5 text-xs leading-5 font-semibold rounded-full capitalize border ${colorClass}`}
//     >
//       {icon}
//       {text}
//     </span>
//   );
// };

// // --- Main Component: AllBloodDonationRequest ---
// const AllBloodDonationRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//   const availableStatuses = ["pending", "inprogress", "done", "canceled"];

//   // Function to fetch data from the new admin route
//   const fetchAllRequests = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/dashboard/all-blood-donation-request`,
//         {
//           params: {
//             page: currentPage,
//             limit: 10,
//             status: statusFilter,
//           },
//         }
//       );
//       setRequests(response.data.requests);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching all donation requests:", error);
//       // Handle error state
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, statusFilter]);

//   useEffect(() => {
//     fetchAllRequests();
//   }, [fetchAllRequests]);

//   // --- Action Handlers ---

//   const handleStatusUpdate = async (requestId, newStatus) => {
//     if (
//       !window.confirm(
//         `Admin: Are you sure you want to change this request status to '${newStatus}'?`
//       )
//     )
//       return;

//     try {
//       await axios.patch(
//         `${API_BASE_URL}/donation-requests/status/${requestId}`,
//         {
//           status: newStatus,
//         }
//       );
//       alert(`Request ${requestId} status updated to ${newStatus}.`);
//       fetchAllRequests();
//       setIsDetailModalOpen(false);
//     } catch (error) {
//       console.error(`Error updating status for ${requestId}:`, error);
//       alert(
//         `Failed to update status: ${
//           error.response?.data?.message || "Server error"
//         }`
//       );
//     }
//   };

//   const handleAssignDonor = async (requestId, donorInfo) => {
//     const { donorName, donorEmail } = donorInfo || {
//       donorName: prompt("Enter Donor Name for assignment:"),
//       donorEmail: prompt("Enter Donor Email for assignment:"),
//     };

//     if (!donorName || !donorEmail) {
//       alert("Donor assignment canceled or incomplete.");
//       return;
//     }

//     try {
//       await axios.patch(
//         `${API_BASE_URL}/donation-requests/assign-donor/${requestId}`,
//         {
//           donorName,
//           donorEmail,
//         }
//       );
//       alert(`Donor ${donorName} assigned. Status updated to 'inprogress'.`);
//       fetchAllRequests();
//       setIsDetailModalOpen(false);
//     } catch (error) {
//       console.error(`Error assigning donor for ${requestId}:`, error);
//       alert(
//         `Failed to assign donor: ${
//           error.response?.data?.message || "Server error"
//         }`
//       );
//     }
//   };

//   const handleDelete = async (requestId) => {
//     if (
//       !window.confirm(
//         "Admin: Are you sure you want to DELETE this request permanently?"
//       )
//     )
//       return;

//     try {
//       await axios.delete(`${API_BASE_URL}/donation-requests/${requestId}`);
//       alert(`Request ${requestId} deleted successfully.`);
//       fetchAllRequests();
//     } catch (error) {
//       console.error(`Error deleting request ${requestId}:`, error);
//       alert(
//         `Failed to delete request: ${
//           error.response?.data?.message || "Server error"
//         }`
//       );
//     }
//   };

//   // --- Pagination and Filtering ---

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//     setCurrentPage(1); // Reset to first page when filter changes
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // --- Modal Component for Details/Management (Inline for simplicity) ---
//   const DetailModal = () => {
//     if (!selectedRequest) return null;

//     const {
//       _id,
//       requesterName,
//       requesterEmail,
//       recipientName,
//       bloodGroup,
//       recipientDistrict,
//       recipientUpazila,
//       hospitalName,
//       fullAddressLine,
//       donationDate,
//       donationTime,
//       requestMessage,
//       donationStatus,
//       donorInformation,
//     } = selectedRequest;

//     const isPending = donationStatus === "pending";
//     const isInProgress = donationStatus === "inprogress";

//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-80 flex justify-center items-center p-4">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 scale-100">
//           <div className="p-6">
//             <div className="flex justify-between items-center border-b pb-4 mb-4 border-red-500">
//               <h3 className="text-2xl font-bold text-red-600 flex items-center">
//                 <Eye className="w-6 h-6 mr-2" /> Request Details (#{" "}
//                 {String(_id).slice(-6)})
//               </h3>
//               <button
//                 onClick={() => setIsDetailModalOpen(false)}
//                 className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition duration-150"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Status and Recipient Info */}
//             <div className="mb-6 space-y-2">
//               <p className="text-lg font-semibold flex items-center">
//                 Current Status:{" "}
//                 <StatusBadge status={donationStatus} className="ml-2" />
//               </p>
//               <p className="text-xl font-extrabold text-red-700">
//                 Recipient: {recipientName} (Group: {bloodGroup})
//               </p>
//             </div>

//             {/* Details Grid - Responsive */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700 mb-6 p-4 rounded-lg border border-red-200 bg-red-50">
//               <DetailItem
//                 title="Requester"
//                 value={`${requesterName} (${requesterEmail})`}
//               />
//               <DetailItem
//                 title="Date & Time"
//                 value={`${formatDate(donationDate)} @ ${donationTime}`}
//               />
//               <DetailItem title="Hospital" value={hospitalName} />
//               <DetailItem
//                 title="Location"
//                 value={`${recipientUpazila}, ${recipientDistrict}`}
//               />
//               <DetailItem
//                 title="Full Address"
//                 value={fullAddressLine}
//                 className="sm:col-span-2"
//               />

//               {donorInformation && (
//                 <>
//                   <DetailItem
//                     title="Assigned Donor"
//                     value={donorInformation.donorName}
//                     color="text-blue-700"
//                   />
//                   <DetailItem
//                     title="Donor Contact"
//                     value={donorInformation.donorEmail}
//                     color="text-blue-700"
//                   />
//                 </>
//               )}
//               <DetailItem
//                 title="Request Message"
//                 value={requestMessage}
//                 className="sm:col-span-2 italic text-gray-600 border-t pt-2 mt-2"
//               />
//             </div>

//             {/* Admin Actions */}
//             <div className="pt-4 border-t border-gray-200">
//               <h4 className="text-xl font-bold text-gray-800 mb-3">
//                 Management Options:
//               </h4>
//               <div className="flex flex-wrap gap-3">
//                 {isPending && (
//                   <ActionButton
//                     onClick={() => handleAssignDonor(_id)}
//                     Icon={UserPlus}
//                     label="Assign Donor (In-Progress)"
//                     color="bg-blue-600 hover:bg-blue-700"
//                   />
//                 )}

//                 {isInProgress && (
//                   <>
//                     <ActionButton
//                       onClick={() => handleStatusUpdate(_id, "done")}
//                       Icon={CheckCircle}
//                       label="Mark as Done"
//                       color="bg-green-600 hover:bg-green-700"
//                     />
//                     <ActionButton
//                       onClick={() => handleStatusUpdate(_id, "canceled")}
//                       Icon={XCircle}
//                       label="Cancel Request"
//                       color="bg-yellow-600 hover:bg-yellow-700"
//                     />
//                   </>
//                 )}

//                 <ActionButton
//                   onClick={() => handleDelete(_id)}
//                   Icon={Trash2}
//                   label="Delete Request"
//                   color="bg-gray-400 hover:bg-gray-500 ml-auto"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // --- Helper Component for Modal Details ---
//   const DetailItem = ({
//     title,
//     value,
//     className = "",
//     color = "text-gray-700",
//   }) => (
//     <div className={`flex flex-col ${className}`}>
//       <span className="font-semibold text-gray-500 uppercase text-xs tracking-wider">
//         {title}:
//       </span>
//       <span className={`text-base font-medium ${color}`}>{value}</span>
//     </div>
//   );

//   // --- Helper Component for Modal Actions ---
//   const ActionButton = ({ onClick, Icon, label, color }) => (
//     <button
//       onClick={onClick}
//       className={`flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-md transition duration-150 shadow-md ${color}`}
//     >
//       <Icon className="w-4 h-4 mr-2" /> {label}
//     </button>
//   );

//   // --- Component Rendering ---
//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-red-700 mb-6 border-b-4 border-red-500 pb-3">
//         🩸 All Donation Requests (Admin View)
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Manage all donation requests from all users. Use the filter to quickly
//         find pending or in-progress requests.
//       </p>

//       {/* Filter and Controls - Responsive Layout */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow-lg border border-red-100">
//         <div className="flex items-center space-x-3 mb-4 sm:mb-0">
//           <Filter className="w-5 h-5 text-red-600" />
//           <label
//             htmlFor="statusFilter"
//             className="font-semibold text-gray-700 whitespace-nowrap"
//           >
//             Filter by Status:
//           </label>
//           <select
//             id="statusFilter"
//             value={statusFilter}
//             onChange={handleFilterChange}
//             className="p-2 border border-red-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500 transition duration-150 text-sm"
//           >
//             <option value="">All Statuses</option>
//             {availableStatuses.map((status) => (
//               <option key={status} value={status} className="capitalize">
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <span className="text-gray-600 text-sm">
//             Showing Page {currentPage} of {totalPages}
//           </span>
//         </div>
//       </div>

//       {/* Loading/Empty State */}
//       {loading ? (
//         <div className="text-center py-16 text-red-600 font-semibold flex items-center justify-center">
//           <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading requests...
//         </div>
//       ) : requests.length === 0 ? (
//         <div className="text-center py-20 text-gray-500 border-4 border-dashed border-red-200 bg-white rounded-lg transition duration-300 hover:border-red-400">
//           <Mail className="w-10 h-10 mx-auto mb-4 text-red-400" />
//           <p className="text-xl font-medium">No donation requests found.</p>
//         </div>
//       ) : (
//         <>
//           {/* Requests Table - Responsive Wrapper */}
//           <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-red-600 text-white sticky top-0">
//                 <tr>
//                   <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider">
//                     Recipient
//                   </th>
//                   <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider">
//                     Group
//                   </th>
//                   <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider hidden md:table-cell">
//                     Location
//                   </th>
//                   <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider hidden sm:table-cell">
//                     Donation Date
//                   </th>
//                   <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 sm:px-6 text-center text-xs font-bold uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {requests.map((request) => (
//                   <tr
//                     key={request._id}
//                     className="hover:bg-red-50 transition duration-150"
//                   >
//                     <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {request.recipientName}
//                     </td>
//                     <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-red-700 font-extrabold">
//                       {request.bloodGroup}
//                     </td>
//                     <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                       {request.recipientDistrict}
//                     </td>
//                     <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
//                       {formatDate(request.donationDate)}
//                     </td>
//                     <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm">
//                       <StatusBadge status={request.donationStatus} />
//                     </td>
//                     <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-center text-sm font-medium">
//                       <button
//                         onClick={() => {
//                           setSelectedRequest(request);
//                           setIsDetailModalOpen(true);
//                         }}
//                         className="text-red-600 hover:text-red-800 transition duration-150 p-2 rounded-full hover:bg-red-100"
//                         title="View/Manage Details"
//                       >
//                         <Eye className="w-5 h-5" />
//                       </button>

//                       {request.donationStatus === "pending" && (
//                         <button
//                           onClick={() => handleAssignDonor(request._id)}
//                           className="text-blue-600 hover:text-blue-800 transition duration-150 ml-2 p-2 rounded-full hover:bg-blue-100"
//                           title="Assign Donor"
//                         >
//                           <UserPlus className="w-5 h-5" />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center items-center mt-8 space-x-4">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1 || loading}
//               className={`flex items-center px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ${
//                 currentPage === 1 || loading
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-red-500 text-white hover:bg-red-600 shadow-md"
//               }`}
//             >
//               <ChevronLeft className="w-4 h-4 mr-1" /> Previous
//             </button>
//             <span className="text-gray-700 font-medium text-sm">
//               {currentPage} / {totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages || loading}
//               className={`flex items-center px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ${
//                 currentPage === totalPages || loading
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-red-500 text-white hover:bg-red-600 shadow-md"
//               }`}
//             >
//               Next <ChevronRight className="w-4 h-4 ml-1" />
//             </button>
//           </div>
//         </>
//       )}

//       {/* Detail/Management Modal */}
//       {isDetailModalOpen && <DetailModal />}
//     </div>
//   );
// };

// export default AllBloodDonationRequest;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Eye,
  XCircle,
  CheckCircle,
  UserPlus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Heart,
  Clock,
  Mail,
} from "lucide-react";

// Assume this hook/context provides the current user's role
// NOTE: You must replace this with your actual implementation (e.g., from an Auth Context)
const useAuth = () => {
  // For testing:
  // Set 'admin' to test admin view (full control)
  // Set 'volunteer' to test volunteer view (status update only)
  // Set 'donor' or 'other' to test minimal view (shouldn't see this page usually)
  const [currentUserRole, setCurrentUserRole] = useState("admin"); // <-- CHANGE THIS FOR TESTING

  // Simulate role change based on environment or initial check
  // useEffect(() => {
  //     // e.g., fetch role from a secure API endpoint
  //     // setCurrentUserRole(fetchedRole);
  // }, []);

  return {
    currentUserRole,
    isAdmin: currentUserRole === "admin",
    isVolunteer: currentUserRole === "volunteer",
    canManageRequests:
      currentUserRole === "admin" || currentUserRole === "volunteer",
  };
};

// Assume a base URL for your backend
const API_BASE_URL = "https://blood-donation-server-alpha.vercel.app";

// ... (StatusBadge and other helper components remain the same) ...
const StatusBadge = ({ status }) => {
  let colorClass = "";
  let icon = null;
  let text = status.charAt(0).toUpperCase() + status.slice(1);

  switch (status) {
    case "pending":
      colorClass = "bg-yellow-100 text-yellow-800 border-yellow-300";
      icon = <Clock className="w-3 h-3 mr-1" />;
      break;
    case "inprogress":
      colorClass = "bg-blue-100 text-blue-800 border-blue-300";
      icon = <Heart className="w-3 h-3 mr-1" />;
      text = "In Progress";
      break;
    case "done":
      colorClass = "bg-green-100 text-green-800 border-green-300";
      icon = <CheckCircle className="w-3 h-3 mr-1" />;
      break;
    case "canceled":
      colorClass = "bg-red-100 text-red-800 border-red-300";
      icon = <XCircle className="w-3 h-3 mr-1" />;
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800 border-gray-300";
      break;
  }
  return (
    <span
      className={`flex items-center px-2 py-0.5 text-xs leading-5 font-semibold rounded-full capitalize border ${colorClass}`}
    >
      {icon}
      {text}
    </span>
  );
};

const DetailItem = ({
  title,
  value,
  className = "",
  color = "text-gray-700",
}) => (
  <div className={`flex flex-col ${className}`}>
    <span className="font-semibold text-gray-500 uppercase text-xs tracking-wider">
      {title}:
    </span>
    <span className={`text-base font-medium ${color}`}>{value}</span>
  </div>
);

const ActionButton = ({ onClick, Icon, label, color, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-md transition duration-150 shadow-md 
            ${disabled ? "bg-gray-400 cursor-not-allowed" : color}`}
  >
    <Icon className="w-4 h-4 mr-2" /> {label}
  </button>
);

// --- Main Component: AllBloodDonationRequest ---
const AllBloodDonationRequest = () => {
  const { isAdmin, isVolunteer, canManageRequests } = useAuth(); // <-- Get user role here
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const availableStatuses = ["pending", "inprogress", "done", "canceled"];

  // Function to fetch data remains the same for both roles
  const fetchAllRequests = useCallback(async () => {
    // Only fetch if the user has permission to see the page
    if (!canManageRequests) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/all-blood-donation-request`,
        {
          params: {
            page: currentPage,
            limit: 10,
            status: statusFilter,
          },
        }
      );
      setRequests(response.data.requests);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching all donation requests:", error);
      alert(`Failed to fetch data. Permissions may be restricted.`);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, canManageRequests]);

  useEffect(() => {
    fetchAllRequests();
  }, [fetchAllRequests]);

  // --- Action Handlers ---

  // Generic status update handler (Available to Admin AND Volunteer)
  const handleStatusUpdate = async (requestId, newStatus) => {
    if (
      !window.confirm(
        `Are you sure you want to change this request status to '${newStatus}'?`
      )
    )
      return;

    // Security Check: Status update is allowed for both roles
    if (!isAdmin && !isVolunteer) {
      alert("You do not have permission to update status.");
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/donation-requests/status/${requestId}`,
        {
          status: newStatus,
        }
      );
      alert(`Request status updated to ${newStatus}.`);
      fetchAllRequests();
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error(`Error updating status for ${requestId}:`, error);
      alert(
        `Failed to update status: ${
          error.response?.data?.message || "Server error"
        }`
      );
    }
  };

  // Donor Assignment Handler (Admin ONLY)
  const handleAssignDonor = async (requestId, donorInfo) => {
    if (!isAdmin) {
      alert("Only Admins can assign donors.");
      return;
    }

    const { donorName, donorEmail } = donorInfo || {
      donorName: prompt("Admin: Enter Donor Name for assignment:"),
      donorEmail: prompt("Admin: Enter Donor Email for assignment:"),
    };

    if (!donorName || !donorEmail) {
      alert("Donor assignment canceled or incomplete.");
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/donation-requests/assign-donor/${requestId}`,
        {
          donorName,
          donorEmail,
        }
      );
      alert(`Donor ${donorName} assigned. Status updated to 'inprogress'.`);
      fetchAllRequests();
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error(`Error assigning donor for ${requestId}:`, error);
      alert(
        `Failed to assign donor: ${
          error.response?.data?.message || "Server error"
        }`
      );
    }
  };

  // Delete Request Handler (Admin ONLY)
  const handleDelete = async (requestId) => {
    if (!isAdmin) {
      alert("Only Admins can delete requests.");
      return;
    }

    if (
      !window.confirm(
        "Admin: Are you sure you want to DELETE this request permanently?"
      )
    )
      return;

    try {
      await axios.delete(`${API_BASE_URL}/donation-requests/${requestId}`);
      alert(`Request ${requestId} deleted successfully.`);
      fetchAllRequests();
    } catch (error) {
      console.error(`Error deleting request ${requestId}:`, error);
      alert(
        `Failed to delete request: ${
          error.response?.data?.message || "Server error"
        }`
      );
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // --- Modal Component for Details/Management (Conditional Rendering based on role) ---
  const DetailModal = () => {
    if (!selectedRequest) return null;

    const { _id, recipientName, bloodGroup, donationStatus, donorInformation } =
      selectedRequest;

    const isPending = donationStatus === "pending";
    const isInProgress = donationStatus === "inprogress";

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-80 flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 scale-100">
          <div className="p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-600 flex items-center">
                <Eye className="w-6 h-6 mr-2" /> Request Details (#{" "}
                {String(_id).slice(-6)})
              </h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition duration-150"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* ... (Recipient Info and Details Grid remain the same) ... */}
            <div className="mb-6 space-y-2">
              <p className="text-lg font-semibold flex items-center">
                Current Status:{" "}
                <StatusBadge status={donationStatus} className="ml-2" />
              </p>
              <p className="text-xl font-extrabold text-red-700">
                Recipient: {recipientName} (Group: {bloodGroup})
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700 mb-6 p-4 rounded-lg border border-red-200 bg-red-50">
              <DetailItem
                title="Requester"
                value={`${selectedRequest.requesterName} (${selectedRequest.requesterEmail})`}
              />
              <DetailItem
                title="Date & Time"
                value={`${formatDate(selectedRequest.donationDate)} @ ${
                  selectedRequest.donationTime
                }`}
              />
              <DetailItem
                title="Hospital"
                value={selectedRequest.hospitalName}
              />
              <DetailItem
                title="Location"
                value={`${selectedRequest.recipientUpazila}, ${selectedRequest.recipientDistrict}`}
              />
              <DetailItem
                title="Full Address"
                value={selectedRequest.fullAddressLine}
                className="sm:col-span-2"
              />

              {donorInformation && (
                <>
                  <DetailItem
                    title="Assigned Donor"
                    value={donorInformation.donorName}
                    color="text-blue-700"
                  />
                  <DetailItem
                    title="Donor Contact"
                    value={donorInformation.donorEmail}
                    color="text-blue-700"
                  />
                </>
              )}
              <DetailItem
                title="Request Message"
                value={selectedRequest.requestMessage}
                className="sm:col-span-2 italic text-gray-600 border-t pt-2 mt-2"
              />
            </div>
            {/* --- END Details Grid --- */}

            {/* Conditional Management Options */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                {isAdmin ? "Admin Management Options" : "Volunteer Actions"}
              </h4>
              <div className="flex flex-wrap gap-3">
                {/* 1. ADMIN ONLY: Assign Donor */}
                {isAdmin && isPending && (
                  <ActionButton
                    onClick={() => handleAssignDonor(_id)}
                    Icon={UserPlus}
                    label="Assign Donor (Admin)"
                    color="bg-blue-600 hover:bg-blue-700"
                  />
                )}

                {/* 2. Volunteer/Admin: Mark as Done (if in progress) */}
                {isInProgress && (
                  <ActionButton
                    onClick={() => handleStatusUpdate(_id, "done")}
                    Icon={CheckCircle}
                    label="Mark as Done"
                    color="bg-green-600 hover:bg-green-700"
                  />
                )}

                {/* 3. Volunteer/Admin: Cancel Request (if pending or in progress) */}
                {(isPending || isInProgress) && (
                  <ActionButton
                    onClick={() => handleStatusUpdate(_id, "canceled")}
                    Icon={XCircle}
                    label="Cancel Request"
                    color="bg-yellow-600 hover:bg-yellow-700"
                  />
                )}

                {/* 4. ADMIN ONLY: Delete Button */}
                {isAdmin && (
                  <ActionButton
                    onClick={() => handleDelete(_id)}
                    Icon={Trash2}
                    label="Delete Request (Admin)"
                    color="bg-gray-400 hover:bg-gray-500 ml-auto"
                  />
                )}

                {/* Message if no actions are available */}
                {!isAdmin && !isVolunteer && (
                  <p className="text-red-500">
                    You do not have permission to perform actions on this
                    request.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Component Rendering ---
  if (!canManageRequests) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen text-center py-20">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Access Denied</h2>
        <p className="text-gray-600">
          You do not have the required role (Admin or Volunteer) to view this
          page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-red-700 mb-6 border-b-4 border-red-500 pb-3">
        🩸 All Donation Requests ({isAdmin ? "Admin" : "Volunteer"} View)
      </h2>
      <p className="text-gray-600 mb-6">
        {isAdmin
          ? "Full Management: View, Filter, Assign Donor, Update Status, Delete Requests."
          : "Volunteer View: View, Filter, and Update Status only (Mark Done or Cancel)."}
      </p>

      {/* Filter and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow-lg border border-red-100">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Filter className="w-5 h-5 text-red-600" />
          <label
            htmlFor="statusFilter"
            className="font-semibold text-gray-700 whitespace-nowrap"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleFilterChange}
            className="p-2 border border-red-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500 transition duration-150 text-sm"
          >
            <option value="">All Statuses</option>
            {availableStatuses.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="text-gray-600 text-sm">
            Showing Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Loading/Empty State */}
      {/* ... (Loading/Empty state logic remains the same) ... */}
      {loading ? (
        <div className="text-center py-16 text-red-600 font-semibold flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border-4 border-dashed border-red-200 bg-white rounded-lg transition duration-300 hover:border-red-400">
          <Mail className="w-10 h-10 mx-auto mb-4 text-red-400" />
          <p className="text-xl font-medium">No donation requests found.</p>
        </div>
      ) : (
        <>
          {/* Requests Table */}
          <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider hidden md:table-cell">
                    Location
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider hidden sm:table-cell">
                    Donation Date
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-center text-xs font-bold uppercase tracking-wider">
                    View/Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {requests.map((request) => (
                  <tr
                    key={request._id}
                    className="hover:bg-red-50 transition duration-150"
                  >
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.recipientName}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-red-700 font-extrabold">
                      {request.bloodGroup}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {request.recipientDistrict}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {formatDate(request.donationDate)}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm">
                      <StatusBadge status={request.donationStatus} />
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsDetailModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800 transition duration-150 p-2 rounded-full hover:bg-red-100"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* Admin ONLY Quick Assign Donor */}
                      {isAdmin && request.donationStatus === "pending" && (
                        <button
                          onClick={() => handleAssignDonor(request._id)}
                          className="text-blue-600 hover:text-blue-800 transition duration-150 ml-2 p-2 rounded-full hover:bg-blue-100"
                          title="Admin: Assign Donor"
                        >
                          <UserPlus className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className={`flex items-center px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ${
                currentPage === 1 || loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600 shadow-md"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </button>
            <span className="text-gray-700 font-medium text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className={`flex items-center px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ${
                currentPage === totalPages || loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600 shadow-md"
              }`}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </>
      )}

      {/* Detail/Management Modal */}
      {isDetailModalOpen && <DetailModal />}
    </div>
  );
};

export default AllBloodDonationRequest;

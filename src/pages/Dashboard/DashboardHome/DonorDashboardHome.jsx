import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import {
  HeartHandshake,
  MapPin,
  Clock,
  Calendar,
  BadgeInfo,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const DonorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: requestsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recentDonationRequests", user?.email],
    queryFn: async () => {
      if (!user?.email) return { requests: [] };

      const response = await axiosSecure.get(
        `/my-recent-requests?email=${user.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  const recentRequests = requestsData?.requests || [];

  // --- Helper Functions ---
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "inprogress":
        return "badge-info";
      case "done":
        return "badge-success";
      case "canceled":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  // --- Action Handlers ---

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: `Confirm ${newStatus.toUpperCase()}`,
      text: `Are you sure you want to change the status of this request to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, mark as ${newStatus}`,
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(
            `/donation-requests/status/${id}`,
            { status: newStatus }
          );
          if (response.data.modifiedCount > 0) {
            Swal.fire(
              "Updated!",
              `Request status changed to ${newStatus}.`,
              "success"
            );
            refetch();
          } else {
            Swal.fire(
              "Error",
              "Failed to update request status on the server.",
              "error"
            );
          }
        } catch (error) {
          console.error("Status change error:", error);
          Swal.fire(
            "Error",
            "An error occurred while updating the status.",
            "error"
          );
        }
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/donation-requests/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire(
              "Deleted!",
              "Your donation request has been deleted.",
              "success"
            );
            refetch();
          } else {
            Swal.fire(
              "Error",
              "Failed to delete request on the server.",
              "error"
            );
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the request.",
            "error"
          );
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-lg text-gray-600">
          Loading Dashboard Data...
        </span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <section className="mb-10 p-6 bg-white rounded-xl shadow-lg border-l-4 border-red-600">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <HeartHandshake className="w-8 h-8 mr-3 text-red-600" />
          Welcome Back,{" "}
          <span className="text-red-600 ml-2">
            {user?.displayName || "Donor"}
          </span>
          !
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Here's a snapshot of your recent blood donation activity.
        </p>
      </section>

      {/* Recent Requests Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-red-600" />
          Your Recent Donation Requests
        </h2>

        {recentRequests.length === 0 ? (
          <div className="p-10 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-inner">
            <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
            <p className="text-xl font-semibold text-gray-700">
              You haven't made any donation requests yet.
            </p>
            <p className="text-gray-500 mt-1">
              Start by creating your first request to help someone in need.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
              <table className="table w-full">
                {/* Table Header */}
                <thead className="text-gray-700 bg-red-50 text-base">
                  <tr>
                    <th>Recipient</th>
                    <th>Location</th>
                    <th>Date & Time</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                    <th>Donor Info</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-gray-50 border-b border-gray-100"
                    >
                      {/* Recipient Name */}
                      <td className="font-semibold text-gray-800">
                        {request.recipientName}
                      </td>

                      {/* Recipient Location */}
                      <td>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <p>
                            {request.recipientUpazila},{" "}
                            {request.recipientDistrict}
                          </p>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td>
                        <div className="flex flex-col space-y-1">
                          <span className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                            {new Date(
                              request.donationDate
                            ).toLocaleDateString()}
                          </span>
                          <span className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-1 text-gray-500" />
                            {request.donationTime}
                          </span>
                        </div>
                      </td>

                      {/* Blood Group */}
                      <td>
                        <span className="badge badge-lg bg-red-100 text-red-600 font-bold border-red-300">
                          {request.bloodGroup}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge ${getStatusColor(
                            request.donationStatus
                          )} badge-lg font-semibold capitalize`}
                        >
                          {request.donationStatus}
                        </span>
                      </td>

                      {/* Donor Information */}
                      <td>
                        {request.donationStatus === "inprogress" &&
                        request.donorInformation ? (
                          <div className="flex flex-col text-sm">
                            <span className="font-medium text-gray-800">
                              {request.donorInformation.name}
                            </span>
                            <span className="text-gray-500">
                              {request.donorInformation.email}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="space-x-2 flex items-center h-full py-4">
                        {/* Status Buttons (Only for 'inprogress') */}
                        {request.donationStatus === "inprogress" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(request._id, "done")
                              }
                              className="btn btn-sm btn-success text-white px-2"
                              title="Mark as Done"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(request._id, "canceled")
                              }
                              className="btn btn-sm btn-error text-white px-2"
                              title="Cancel Request"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {/* Edit Button  */}
                        {["pending", "inprogress"].includes(
                          request.donationStatus
                        ) && (
                          <Link
                            to={`/dashboard/edit-request/${request._id}`}
                            className="btn btn-sm btn-info text-white px-2"
                            title="Edit Request"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100 px-2"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View All Requests Button */}
            {recentRequests.length > 0 && (
              <div className="text-center mt-6">
                <Link
                  to="/dashboard/my-donation-requests"
                  className="btn bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg shadow-md transition duration-200"
                >
                  View My All Requests
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default DonorDashboardHome;

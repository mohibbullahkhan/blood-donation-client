import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"; // Using Material-UI for professional table/pagination
import {
  HeartHandshake,
  MapPin,
  Clock,
  Calendar,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // --- State for Pagination and Filtering ---
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState(""); // Empty string means no filter
  const itemsPerPage = 10; // Fixed limit per page

  // --- React Query Fetcher ---
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["myDonationRequests", user?.email, currentPage, filterStatus],
    queryFn: async () => {
      if (!user?.email)
        return { requests: [], totalRequests: 0, totalPages: 0 };

      let url = `/my-donation-requests?email=${user.email}&page=${currentPage}&limit=${itemsPerPage}`;

      if (filterStatus) {
        url += `&status=${filterStatus}`;
      }

      const response = await axiosSecure.get(url);
      return response.data;
    },
    enabled: !!user?.email,
    // Keep data while fetching next page/filter
    staleTime: 60000,
    keepPreviousData: true,
  });

  const allRequests = data?.requests || [];
  const totalPages = data?.totalPages || 1;

  // --- Helper Functions ---
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inprogress":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // --- Action Handlers ---
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Status Change Handler (Copied from DashboardHome logic)
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

  // Delete Handler (Copied from DashboardHome logic)
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

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-lg text-gray-600">
          Loading All Requests...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg">
        Error loading requests. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <HeartHandshake className="w-7 h-7 mr-3 text-red-600" />
          My All Donation Requests
        </h1>
        <p className="mt-1 text-gray-600">
          Manage all the blood donation requests you have created.
        </p>
      </header>

      {/* Filtering and Search Control */}
      <div className="mb-6 flex justify-end">
        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={filterStatus}
            onChange={handleFilterChange}
            label="Filter by Status"
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Table Content */}
      <Paper elevation={3} className="rounded-xl overflow-hidden">
        {allRequests.length === 0 ? (
          <div className="p-10 text-center bg-white">
            <p className="text-xl font-semibold text-gray-700">
              No donation requests found{" "}
              {filterStatus ? `with status "${filterStatus}"` : ""}.
            </p>
          </div>
        ) : (
          <TableContainer>
            <Table stickyHeader aria-label="My Donation Requests Table">
              <TableHead>
                <TableRow className="bg-red-50">
                  <TableCell className="font-bold text-gray-700">
                    Recipient
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Location
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Date & Time
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Blood Group
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Status
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Donor Info
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequests.map((request) => (
                  <TableRow
                    key={request._id}
                    hover
                    className="border-b border-gray-100"
                  >
                    {/* Recipient Name */}
                    <TableCell className="font-semibold text-gray-800">
                      {request.recipientName}
                    </TableCell>

                    {/* Recipient Location */}
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <p>
                          {request.recipientUpazila},{" "}
                          {request.recipientDistrict}
                        </p>
                      </div>
                    </TableCell>

                    {/* Date & Time */}
                    <TableCell>
                      <div className="flex flex-col text-xs">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                          {new Date(request.donationDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          {request.donationTime}
                        </span>
                      </div>
                    </TableCell>

                    {/* Blood Group */}
                    <TableCell>
                      <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-600 border border-red-300">
                        {request.bloodGroup}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                          request.donationStatus
                        )}`}
                      >
                        {request.donationStatus}
                      </span>
                    </TableCell>

                    {/* Donor Information */}
                    <TableCell>
                      {request.donationStatus === "inprogress" &&
                      request.donorInformation ? (
                        <div className="flex flex-col text-xs">
                          <span className="font-medium text-gray-800">
                            {request.donorInformation.name}
                          </span>
                          <span className="text-gray-500">
                            {request.donorInformation.email}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {/* Status Buttons (Only for 'inprogress') */}
                        {request.donationStatus === "inprogress" && (
                          <>
                            <Button
                              variant="contained"
                              size="small"
                              color="success"
                              onClick={() =>
                                handleStatusChange(request._id, "done")
                              }
                              startIcon={<CheckCircle className="w-4 h-4" />}
                              title="Mark as Done"
                            >
                              Done
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              color="error"
                              onClick={() =>
                                handleStatusChange(request._id, "canceled")
                              }
                              startIcon={<XCircle className="w-4 h-4" />}
                              title="Cancel Request"
                            >
                              Cancel
                            </Button>
                          </>
                        )}

                        {/* Edit Button (Available if not done/canceled) */}
                        {["pending", "inprogress"].includes(
                          request.donationStatus
                        ) && (
                          <Button
                            component={Link}
                            to={`/dashboard/edit-request/${request._id}`}
                            variant="outlined"
                            size="small"
                            startIcon={<Edit className="w-4 h-4" />}
                            title="Edit Request"
                          >
                            Edit
                          </Button>
                        )}

                        {/* Delete Button */}
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(request._id)}
                          startIcon={<Trash2 className="w-4 h-4" />}
                          title="Delete Request"
                        >
                          Delete
                        </Button>

                        {/* View Button */}
                        <Button
                          component={Link}
                          to={`/dashboard/donation-request-details/${request._id}`}
                          variant="outlined"
                          size="small"
                          color="primary"
                          startIcon={<Eye className="w-4 h-4" />}
                          title="View Details"
                        >
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
            siblingCount={1}
            boundaryCount={1}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;

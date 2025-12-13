import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust path as needed
import {
  Loader2,
  User,
  Filter,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Shield,
  HandHelping,
  Lock,
  Unlock,
} from "lucide-react";
import { toast } from "react-hot-toast"; // Assuming you use react-hot-toast

const AllUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // --- State for Filtering and Pagination ---
  const [statusFilter, setStatusFilter] = useState(""); // '' means no filter
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // --- Fetch Users Data ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allUsers", currentPage, statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/all`, {
        params: {
          page: currentPage,
          limit: usersPerPage,
          status: statusFilter,
        },
      });
      return res.data;
    },
    keepPreviousData: true, // For smoother pagination
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;
  const totalUsers = data?.totalUsers || 0;

  // --- Mutations for Actions ---

  // 1. Role Update Mutation (Make Admin / Volunteer)
  const updateRoleMutation = useMutation({
    mutationFn: ({ email, role }) => {
      return axiosSecure.patch(`/users/update-role/${email}`, { role });
    },
    onSuccess: (data, variables) => {
      toast.success(`${variables.email}'s role set to ${variables.role}!`);
      queryClient.invalidateQueries(["allUsers"]); // Refetch the user list
    },
    onError: (error) => {
      toast.error(
        `Failed to update role: ${
          error.response?.data?.message || "Server error"
        }`
      );
    },
  });

  // 2. Status Update Mutation (Block / Unblock)
  const updateStatusMutation = useMutation({
    mutationFn: ({ email, status }) => {
      return axiosSecure.patch(`/users/update-status/${email}`, { status });
    },
    onSuccess: (data, variables) => {
      toast.success(`${variables.email} is now ${variables.status}.`);
      queryClient.invalidateQueries(["allUsers"]); // Refetch the user list
    },
    onError: (error) => {
      toast.error(
        `Failed to update status: ${
          error.response?.data?.message || "Server error"
        }`
      );
    },
  });

  // --- Handlers ---
  const handleRoleUpdate = (email, newRole) => {
    if (
      window.confirm(`Are you sure you want to make ${email} a ${newRole}?`)
    ) {
      updateRoleMutation.mutate({ email, role: newRole });
    }
  };

  const handleStatusUpdate = (email, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    if (window.confirm(`Are you sure you want to ${newStatus} ${email}?`)) {
      updateStatusMutation.mutate({ email, status: newStatus });
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // --- Loading and Error Views ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        <span className="ml-3 text-xl text-gray-600">Loading all users...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-100 rounded-lg shadow-md">
        Error fetching user data. Please check the backend connection.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <User className="w-7 h-7 mr-2 text-red-600" /> All Platform Users (
        {totalUsers})
      </h1>

      {/* Filter and Control Bar */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <label htmlFor="statusFilter" className="text-gray-700">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleFilterChange}
            className="select select-bordered select-sm w-full max-w-xs border-gray-300 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        {/* Optional: Add a search bar here */}
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-red-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found matching the current filters.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-red-50/50 transition duration-150 border-gray-200"
                >
                  {/* Avatar */}
                  <td>
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring ring-red-300 ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/5F86D49/default-avatar.png"
                          }
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                  </td>
                  {/* Name */}
                  <td className="font-semibold text-gray-800">
                    {user.displayName || "N/A"}
                  </td>
                  {/* Email */}
                  <td className="text-sm text-gray-500">{user.email}</td>
                  {/* Role */}
                  <td>
                    <div
                      className={`badge badge-lg uppercase ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "volunteer"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {user.role}
                    </div>
                  </td>
                  {/* Status */}
                  <td>
                    <div
                      className={`badge badge-sm uppercase ${
                        user.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {user.status}
                    </div>
                  </td>
                  {/* Actions Menu */}
                  <td className="text-center">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle btn-sm"
                      >
                        <EllipsisVertical className="w-5 h-5" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-56 border border-gray-200"
                      >
                        {/* Role Buttons */}
                        {user.role !== "admin" && (
                          <li>
                            <button
                              onClick={() =>
                                handleRoleUpdate(user.email, "admin")
                              }
                              className="text-red-600 hover:bg-red-50 justify-between"
                              disabled={updateRoleMutation.isLoading}
                            >
                              <Shield className="w-4 h-4" /> Make Admin
                            </button>
                          </li>
                        )}
                        {user.role !== "volunteer" && (
                          <li>
                            <button
                              onClick={() =>
                                handleRoleUpdate(user.email, "volunteer")
                              }
                              className="text-yellow-600 hover:bg-yellow-50 justify-between"
                              disabled={updateRoleMutation.isLoading}
                            >
                              <HandHelping className="w-4 h-4" /> Make Volunteer
                            </button>
                          </li>
                        )}
                        <li className="my-1 h-[1px] bg-gray-200"></li>
                        {/* Status Buttons */}
                        {user.status === "active" ? (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(user.email, "active")
                              }
                              className="text-gray-600 hover:bg-gray-50 justify-between"
                              disabled={updateStatusMutation.isLoading}
                            >
                              <Lock className="w-4 h-4" /> Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(user.email, "blocked")
                              }
                              className="text-green-600 hover:bg-green-50 justify-between"
                              disabled={updateStatusMutation.isLoading}
                            >
                              <Unlock className="w-4 h-4" /> Unblock User
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Showing {users.length * currentPage} of {totalUsers} users
          </p>
          <div className="join border border-gray-300 rounded-lg">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
              className="join-item btn btn-sm bg-white hover:bg-red-50 text-red-600 border-r-0"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button className="join-item btn btn-sm bg-red-600 text-white border-red-600">
              Page {currentPage} of {totalPages}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
              className="join-item btn btn-sm bg-white hover:bg-red-50 text-red-600 border-l-0"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;

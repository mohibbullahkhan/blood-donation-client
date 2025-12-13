import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Users, Droplet, DollarSign, Loader2 } from "lucide-react";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // --- Fetch Admin Statistics ---
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      // Fetch statistics from the new backend route
      const response = await axiosSecure.get("/admin/dashboard-stats");
      return response.data;
    },
    staleTime: 60000, // Data is fresh for 1 minute
  });

  // Default stats structure for initial load/error
  const dashboardStats = stats || {
    totalUsers: 0,
    totalFunding: "0.00",
    totalRequests: 0,
  };

  // --- Card Data Configuration ---
  const statsCards = [
    {
      title: "Total Users (Donors)",
      count: dashboardStats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      borderColor: "border-blue-400",
    },
    {
      title: "Total Funding",
      // Displaying the dollar sign (or appropriate currency)
      count: `$${dashboardStats.totalFunding}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
      borderColor: "border-green-400",
    },
    {
      title: "Total Blood Donation Requests",
      count: dashboardStats.totalRequests,
      icon: Droplet,
      color: "text-red-600",
      bg: "bg-red-50",
      borderColor: "border-red-400",
    },
  ];

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-lg text-gray-600">
          Loading Admin Statistics...
        </span>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-100 rounded-lg shadow-md">
        Error loading admin dashboard data. Please check the backend connection.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <section className="mb-10 p-6 bg-white rounded-xl shadow-lg border-l-4 border-red-600">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <Droplet className="w-8 h-8 mr-3 text-red-600" />
          Welcome to the Admin Dashboard,{" "}
          <span className="text-red-600 ml-2">
            {user?.displayName || "Admin"}
          </span>
          !
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Here are the key operational metrics for the platform.
        </p>
      </section>

      {/* Statistics Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {statsCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className={`p-6 ${card.bg} rounded-xl shadow-lg border-l-4 ${card.borderColor} transition duration-300 hover:shadow-2xl`}
            >
              <div className="flex justify-between items-start">
                {/* Count Number */}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    {card.count}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`p-3 rounded-full ${card.bg.replace(
                    "-50",
                    "-200"
                  )}`}
                >
                  <IconComponent className={`w-8 h-8 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Future Admin Content goes here (e.g., recent user registrations, charts) */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800">
          Recent Activity Overview
        </h2>
        <div className="mt-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <p className="text-gray-500">
            *Placeholder for graphs, tables, and quick action buttons for admin
            tasks.*
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardHome;

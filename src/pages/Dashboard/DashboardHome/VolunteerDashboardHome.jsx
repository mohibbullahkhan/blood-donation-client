import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Users, Droplet, DollarSign, Loader2, HandHelping } from "lucide-react";

const VolunteerDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // --- Fetch Admin/Volunteer Statistics (Uses the same Admin endpoint) ---
  // NOTE: In a secure application, you might use a separate, potentially restricted
  // endpoint, but based on the requirement to be "the same page," we reuse the stats route.
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["volunteerDashboardStats"],
    queryFn: async () => {
      // Fetch statistics from the admin backend route
      const response = await axiosSecure.get("/admin/dashboard-stats");
      return response.data;
    },
    staleTime: 60000,
  });

  // Default stats structure for initial load/error
  const dashboardStats = stats || {
    totalUsers: 0,
    totalFunding: "0.00",
    totalRequests: 0,
  };

  // --- Card Data Configuration ---
  // Reusing the structure and data fetched by the admin stats endpoint
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-lg text-gray-600">
          Loading Volunteer Statistics...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-100 rounded-lg shadow-md">
        Error loading dashboard data. Please check the network connection.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section - Adjusted for Volunteer */}
      <section className="mb-10 p-6 bg-white rounded-xl shadow-lg border-l-4 border-red-600">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <HandHelping className="w-8 h-8 mr-3 text-red-600" />
          Welcome,{" "}
          <span className="text-red-600 ml-2">
            {user?.displayName || "Volunteer"}
          </span>
          !
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Thank you for your service! Here are the platform's key operational
          metrics.
        </p>
      </section>

      {/* Statistics Cards Section (Identical to Admin Dashboard) */}
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

      {/* Future Volunteer-specific Content */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800">Your Current Tasks</h2>
        <div className="mt-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <p className="text-gray-500">
            *Placeholder for tasks assigned to the volunteer, such as reviewing
            requests or managing users.*
          </p>
        </div>
      </section>
    </div>
  );
};

export default VolunteerDashboardHome;

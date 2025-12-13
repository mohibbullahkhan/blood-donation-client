// import React from "react";
// import useRole from "../../../hooks/useRole";
// import AdminDashboardHome from "./AdminDashboardHome";
// import DonorDashboardHome from "./DonorDashboardHome";
// import VolunteerDashboardHome from "./VolunteerDashboardHome";

// const DashboardHome = () => {
//   const { role, roleLoading } = useRole();
//   if (roleLoading) {
//     return <h2>Loading</h2>;
//   }
//   if (role === "admin") {
//     return <AdminDashboardHome></AdminDashboardHome>;
//   } else if (role === "volunteer") {
//     return <VolunteerDashboardHome></VolunteerDashboardHome>;
//   } else {
//     return <DonorDashboardHome></DonorDashboardHome>;
//   }
// };

// export default DashboardHome;

import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import DonorDashboardHome from "./DonorDashboardHome";
import VolunteerDashboardHome from "./VolunteerDashboardHome";
import { Loader2, AlertTriangle } from "lucide-react";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  // 1. Loading State Check
  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        <span className="ml-3 text-xl text-gray-600">
          Loading Dashboard Role...
        </span>
      </div>
    );
  }

  // 2. Role-Based Rendering
  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "volunteer") {
    // You'll need to create this component later
    return <VolunteerDashboardHome />;
  } else if (role === "donor") {
    // Explicit check for 'donor' role
    return <DonorDashboardHome />;
  } else {
    // Fallback for logged-in user with an unknown or missing role
    return (
      <div className="p-8 text-center bg-red-100 text-red-800 rounded-lg shadow-md">
        <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
        <h2 className="text-xl font-bold">Role Not Determined</h2>
        <p>
          Could not determine your account role. Please ensure your profile is
          complete.
        </p>
      </div>
    );
  }
};

export default DashboardHome;

// import React from "react";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const useRole = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { isLoading: roleLoading, data: role = "donor" } = useQuery({
//     queryKey: ["donor-role", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user?.email}/role`);
//       console.log("in the console", res.data);
//       return res.data?.role || "donor";
//     },
//   });
//   return { role, roleLoading };
// };

// export default useRole;

// src/hooks/useRole.jsx (Conceptual structure)
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth(); // Assuming useAuth provides email
  const axiosSecure = useAxiosSecure();

  // Fetch the user profile from the database to get the 'role'
  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      // This calls your backend route: GET /users/profile/:email
      const res = await axiosSecure.get(`/users/profile/${user.email}`);
      return res.data;
    },
    // Only fetch if the Firebase/Auth user is loaded and an email is present
    enabled: !loading && !!user?.email,
  });

  return {
    // The core data point is userProfile?.role
    role: userProfile?.role,
    // Combine auth loading with profile fetching loading
    roleLoading: loading || isProfileLoading,
  };
};

export default useRole;

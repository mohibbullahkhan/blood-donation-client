import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;

      const res = await axiosSecure.get(`/users/profile/${user.email}`);
      return res.data;
    },

    enabled: !loading && !!user?.email,
  });

  return {
    role: userProfile?.role,

    roleLoading: loading || isProfileLoading,
  };
};

export default useRole;

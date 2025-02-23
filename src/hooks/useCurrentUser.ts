import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const fetchCurrentUser = async () => {
  const response = await axiosInstance.get("/currentUser");
  return response?.data || {};
};

const useCurrentUser = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useCurrentUser;

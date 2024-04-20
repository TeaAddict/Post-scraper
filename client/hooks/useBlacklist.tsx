import { addToBlacklist } from "@/features/blacklist/addToBlacklist";
import { deleteFromBlacklist } from "@/features/blacklist/deleteFromBlacklist";
import { getBlacklist } from "@/features/blacklist/getBlacklist";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useBlacklist = () => {
  const query = useQuery({
    queryKey: ["blacklist"],
    queryFn: getBlacklist,
    placeholderData: [],
  });
  return query;
};

export const useAddToBlacklist = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: addToBlacklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blacklist"] });
    },
    onError: (e) => {
      console.log("Problem with adding keyword to blacklist:", e);
    },
  });
  return mutation;
};

export const useDeleteFromBlacklist = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: deleteFromBlacklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blacklist"] });
    },
    onError: (e) => {
      console.log("Problem with deleting keyword from blacklist:", e);
    },
  });
  return mutation;
};

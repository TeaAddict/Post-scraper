import { getSettings } from "@/features/settings/getSettings";
import { updateSettings } from "@/features/settings/updateSettings";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useSettings = () => {
  const query = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  return query;
};

export const useSettingsMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      console.log("Error with settings mutation");
    },
  });
  return mutation;
};

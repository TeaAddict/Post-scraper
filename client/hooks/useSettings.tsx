import { getSettings } from "@/features/settings/getSettings";
import { updateSettings } from "@/features/settings/updateSettings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSettings = () => {
  const query = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  return query;
};

export const useSettingsMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      console.log("Error with settings mutation");
    },
  });
  return mutation;
};

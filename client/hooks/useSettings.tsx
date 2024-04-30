import { getExperienceLevel } from "@/features/settings/getExperienceLevel";
import { getJobType } from "@/features/settings/getJobType";
import { getPostAge } from "@/features/settings/getPostAge";
import { getRemote } from "@/features/settings/getRemote";
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

export const usePostAge = () => {
  return useQuery({ queryKey: ["postAge"], queryFn: getPostAge });
};

export const useJobType = () => {
  return useQuery({ queryKey: ["jobType"], queryFn: getJobType });
};

export const useExperienceLevel = () => {
  return useQuery({
    queryKey: ["experienceLevel"],
    queryFn: getExperienceLevel,
  });
};

export const useRemote = () => {
  return useQuery({ queryKey: ["remote"], queryFn: getRemote });
};

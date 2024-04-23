import { login } from "@/features/auth/login";
import { register } from "@/features/auth/register";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: login,
    onError: (e) => {
      console.log("Problem with logging in:", e);
    },
  });

  return mutation;
};

export const useRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: register,
    onError: (e) => {
      console.log("Problem with registration:", e);
    },
  });
  return mutation;
};

"use client";
import Button from "@/components/shared/button";
import InputBox from "@/components/shared/inputBox";
import { useLoginMutation } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const isLoading = isSubmitting;

  function onSubmit({ username, password }: FormValues) {
    loginMutation.mutate(
      { username, password },
      {
        onSuccess() {
          router.push("/");
        },
      }
    );
  }

  return (
    <form
      className="flex flex-col w-96 gap-10 bg-card p-14 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="flex justify-center">Login page</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <p>Username</p>
            <InputBox
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div>
            <p>Password</p>
            <InputBox
              {...register("password", { required: "Password is required" })}
              type="password"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button variation="primary" type="submit" disabled={isLoading}>
            Login
          </Button>
          <Button
            variation="primaryHollow"
            type="button"
            onClick={() => {
              router.push("/register");
            }}
            disabled={isLoading}
          >
            Register
          </Button>
        </div>
        {loginMutation.error?.message && (
          <p className="text-red-400 flex justify-center">
            {loginMutation.error?.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;

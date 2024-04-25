"use client";
import Button from "@/components/shared/Button";
import InputBox from "@/components/shared/InputBox";
import { useRegisterMutation } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  password: string;
};

const RegisterForm = () => {
  const registerMutation = useRegisterMutation();
  const router = useRouter();
  const {
    register,
    reset,
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
    registerMutation.mutate(
      { username, password },
      {
        onSuccess() {
          reset();
          router.push("/post");
        },
      }
    );
  }

  return (
    <form
      className="flex flex-col w-96 gap-10 bg-card p-14 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="flex justify-center">Register page</h3>
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
            Register
          </Button>
          <Button
            variation="primaryHollow"
            type="button"
            onClick={() => {
              router.push("/login");
            }}
            disabled={isLoading}
          >
            Go to login
          </Button>
        </div>
        {registerMutation.error?.message && (
          <p className="text-red-400 flex justify-center">
            {registerMutation.error?.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;

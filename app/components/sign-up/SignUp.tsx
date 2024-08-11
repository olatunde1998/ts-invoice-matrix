"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { CreateClientRequest } from "@/app/services/clients.request";
import { BiHide, BiShow } from "react-icons/bi";

import { Button } from "@/components/ui/button";

// Validation Schema
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First Name must be greater than 3 letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last Name must be greater than 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 15 characters"),
});

export default function SignUp() {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // refetch clients tanStack query logic
  const queryClient = useQueryClient();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Create Client submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      password: data?.password,
    };
    try {
      await CreateClientRequest(body);
      queryClient.invalidateQueries({ queryKey: ["getClientsApi"] });
      toast.success("Register Successfully");
      reset();
    } catch (error: any) {
      console.log(error?.response?.message);
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsSaving(false);
    }
    setIsSaving(false);
  };

  return (
    <>
      <div className="text-accent-foreground">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <section className="items-start space-y-6">
            {/* === First Name === */}
            <div>
              <div
                className={`${
                  errors.firstName ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-[#6C748B] rounded-lg`}
              >
                <input
                  className="py-2 focus:outline-none cursor-text bg-transparent text-black dark:text-white"
                  type="text"
                  placeholder="First Name *"
                  {...register("firstName")}
                  maxLength={24}
                />
              </div>
            </div>

            {/* === Last Name === */}
            <div>
              <div
                className={`${
                  errors.lastName ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-[#6C748B] rounded-lg`}
              >
                <input
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-black dark:text-white"
                  type="text"
                  placeholder="Last Name *"
                  {...register("lastName")}
                  maxLength={24}
                />
              </div>
            </div>

            {/* === Email Input === */}
            <div>
              <div
                className={`${
                  errors.email ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-[#6C748B] rounded-lg`}
              >
                <input
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-black dark:text-white"
                  type="email"
                  placeholder="Email Address *"
                  {...register("email")}
                  maxLength={40}
                />
              </div>
            </div>

            {/* === Password Input === */}
            <div>
              <div
                className={`${
                  errors.password ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-[#6C748B] rounded-lg relative`}
              >
                <input
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-black dark:text-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  {...register("password")}
                  maxLength={40}
                />
                {showPassword ? (
                  <BiHide
                    className="absolute right-2 bottom-3 cursor-pointer text-[#8A91A6]"
                    size={24}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <BiShow
                    className="absolute right-2 bottom-3 cursor-pointer text-[#8A91A6]"
                    size={24}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </div>
            </div>
          </section>

          {/* === Submit Button === */}
          <Button
            disabled={isSaving}
            className="flex-none rounded-md w-full mt-10 h-12 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            <span className="text-base font-semibold">
              {isSaving ? "Creating...." : "Create Account"}
            </span>
          </Button>
        </form>
      </div>
    </>
  );
}

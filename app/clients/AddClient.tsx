import { X } from "lucide-react";
import { CreateClientRequest } from "@/app/services/clients.request";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Upload } from "lucide-react";
import Image from "next/image";
import { BiHide, BiShow } from "react-icons/bi";

interface AddClientProps {
  setShowAddClient?: any;
}

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

export default function AddClient({ setShowAddClient }: AddClientProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [clientImage, setClientImage] = useState<string>();
  const [selectedClientImage, setSelectedClientImage] = useState(null);

  // refetch clients tanStack query logic
  const queryClient = useQueryClient();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Uploading Client avatar File logic
  const handleClientAvatarChange = ({ target: { files } }: any) => {
    const file = files[0];
    console.log(files[0]?.type, "this is the file type");

    if (file) {
      const fileType = files[0].type;
      if (
        fileType === "image/jpg" ||
        fileType === "image/png" ||
        fileType === "image/jpeg"
      ) {
        setClientImage(URL.createObjectURL(files[0]));
        setSelectedClientImage(file);
      }
    }
  };

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
      const response = await CreateClientRequest(body);
      console.log(response, "=====");
      queryClient.invalidateQueries({ queryKey: ["getClientsApi"] });
      toast.success("Client Created Successfully");
      setShowAddClient(false);
      reset();
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsSaving(false);
    }
    setIsSaving(false);
  };

  return (
    <div>
      <div className="w-full pt-1 md:pt-10 md:pb-20">
        <div>
          <div className="text-primary mb-8  flex items-center justify-between">
            <p className="">Add Client</p>
            <X onClick={() => setShowAddClient(false)} />
          </div>
        </div>

        {/* ===FORM SECTION === */}
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
                  className="py-2 focus:outline-none cursor-text bg-transparent text-accent"
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
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-accent"
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
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-accent"
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
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-accent"
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

            {/* === Client Avatar Image ==== */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#575D72]">Avatar Image</p>
              </div>
              <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white rounded-md  border-[0.6px] border-slate-300 mt-2 cursor-pointer ">
                <label
                  htmlFor="fileInput"
                  className="w-full p-3 flex  justify-between tracking-wide cursor-pointer text-[#575D72] h-[150px]"
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <p className="w-full flex justify-center">
                      <Upload className="mr-3" />
                      Upload Image
                    </p>
                    <input
                      type="file"
                      name="user_Image"
                      id="fileInput"
                      accept=".png,  .jpg, .jpeg"
                      className="hidden input-field"
                      onChange={handleClientAvatarChange}
                    />

                    {clientImage && (
                      <div className="border-2 border-slate-800 rounded-full relative mx-auto w-[45px]">
                        <Image
                          src={clientImage}
                          alt="user avatar"
                          width={100}
                          height={100}
                          className="rounded-full w-[45px] h-[35px]"
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* === Submit Button === */}
          <Button
            disabled={isSaving}
            className="flex-none rounded-md w-full mt-10 h-12 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            <span className="text-base font-semibold">
              {isSaving ? "Saving...." : "Add Client"}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

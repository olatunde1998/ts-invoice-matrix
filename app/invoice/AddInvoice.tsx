import { X } from "lucide-react";
import { CreateInvoiceRequest } from "@/app/services/invoice.request";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Upload } from "lucide-react";
import Image from "next/image";
import { statusData } from "@/utils/invoiceData";
import { Select } from "@/app/components/inputs/Select";

interface AddInvoiceProps {
  setShowAddInvoice?: any;
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
  amount: yup
    .string()
    .required("Amount is required")
    .min(3, "Amount must be greater than 3 letters"),
});

export default function AddInvoice({ setShowAddInvoice }: AddInvoiceProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<string>();
  const [selectedInvoiceFile, setSelectedInvoiceFile] = useState(null);
  const [getStatusName, setGetStatusName] = useState();

  // refetch invoices tanStack query logic
  const queryClient = useQueryClient();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Uploading Invoice File logic
  const handleInvoiceFileChange = ({ target: { files } }: any) => {
    const file = files[0];
    console.log(files[0]?.type, "this is the file type");

    if (file) {
      const fileType = files[0].type;
      if (
        fileType === "image/jpg" ||
        fileType === "image/png" ||
        fileType === "image/jpeg"
      ) {
        setInvoiceFile(URL.createObjectURL(files[0]));
        setSelectedInvoiceFile(file);
      }
    }
  };

  //Create  Invoice submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      amount: data?.amount,
      status: getStatusName,
    };
    try {
      await CreateInvoiceRequest(body);
      queryClient.invalidateQueries({ queryKey: ["getInvoicesApi"] });
      toast.success("Invoice Created Successfully");
      setShowAddInvoice(false);
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
            <p className="">Add Invoice</p>
            <X onClick={() => setShowAddInvoice(false)} />
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

            {/* === Amount === */}
            <div>
              <div
                className={`${
                  errors.amount ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-[#6C748B] rounded-lg`}
              >
                <input
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-accent"
                  type="text"
                  placeholder="Amount"
                  {...register("amount")}
                  maxLength={24}
                />
              </div>
            </div>

            {/* === Invoice File Image ==== */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#575D72]">Invoice File</p>
              </div>
              <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white rounded-md  border-[0.6px] border-slate-300 mt-2 cursor-pointer ">
                <label
                  htmlFor="fileInput"
                  className="w-full p-3 flex  justify-between tracking-wide cursor-pointer text-[#575D72] h-[150px]"
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <p className="w-full flex justify-center">
                      <Upload className="mr-3" />
                      Upload file
                    </p>
                    <input
                      type="file"
                      name="user_Image"
                      id="fileInput"
                      accept=".png,  .jpg, .jpeg"
                      className="hidden input-field"
                      onChange={handleInvoiceFileChange}
                    />

                    {invoiceFile && (
                      <div className="border-2 border-slate-800 rounded-full relative mx-auto w-[45px]">
                        <Image
                          src={invoiceFile}
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

            {/* === Status DropDown Input === */}
            <div>
              <Select
                placeholder="Status *"
                onSelect={(item: any) => {
                  setGetStatusName(item?.name);
                }}
                inputData={statusData}
              />
            </div>
          </section>

          {/* === Submit Button === */}
          <Button
            disabled={isSaving}
            className="flex-none rounded-md w-full mt-10 h-12 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            <span className="text-base font-semibold">
              {isSaving ? "Saving...." : "Add Invoice"}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

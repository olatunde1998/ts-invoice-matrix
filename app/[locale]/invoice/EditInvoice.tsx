import React, { useState } from "react";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { EditInvoiceRequest } from "@/app/services/invoice.request";
import { statusData } from "@/utils/invoiceData";
import { Select } from "@/app/components/inputs/Select";

interface EditInvoiceProps {
  setShowEditInvoice?: any;
  editInvoiceID?: any;
  invoiceData?: any;
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
  status: yup
    .string()
    .required("Status is required")
    .min(3, "Status must be greater than 3 letters"),
});

export default function EditInvoice({
  setShowEditInvoice,
  editInvoiceID,
  invoiceData,
}: EditInvoiceProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [getStatusName, setGetStatusName] = useState();

  const invoicesArray = invoiceData || [];
  const invoice = invoicesArray?.find(
    (invoice: any) => invoice?._id === editInvoiceID
  );

  console.log(invoice, "this is single invoice ====");

  // refetch invoices tanStack query logic
  const queryClient = useQueryClient();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: invoice?.firstName,
      lastName: invoice?.lastName,
      amount: invoice?.amount,
      email: invoice?.email,
      status: invoice?.status,
    },
  });

  //Edit Invoice submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      amount: data?.amount,
      status: getStatusName ? getStatusName : data?.status,
    };

    try {
      await EditInvoiceRequest(editInvoiceID, body);
      await queryClient.invalidateQueries({ queryKey: ["getInvoicesApi"] });
      toast.success("Invoice Edited Successfully");
      setShowEditInvoice(false);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setShowEditInvoice(false);
    }
    setIsSaving(false);
  };
  return (
    <>
      <div>
        <div className="w-full pt-1 md:pt-10 pb-20">
          <div>
            <div className="text-primary mb-8 flex items-center justify-between">
              <p className="">Edit Invoice</p>
              <X onClick={() => setShowEditInvoice(false)} />
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
                    className="py-2 focus:outline-none cursor-text bg-transparent text-black"
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
                    className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-black"
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
                    className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-black"
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
                    className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-black"
                    type="text"
                    placeholder="Amount"
                    {...register("amount")}
                    maxLength={24}
                  />
                </div>
              </div>

              {/* === Status === */}

              <div>
                <Select
                  placeholder="Status *"
                  onSelect={(item: any) => {
                    setGetStatusName(item?.name);
                  }}
                  inputData={statusData}
                  getSelectedSector={invoice?.status}
                />
              </div>
            </section>

            {/* === Status DropDown Input === */}
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-none rounded-md w-full mt-10 h-12 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              <span className="text-base font-semibold">
                {isSaving ? "Saving...." : "Save"}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

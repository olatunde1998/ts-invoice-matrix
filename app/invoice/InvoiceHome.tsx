"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { AiOutlineEdit } from "react-icons/ai";
import { Trash } from "lucide-react";
import { Table } from "@/app/components/tables/Table";
import { invoicesData } from "@/utils/invoiceData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Sheet } from "@/app/components/sheets/Sheet";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import { Modal } from "@/app/components/modals/Modal";
import AddInvoice from "./AddInvoice";
import EditInvoice from "./EditInvoice";
import DeleteInvoice from "./DeleteInvoice";
import { Skeleton } from "@/app/components/skeletons/Skeleton";

interface InvoiceData {
  id: string;
  fullName?: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  date?: string;
  amount?: number;
  paymentStatus?: string;
  repositoryUrl?: string;
  files?: string[];
  action?: any;
}

export default function InvoiceHome() {
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showDeleteInvoice, setShowDeleteInvoice] = useState(false);
  const [selectedRow, setSelectedRow] = useState<InvoiceData | null>(null);
  // create columnHelper
  const columnHelper = createColumnHelper<InvoiceData>();

  const { data: invoiceData, isLoading } = useQuery<InvoiceData[]>({
    queryKey: ["getInvoiceApi"],
    queryFn: () => Promise.resolve(invoicesData),
  });

  // Table columns
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <span>{info?.row?.original?.id}</span>,
      header: () => <span>S/N </span>,
    }),
    columnHelper.accessor("fullName", {
      cell: (info) => (
        <span>{`${info?.row?.original?.firstName}  ${info?.row?.original?.lastName}`}</span>
      ),
      header: () => <span>Full Name </span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info?.row?.original?.email}</span>,
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("date", {
      cell: (info) => <span>{info?.row?.original?.date}</span>,
      header: () => <span>Account Created Date</span>,
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <span>{info?.row?.original?.amount}</span>,
      header: () => <span>Amount</span>,
    }),

    columnHelper.accessor("paymentStatus", {
      header: () => <span>Status</span>,
      cell: (info) => (
        <div
          className={`
          ${
            info?.row?.original?.paymentStatus === "Paid"
              ? "bg-[#D1FADF] text-[#079455] w-[100px]"
              : info?.row?.original?.paymentStatus === "Pending"
              ? "bg-[#F9EDC4] text-[#D0AA25] w-[114px]"
              : "bg-[#EDEDF1] text-[#6C748B] w-[114px]"
          } text-center p-1 rounded-2xl flex items-center space-x-3 justify-center
          `}
        >
          <p
            className={` ${
              info?.row?.original?.paymentStatus === "Paid"
                ? "bg-[#079455]"
                : info?.row?.original?.paymentStatus === "Pending"
                ? "bg-[#D0AA25]"
                : "bg-[#6C748B]"
            } w-2 h-2 rounded-full`}
          ></p>
          <p className="capitalize">{info?.row?.original?.paymentStatus}</p>
        </div>
      ),
    }),

    columnHelper.accessor("action", {
      cell: ({ row }) => (
        <div className=" w-[1px] ml-[-38p]">
          <span>
            <span className="text-base cursor-pointer flex gap-4">
              <span
                className="text-base cursor-pointer flex gap-4"
                onClick={() => {
                  setSelectedRow(row.original);
                  setShowEditInvoice(true);
                }}
              >
                <AiOutlineEdit />
              </span>

              <span
                className="text-base cursor-pointer flex gap-4"
                onClick={() => {
                  setSelectedRow(row.original);
                  setShowDeleteInvoice(true);
                }}
              >
                <Trash size={14} className="dark:text-destructive" />
              </span>
            </span>
          </span>
        </div>
      ),
      header: () => <div>Actions</div>,
    }),
  ];

  return (
    <>
      <div>
        <HeaderCrumb
          screenName="Invoice"
          screenContent="Software and tools I use on a regular basis."
          buttonName="Create Invoice"
          handleButtonClick={setShowAddInvoice}
        />
      </div>
      <section className="h-fit mt-8 ">
        {/* ====EMPTY TRASH GOES HERE === */}
        {/* <div className="lg:mt-20">
          <Trash
            headingText="Start Adding Invoices"
            subHeadingText={
              <span>
                No invoices have been added yet. Click the{" "}
                <span className="text-primary mx-1">'Create Invoice'</span>{" "}
                button above to create a new invoice.
              </span>
            }
          />
        </div> */}
        {isLoading ? (
          <div>
            <Skeleton />
          </div>
        ) : (
          <div>
            <Table
              data={invoiceData ? invoiceData : []}
              columns={columns}
              tableClass=" font-medium text-small"
            />
          </div>
        )}
      </section>

      {/* ===Sheets */}
      <Sheet show={showAddInvoice} onClose={() => setShowAddInvoice(false)}>
        <AddInvoice setShowAddInvoice={setShowAddInvoice} />
      </Sheet>
      <Sheet show={showEditInvoice} onClose={() => setShowEditInvoice(false)}>
        <EditInvoice setShowEditInvoice={setShowEditInvoice} />
      </Sheet>

      {/* ===Delete Modal */}
      <Modal
        show={showDeleteInvoice}
        onClose={() => setShowDeleteInvoice(false)}
      >
        <DeleteInvoice
          setShowDeleteInvoice={setShowDeleteInvoice}
          // deleteInvoiceID={selectedRow ? selectedRow.id : null}
        />
      </Modal>
    </>
  );
}

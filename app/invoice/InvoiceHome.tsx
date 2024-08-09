"use client";
import { Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetInvoicesRequest } from "@/app/services/invoice.request";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import { Skeleton } from "@/app/components/skeletons/Skeleton";
import TrashPage from "@/app/components/trash/TrashPage";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/app/components/tables/Table";
import { Sheet } from "@/app/components/sheets/Sheet";
import { Modal } from "@/app/components/modals/Modal";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import AddInvoice from "./AddInvoice";
import EditInvoice from "./EditInvoice";
import DeleteInvoice from "./DeleteInvoice";
import { formatDate } from "@/utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InvoiceData {
  _id: string;
  fullName?: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: any;
  amount?: number;
  status?: string;
  repositoryUrl?: string;
  files?: string[];
  action?: any;
}

export default function InvoiceHome() {
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showDeleteInvoice, setShowDeleteInvoice] = useState(false);
  const [selectedRow, setSelectedRow] = useState<InvoiceData | null>(null);

  const { data: invoiceData, isLoading } = useQuery({
    queryKey: ["getInvoicesApi"],
    queryFn: () => GetInvoicesRequest(),
  });

  // create columnHelper
  const columnHelper = createColumnHelper<InvoiceData>();

  // Table columns
  const columns = [
    columnHelper.accessor("_id", {
      cell: (info) => <span>{info.row.index + 1}</span>,
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
    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span> {formatDate(info?.row?.original?.createdAt)}</span>
      ),
      header: () => <span>Account Created Date</span>,
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <span>{info?.row?.original?.amount}</span>,
      header: () => <span>Amount</span>,
    }),

    columnHelper.accessor("status", {
      header: () => <span>Status</span>,
      cell: (info) => (
        <div
          className={`
          ${
            info?.row?.original?.status === "Paid"
              ? "bg-[#D1FADF] text-[#079455] w-[100px]"
              : info?.row?.original?.status === "Pending"
              ? "bg-[#F9EDC4] text-[#D0AA25] w-[114px]"
              : "bg-[#EDEDF1] text-[#6C748B] w-[114px]"
          } text-center p-1 rounded-2xl flex items-center space-x-3 justify-center
          `}
        >
          <p
            className={` ${
              info?.row?.original?.status === "Paid"
                ? "bg-[#079455]"
                : info?.row?.original?.status === "Pending"
                ? "bg-[#D0AA25]"
                : "bg-[#6C748B]"
            } w-2 h-2 rounded-full`}
          ></p>
          <p className="capitalize">{info?.row?.original?.status}</p>
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
        {isLoading ? (
          <>
            {/* ====SKELETON GOES HERE === */}
            <div>
              <Skeleton />
            </div>
          </>
        ) : invoiceData?.length === 0 ? (
          <>
            {/* ====EMPTY TRASH GOES HERE === */}
            <div className="lg:mt-20">
              <TrashPage
                headingText="Start Adding Invoices"
                subHeadingText={
                  <span>
                    No invoices have been added yet. Click the{" "}
                    <span className="text-primary mx-1">
                      &apos;Create Invoice&apos;
                    </span>{" "}
                    button above to create a new invoice.
                  </span>
                }
              />
            </div>
          </>
        ) : (
          <div>
            {/* ====INVOICE TABLE GOES HERE === */}
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
        <EditInvoice
          setShowEditInvoice={setShowEditInvoice}
          editInvoiceID={selectedRow ? selectedRow._id : null}
        />
      </Sheet>

      {/* ===Delete Modal */}
      <Modal
        show={showDeleteInvoice}
        onClose={() => setShowDeleteInvoice(false)}
      >
        <DeleteInvoice
          setShowDeleteInvoice={setShowDeleteInvoice}
          deleteInvoiceID={selectedRow ? selectedRow._id : null}
        />
      </Modal>
      <ToastContainer />
    </>
  );
}

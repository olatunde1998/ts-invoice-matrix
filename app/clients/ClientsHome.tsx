"use client";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetClientsRequest } from "@/app/services/clients.request";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import { Skeleton } from "@/app/components/skeletons/Skeleton";
import TrashPage from "@/app/components/trash/TrashPage";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/app/components/tables/Table";
import { Sheet } from "@/app/components/sheets/Sheet";
import { Modal } from "@/app/components/modals/Modal";
import { AiOutlineEdit } from "react-icons/ai";
import { formatDate } from "@/utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddInvoice from "../invoice/AddInvoice";
import DeleteInvoice from "../invoice/DeleteInvoice";
import DeleteClient from "./DeleteClient";
import AddClient from "./AddClient";

interface ClientsData {
  _id: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: any;
  action?: any;
}

export default function ClientsHome() {
  const [showAddClient, setShowAddClient] = useState(false);
  const [showDeleteClient, setShowDeleteClient] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ClientsData | null>(null);
  const [searchClient, setSearchClient] = useState<string>("");

  const { data: clientsData, isLoading } = useQuery({
    queryKey: ["getClientsApi"],
    queryFn: () => GetClientsRequest(),
  });

  // create columnHelper
  const columnHelper = createColumnHelper<ClientsData>();

  // Table columns
  const columns = [
    columnHelper.accessor("_id", {
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: () => <span>S/N </span>,
    }),
    columnHelper.accessor("fullName", {
      cell: (info) => (
        <span>
          <span className="w-[32px] h-[32px] border-[0.13px]   border-primary bg-primary text-accent dark:text-white rounded-full flex justify-center text-center pt-1">{`${info?.row?.original?.firstName
            ?.charAt(0)
            .toUpperCase()}${info?.row?.original?.lastName
            ?.charAt(0)
            .toUpperCase()}`}</span>
          {/* {info.row.original.firstName} {info.row.original.lastName} */}
        </span>
      ),
      header: () => <span>Client Image</span>,
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => <span>{`${info?.row?.original?.firstName}`}</span>,
      header: () => <span>First Name </span>,
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => <span>{`${info?.row?.original?.lastName}`}</span>,
      header: () => <span>Last Name </span>,
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

    // columnHelper.accessor("action", {
    //   cell: ({ row }) => (
    //     <div className=" w-[1px] ml-[-38p]">
    //       <span>
    //         <span className="text-base cursor-pointer">
    //           <span
    //             className="text-base cursor-pointer"
    //             onClick={() => {
    //               setSelectedRow(row.original);
    //               setShowDeleteClient(true);
    //             }}
    //           >
    //             <Trash size={14} className="dark:text-destructive" />
    //           </span>
    //         </span>
    //       </span>
    //     </div>
    //   ),
    //   header: () => <div>Actions</div>,
    // }),
  ];

  // Search Filter Functionality logic
  const filteredInvoicesData = clientsData?.data?.filter((item: any) => {
    const searchQuery = searchClient?.toLowerCase();
    return (
      item.firstName?.toLowerCase().includes(searchQuery) ||
      item.lastName?.toLowerCase().includes(searchQuery) ||
      item.createdAt?.toLowerCase().includes(searchQuery) ||
      item.email?.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <>
      <div>
        <HeaderCrumb
          screenName="Clients"
          screenContent="Administer client account within the platform."
          // buttonName="Create Client"
          // handleButtonClick={setShowAddClient}
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
        ) : clientsData?.data?.length === 0 ? (
          <>
            {/* ====EMPTY TRASH GOES HERE === */}
            <div className="lg:mt-20">
              <TrashPage
                headingText="Start Adding Clients"
                subHeadingText={
                  <span>
                    No clients have been added yet. Click the{" "}
                    <span className="text-primary mx-1">
                      &apos;Add Client&apos;
                    </span>{" "}
                    button above to create a new client.
                  </span>
                }
              />
            </div>
          </>
        ) : (
          <div>
            {/* ====CLIENT TABLE GOES HERE === */}
            <Table
              data={filteredInvoicesData ? filteredInvoicesData : []}
              columns={columns}
              tableClass="font-medium text-small"
            />
          </div>
        )}
      </section>

      {/* ===Sheets */}
      <Sheet show={showAddClient} onClose={() => setShowAddClient(false)}>
        <AddClient setShowAddClient={setShowAddClient} />
      </Sheet>

      {/* ===Delete Modal */}
      <Modal
        show={showDeleteClient}
        onClose={() => setShowDeleteClient(false)}
      >
        <DeleteClient
          setShowDeleteClient={setShowDeleteClient}
          deleteClientID={selectedRow ? selectedRow._id : null}
        />
      </Modal>
      <ToastContainer />
    </>
  );
}

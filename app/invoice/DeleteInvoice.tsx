import { useQueryClient } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

interface DeleteInvoiceProps {
  setShowDeleteInvoice?: any;
}

export default function DeleteInvoice({
  setShowDeleteInvoice,
}: DeleteInvoiceProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // refetch survey using Query client
  const queryClient = useQueryClient();

  // Delete Users Logic
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      //   const response = await DeleteInvoiceRequest();
      // toast.success("User Deleted Successfully");
      console.log("deleted successfully");
      setShowDeleteInvoice(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-[0.63rem] lg:w-[80%] mx-auto">
        <div className="bg-[#FEF3F2] p-3 w-fit rounded-full mx-auto">
          <div className="bg-[#FEE4E2] p-3 rounded-full">
            <CircleAlert color="#DE3024" size={32} />
          </div>
        </div>
        <h2 className="text-xl mb-4 text-center mt-6 text-[#D92D20]">
          Delete Invoice
        </h2>
        <p className="text-md  text-center text-gray-500">
          Are you sure you want to delete
          <span className="text-[#D92D20]"> Invoice ? </span> This action cannot
          be undone
        </p>
        {/*======= Cancel Button and Delete Button ====== */}
        <div className="mt-12 flex space-x-4">
          <div
            className="border-[1px] border-accent-primary text-gray-500 rounded-[8px] px-[28px] py-[12px] cursor-pointer text-center w-full"
            onClick={() => setShowDeleteInvoice(false)}
          >
            Cancel
          </div>
          <button
            type="button"
            className={
              "bg-[#D92D20] hover:bg-[#D92D20]/90 rounded-[8px] text-white px-[28px] cursor-pointer py-[12px]  text-center  w-full"
            }
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
}

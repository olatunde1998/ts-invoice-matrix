"use client";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { usePathname } from "next/navigation";

interface HeaderCrumbProps {
  screenName: string;
  screenContent: string;
  buttonName?: string;
  handleButtonClick?: any;
}

export default function HeaderCrumb({
  screenName,
  screenContent,
  buttonName,
  handleButtonClick,
}: HeaderCrumbProps) {
  const pathname = usePathname();
  return (
    <>
      <div className="md:flex items-center md:space-x-4">
        <div className="w-full font-sans text-md ">
          <p className="text-2xl md:text-5xl font-bold mb-2">{screenName}</p>
          <p className="text-muted-foreground">{screenContent}</p>
        </div>
        <div
          onClick={() => handleButtonClick(true)}
          className={`${
            buttonName === undefined ? "hidden" : "block"
          } my-4 md:my-0  md:w-[200px] lg:w-[180px]`}
        >
          <Button className="w-full  p-6 justify-center items-center gap-[8px]">
            <p className="text-white text-sm md:text-md">{buttonName}</p>
            {pathname !== "/report" ? (
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Download className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

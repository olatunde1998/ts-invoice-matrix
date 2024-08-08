"use client";
import Link from "next/link";
import { ModeToggle } from "../modeToggle/ModeToggle";
import { MobileSidebar } from "../sidebar/MobileSidebar";


import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="z-[1000] bg-background fixed px-[20px] py-[10px] top-0 left-0 right-0 border-b border-accent md:hidden">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold ">
          <span className="text-primary text-md">Rasheed Olatunde</span>
        </Link>
        <div className="flex justify-between gap-x-2">
          <ModeToggle />
          <MobileSidebar />
        </div>
      </div>
    </nav>
  );
}

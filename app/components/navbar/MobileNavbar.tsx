"use client";
import Link from "next/link";
import { ModeToggle } from "../modeToggle/ModeToggle";
import { MobileSidebar } from "../sidebar/MobileSidebar";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="z-[1000] bg-background fixed px-[20px] py-[20px] top-0 left-0 right-0 border-b border-accent md:hidden">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold ">
          <div className="flex items-center">
            <Image
              src="/images/ts-brand-logo.png"
              alt="profile image"
              width={100}
              height={100}
              priority
              className="w-[100px] h-[50px] object-cover"
            />
          </div>
        </Link>
        <div className="flex justify-between gap-x-2">
          <ModeToggle />
          <MobileSidebar />
        </div>
      </div>
    </nav>
  );
}

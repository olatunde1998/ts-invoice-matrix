import { footerLinks } from "@/lib/LinkData";
import Link from "next/link";

export default function Footer() {
  // Get Year
  const getYear = new Date();
  const dateString = getYear.getFullYear();
  return (
    <footer className="text-sm bg-background border-t border-slate pt-7 px-6 pb-[36px] border-accent">
      <div className="lg:flex justify-between items-center">
        <p className="font-normal text-xs lg:text-sm">
          © {dateString} geodevcodes
          <span className="hidden ml-2 xl:inline-block">(Rasheed Olatunde)</span>.
          All rights reserved.
        </p>
        <div className="flex flex-col space-x-0  space-y-3 mt-4  lg:flex-row justify-between lg:space-x-3 lg:space-y-0 lg:mt-0 text-muted-foreground">
          {footerLinks?.map((item, idx) => (
            <Link href={`${item.href}`} key={item.key}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

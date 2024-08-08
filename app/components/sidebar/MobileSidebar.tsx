"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarContactLinks, sidebarRouteLinks } from "@/lib/LinkData";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MobileSidebar() {
  const pathname = usePathname();

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="z-[1001]">
          <div>
            <div className="pt-1">
              <div className="w-full pt-10">
                <div className="w-55 ">
                  {/* ============ LINKS AND ICONS =========== */}
                  {sidebarRouteLinks?.map((item, index) => (
                    <div
                      key={index}
                      className="mt-2 flex flex-col items-start text-sm w-full"
                    >
                      <div className="flex w-full">
                        <Link
                          href={`${item.href}`}
                          className={`${
                            pathname === item.href
                              ? "rounded-sm bg-accent dark:bg-accent w-full"
                              : ""
                          }
                  flex items-center w-full hover:bg-accent dark:hover:bg-accent rounded-lg px-4 py-2`}
                        >
                          <span>
                            <item.icon
                              size={16}
                              className="h-4 w-4 group-hover:cursor-pointer mr-2 text-primary"
                            />
                          </span>
                          <p
                            className={`${pathname === item.href ? "" : ""}
                     text-sm hover:cursor-pointer text-foreground
                  `}
                          >
                            {item.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-accent pt-1 w-full">
                <div>
                  {/* ============ LINKS AND ICONS =========== */}
                  {sidebarContactLinks?.map((item, index) => (
                    <div
                      key={index}
                      className="mt-2 flex flex-col items-start text-sm w-full"
                    >
                      <div className="flex  w-full">
                        <Link
                          href={`${item.href}`}
                          className={`${
                            pathname === item.href
                              ? "rounded-sm  bg-accent dark:bg-accent w-full"
                              : ""
                          }
                  flex items-center hover:cursor-pointer w-full hover:bg-accent dark:hover:bg-accent rounded-lg px-4 py-2 `}
                        >
                          <span>
                            <item.icon
                              size={16}
                              className="h-4 w-4 group-hover:cursor-pointer mr-2 text-primary"
                            />
                          </span>
                          <p
                            className={`${pathname === item.href ? "" : ""}
                     text-sm hover:cursor-pointer text-foreground
                  `}
                          >
                            {item.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <SheetFooter className="pt-20">
            <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

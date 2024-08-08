"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarContactLinks, sidebarRouteLinks } from "@/lib/LinkData";
import { ModeToggle } from "../modeToggle/ModeToggle";
import Image from "next/image";
import { LogOut, X } from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <>
      <section className="z-30 xl:fixed w-[249px]">
        <div className="md:border-r border-slate min-h-screen pt-10 flex flex-col justify-between md:fixed">
          <div>
            <div className="justify-between px-3 pr-4 pb-6 hidden md:flex items-center">
              <div className="flex items-center">
                <Image
                  src="/images/ts-brand-logo.png"
                  alt="profile image"
                  width={100}
                  height={100}
                  priority
                  className="w-[150px] h-[50px] object-cover"
                />
              </div>
              <div className="">
                <ModeToggle />
              </div>
            </div>

            <div className="hidden md:relative md:flex flex-col items-start w-full border-t md:border-slate pb-1">
              <div className="fixe left-0 w-60">
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
                            ? "rounded-sm bg-accent dark:bg-accent w-full flex"
                            : "flex items-center"
                        }
                  flex items-center w-full hover:bg-accent dark:hover:bg-accent rounded-lg px-4 mx-3 py-2`}
                      >
                        <span>
                          <item.icon
                            size={16}
                            className="h-4 w-4 group-hover:cursor-pointer mr-4 mb-1 text-primary"
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

            <div className="hidden md:flex flex-col items-start border-t border-slate  w-full md:h-32 lg:h-  mt-60 md:mt-6">
              <div className="fixed left-0 w-60">
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
                  flex items-center gap-4 hover:cursor-pointer w-full hover:bg-accent dark:hover:bg-accent rounded-lg px-4 mx-3 py-2`}
                      >
                        <span>
                          <item.icon
                            size={16}
                            className="h-4 w-4 group-hover:cursor-pointer mb-1 text-primary"
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

          {/* ============SignOut Button ========== */}
          <section className="border-t border-slate pt-6 px-4 mt-28 hidden md:block pb-6">
            <div className="bg-accent dark:bg-accent rounded-lg text-foreground flex items-center justify-center gap-4 p-2  cursor-pointer">
              <LogOut size={16} />
              <p>Sign out</p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

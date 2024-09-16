"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { sidebarContactLinks, sidebarRouteLinks } from "@/lib/LinkData";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  GlobeLock,
  Home,
  Layers3,
  Mail,
  Menu,
  ReceiptIndianRupee,
  Settings,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function MobileSidebar() {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const iconMap = {
    Home: Home,
    User: User,
    Layers3: Layers3,
    GlobeLock: GlobeLock,
  };
  const iconMapTwo = {
    ReceiptIndianRupee: ReceiptIndianRupee,
    Settings: Settings,
    Mail: Mail,
  };
  const keys = ["dashboard", "payment", "invoice", "clients"];
  const keysTwo = ["report", "settings", "notifications"];

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
                  {keys.map((itemKey) => {
                    const iconName = t(`SidebarRouteLinks.${itemKey}.icon`);
                    const IconComponent =
                      iconMap[iconName as keyof typeof iconMap];
                    return (
                      <div
                        key={itemKey}
                        className="mt-2 flex flex-col items-start text-sm w-full"
                      >
                        <div className="flex w-full">
                          <Link
                            href={t(`SidebarRouteLinks.${itemKey}.href`)}
                            className={`${
                              pathname ===
                              t(`SidebarRouteLinks.${itemKey}.href`)
                                ? "rounded-sm bg-accent dark:bg-accent w-full"
                                : ""
                            }
                  flex items-center w-full hover:bg-accent dark:hover:bg-accent rounded-lg px-4 py-2`}
                          >
                            <SheetClose asChild>
                              <div className=" w-full flex items-center">
                                {IconComponent && (
                                  <span className="h-4 w-4 group-hover:cursor-pointer mr-2 text-primary">
                                    <IconComponent size={16} />
                                  </span>
                                )}
                                <p
                                  className={`${
                                    pathname ===
                                    t(`SidebarRouteLinks.${itemKey}.href`)
                                      ? ""
                                      : ""
                                  }
                     text-sm hover:cursor-pointer text-foreground
                  `}
                                >
                                  {t(`SidebarRouteLinks.${itemKey}.name`)}
                                </p>
                              </div>
                            </SheetClose>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-accent pt-1 w-full">
                <div>
                  {/* ============ LINKS AND ICONS =========== */}
                  {keysTwo?.map((itemKey) => {
                    const iconName = t(`SidebarContactLinks.${itemKey}.icon`);
                    const IconComponent =
                      iconMapTwo[iconName as keyof typeof iconMapTwo];
                    return (
                      <div
                        key={itemKey}
                        className="mt-2 flex flex-col items-start text-sm w-full"
                      >
                        <div className="flex  w-full">
                          <Link
                            href={t(`SidebarContactLinks.${itemKey}.href`)}
                            className={`${
                              pathname ===
                              t(`SidebarContactLinks.${itemKey}.href`)
                                ? "rounded-sm  bg-accent dark:bg-accent w-full"
                                : ""
                            }
                  flex items-center hover:cursor-pointer w-full hover:bg-accent dark:hover:bg-accent rounded-lg px-4 py-2 `}
                          >
                            <SheetClose asChild>
                              <div className=" w-full flex items-center">
                                {IconComponent && (
                                  <span className="h-4 w-4 group-hover:cursor-pointer mr-2 text-primary">
                                    <IconComponent size={16} />
                                  </span>
                                )}
                                <p
                                  className={`${
                                    pathname ===
                                    t(`SidebarContactLinks.${itemKey}.href`)
                                      ? ""
                                      : ""
                                  }
                     text-sm hover:cursor-pointer text-foreground
                  `}
                                >
                                  {t(`SidebarContactLinks.${itemKey}.name`)}
                                </p>
                              </div>
                            </SheetClose>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
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

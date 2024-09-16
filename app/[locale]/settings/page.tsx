import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Settings | geodevcodes",
  description: "Total Secure Application",
};

export default function Settings() {
  const t = useTranslations("SettingPage");
  return (
    <main className="min-h-screen px-4 p-2 md:p-8 font-sans text-md">
      <div>
        <HeaderCrumb
          screenName={t("HeaderCrumb.routeName")}
          screenContent={t("HeaderCrumb.screenContent")}
        />
      </div>
      <section className="h-fit border border-accent-primary mt-8 p-6 rounded-md">
        {/* ====Name === */}
        <div>
          <label htmlFor="name">
            <span>{t("FormContent.name")}</span>
            <input
              type="text"
              placeholder="Full name"
              className="w-full border border-slate dark:bg-black/30 rounded-sm p-3 focus:outline-none mt-2 text-sm"
            />
          </label>
        </div>

        {/* ====Email === */}
        <div className="mt-3">
          <label htmlFor="email">
            <span>{t("FormContent.email")}</span>
            <input
              type="email"
              placeholder="Email"
              disabled
              className="w-full border border-slate dark:bg-black/30 rounded-sm p-3 focus:outline-none mt-2 text-sm text-muted-foreground cursor-not-allowed"
            />
          </label>
        </div>
        {/* ====Color Scheme === */}
        <div className="mt-3">
          <label htmlFor="colorScheme">
            <span>{t("FormContent.colorScheme")}</span>
            <input
              type="Color Scheme"
              placeholder="Color"
              className="w-full border border-slate dark:bg-black/30 rounded-sm p-3 focus:outline-none mt-2 text-sm"
            />
          </label>
        </div>
        <div className="mt-3">
          <Button>{t("FormContent.buttonName")}</Button>
        </div>
      </section>
    </main>
  );
}

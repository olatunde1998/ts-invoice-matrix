import type { Metadata } from "next";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Report | geodevcodes",
  description: "Total Secure Application",
};

export default function Report() {
  const t = useTranslations("ReportPage");
  return (
    <main className="min-h-screen px-4 p-2 md:p-8">
      <div>
        <HeaderCrumb
          screenName={t("HeaderCrumb.routeName")}
          screenContent={t("HeaderCrumb.screenContent")}
          buttonName={t("HeaderCrumb.buttonName")}
        />
      </div>
      <section className="h-fit mt-8 p-6">
        <h3 className="mt-32  text-sm  text-center">
          {t("PlaceholderContent.content")}
        </h3>
      </section>
    </main>
  );
}

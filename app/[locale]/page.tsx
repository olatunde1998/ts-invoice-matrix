import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import TrashPage from "@/app/components/trash/TrashPage";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("DashboardPage");
  return (
    <main className="min-h-screen px-4 p-2 md:p-8 z-999">
      <div>
        <HeaderCrumb
          screenName={t("HeaderCrumb.routeName")}
          screenContent={t("HeaderCrumb.screenContent")}
          buttonName={t("HeaderCrumb.buttonName")}
        />
      </div>
      <section className="h-fit mt-8 p-6">
        <div className="lg:mt-20">
          {/* ====EMPTY TRASH GOES HERE === */}
          <TrashPage
            headingText={t("TrashContent.heading")}
            subHeadingText={
              <span>
                {t("TrashContent.paragraphOne")}{" "}
                <span className="text-primary mx-1">
                  &apos;{t("TrashContent.paragraphTwo")}&apos;
                </span>{" "}
                {t("TrashContent.paragraphThree")}
              </span>
            }
          />
        </div>
      </section>
    </main>
  );
}

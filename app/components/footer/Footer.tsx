import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  // Get Year
  const getYear = new Date();
  const dateString = getYear.getFullYear();
  const t = useTranslations("Footer");
  const keys = ["terms", "privacy", "contact", "about"];
  return (
    <footer className="text-sm bg-background border-t border-slate pt-7 px-6 pb-[36px] border-accent">
      <div className="lg:flex justify-between items-center">
        <p className="font-normal text-xs lg:text-sm">
          © {dateString} geodevcodes
          <span className="hidden mx-2 xl:inline-block">
            (Rasheed Olatunde).
          </span>
          {t("rightReserved")}
        </p>
        <div className="flex flex-col space-x-0  space-y-3 mt-4  lg:flex-row justify-between lg:space-x-3 lg:space-y-0 lg:mt-0 text-muted-foreground">
          {keys?.map((item: any, idx) => (
            <Link href={t(`FooterLinks.${item}.href`)} key={idx}>
              {/* {item.name} */}
              {t(`FooterLinks.${item}.name`)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

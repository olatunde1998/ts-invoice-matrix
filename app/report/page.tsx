import type { Metadata } from "next";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";

export const metadata: Metadata = {
  title: "Report | geodevcodes",
  description: "Total Secure Application",
};

export default function Report() {
  return (
    <main className="min-h-screen px-4 p-2 md:p-8">
      <div>
        <HeaderCrumb
          screenName="Report"
          screenContent="Software and tools I use on a regular basis."
          buttonName="Export"
        />
      </div>
      <section className="h-fit mt-8 p-6">
        <h3 className="mt-32  text-sm  text-center">Check Back Later...</h3>
      </section>
    </main>
  );
}

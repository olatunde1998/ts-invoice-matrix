import type { Metadata } from "next";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";

export const metadata: Metadata = {
  title: "Notifications | geodevcodes",
  description: "Total Secure Application",
};

export default function Notifications() {
  return (
    <main className="min-h-screen px-4 p-2 md:p-8">
      <div>
        <HeaderCrumb
          screenName="Notifications"
          screenContent="Software and tools I use on a regular basis."
        />
      </div>
      <section className="h-fit mt-8 p-6">
        <h3 className="mt-32  text-sm  text-center">Check Back Later...</h3>
      </section>
    </main>
  );
}

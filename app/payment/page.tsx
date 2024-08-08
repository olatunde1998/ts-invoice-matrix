import type { Metadata } from "next";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";

export const metadata: Metadata = {
  title: "Payment | geodevcodes",
  description: "Total Secure Application",
};

export default function PaymentPage() {
  return (
    <main className="min-h-screen px-4 p-2 md:p-8">
      <div>
        <HeaderCrumb
          screenName="Payments"
          screenContent="Here's the history of payments"
        />
      </div>
      <section className="h-fit mt-8 p-6">
        <h3 className="mt-32  text-sm  text-center">Check Back Later...</h3>
      </section>
    </main>
  );
}

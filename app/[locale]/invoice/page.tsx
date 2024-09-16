import type { Metadata } from "next";
import InvoiceHome from "./InvoiceHome";

export const metadata: Metadata = {
  title: "Invoice | geodevcodes",
  description: "Total Secure Application",
};

export default function Invoice() {
  return (
    <>
      <main className="min-h-screen px-4 p-2 md:p-8">
        {/* ==== INVOICE  GOES HERE ===== */}
        <InvoiceHome />
      </main>
    </>
  );
}

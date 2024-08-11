import type { Metadata } from "next";
import ClientsHome from "./ClientsHome";

export const metadata: Metadata = {
  title: "Clients | geodevcodes",
  description: "Total Secure Application",
};

export default function Clients() {
  return (
    <main className="min-h-screen px-4 p-2 md:p-8">
      {/* ==== CLIENT  GOES HERE ===== */}
      <ClientsHome />
    </main>
  );
}

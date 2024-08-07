import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import MobileNavbar from "./components/navbar/MobileNavbar";
import SideBar from "./components/sidebar/Sidebar";
import TanStackProvider from "./providers/tanstack-provider";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Total Secure Invoice Matrix",
  description: "Total Secure Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileNavbar />
            <section className="w-full relative flex">
              <SideBar />
              <main className="w-full pt-20 md:pt-2 max-w-[1150px] mx-auto xl:max-w-full xl:overflow-x-auto md:ml-[240px] xl:ml-[240px]">
                {children}
                <Footer />
              </main>
            </section>
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

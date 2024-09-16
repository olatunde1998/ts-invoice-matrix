import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import MobileNavbar from "../components/navbar/MobileNavbar";
import SideBar from "../components/sidebar/Sidebar";
import TanStackProvider from "../providers/tanstack-provider";
import Footer from "../components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Total Secure Invoice Matrix",
  description: "Total Secure Dashboard",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();
  return (
    // <html lang={locale}>
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
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
                <main className="w-full pt-24 md:pt-2 max-w-[1150px] mx-auto xl:max-w-full xl:overflow-x-auto md:ml-[240px] xl:ml-[240px]">
                  {children}
                  <Footer />
                </main>
              </section>
            </ThemeProvider>
          </TanStackProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/common.css";
import "../styles/layout.css";
import SideNav from "@/components/sidebars/sideNav";
import Providers from "@/wrappers/Providers";
import { Toaster } from "sonner";
import Data from "@/wrappers/Data";
import BottomNav from "@/components/sidebars/bottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Providers>
          <Data>
            <main className="layout-grid">
              <div className="pt-4 pb-4 z-10 hidden sm:block">
                <SideNav />
              </div>
              <section className="page-container">
                {children}
                <BottomNav />
              </section>
              <div className="hidden md:block"></div>
            </main>
          </Data>
        </Providers>
      </body>
    </html>
  );
}

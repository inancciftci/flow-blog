import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-[100vh]" lang="en">
      <Header />
      <section className="flex-1 p-4 max-w-[1280px] w-full mx-auto">
        {children}
      </section>
      <Footer />
    </main>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />
      <SidebarTrigger />
      {/* Main content */}
      <div className="my-6 container">{children}</div>
    </SidebarProvider>
  );
}

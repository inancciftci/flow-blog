import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/Sidebar";

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

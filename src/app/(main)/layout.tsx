import { AppSidebar } from "@/components/layout/main/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full min-h-screen">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

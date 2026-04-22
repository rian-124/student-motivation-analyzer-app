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
        <main className="flex-1 w-full min-h-screen bg-slate-50">
          <div className="p-4 bg-white border-b border-sidebar-border/50 sticky top-0 z-10">
            <SidebarTrigger />
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

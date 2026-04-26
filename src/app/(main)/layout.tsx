"use client";

import { AppSidebar } from "@/components/layout/main/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Tunggu sebentar untuk hydration localStorage
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full min-h-screen bg-slate-50">
          <header className="h-20 flex items-center px-4 bg-white border-b border-slate-100 sticky top-0 z-30">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-4 h-4 w-[1px] bg-slate-200" />
            <div className="ml-4">
              <span className="text-xs font-bold text-brand-secondary/40 uppercase tracking-widest">
                Dashboard
              </span>
            </div>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

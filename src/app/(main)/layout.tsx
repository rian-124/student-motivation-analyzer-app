"use client";

import { AppSidebar } from "@/components/layout/main/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  DashboardSkeleton,
  SidebarSkeleton,
  TableSkeleton,
  UploadSkeleton,
} from "@/components/common/skeletons/AppSkeletons";
import { DEFAULT_PAGES, ROLE_PERMISSIONS, ROUTES } from "@/lib/constants";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, user, setUser, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const checkAccess = useCallback(
    (role: string, currentPath: string) => {
      const normalizedRole = role.toUpperCase();
      const allowedPaths = ROLE_PERMISSIONS[normalizedRole] || [];
      const isAllowed = allowedPaths.some(
        (path) => currentPath === path || currentPath.startsWith(path + "/"),
      );

      if (!isAllowed) {
        const defaultPage = DEFAULT_PAGES[normalizedRole] || ROUTES.LOGIN;
        router.replace(defaultPage);
        return false;
      }
      return true;
    },
    [router],
  );

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isMounted) return;
      if (!accessToken) {
        setIsLoading(false);
        router.replace(ROUTES.LOGIN);
        return;
      }
      try {
        let currentUser = user;
        if (!currentUser) {
          const response = await authService.getProfile();
          currentUser = (response as any).data || response;
          setUser(currentUser!);
        }
        if (currentUser) {
          const hasAccess = checkAccess(currentUser.role, pathname);
          if (hasAccess) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        clearAuth();
        setIsLoading(false);
        router.replace(ROUTES.LOGIN);
      }
    };
    initializeAuth();
  }, [
    accessToken,
    user,
    isMounted,
    pathname,
    router,
    setUser,
    clearAuth,
    checkAccess,
  ]);

  const getPageTitle = (path: string) => {
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("manage-student")) return "Manajemen Mahasiswa";
    if (path.includes("manage-lecture")) return "Manajemen Dosen";
    if (path.includes("upload-recording")) return "Upload Rekaman";
    if (path.includes("analysis-results")) return "Riwayat Analisis";
    if (path.includes("graph-class")) return "Grafik Kelas";
    if (path.includes("graph-overall")) return "Grafik Keseluruhan";
    return "Motivation Analyzer";
  };

  const renderPageSkeleton = () => {
    if (pathname.includes("dashboard")) return <DashboardSkeleton />;
    if (pathname.includes("manage-")) return <TableSkeleton />;
    if (pathname.includes("analysis-results")) return <TableSkeleton />;
    if (pathname.includes("upload-recording")) return <UploadSkeleton />;
    return <DashboardSkeleton />; // Default
  };

  if (!isMounted || (isLoading && accessToken)) {
    return (
      <div className="flex min-h-screen w-full bg-slate-50">
        <aside className="w-[280px] border-r border-slate-100 bg-white hidden lg:block">
          <div className="h-20 border-b border-slate-100 px-6 flex items-center">
            <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
            <div className="ml-3 space-y-1.5">
              <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
              <div className="h-2 w-16 bg-slate-50 rounded animate-pulse" />
            </div>
          </div>
          <SidebarSkeleton />
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="h-20 flex items-center px-8 bg-white border-b border-slate-100 sticky top-0 z-30">
            <div className="w-8 h-8 bg-slate-100 rounded-lg animate-pulse" />
            <div className="ml-4 h-4 w-[1px] bg-slate-100" />
            <div className="ml-4 h-3 w-32 bg-slate-50 rounded animate-pulse" />
          </header>
          <main className="p-8">{renderPageSkeleton()}</main>
        </div>
      </div>
    );
  }

  if (!accessToken) return null;

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
                {getPageTitle(pathname)}
              </span>
            </div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

"use client";

import { AppSidebar } from "@/components/layout/main/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import type { User } from "@/lib/types/auth.type";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [
    "/dashboard",
    "/manage-student",
    "/manage-lecture",
    "/leaderboard",
    "/graph-overall",
    "/analysis-results",
    "/analysis-result",
  ],
  LECTURER: [
    "/dashboard",
    "/manage-student",
    "/leaderboard",
    "/graph-overall",
    "/analysis-results",
    "/analysis-result",
  ],
  STUDENT: [
    "/dashboard",
    "/leaderboard",
    "/upload-recording",
    "/analysis-result",
    "/analysis-results",
  ],
};

const DEFAULT_PAGES: Record<string, string> = {
  ADMIN: "/dashboard",
  LECTURER: "/dashboard",
  STUDENT: "/dashboard",
};

// --- SKELETON COMPONENTS ---

const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm"
        />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 h-96 bg-white rounded-2xl border border-slate-100 shadow-sm" />
      <div className="h-96 bg-white rounded-2xl border border-slate-100 shadow-sm" />
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {/* Page Header Skeleton */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-3">
        <div className="h-9 w-64 bg-slate-200 rounded-xl" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-24 bg-white rounded-xl border border-slate-100 shadow-sm" />
        <div className="h-10 w-32 bg-brand/20 rounded-xl" />
      </div>
    </div>

    {/* Table Content Skeleton */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-50 flex justify-between bg-slate-50/30">
        <div className="h-8 w-48 bg-slate-100 rounded-lg" />
        <div className="h-8 w-64 bg-slate-100 rounded-lg" />
      </div>
      <div className="p-0">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-16 border-b border-slate-50 flex items-center px-6 gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/4 bg-slate-100 rounded" />
              <div className="h-2 w-1/6 bg-slate-50 rounded" />
            </div>
            <div className="h-4 w-12 bg-slate-50 rounded" />
            <div className="h-5 w-20 bg-slate-50 rounded-full" />
            <div className="h-3 w-16 bg-slate-50 rounded" />
            <div className="h-8 w-20 bg-slate-50 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const UploadSkeleton = () => (
  <div className="max-w-5xl mx-auto space-y-10 animate-pulse">
    {/* Header Skeleton */}
    <div className="space-y-3">
      <div className="h-9 w-64 bg-slate-200 rounded-xl" />
      <div className="h-4 w-[500px] bg-slate-100 rounded-lg" />
    </div>

    {/* Dropzone Skeleton */}
    <div className="h-[450px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center space-y-6">
      <div className="w-24 h-24 bg-slate-50 rounded-[2rem]" />
      <div className="space-y-3 flex flex-col items-center">
        <div className="h-5 w-48 bg-slate-50 rounded" />
        <div className="h-3 w-32 bg-slate-50 rounded" />
      </div>
      <div className="h-12 w-40 bg-slate-100 rounded-xl" />
    </div>

    {/* Guide Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3"
        >
          <div className="h-8 w-8 bg-slate-50 rounded-lg" />
          <div className="h-3 w-full bg-slate-50 rounded" />
        </div>
      ))}
    </div>
  </div>
);

const SidebarSkeleton = () => (
  <div className="p-4 space-y-6">
    <div className="space-y-3">
      <div className="h-2 w-20 bg-slate-100 rounded animate-pulse" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-full bg-slate-50 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-2 w-24 bg-slate-100 rounded animate-pulse" />
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-10 w-full bg-slate-50 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
);

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
        (path) => currentPath === path || currentPath.startsWith(`${path}/`),
      );

      if (!isAllowed) {
        const defaultPage = DEFAULT_PAGES[normalizedRole] || "/login";
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
        router.replace("/login");
        return;
      }
      try {
        let currentUser: User | null = user;
        if (!currentUser) {
          currentUser = await authService.getProfile();
          setUser(currentUser);
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
        router.replace("/login");
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
    if (path.includes("leaderboard")) return "Leaderboard Motivasi";
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

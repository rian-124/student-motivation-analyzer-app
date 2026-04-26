"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/types/Role.type"; 

import {
  LucideIcon,
  Mic,
  Monitor,
  UserIcon,
  BarChart3,
  PieChart,
  FileText,
  Users,
  LayoutDashboard
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export interface NavItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  roles?: UserRole[];
}

type NavCategory = {
  label: string;
  roles?: UserRole[];
  items: NavItem[];
};

// Fungsi dinamis untuk membuat data sidebar
const getSidebarData = (userRole: UserRole): NavCategory[] => {
  // Mapping khusus untuk path profile jika nama folder berbeda dengan role
  // Mapping khusus untuk path profile jika nama folder berbeda dengan role
  const getProfilePath = (role: UserRole) => {
    return "/profile";
  };

  return [
    {
      label: "Menu",
      roles: ["student"],
      items: [
        {
          title: "Upload Rekaman",
          icon: Mic,
          href: "/upload-recording",
          roles: ["student"],
        },
        {
          title: "Hasil Analisis",
          icon: FileText,
          href: "/analysis-result",
          roles: ["student"],
        },
      ],
    },
    {
      label: "Menu",
      roles: ["lecture"],
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
        },
        {
          title: "Grafik Keseluruhan",
          icon: PieChart,
          href: "/graph-overall",
        },
        {
          title: "Grafik Kelas",
          icon: BarChart3,
          href: "/graph-class",
        },
      ],
    },
    {
      label: "Analisis",
      roles: ["lecture"],
      items: [
        {
          title: "Semua Hasil Analisis",
          icon: Monitor,
          href: "/analysis-results",
        },
        {
          title: "Unduh Laporan",
          icon: FileText,
          href: "/download-report",
        },
      ],
    },
    {
      label: "Admin",
      roles: ["admin"],
      items: [
        {
          title: "Dashboard Admin",
          icon: LayoutDashboard,
          href: "/dashboard",
        },
        {
          title: "Manajemen Mahasiswa",
          icon: Users,
          href: "/manage-student",
        },
        {
          title: "Manajemen Dosen",
          icon: Users,
          href: "/manage-lecture",
        },
      ],
    },
    {
      label: "Akun",
      items: [
        {
          title: "Profil Saya",
          icon: UserIcon,
          // href dibuat dinamis berdasarkan role
          href: getProfilePath(userRole),
        },
      ],
    },
  ];
};

export function AppSidebar() {
  const pathname = usePathname();
  const { user, userRole, logout } = useAuth(); 

  // Panggil fungsi untuk mendapatkan data terbaru berdasarkan role
  const sidebarData = getSidebarData(userRole || "student");

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-100 bg-white text-brand-secondary">
      {/* ── Logo ── */}
      <SidebarHeader className="h-20 border-b border-slate-100 px-4 flex flex-row items-center shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center text-white text-lg font-black shadow-lg shadow-brand/20 shrink-0">
            M
          </div>
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-black text-brand-secondary tracking-tight">Motivation</span>
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] -mt-0.5">Analyzer</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-4">
        {sidebarData
          .filter(
            (category) =>
              !category.roles || (userRole && category.roles.includes(userRole))
          )
          .map((category) => (
            <SidebarGroup key={category.label} className="py-2">
              <SidebarGroupLabel className="text-brand-secondary/40 font-black text-[10px] uppercase tracking-[0.2em] px-4">
                {category.label}
              </SidebarGroupLabel>

              <SidebarMenu className="gap-1 mt-2">
                {category.items
                  .filter(
                    (item) =>
                      !item.roles || (userRole && item.roles.includes(userRole))
                  )
                  .map((item) => {
                    const active = item.href ? isActive(item.href) : false;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          isActive={active}
                          className={`
                            h-11 rounded-xl px-4 transition-all duration-200
                            ${active 
                              ? "!bg-brand !text-white shadow-lg shadow-brand/30 hover:!bg-brand hover:!text-white" 
                              : "text-brand-secondary/60 hover:bg-brand/5 hover:text-brand"
                            }
                          `}
                        >
                          <Link href={item.href || "#"}>
                            <item.icon className={`size-4 !shrink-0 ${active ? "!text-white" : ""}`} />
                            <span className="font-bold text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-100 p-2 lg:p-3">
        <div className="group-data-[collapsible=icon]:hidden flex items-center justify-between gap-1">
          {user && (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-brand-secondary font-bold text-[10px] shrink-0 border border-slate-200">
                {user.name.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-brand-secondary truncate leading-tight">{user.name}</span>
                <span className="text-[9px] text-brand-secondary/40 font-medium truncate uppercase tracking-tight">{user.role}</span>
              </div>
            </div>
          )}

          <Button 
            variant="ghost" 
            size="icon"
            onClick={logout}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg h-8 w-8 shrink-0"
            title="Keluar"
          >
            <LogOut size={16} />
          </Button>
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex flex-col items-center gap-4">
          {user && (
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-brand-secondary font-bold text-xs border border-slate-200">
              {user.name.charAt(0)}
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={logout}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
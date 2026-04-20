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
import { UserRole } from "@/lib/types/Role.type"; // Pastikan path ini benar

import {
  LucideIcon,
  Mic,
  Monitor,
  UserIcon,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const getProfilePath = (role: UserRole) => {
    if (role === 'lecture') return '/lecturer/profile';
    return `/${role}/profile`;
  };

  return [
    {
      label: "Menu",
      roles: ["student"],
      items: [
        {
          title: "Upload Rekaman",
          icon: Mic,
          href: "/student/upload-recording",
          roles: ["student"],
        },
        {
          title: "Hasil Analisis",
          icon: Monitor,
          href: "/student/analysis-results",
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
          icon: Monitor,
          href: "/lecture/dashboard",
        },
        {
          title: "Grafik Keseluruhan",
          icon: Monitor,
          href: "/lecture/graph-overall",
        },
        {
          title: "Grafik Kelas",
          icon: Monitor,
          href: "/lecture/graph-class",
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
          href: "/lecture/analysis-results",
        },
        {
          title: "Unduh Laporan",
          icon: Monitor,
          href: "/lecture/download-report",
        },
      ],
    },
    {
      label: "Admin",
      roles: ["admin"],
      items: [
        {
          title: "Dashboard Admin",
          icon: Monitor,
          href: "/admin/dashboard",
        },
        {
          title: "Manajemen Mahasiswa",
          icon: UserIcon,
          href: "/admin/manage-student",
        },
        {
          title: "Manajemen Dosen",
          icon: UserIcon,
          href: "/admin/manage-lecture",
        },
      ],
    },
    {
      label: "Akun",
      items: [
        {
          title: "Profile Saya",
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
  // Nantinya ganti "student" ini dengan state dari Context/Auth
  const userRole: UserRole = "admin"; 

  // Panggil fungsi untuk mendapatkan data terbaru berdasarkan role
  const sidebarData = getSidebarData(userRole);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Sidebar collapsible="icon">
      {/* ── Logo ── */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.svg"
            alt="Logo icon"
            width={32}
            height={32}
            className="shrink-0"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {sidebarData
          .filter(
            (category) =>
              !category.roles || category.roles.includes(userRole)
          )
          .map((category) => (
            <SidebarGroup key={category.label}>
              <SidebarGroupLabel>{category.label}</SidebarGroupLabel>

              <SidebarMenu>
                {category.items
                  .filter(
                    (item) =>
                      !item.roles || item.roles.includes(userRole)
                  )
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={
                          item.href ? isActive(item.href) : false
                        }
                      >
                        <Link href={item.href || "#"}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <p className="text-xs text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
          © 2025 Your App
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
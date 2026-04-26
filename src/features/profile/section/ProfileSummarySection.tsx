"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, ShieldCheck, Calendar, LogIn, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function ProfileSummarySection() {
  const { user, userRole } = useAuth();

  const getRoleLabel = () => {
    switch(userRole) {
      case "admin": return "Administrator";
      case "lecture": return "Dosen Wali";
      case "student": return "Mahasiswa";
      default: return "User";
    }
  }

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden h-fit">
      <CardContent className="p-0">
        {/* COVER HEADER */}
        <div className="h-24 bg-slate-50 dark:bg-slate-800/50 relative">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-900 flex items-center justify-center text-2xl font-bold text-brand shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 overflow-hidden">
                {user?.avatar ? (
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    width={80} 
                    height={80} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name.charAt(0)
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-brand text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 p-6 text-center space-y-1">
          <h2 className="font-bold text-lg text-slate-800 dark:text-white truncate px-2">{user?.name || "User"}</h2>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{getRoleLabel()}</p>
          
          <div className="pt-3 pb-2 flex justify-center">
            <Badge variant="outline" className="rounded-full bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] px-3">
              ● Akun Aktif
            </Badge>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <Separator className="bg-slate-100 dark:bg-slate-800" />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Bergabung</span>
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-300">Januari 2024</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <LogIn className="w-3.5 h-3.5" />
                <span>Terakhir Login</span>
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-300">Hari ini, 16:15</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

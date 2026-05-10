"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { userService } from "@/services/user.service";
import LoginFormSection from "../section/LoginFormSection";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { accessToken, user, setAuth } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Jika tidak ada token, jangan lakukan apa-apa (tampilkan form login)
      if (!isMounted || !accessToken) return;

      setIsRedirecting(true);
      try {
        let currentUser = user;
        
        // Ambil data profil jika belum ada di store (karena tidak dipersist di localStorage)
        if (!currentUser) {
          const profile = await userService.getMe();
          setAuth(accessToken, useAuthStore.getState().refreshToken || "", profile);
          currentUser = profile;
        }

        if (currentUser) {
          if (currentUser.role.toUpperCase() === "STUDENT") {
            router.push("/upload-recording");
          } else {
            router.push("/dashboard");
          }
        }
      } catch (error) {
        // Jika token expired atau error, biarkan user di halaman login
        console.error("Auth redirect error:", error);
        setIsRedirecting(false);
      }
    };

    checkAuthAndRedirect();
  }, [isMounted, accessToken, user, router, setAuth]);

  if (!isMounted || isRedirecting || (accessToken && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-brand/30">
            M
          </div>

          <div>
            <h1 className="text-2xl font-bold text-brand-secondary">Selamat Datang</h1>
            <p className="text-sm text-muted-foreground">
              Student Motivation Analyzer System
            </p>
          </div>
        </div>

        {/* FORM */}
        <LoginFormSection />
      </div>
    </div>
  );
}

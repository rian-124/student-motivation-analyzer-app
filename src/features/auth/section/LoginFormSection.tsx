"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LogIn } from "lucide-react";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function LoginFormSection() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const authResponse = await authService.login({ email, password });
      const dataWrapper = (authResponse as any).data || authResponse;
      const tokens = dataWrapper.tokens || dataWrapper;
      const { accessToken, refreshToken } = tokens;
      
      if (!accessToken || !refreshToken) {
        throw new Error("Struktur token tidak valid dari server.");
      }

      setAuth(accessToken, refreshToken, null);

      const profileResponse = await authService.getProfile();
      const user = (profileResponse as any).data || profileResponse;
      
      setAuth(accessToken, refreshToken, user);
      
      toast.success(`Selamat datang, ${user.name || 'User'}!`);

      // Redirection logic sederhana - gunakan toUpperCase() agar aman dari perbedaan casing
      if (user.role.toUpperCase() === 'STUDENT') {
        router.push("/upload-recording");
      } else {
        // Admin dan Lecture masuk ke dashboard yang sama
        router.push("/dashboard");
      }

    } catch (err: unknown) {
      console.error("Login process error:", err);
      let message = "Terjadi kesalahan saat login.";
      
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || "Email atau password salah.";
      }
      
      setError(message);
      toast.error(message);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-500 text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label>Email / NIM</Label>
            <Input 
              type="email"
              placeholder="Masukkan email atau NIM" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input 
              type="password" 
              placeholder="Masukkan password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full gap-2 bg-brand! hover:bg-brand-hover! shadow-lg shadow-brand/20"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Memproses..." : "Masuk"}
          </Button>

          <Separator className="bg-brand/10" />

          <div className="p-3 bg-brand/5 rounded-xl text-center">
            <p className="text-[10px] text-brand-secondary/60">
              Gunakan akun yang sudah terdaftar di sistem.
            </p>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}

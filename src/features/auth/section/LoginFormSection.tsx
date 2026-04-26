"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LogIn } from "lucide-react";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/types/Role.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import usersData from "@/lib/data/users.json";

export default function LoginFormSection() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulasi delay login
    setTimeout(() => {
      const user = usersData.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        login(user as any); // Cast to any because of role string type match
      } else {
        setError("Email atau password salah. Silakan cek data dummy di bawah.");
      }
      setLoading(false);
    }, 1000);
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
              placeholder="admin@sma.com / dosen@sma.com / student@sma.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input 
              type="password" 
              placeholder="Masukkan password (contoh: admin123)" 
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

          {/* DUMMY INFO */}
          <div className="p-3 bg-brand/5 rounded-xl space-y-1">
            <p className="text-[10px] font-black text-brand uppercase tracking-wider">Dummy Access:</p>
            <div className="grid grid-cols-1 gap-1 text-[10px] text-brand-secondary/60">
              <p>• Admin: admin@sma.com / admin123</p>
              <p>• Dosen: dosen@sma.com / dosen123</p>
              <p>• Mhs: student@sma.com / student123</p>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}

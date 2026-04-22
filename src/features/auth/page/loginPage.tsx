"use client";

import LoginFormSection from "../section/LoginFormSection";

export default function LoginPage() {
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

"use client";

import PageHeader from "@/components/common/PageHeader";
import ProfileSummarySection from "../section/ProfileSummarySection";
import PersonalInfoSection from "../section/PersonalInfoSection";
import SecuritySection from "../section/SecuritySection";

export default function ProfilePage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="Pengaturan Profil"
        description="Kelola informasi akun, keamanan, dan preferensi pribadi Anda."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <ProfileSummarySection />
        </div>

        <div className="lg:col-span-8 space-y-8">
          <PersonalInfoSection />
          <SecuritySection />
        </div>
      </div>
    </div>
  );
}
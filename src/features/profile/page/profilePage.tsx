"use client";

import PageHeader from "@/components/common/PageHeader";
import ProfileSummarySection from "../section/ProfileSummarySection";
import PersonalInfoSection from "../section/PersonalInfoSection";
import SecuritySection from "../section/SecuritySection";

export default function ProfilePage() {
  return (
    <section className="p-6 space-y-6 w-full min-h-screen">
      <PageHeader
        title="Profil Saya"
        description="Kelola informasi akun dan pengaturan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ProfileSummarySection />

        <div className="lg:col-span-8 space-y-6">
          <PersonalInfoSection />
          <SecuritySection />
        </div>
      </div>
    </section>
  );
}
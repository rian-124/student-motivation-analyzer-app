"use client";

import { Button } from "@/components/ui/button";
import { Download, Clock } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatsSection from "../section/StatsSection";
import ChartSection from "../section/ChartSection";

export default function Dashboard() {
  return (
    <section className="p-6 space-y-6 w-full min-h-screen">
      <PageHeader
        title="Dashboard Overview"
        description="Ringkasan data motivasi mahasiswa semester ini"
        actions={
          <>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Unduh Laporan
            </Button>
            <Button>
              <Clock className="w-4 h-4 mr-2" />
              Semester Genap 2025/26
            </Button>
          </>
        }
      />
      <StatsSection />
      <ChartSection />
    </section>
  );
}

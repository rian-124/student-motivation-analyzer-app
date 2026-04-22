import StatCard from "@/components/common/StatCard";

export default function OverallStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        value={124}
        label="Total Mahasiswa"
        trend="+12%"
        trendColor="text-green-600"
      />
      <StatCard
        value={71}
        valueColor="text-green-600"
        label="Motivasi Tinggi"
        trend="+5%"
        trendColor="text-green-600"
      />
      <StatCard
        value={39}
        valueColor="text-yellow-600"
        label="Motivasi Sedang"
        trend="±0%"
      />
      <StatCard
        value={14}
        valueColor="text-red-600"
        label="Motivasi Rendah"
        trend="-3%"
        trendColor="text-red-600"
      />
    </div>
  );
}

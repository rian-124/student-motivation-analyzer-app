import StatCard from "@/components/common/StatCard";

export default function ClassStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard value={32} label="Total Mahasiswa" />
      <StatCard
        value={18}
        valueColor="text-green-600"
        label="Motivasi Tinggi"
        trend="57%"
        trendColor="text-green-600"
      />
      <StatCard
        value={9}
        valueColor="text-yellow-600"
        label="Motivasi Sedang"
        trend="28%"
        trendColor="text-yellow-600"
      />
      <StatCard
        value={5}
        valueColor="text-red-600"
        label="Motivasi Rendah"
        trend="15%"
        trendColor="text-red-600"
      />
    </div>
  );
}

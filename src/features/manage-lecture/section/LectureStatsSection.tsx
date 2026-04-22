import StatCard from "@/components/common/StatCard";

export default function LectureStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard value={16} label="Total Dosen" />
      <StatCard
        value={14}
        valueColor="text-green-600"
        label="Aktif"
      />
      <StatCard
        value={2}
        valueColor="text-yellow-500"
        label="Pending"
      />
    </div>
  );
}

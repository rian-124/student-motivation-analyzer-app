import StatCard from "@/components/common/StatCard";

export default function StudentStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard value={124} label="Total Mahasiswa" />
      <StatCard
        value={118}
        valueColor="text-green-600"
        label="Akun Aktif"
      />
      <StatCard
        value={5}
        valueColor="text-yellow-500"
        label="Menunggu Verifikasi"
      />
      <StatCard
        value={1}
        valueColor="text-red-500"
        label="Akun Nonaktif"
      />
    </div>
  );
}

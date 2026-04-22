import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClassChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* BAR CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Motivasi Mingguan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] flex items-end gap-3">
            {[70, 60, 80, 65, 90, 75].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-4 bg-brand rounded"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-muted-foreground">M{i + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* DONUT */}
      <Card>
        <CardHeader>
          <CardTitle>Persentase Motivasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            {/* simple donut (placeholder modern UI) */}
            <div className="relative w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center">
              <span className="text-lg font-bold">89%</span>
            </div>

            <div className="space-y-2 text-sm w-full">
              <div className="flex justify-between">
                <span className="text-green-600">Tinggi</span>
                <span>57%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600">Sedang</span>
                <span>28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600">Rendah</span>
                <span>15%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

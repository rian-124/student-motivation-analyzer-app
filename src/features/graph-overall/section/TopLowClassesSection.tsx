import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function TopLowClassesSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* TOP */}
      <Card>
        <CardHeader>
          <CardTitle>Top Kelas — Motivasi Tertinggi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Kelas C", value: 90 },
            { name: "Kelas F", value: 85 },
            { name: "Kelas A", value: 80 },
            { name: "Kelas H", value: 75 },
            { name: "Kelas E", value: 70 },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </div>
              <Progress value={item.value} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* LOW */}
      <Card>
        <CardHeader>
          <CardTitle>Perhatian Khusus — Motivasi Rendah</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Kelas D", value: 35 },
            { name: "Kelas G", value: 30 },
            { name: "Kelas B", value: 25 },
            { name: "Kelas E", value: 20 },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-red-500">{item.value}%</span>
              </div>
              <Progress value={item.value} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

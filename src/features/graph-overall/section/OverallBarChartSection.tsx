import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverallBarChartSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perbandingan Seluruh Kelas</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-end gap-3 h-[200px]">
          {[80, 60, 90, 50, 70, 85, 55, 75].map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="w-4 bg-blue-500 rounded"
                style={{ height: `${h}%` }}
              />
              <span className="text-xs text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

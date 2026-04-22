import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ReportHistorySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Laporan Tersedia</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Laporan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Laporan Q1 2026</div>
                <div className="text-xs text-muted-foreground">
                  Semua Kelas · PDF
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                01 Apr 2026
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Download PDF
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="font-medium">Laporan Semester Ganjil</div>
                <div className="text-xs text-muted-foreground">
                  Semua Kelas · Excel
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                15 Jan 2026
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Download XLS
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="font-medium">Laporan Kelas A</div>
                <div className="text-xs text-muted-foreground">
                  Kelas A · PDF
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                10 Mar 2026
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Download PDF
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

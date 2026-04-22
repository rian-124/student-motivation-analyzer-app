import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StudentDetailTableSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Mahasiswa</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Motivasi</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Terakhir Upload</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Andi Pratama</TableCell>
              <TableCell>2021010001</TableCell>
              <TableCell>
                <Badge>High</Badge>
              </TableCell>
              <TableCell>87.4</TableCell>
              <TableCell>18 Apr 2026</TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Lihat
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Siti Rahayu</TableCell>
              <TableCell>2021010008</TableCell>
              <TableCell>
                <Badge variant="secondary">Medium</Badge>
              </TableCell>
              <TableCell>63.1</TableCell>
              <TableCell>18 Apr 2026</TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Lihat
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Budi Santoso</TableCell>
              <TableCell>2021010015</TableCell>
              <TableCell>
                <Badge variant="destructive">Low</Badge>
              </TableCell>
              <TableCell>31.8</TableCell>
              <TableCell>17 Apr 2026</TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Lihat
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

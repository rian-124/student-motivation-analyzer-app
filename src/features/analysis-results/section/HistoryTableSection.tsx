import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function HistoryTableSection() {
  return (
    <Card>
      {/* HEADER FILTER */}
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <CardTitle>Riwayat Analisis</CardTitle>

          <div className="flex gap-2">
            {/* SEARCH */}
            <div className="relative w-[180px]">
              <Search className="w-4 h-4 absolute left-2 top-2.5 text-muted-foreground" />
              <Input placeholder="Cari..." className="pl-8" />
            </div>

            {/* FILTER */}
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="high">Tinggi</SelectItem>
                <SelectItem value="medium">Sedang</SelectItem>
                <SelectItem value="low">Rendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      {/* TABLE */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Motivasi</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>MFCC</TableHead>
              <TableHead>S2T</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* HIGH */}
            <TableRow>
              <TableCell>
                <div className="font-medium">Andi Pratama</div>
                <div className="text-xs text-muted-foreground">2021010001</div>
              </TableCell>
              <TableCell>A</TableCell>
              <TableCell>
                <Badge>High</Badge>
              </TableCell>
              <TableCell className="text-green-600 font-mono">87.4</TableCell>
              <TableCell className="font-mono">92.1</TableCell>
              <TableCell className="font-mono">83.7</TableCell>
              <TableCell className="text-xs text-muted-foreground font-mono">
                18 Apr
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Lihat
                </Button>
              </TableCell>
            </TableRow>

            {/* HIGH */}
            <TableRow>
              <TableCell>
                <div className="font-medium">Dewi Kusuma</div>
                <div className="text-xs text-muted-foreground">2021010022</div>
              </TableCell>
              <TableCell>C</TableCell>
              <TableCell>
                <Badge>High</Badge>
              </TableCell>
              <TableCell className="text-green-600 font-mono">91.2</TableCell>
              <TableCell className="font-mono">94.5</TableCell>
              <TableCell className="font-mono">88.0</TableCell>
              <TableCell className="text-xs text-muted-foreground font-mono">
                17 Apr
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Lihat
                </Button>
              </TableCell>
            </TableRow>

            {/* MEDIUM */}
            <TableRow>
              <TableCell>
                <div className="font-medium">Siti Rahayu</div>
                <div className="text-xs text-muted-foreground">2021010008</div>
              </TableCell>
              <TableCell>B</TableCell>
              <TableCell>
                <Badge variant="secondary">Medium</Badge>
              </TableCell>
              <TableCell className="text-yellow-600 font-mono">63.1</TableCell>
              <TableCell className="font-mono">67.3</TableCell>
              <TableCell className="font-mono">59.0</TableCell>
              <TableCell className="text-xs text-muted-foreground font-mono">
                18 Apr
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Lihat
                </Button>
              </TableCell>
            </TableRow>

            {/* LOW */}
            <TableRow>
              <TableCell>
                <div className="font-medium">Budi Santoso</div>
                <div className="text-xs text-muted-foreground">2021010015</div>
              </TableCell>
              <TableCell>A</TableCell>
              <TableCell>
                <Badge variant="destructive">Low</Badge>
              </TableCell>
              <TableCell className="text-red-600 font-mono">31.8</TableCell>
              <TableCell className="font-mono">28.4</TableCell>
              <TableCell className="font-mono">35.2</TableCell>
              <TableCell className="text-xs text-muted-foreground font-mono">
                17 Apr
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  Lihat
                </Button>
              </TableCell>
            </TableRow>

            {/* PROCESS */}
            <TableRow>
              <TableCell>
                <div className="font-medium">Rizky Fauzan</div>
                <div className="text-xs text-muted-foreground">2021010031</div>
              </TableCell>
              <TableCell>D</TableCell>
              <TableCell>
                <Badge variant="outline">Processing</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground font-mono">—</TableCell>
              <TableCell className="text-muted-foreground font-mono">—</TableCell>
              <TableCell className="text-muted-foreground font-mono">—</TableCell>
              <TableCell className="text-xs text-muted-foreground font-mono">
                19 Apr
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost" disabled>
                  Proses
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

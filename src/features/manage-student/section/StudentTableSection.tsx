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

export default function StudentTableSection() {
  return (
    <Card>
      {/* HEADER FILTER */}
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <CardTitle>Daftar Mahasiswa</CardTitle>

          <div className="flex gap-2">
            {/* SEARCH */}
            <div className="relative w-[200px]">
              <Search className="w-4 h-4 absolute left-2 top-2.5 text-muted-foreground" />
              <Input placeholder="Cari nama / NIM..." className="pl-8" />
            </div>

            {/* FILTER KELAS */}
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="a">Kelas A</SelectItem>
                <SelectItem value="b">Kelas B</SelectItem>
              </SelectContent>
            </Select>

            {/* FILTER STATUS */}
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Nonaktif</SelectItem>
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
              <TableHead>NIM</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* ACTIVE */}
            <TableRow>
              <TableCell className="font-medium">Andi Pratama</TableCell>
              <TableCell>2021010001</TableCell>
              <TableCell>A</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                andi@kampus.ac.id
              </TableCell>
              <TableCell>
                <Badge>Aktif</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Nonaktif
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            {/* PENDING */}
            <TableRow>
              <TableCell className="font-medium">Rizky Fauzan</TableCell>
              <TableCell>2021010031</TableCell>
              <TableCell>D</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                rizky@kampus.ac.id
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm">Verifikasi</Button>
                  <Button size="sm" variant="destructive">
                    Tolak
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            {/* INACTIVE */}
            <TableRow>
              <TableCell className="font-medium">Budi Santoso</TableCell>
              <TableCell>2021010015</TableCell>
              <TableCell>A</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                budi@kampus.ac.id
              </TableCell>
              <TableCell>
                <Badge variant="destructive">Nonaktif</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  Aktifkan
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Menampilkan 5 dari 124 data
          </p>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Prev
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
import { Badge } from "@/components/ui/badge";

export default function LectureTableSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Dosen</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dosen</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Mata Kuliah</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* ACTIVE */}
            <TableRow>
              <TableCell className="font-medium">
                Dr. Ahmad Fauzi, M.T.
              </TableCell>
              <TableCell>198501012010011001</TableCell>
              <TableCell>Pemrograman Web</TableCell>
              <TableCell>A, B, C</TableCell>
              <TableCell>
                <Badge>Aktif</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Ubah
                  </Button>
                  <Button size="sm" variant="destructive">
                    Nonaktif
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            {/* ACTIVE */}
            <TableRow>
              <TableCell className="font-medium">
                Dr. Sari Dewi, M.Kom.
              </TableCell>
              <TableCell>198703152012012002</TableCell>
              <TableCell>Basis Data</TableCell>
              <TableCell>D, E</TableCell>
              <TableCell>
                <Badge>Aktif</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Ubah
                  </Button>
                  <Button size="sm" variant="destructive">
                    Nonaktif
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            {/* PENDING */}
            <TableRow>
              <TableCell className="font-medium">
                M. Rizal, S.T., M.T.
              </TableCell>
              <TableCell>199001202015011003</TableCell>
              <TableCell>Jaringan Komputer</TableCell>
              <TableCell>F, G</TableCell>
              <TableCell>
                <Badge variant="secondary">Menunggu</Badge>
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

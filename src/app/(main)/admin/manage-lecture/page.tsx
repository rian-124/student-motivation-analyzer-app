"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import {
  UserPlus,
} from "lucide-react";

export default function DosenPage() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Kelola Akun Dosen
          </h1>
          <p className="text-sm text-muted-foreground">
            Manajemen data dan hak akses dosen
          </p>
        </div>

        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Dosen
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Total Dosen
            </p>
            <h2 className="text-2xl font-bold">16</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Aktif
            </p>
            <h2 className="text-2xl font-bold text-green-600">
              14
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Pending
            </p>
            <h2 className="text-2xl font-bold text-yellow-500">
              2
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* TABLE */}
      <Card>

        <CardHeader>
          <CardTitle>
            Daftar Dosen
          </CardTitle>
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
                      Edit
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
                <TableCell className="font-medium">
                  M. Rizal, S.T., M.T.
                </TableCell>
                <TableCell>199001202015011003</TableCell>
                <TableCell>Jaringan Komputer</TableCell>
                <TableCell>F, G</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm">
                      Verifikasi
                    </Button>
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

    </div>
  );
}
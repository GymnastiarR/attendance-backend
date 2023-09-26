/*
  Warnings:

  - A unique constraint covering the columns `[idTahunPelajaran,idUnitPresensi]` on the table `Kelas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Kelas_idTahunPelajaran_idUnitPresensi_key` ON `Kelas`(`idTahunPelajaran`, `idUnitPresensi`);

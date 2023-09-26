/*
  Warnings:

  - A unique constraint covering the columns `[idPresensi,idSiswa]` on the table `PresensiSiswa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PresensiSiswa_idPresensi_idSiswa_key` ON `PresensiSiswa`(`idPresensi`, `idSiswa`);

/*
  Warnings:

  - A unique constraint covering the columns `[idKelas,Date]` on the table `Presensi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Presensi_idKelas_Date_key` ON `Presensi`(`idKelas`, `Date`);

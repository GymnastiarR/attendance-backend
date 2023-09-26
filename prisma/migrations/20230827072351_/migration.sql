/*
  Warnings:

  - A unique constraint covering the columns `[Date]` on the table `Presensi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Presensi_Date_key` ON `Presensi`(`Date`);

/*
  Warnings:

  - Added the required column `idTahunPelajaran` to the `Presensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `presensi` ADD COLUMN `idTahunPelajaran` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Presensi` ADD CONSTRAINT `Presensi_idTahunPelajaran_fkey` FOREIGN KEY (`idTahunPelajaran`) REFERENCES `TahunPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

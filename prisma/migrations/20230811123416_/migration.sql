/*
  Warnings:

  - You are about to drop the column `nama` on the `tahunpelajaran` table. All the data in the column will be lost.
  - Added the required column `semester` to the `TahunPelajaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun` to the `TahunPelajaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tahunpelajaran` DROP COLUMN `nama`,
    ADD COLUMN `semester` VARCHAR(191) NOT NULL,
    ADD COLUMN `tahun` VARCHAR(191) NOT NULL;

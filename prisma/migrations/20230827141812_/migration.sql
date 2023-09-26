/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `UnitPresensi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `UnitPresensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `unitpresensi` ADD COLUMN `identifier` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UnitPresensi_identifier_key` ON `UnitPresensi`(`identifier`);

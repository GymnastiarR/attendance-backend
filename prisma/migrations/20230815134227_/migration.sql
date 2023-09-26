/*
  Warnings:

  - You are about to drop the column `idKelas` on the `siswa` table. All the data in the column will be lost.
  - The primary key for the `siswakelas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `siswakelas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `idKelas`;

-- AlterTable
ALTER TABLE `siswakelas` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`idKelas`, `idSiswa`);

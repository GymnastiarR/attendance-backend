/*
  Warnings:

  - Added the required column `isActive` to the `TahunPelajaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tahunpelajaran` ADD COLUMN `isActive` BOOLEAN NOT NULL;

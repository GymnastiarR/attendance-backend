/*
  Warnings:

  - A unique constraint covering the columns `[nis]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Student_nis_key` ON `Student`(`nis`);

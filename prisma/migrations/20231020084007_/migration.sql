/*
  Warnings:

  - A unique constraint covering the columns `[date,academicYearId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Attendance_date_key` ON `attendance`;

-- CreateIndex
CREATE UNIQUE INDEX `Attendance_date_academicYearId_key` ON `Attendance`(`date`, `academicYearId`);

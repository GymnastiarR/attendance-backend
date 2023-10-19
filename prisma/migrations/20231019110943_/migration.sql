/*
  Warnings:

  - You are about to drop the column `classId` on the `attendance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_classId_fkey`;

-- DropIndex
DROP INDEX `Attendance_classId_date_key` ON `attendance`;

-- AlterTable
ALTER TABLE `attendance` DROP COLUMN `classId`;

-- CreateIndex
CREATE UNIQUE INDEX `Attendance_date_key` ON `Attendance`(`date`);

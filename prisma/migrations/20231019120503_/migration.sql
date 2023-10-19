/*
  Warnings:

  - You are about to drop the `academicyearstudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classstudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `academicYearId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `academicyearstudent` DROP FOREIGN KEY `AcademicYearStudent_academicYearId_fkey`;

-- DropForeignKey
ALTER TABLE `academicyearstudent` DROP FOREIGN KEY `AcademicYearStudent_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `classstudent` DROP FOREIGN KEY `ClassStudent_classId_fkey`;

-- DropForeignKey
ALTER TABLE `classstudent` DROP FOREIGN KEY `ClassStudent_studentId_fkey`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `academicYearId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `academicyearstudent`;

-- DropTable
DROP TABLE `classstudent`;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

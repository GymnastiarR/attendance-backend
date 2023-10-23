/*
  Warnings:

  - You are about to drop the column `academicYearId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_academicYearId_fkey`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `academicYearId`,
    DROP COLUMN `classId`;

-- CreateTable
CREATE TABLE `AcademicYearStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `academicYearId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,

    UNIQUE INDEX `AcademicYearStudent_academicYearId_studentId_key`(`academicYearId`, `studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AcademicYearStudent` ADD CONSTRAINT `AcademicYearStudent_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicYearStudent` ADD CONSTRAINT `AcademicYearStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

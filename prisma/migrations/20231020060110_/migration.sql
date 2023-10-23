/*
  Warnings:

  - A unique constraint covering the columns `[classId,studentId]` on the table `ClassStudent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `classstudent` DROP FOREIGN KEY `ClassStudent_studentId_fkey`;

-- DropIndex
DROP INDEX `Student_classId_fkey` ON `student`;

-- CreateIndex
CREATE UNIQUE INDEX `ClassStudent_classId_studentId_key` ON `ClassStudent`(`classId`, `studentId`);

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

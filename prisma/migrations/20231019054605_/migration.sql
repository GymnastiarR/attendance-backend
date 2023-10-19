-- DropForeignKey
ALTER TABLE `classstudent` DROP FOREIGN KEY `ClassStudent_studentId_fkey`;

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

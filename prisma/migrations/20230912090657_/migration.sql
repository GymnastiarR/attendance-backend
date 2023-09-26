-- DropForeignKey
ALTER TABLE `classstudent` DROP FOREIGN KEY `ClassStudent_classId_fkey`;

-- DropForeignKey
ALTER TABLE `classstudent` DROP FOREIGN KEY `ClassStudent_studentId_fkey`;

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

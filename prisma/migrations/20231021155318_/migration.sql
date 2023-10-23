/*
  Warnings:

  - You are about to alter the column `rfid` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `rfid` INTEGER NULL;

-- CreateTable
CREATE TABLE `Rfid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Rfid_rfid_key`(`rfid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_rfid_fkey` FOREIGN KEY (`rfid`) REFERENCES `Rfid`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

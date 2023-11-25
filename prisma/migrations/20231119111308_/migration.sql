/*
  Warnings:

  - You are about to drop the column `total` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `rfidId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `total`,
    DROP COLUMN `userId`,
    ADD COLUMN `rfidId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_rfidId_fkey` FOREIGN KEY (`rfidId`) REFERENCES `Rfid`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

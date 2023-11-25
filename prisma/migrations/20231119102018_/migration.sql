/*
  Warnings:

  - Added the required column `priceId` to the `DetailTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailtransaction` ADD COLUMN `priceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DetailTransaction` ADD CONSTRAINT `DetailTransaction_priceId_fkey` FOREIGN KEY (`priceId`) REFERENCES `Price`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

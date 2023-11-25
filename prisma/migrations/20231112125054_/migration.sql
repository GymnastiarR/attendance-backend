/*
  Warnings:

  - Added the required column `menuId` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `price` ADD COLUMN `menuId` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

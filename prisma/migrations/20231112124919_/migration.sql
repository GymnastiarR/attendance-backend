/*
  Warnings:

  - You are about to drop the `harga` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `harga` DROP FOREIGN KEY `Harga_menuId_fkey`;

-- DropTable
DROP TABLE `harga`;

-- CreateTable
CREATE TABLE `CobaDahh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

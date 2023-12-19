/*
  Warnings:

  - You are about to drop the `detailtransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detailtransaction` DROP FOREIGN KEY `DetailTransaction_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `detailtransaction` DROP FOREIGN KEY `DetailTransaction_priceId_fkey`;

-- DropForeignKey
ALTER TABLE `detailtransaction` DROP FOREIGN KEY `DetailTransaction_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `Menu_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `price` DROP FOREIGN KEY `Price_menuId_fkey`;

-- DropTable
DROP TABLE `detailtransaction`;

-- DropTable
DROP TABLE `menu`;

-- DropTable
DROP TABLE `price`;

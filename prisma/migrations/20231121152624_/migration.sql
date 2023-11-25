/*
  Warnings:

  - You are about to drop the column `total` on the `detailtransaction` table. All the data in the column will be lost.
  - Added the required column `subTotal` to the `DetailTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailtransaction` DROP COLUMN `total`,
    ADD COLUMN `subTotal` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `totalAmount` INTEGER NOT NULL;

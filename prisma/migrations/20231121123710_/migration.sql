/*
  Warnings:

  - You are about to alter the column `balance` on the `rfid` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `rfid` MODIFY `balance` INTEGER UNSIGNED NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `isPaid` BOOLEAN NOT NULL DEFAULT false;

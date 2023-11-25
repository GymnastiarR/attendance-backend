/*
  Warnings:

  - You are about to alter the column `balance` on the `rfid` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `rfid` MODIFY `balance` INTEGER NOT NULL DEFAULT 0;

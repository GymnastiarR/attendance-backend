/*
  Warnings:

  - Added the required column `total` to the `DetailTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailtransaction` ADD COLUMN `total` INTEGER NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Major` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Year` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Major_name_key` ON `Major`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Year_name_key` ON `Year`(`name`);

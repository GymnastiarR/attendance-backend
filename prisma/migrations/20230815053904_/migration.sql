-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_idRuangKelas_fkey`;

-- AlterTable
ALTER TABLE `kelas` MODIFY `idRuangKelas` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_idRuangKelas_fkey` FOREIGN KEY (`idRuangKelas`) REFERENCES `RuangKelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

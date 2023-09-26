-- AlterTable
ALTER TABLE `kelas` ADD COLUMN `idUnitPresensi` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_idUnitPresensi_fkey` FOREIGN KEY (`idUnitPresensi`) REFERENCES `UnitPresensi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

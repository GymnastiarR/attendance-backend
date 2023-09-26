-- AddForeignKey
ALTER TABLE `Presensi` ADD CONSTRAINT `Presensi_idKelas_fkey` FOREIGN KEY (`idKelas`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

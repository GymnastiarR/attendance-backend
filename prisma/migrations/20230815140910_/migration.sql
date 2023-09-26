-- CreateTable
CREATE TABLE `SiswaTahunAjaran` (
    `idSiswa` INTEGER NOT NULL,
    `idTahunPelajaran` INTEGER NOT NULL,

    PRIMARY KEY (`idSiswa`, `idTahunPelajaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SiswaTahunAjaran` ADD CONSTRAINT `SiswaTahunAjaran_idSiswa_fkey` FOREIGN KEY (`idSiswa`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiswaTahunAjaran` ADD CONSTRAINT `SiswaTahunAjaran_idTahunPelajaran_fkey` FOREIGN KEY (`idTahunPelajaran`) REFERENCES `TahunPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

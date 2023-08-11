-- CreateTable
CREATE TABLE `Siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `idKelas` INTEGER NOT NULL,
    `uidRFID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Siswa_uidRFID_key`(`uidRFID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TahunPelajaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jurusan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tingkat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `idTahunPelajaran` INTEGER NOT NULL,
    `idJurusan` INTEGER NOT NULL,
    `idTingkat` INTEGER NOT NULL,
    `idRuangKelas` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Kelas_idTahunPelajaran_idRuangKelas_key`(`idTahunPelajaran`, `idRuangKelas`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiswaKelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idKelas` INTEGER NOT NULL,
    `idSiswa` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RuangKelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Presensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idKelas` INTEGER NOT NULL,
    `Date` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PresensiSiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPresensi` INTEGER NOT NULL,
    `idSiswa` INTEGER NOT NULL,
    `datePresence` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnitPresensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_idTingkat_fkey` FOREIGN KEY (`idTingkat`) REFERENCES `Tingkat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_idJurusan_fkey` FOREIGN KEY (`idJurusan`) REFERENCES `Jurusan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_idTahunPelajaran_fkey` FOREIGN KEY (`idTahunPelajaran`) REFERENCES `TahunPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_idRuangKelas_fkey` FOREIGN KEY (`idRuangKelas`) REFERENCES `RuangKelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiswaKelas` ADD CONSTRAINT `SiswaKelas_idSiswa_fkey` FOREIGN KEY (`idSiswa`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiswaKelas` ADD CONSTRAINT `SiswaKelas_idKelas_fkey` FOREIGN KEY (`idKelas`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PresensiSiswa` ADD CONSTRAINT `PresensiSiswa_idSiswa_fkey` FOREIGN KEY (`idSiswa`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PresensiSiswa` ADD CONSTRAINT `PresensiSiswa_idPresensi_fkey` FOREIGN KEY (`idPresensi`) REFERENCES `Presensi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

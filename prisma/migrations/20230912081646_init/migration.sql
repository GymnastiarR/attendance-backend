/*
  Warnings:

  - You are about to drop the `jurusan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kelas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `presensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `presensisiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ruangkelas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `siswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `siswakelas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `siswatahunajaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tahunpelajaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tingkat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unitpresensi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_idJurusan_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_idRuangKelas_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_idTahunPelajaran_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_idTingkat_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_idUnitPresensi_fkey`;

-- DropForeignKey
ALTER TABLE `presensi` DROP FOREIGN KEY `Presensi_idKelas_fkey`;

-- DropForeignKey
ALTER TABLE `presensi` DROP FOREIGN KEY `Presensi_idTahunPelajaran_fkey`;

-- DropForeignKey
ALTER TABLE `presensisiswa` DROP FOREIGN KEY `PresensiSiswa_idPresensi_fkey`;

-- DropForeignKey
ALTER TABLE `presensisiswa` DROP FOREIGN KEY `PresensiSiswa_idSiswa_fkey`;

-- DropForeignKey
ALTER TABLE `siswakelas` DROP FOREIGN KEY `SiswaKelas_idKelas_fkey`;

-- DropForeignKey
ALTER TABLE `siswakelas` DROP FOREIGN KEY `SiswaKelas_idSiswa_fkey`;

-- DropForeignKey
ALTER TABLE `siswatahunajaran` DROP FOREIGN KEY `SiswaTahunAjaran_idSiswa_fkey`;

-- DropForeignKey
ALTER TABLE `siswatahunajaran` DROP FOREIGN KEY `SiswaTahunAjaran_idTahunPelajaran_fkey`;

-- DropTable
DROP TABLE `jurusan`;

-- DropTable
DROP TABLE `kelas`;

-- DropTable
DROP TABLE `presensi`;

-- DropTable
DROP TABLE `presensisiswa`;

-- DropTable
DROP TABLE `ruangkelas`;

-- DropTable
DROP TABLE `siswa`;

-- DropTable
DROP TABLE `siswakelas`;

-- DropTable
DROP TABLE `siswatahunajaran`;

-- DropTable
DROP TABLE `tahunpelajaran`;

-- DropTable
DROP TABLE `tingkat`;

-- DropTable
DROP TABLE `unitpresensi`;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `rfid` VARCHAR(191) NULL,
    `isGraduated` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Student_rfid_key`(`rfid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicYear` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `AcademicYear_year_semester_key`(`year`, `semester`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Major` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Year` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `academicYearId` INTEGER NOT NULL,
    `majorId` INTEGER NOT NULL,
    `yearId` INTEGER NOT NULL,
    `attendanceUnitId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Class_academicYearId_majorId_yearId_name_key`(`academicYearId`, `majorId`, `yearId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassStudent` (
    `classId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`classId`, `studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `academicYearId` INTEGER NOT NULL,

    UNIQUE INDEX `Attendance_classId_date_key`(`classId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttendanceStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attendanceId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `datePresence` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Alpa',

    UNIQUE INDEX `AttendanceStudent_attendanceId_studentId_key`(`attendanceId`, `studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttendanceUnit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AttendanceUnit_identifier_key`(`identifier`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicYearStudent` (
    `studentId` INTEGER NOT NULL,
    `academicYearId` INTEGER NOT NULL,

    PRIMARY KEY (`studentId`, `academicYearId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_yearId_fkey` FOREIGN KEY (`yearId`) REFERENCES `Year`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `Major`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_attendanceUnitId_fkey` FOREIGN KEY (`attendanceUnitId`) REFERENCES `AttendanceUnit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendanceStudent` ADD CONSTRAINT `AttendanceStudent_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `Attendance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendanceStudent` ADD CONSTRAINT `AttendanceStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicYearStudent` ADD CONSTRAINT `AcademicYearStudent_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicYearStudent` ADD CONSTRAINT `AcademicYearStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

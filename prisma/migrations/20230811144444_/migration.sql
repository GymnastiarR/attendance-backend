/*
  Warnings:

  - A unique constraint covering the columns `[idTahunPelajaran,idJurusan,idTingkat,nama]` on the table `Kelas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tahun,semester]` on the table `TahunPelajaran` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Kelas_idTahunPelajaran_idJurusan_idTingkat_nama_key` ON `Kelas`(`idTahunPelajaran`, `idJurusan`, `idTingkat`, `nama`);

-- CreateIndex
CREATE UNIQUE INDEX `TahunPelajaran_tahun_semester_key` ON `TahunPelajaran`(`tahun`, `semester`);

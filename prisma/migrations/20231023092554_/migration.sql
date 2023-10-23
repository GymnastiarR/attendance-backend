-- DropForeignKey
ALTER TABLE `attendancestudent` DROP FOREIGN KEY `AttendanceStudent_attendanceId_fkey`;

-- AddForeignKey
ALTER TABLE `AttendanceStudent` ADD CONSTRAINT `AttendanceStudent_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `Attendance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

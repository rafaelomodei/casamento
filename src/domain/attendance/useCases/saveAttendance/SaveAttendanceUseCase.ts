import { AttendanceDTO } from '@/domain/attendance/entities/AttendanceDTO';
import { IAttendanceRepository } from '@/domain/attendance/repositories/IAttendanceRepository';

export class SaveAttendanceUseCase {
  constructor(private attendanceRepository: IAttendanceRepository) {}

  async execute(data: AttendanceDTO): Promise<void> {
    await this.attendanceRepository.save(data);
  }
}

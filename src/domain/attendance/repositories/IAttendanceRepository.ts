import { AttendanceDTO } from '../entities/AttendanceDTO';

export interface IAttendanceRepository {
  save(attendance: AttendanceDTO): Promise<void>;
}

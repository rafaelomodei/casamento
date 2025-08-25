import { IAttendanceRepository } from '@/domain/attendance/repositories/IAttendanceRepository';
import { FirebaseRepository } from '@/domain/attendance/repositories/repository/firebase/FirebaseRepository';

export const attendanceRepository: IAttendanceRepository = new FirebaseRepository();

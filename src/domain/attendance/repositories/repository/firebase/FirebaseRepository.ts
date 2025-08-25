import { adminDb } from '@/infra/repositories/firebase/admin';
import { AttendanceDTO } from '@/domain/attendance/entities/AttendanceDTO';
import { IAttendanceRepository } from '@/domain/attendance/repositories/IAttendanceRepository';

export class FirebaseRepository implements IAttendanceRepository {
  private readonly collection;

  constructor() {
    this.collection = adminDb.collection('attendances');
  }

  async save(attendance: AttendanceDTO): Promise<void> {
    await this.collection.doc(attendance.userId).set({
      attending: attendance.attending,
      createdAt: attendance.createdAt,
    });
  }
}

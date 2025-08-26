import { NextResponse } from 'next/server';
import { attendanceRepository } from '@/infra/repositories/firebase/AttendanceServerFirebaseRepositories';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { SaveAttendanceUseCase } from '@/domain/attendance/useCases/saveAttendance/SaveAttendanceUseCase';
import { AttendanceDTO } from '@/domain/attendance/entities/AttendanceDTO';

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Omit<AttendanceDTO, 'createdAt'>;
    const saveAttendance = new SaveAttendanceUseCase(attendanceRepository);
    const timestamp = new Date().toISOString();
    await saveAttendance.execute({
      ...data,
      createdAt: timestamp,
    });
    await userRepository.update(data.userId, {
      attending: data.attending,
      responded: true,
      respondedAt: timestamp,
      status: 5,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

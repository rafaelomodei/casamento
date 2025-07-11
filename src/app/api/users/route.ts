import { NextResponse } from 'next/server';
import { CreateUserUseCase } from '@/domain/users/useCases/createUser/CreateUserUseCase';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as UserDTO;
    const createUser = new CreateUserUseCase(userRepository);
    await createUser.execute(data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { CreateUserUseCase } from '@/domain/users/useCases/createUser/CreateUserUseCase';
import { GetUserByIdUseCase } from '@/domain/users/useCases/getUserById/GetUserByIdUseCase';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
  }

  const getUser = new GetUserByIdUseCase(userRepository);
  const user = await getUser.execute(id);

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

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

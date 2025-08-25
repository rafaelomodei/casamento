import { NextResponse } from 'next/server';
import { CreateUserUseCase } from '@/domain/users/useCases/createUser/CreateUserUseCase';
import { GetUserByPhoneUseCase } from '@/domain/users/useCases/getUserByPhone/GetUserByPhoneUseCase';
import { GetUserByIdUseCase } from '@/domain/users/useCases/getUserById/GetUserByIdUseCase';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');
  const id = searchParams.get('id');

  if (phone) {
    const getUser = new GetUserByPhoneUseCase(userRepository);
    const user = await getUser.execute(phone);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  }

  if (id) {
    const getUserById = new GetUserByIdUseCase(userRepository);
    const user = await getUserById.execute(id);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  }

  return NextResponse.json({ error: 'Parâmetro obrigatório' }, { status: 400 });
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as UserDTO;
    const createUser = new CreateUserUseCase(userRepository);
    const id = await createUser.execute(data);
    return NextResponse.json({ ...data, id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 }
    );
  }
}

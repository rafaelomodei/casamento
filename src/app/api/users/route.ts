import { NextResponse } from 'next/server';
import { CreateUserUseCase } from '@/domain/users/useCases/createUser/CreateUserUseCase';
import { GetUserByIdUseCase } from '@/domain/users/useCases/getUserById/GetUserByIdUseCase';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { UserDTO } from '@/domain/users/entities/UserDTO';
import { verifyIdToken } from '@/infra/repositories/firebase/admin';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    await verifyIdToken(token);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = await verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = (await req.json()) as UserDTO;
    const createUser = new CreateUserUseCase(userRepository);
    await createUser.execute({ ...data, id: decoded.uid });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 }
    );
  }
}

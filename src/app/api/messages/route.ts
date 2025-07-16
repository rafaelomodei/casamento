import { NextResponse } from 'next/server';
import { GetAllMessagesUseCase } from '@/domain/messages/useCases/getAllMessages/GetAllMessagesUseCase';
import { CreateMessageUseCase } from '@/domain/messages/useCases/createMessage/CreateMessageUseCase';
import { GetUserByIdUseCase } from '@/domain/users/useCases/getUserById/GetUserByIdUseCase';
import { messageRepository } from '@/infra/repositories/firebase/MessageServerFirebaseRepositories';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { adminAuth } from '@/infra/repositories/firebase/admin';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? Number(limitParam) : undefined;
  const getAllMessages = new GetAllMessagesUseCase(messageRepository);
  const messages = await getAllMessages.execute(limit);

  return NextResponse.json(messages, { status: 200 });
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
      decoded = await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = (await req.json()) as Omit<
      MessageDTO,
      'userId' | 'name' | 'avatar'
    >;
    const getUser = new GetUserByIdUseCase(userRepository);
    const user = await getUser.execute(decoded.uid);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const createMessage = new CreateMessageUseCase(messageRepository);
    await createMessage.execute({
      ...data,
      userId: decoded.uid,
      name: user.name,
      avatar: user.avatar,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

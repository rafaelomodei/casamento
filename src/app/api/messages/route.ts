import { NextResponse } from 'next/server';
import { GetAllMessagesUseCase } from '@/domain/messages/useCases/getAllMessages/GetAllMessagesUseCase';
import { CreateMessageUseCase } from '@/domain/messages/useCases/createMessage/CreateMessageUseCase';
import { messageRepository } from '@/infra/repositories/firebase/MessageServerFirebaseRepositories';
import { MessageDTO } from '@/domain/messages/entities/MessageDTO';

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
    const data = (await req.json()) as Omit<MessageDTO, 'createdAt'>;
    const createMessage = new CreateMessageUseCase(messageRepository);
    await createMessage.execute({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

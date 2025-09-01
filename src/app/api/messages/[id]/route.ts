import { NextResponse } from 'next/server';
import { UpdateMessageUseCase } from '@/domain/messages/useCases/updateMessage/UpdateMessageUseCase';
import { DeleteMessageUseCase } from '@/domain/messages/useCases/deleteMessage/DeleteMessageUseCase';
import { messageRepository } from '@/infra/repositories/firebase/MessageServerFirebaseRepositories';

interface Params {
  params: { id: string };
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { message, userId } = await req.json();
    const updateMessage = new UpdateMessageUseCase(messageRepository);
    await updateMessage.execute({ id: params.id, userId, message });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { userId } = await req.json();
    const deleteMessage = new DeleteMessageUseCase(messageRepository);
    await deleteMessage.execute({ id: params.id, userId });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

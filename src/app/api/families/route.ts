import { NextResponse } from 'next/server';
import { familyRepository } from '@/infra/repositories/firebase/FamilyServerFirebaseRepositories';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { CreateFamilyUseCase } from '@/domain/families/useCases/createFamily/CreateFamilyUseCase';

export async function POST(req: Request) {
  try {
    const { name, memberIds } = (await req.json()) as {
      name: string;
      memberIds: string[];
    };

    const createFamily = new CreateFamilyUseCase(
      familyRepository,
      userRepository,
    );
    const id = await createFamily.execute({ name, memberIds });

    return NextResponse.json({ id, name, memberIds }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

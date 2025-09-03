import { NextResponse } from 'next/server';
import { familyRepository } from '@/infra/repositories/firebase/FamilyServerFirebaseRepositories';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { CreateFamilyUseCase } from '@/domain/families/useCases/createFamily/CreateFamilyUseCase';
import { ListFamiliesUseCase } from '@/domain/families/useCases/listFamilies/ListFamiliesUseCase';
import { GetFamilyUseCase } from '@/domain/families/useCases/getFamily/GetFamilyUseCase';
import { UpdateFamilyUseCase } from '@/domain/families/useCases/updateFamily/UpdateFamilyUseCase';
import { DeleteFamilyUseCase } from '@/domain/families/useCases/deleteFamily/DeleteFamilyUseCase';

const ADMIN_PHONE = '45991156286';

function isAuthorized(req: Request) {
  const phone = req.headers.get('x-user-phone')?.replace(/\D/g, '');
  return phone === ADMIN_PHONE;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const getFamily = new GetFamilyUseCase(
        familyRepository,
        userRepository,
      );
      const family = await getFamily.execute(id);
      if (!family) {
        return NextResponse.json(
          { error: 'Família não encontrada' },
          { status: 404 },
        );
      }
      return NextResponse.json(family, { status: 200 });
    }

    const listFamilies = new ListFamiliesUseCase(
      familyRepository,
      userRepository,
    );
    const families = await listFamilies.execute();
    return NextResponse.json(families, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
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

export async function PUT(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    const { id, name, memberIds } = (await req.json()) as {
      id: string;
      name: string;
      memberIds: string[];
    };

    const updateFamily = new UpdateFamilyUseCase(
      familyRepository,
      userRepository,
    );
    await updateFamily.execute({ id, name, memberIds });

    return NextResponse.json({ id, name, memberIds }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    const deleteFamily = new DeleteFamilyUseCase(familyRepository);
    await deleteFamily.execute(id);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

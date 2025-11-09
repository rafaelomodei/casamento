import { NextResponse } from 'next/server';

import { adminAuth } from '@/infra/repositories/firebase/admin';

interface RequestBody {
  email?: string;
}

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as RequestBody;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'O e-mail é obrigatório.' },
        { status: 400 }
      );
    }

    const resetLink = await adminAuth.generatePasswordResetLink(email);

    return NextResponse.json({
      message:
        'Link de redefinição gerado com sucesso. Verifique sua caixa de entrada para continuar o processo.',
      resetLink,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Corpo da requisição inválido.' },
        { status: 400 }
      );
    }

    const err = error as { code?: string };

    if (err?.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'Não encontramos um usuário cadastrado com este e-mail.' },
        { status: 404 }
      );
    }

    if (err?.code === 'auth/invalid-email') {
      return NextResponse.json(
        { error: 'O e-mail informado é inválido.' },
        { status: 400 }
      );
    }

    console.error('Erro ao gerar link de redefinição de senha', error);

    return NextResponse.json(
      { error: 'Não foi possível gerar o link de redefinição de senha.' },
      { status: 500 }
    );
  }
}

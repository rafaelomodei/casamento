'use client';

import CommentCard from '@/components/CommentCard/CommentCard';
import CommentCardSkeleton from '@/components/CommentCard/CommentCardSkeleton';
import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { BRIDE_AND_GROOM } from '@/lib/constants';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import Modal from './components/Modal';
import { getRandomAvatar } from '@/lib/utlils/randomAvatar';

interface Message extends MessageDTO {
  avatarUrl: string;
  name: string;
}

export default function MensagensPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const { requireAuth, dialog } = useAuthRequired();
  const loginMessage =
    'Para deixar seu recado, você precisa estar logado.\nClique em Entrar ou crie sua conta em poucos segundos e volte aqui para compartilhar sua mensagem com Maria Eduarda & Rafael.';

  const getMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      const messagesData: Message[] = data.map((m: MessageDTO) => ({
        ...m,
        avatarUrl: getRandomAvatar('female'),
        name: 'Convidado',
      }));

      setMessages(messagesData);
    } catch (err) {
      console.error('Erro ao carregar as mensagens:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
    if (searchParams.get('modal')) {
      if (requireAuth(loginMessage)) {
        setOpen(true);
      }
    }
  }, [searchParams]);

  const blockquoteRender = () => {
    return (
      <header className='flex w-full flex-col gap-8'>
        <blockquote className='flex flex-col md:flex-row  gap-2 pl-6 border-l-4 border-primary bg-background-highlights p-4 rounded-md text-lg italic text-beige-800'>
          <p className='md:max-w-2xl'>
            “Oi, queridos convidados! Sua presença já é um presente, mas suas
            palavras vão ficar pra sempre em nossos corações. Clique no botão
            <a
              className='mx-2 cursor-pointer border-b border-primary/60'
              onClick={() => {
                if (
                  requireAuth(
                    'Para deixar seu recado, você precisa estar logado.\nClique em Entrar ou crie sua conta em poucos segundos e volte aqui para compartilhar sua mensagem com Maria Eduarda & Rafael.'
                  )
                )
                  setOpen(true);
              }}
            >
              Deixar uma mensagem
            </a>
            e compartilhe um recado para
            {` ${BRIDE_AND_GROOM}`}”
          </p>
          <Modal open={open} setOpen={setOpen} requireAuth={requireAuth} />
          {dialog}
        </blockquote>

        <h1 className='text-2xl md:text-3xl'>Mensagens</h1>
      </header>
    );
  };

  if (loading) {
    return (
      <main className='flex flex-col gap-4 p-4 min-h-screen w-full max-w-6xl'>
        <PageBreadcrumb />
        {blockquoteRender()}
        <div className='flex flex-wrap gap-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='flex w-full md:flex-1/3'>
              <CommentCardSkeleton />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (messages.length === 0) {
    return (
      <main className='flex flex-col gap-4 p-4 min-h-screen max-w-6xl'>
        <PageBreadcrumb />
        {blockquoteRender()}

        <p className='text-lg py-4'>
          Seja o primeiro a deixar uma mensagem para {BRIDE_AND_GROOM}.
        </p>
      </main>
    );
  }

  return (
    <main className='flex flex-col gap-4 p-4 min-h-screen max-w-6xl'>
      <PageBreadcrumb />
      {blockquoteRender()}
      <div className='flex flex-wrap gap-4'>
        {messages.map((msg) => (
          <div key={msg.id} className='flex w-full md:flex-1/3'>
            <CommentCard
              avatarUrl={msg.avatarUrl}
              name={msg.name}
              date={new Date(msg.date).toLocaleDateString('pt-BR')}
              message={msg.message}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

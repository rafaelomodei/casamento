'use client';

import { useEffect, useState } from 'react';
import CommentCard from '../CommentCard/CommentCard';
import CommentCardSkeleton from '../CommentCard/CommentCardSkeleton';
import Link from 'next/link';
import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { getRandomAvatar } from '@/lib/utlils/randomAvatar';

interface Message extends MessageDTO {
  avatarUrl: string;
  name: string;
}

export default function HomeMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch('/api/messages?limit=4');
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
    }
    fetchMessages();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className='flex flex-wrap gap-8'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='flex w-full md:flex-1/3'>
              <CommentCardSkeleton />
            </div>
          ))}
        </div>
      );
    }

    if (messages.length === 0) {
      return (
        <p className='text-lg py-4'>Seja o primeiro a deixar uma mensagem para o casal.</p>
      );
    }

    return (
      <div className='flex flex-wrap gap-8'>
        {messages.map((msg) => (
          <div key={msg.id} className='flex w-full md:flex-1/3'>
            <CommentCard
              avatarUrl={msg.avatarUrl}
              name={msg.name}
              date={new Date(msg.createdAt).toLocaleDateString('pt-BR')}
              message={msg.message}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className='flex flex-col w-full py-8'>
      <p className='text-2xl'>Mensagens</p>
      {renderContent()}
      <div className='flex flex-col sm:flex-row gap-2 w-full mt-4'>
        <Link
          href='/mensagens?modal=1'
          className=' text-primary border-primary border text-center rounded-sm text-lg py-2 p-4'
        >
          Deixar uma mensagem
        </Link>
        <Link
          href='/mensagens'
          className='bg-primary text-white text-center rounded-sm text-lg py-2 px-4'
        >
          Ver todas as mensagens
        </Link>
      </div>
    </section>
  );
}

'use client';

import CommentCard from '@/components/CommentCard/CommentCard';
import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { BRIDE_AND_GROOM } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function MensagensPage() {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMessages() {
      try {
        const res = await fetch('/api/messages');
        const data = await res.json();

        const messagesData: MessageDTO[] = data.map((m: MessageDTO) => ({
          ...m,
        }));

        setMessages(messagesData);
      } catch (err) {
        console.error('Erro ao carregar as mensagens:', err);
      } finally {
        setLoading(false);
      }
    }

    getMessages();
  }, []);

  return (
    <div className='flex flex-col gap-4 py-8'>
      <h1 className='text-2xl'>Mensagens</h1>
      {messages.length === 0 ? (
        <p className='py-4'>
          Seja o primeiro a deixar uma mensagem para {BRIDE_AND_GROOM}.
        </p>
      ) : (
        <div className='flex flex-wrap gap-4'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className='flex-1 min-w-[min(100%,20rem)] sm:max-w-[calc(50%-0.5rem)]'
            >
              <CommentCard
                avatarUrl={msg.avatarUrl}
                name={msg.name}
                date={new Date(msg.date).toLocaleDateString('pt-BR')}
                message={msg.message}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

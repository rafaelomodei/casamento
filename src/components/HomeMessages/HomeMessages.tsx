import CommentCard from '../CommentCard/CommentCard';
import Link from 'next/link';
import { BRIDE_AND_GROOM } from '@/lib/constants';
import { GetAllMessagesUseCase } from '@/domain/messages/useCases/getAllMessages/GetAllMessagesUseCase';
import { messageRepository } from '@/infra/repositories/firebase/MessageServerFirebaseRepositories';

export default async function HomeMessages() {
  const getAllMessages = new GetAllMessagesUseCase(messageRepository);
  const data = await getAllMessages.execute(4);
  const messages = data.map((m) => ({ ...m, avatarUrl: m.avatar }));

  return (
    <section className='flex flex-col w-full py-8'>
      <div className='text-center mb-16'>
        <div className='flex items-center justify-center gap-3 mb-6'>
          <h2 className='text-4xl md:text-5xl text-primary'>Mensagens</h2>
        </div>

        <div className='max-w-2xl mx-auto'>
          <p
            className='text-xl text-primary/70 mb-6'
            style={{ fontFamily: 'var(--font-arapey)', fontStyle: 'italic' }}
          >
            Nossa felicidade é ainda maior quando compartilhada! Te esperamos
            para celebrar com a gente!
          </p>

          <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
            <Link
              href='/mensagens?modal=1'
              className='flex w-full text-primary border-primary border text-center items-center justify-center rounded-sm text-lg py-2 p-4'
            >
              Deixar uma mensagem
            </Link>
            <Link
              href='/mensagens'
              className='flex w-full bg-primary text-white text-center  items-center justify-center rounded-sm text-lg py-2 px-4'
            >
              Ver todas as mensagens
            </Link>
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <p className='text-lg py-4 text-center'>
          Seja o primeiro a deixar uma mensagem para {BRIDE_AND_GROOM}.
        </p>
      ) : (
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
      )}
    </section>
  );
}

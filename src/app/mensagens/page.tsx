import CommentCard from '@/components/CommentCard/CommentCard'
import { MessageDTO } from '@/domain/messages/entities/MessageDTO'

async function getMessages(): Promise<MessageDTO[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/messages`, {
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    return []
  }

  return (await res.json()) as MessageDTO[]
}

export default async function MensagensPage() {
  const messages = await getMessages()

  return (
    <div className='flex flex-col gap-4 py-8'>
      <h1 className='text-2xl'>Mensagens</h1>
      {messages.length === 0 ? (
        <p className='py-4'>Seja o primeiro a deixar uma mensagem para Marie, Duarte e Rafael.</p>
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
  )
}

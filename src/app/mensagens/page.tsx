import CommentCard from '@/components/CommentCard/CommentCard'

const messages = [
  {
    avatarUrl: '/png/capa.png',
    name: 'Maria',
    date: '1 de Junho de 2024',
    message: 'Parabéns aos noivos! Que Deus abençoe essa união.',
  },
  {
    avatarUrl: '/png/capa.png',
    name: 'José',
    date: '10 de Junho de 2024',
    message: 'Estamos muito felizes por vocês. Felicidades!',
  },
  {
    avatarUrl: '/png/capa.png',
    name: 'Ana',
    date: '15 de Junho de 2024',
    message: 'Que este seja apenas o começo de uma linda história.',
  },
  {
    avatarUrl: '/png/capa.png',
    name: 'Carlos',
    date: '20 de Junho de 2024',
    message: 'Muitas bênçãos e amor para o casal!',
  },
]

export default function MensagensPage() {
  return (
    <div className='flex flex-col gap-4 py-8'>
      <h1 className='text-2xl'>Mensagens</h1>
      <div className='flex flex-wrap gap-4'>
        {messages.map((msg, index) => (
          <div key={index} className='flex-1 min-w-[min(100%,20rem)] sm:max-w-[calc(50%-0.5rem)]'>
            <CommentCard {...msg} />
          </div>
        ))}
      </div>
    </div>
  )
}

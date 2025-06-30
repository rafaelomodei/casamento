import Countdown from '@/components/Countdown/Countdown';
import Map from '@/components/Map/Map';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const weddingDate = new Date('September 27, 2025 16:00:00');

  return (
    <main className='min-h-screen flex flex-col py-8  px-4  text-primary'>
      <header className='flex h-screen'>
        <div className='flex flex-col w-full items-center justify-center'>
          <Image
            src={'/png/capa.png'}
            alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
            height={540}
            width={725}
          />
          <div className='flex flex-col items-center'>
            <p className='font-arapey text-2xl sm:text-5xl lg:text-6xl text-primary'>
              Maria Eduarda & Rafael Geovani
            </p>
            <p className='text-primary text-xl --font-body'>27 | SET | 2025</p>
            <Countdown targetDate={weddingDate} />
            <p className='text-primary text-xl'>27 | SET | 2025</p>
          </div>
        </div>
      </header>
      <section className='flex items-center justify-center'>
        <p className='text-center text-xl md:text-3xl'>
          Sejam bem-vindos ao nosso site!
        </p>
      </section>
      <section className='flex py-8 gap-12'>
        <div className='flex flex-col gap-4'>
          <p className='text-2xl'> Nossas história</p>
          <div className='md:hidden w-full max-w-container mx-auto mt-[1px]'>
            <Image
              src={'/png/preWedding/DSC03547.jpg'}
              alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
              className='rounded-md'
              height={540}
              width={725}
            />
          </div>
          <p>
            Nos conhecemos ainda jovens, nos corredores do colégio. Éramos
            apenas conhecidos de vista, com amigos em comum, mas nada que
            indicasse que, anos depois, estaríamos escrevendo nossa história
            juntos.
          </p>
          <p>
            Foi em uma noite comum — mas que se tornaria inesquecível — no dia 9
            de maio de 2015, durante uma pizza com os amigos, que tudo começou
            de verdade...
          </p>
          <Link
            href='nossas-hostoias/'
            className='bg-primary md:flex text-white text-center rounded-sm text-lg py-2'
          >
            Continuar lendo
          </Link>
        </div>
        <div className=' hidden  w-full max-w-container mx-auto mt-[1px]'>
          <Image
            src={'/png/preWedding/DSC03547.jpg'}
            alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
            className='rounded-md'
            height={360}
            width={400}
          />
        </div>
      </section>

      <section className='flex flex-col w-full py-8'>
        <p className='text-2xl'>Mensagens</p>
        Colocar aqui as mensagens...
        <div className='flex flex-col sm:flex-row gap-2 w-full mt-4'>
          <Link
            href='deixar-mensagem/'
            className=' text-primary border-primary border text-center rounded-sm text-lg py-2 p-4'
          >
            Deixar uma mensagem
          </Link>
          <Link
            href='mensagens/'
            className='bg-primary text-white text-center rounded-sm text-lg py-2 px-4'
          >
            Ver todas as mensagens
          </Link>
        </div>
      </section>

      <section className='flex flex-col w-full py-8'>
        <p className='text-2xl'>Cerimônia religiosa</p>
        Não percam esse momento lindo e emocionante das nossas vidas. Contamos
        com você para ser ainda mais especial.
        <Image
          src={'/png/capa.png'}
          alt='Igreja de Colorado - Paraná'
          className='rounded-md'
          height={360}
          width={400}
        />
        <p>Igreja de Colorado - Colorado, Paraná</p>
        <div className='flex flex-col sm:flex-row gap-2 w-full mt-4'>
          <Map query='Igreja de Colorado, Colorado - PR' label='Mapa da igreja' />
        </div>
      </section>

      <section className='flex flex-col w-full py-8'>
        <p className='text-2xl'>Festa</p>
        Nossa felicidade é ainda maior quando compatilhada! te esperamos para
        celebrar com a gente!
        <Image
          src={'/png/capa.png'}
          alt='Igreja de Colorado - Paraná'
          className='rounded-md'
          height={360}
          width={400}
        />
        <p>Pesqueiro São Luiz - Colorado, Paraná</p>
        <p>Colocar o horário também</p>
        <div className='flex flex-col sm:flex-row gap-2 w-full mt-4'>
          <Map query='Pesqueiro São Luiz, Colorado - PR' label='Mapa do pesqueiro' />
        </div>
      </section>
    </main>
  );
}

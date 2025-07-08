import CommentCard from '@/components/CommentCard/CommentCard';
import Countdown from '@/components/Countdown/Countdown';
import { ProductCard } from '@/components/ProductCard/ProductCard';

import { BRIDE_AND_GROOM } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const weddingDate = new Date('September 27, 2025 16:00:00');

  return (
    <main className='min-h-screen flex flex-col py-8  px-4  text-primary max-w-6xl'>
      <header className='flex h-screen'>
        <div className='flex flex-col w-full items-center justify-center'>
          <Image
            src={'/png/capa.png'}
            alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
            height={540}
            width={725}
          />
          <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-col items-center'>
              <p className='font-arapey text-2xl sm:text-5xl lg:text-6xl text-primary'>
                {BRIDE_AND_GROOM}
              </p>
              <p className='text-primary text-xl --font-body'>
                27 | SET | 2025
              </p>
            </div>
            <Countdown targetDate={weddingDate} />
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
            href='nossas-historias/'
            className='bg-primary md:flex text-white text-center rounded-sm text-lg py-2'
          >
            Continuar lendo
          </Link>
        </div>
        <div className=' hidden md:flex  w-full max-w-container mx-auto mt-[1px]'>
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
        <div className='flex  flex-wrap gap-8'>
          <CommentCard
            avatarUrl='https://instagram.fmgf12-1.fna.fbcdn.net/v/t51.2885-19/391204821_349662927437137_6887909049664376690_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fmgf12-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QHsS9OH0FohojeOP6q_5yvlnA1kiQt6uNnu22uZtuq41xrtLxsaYIlBtZpg3F7zVwc&_nc_ohc=bLCcF_hY-WQQ7kNvwFFuftV&_nc_gid=i1pliSPtVIGhQamS22O4mA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfP-yIydobyDFBaat6Rs-rDaaRao53MyjsddeTMSiMsneg&oe=68690B69&_nc_sid=7a9f4b'
            name='Thais Omodei'
            date='13/06/2025'
            message='Que cada amanhecer juntos seja um convite para novos sonhos e que cada pôr do sol celebre as conquistas que vocês construirão lado a lado. Que o respeito e a alegria sejam sempre o alicerce desse amor tão lindo. Estaremos vibrando com vocês em cada passo!'
          />

          <CommentCard
            avatarUrl='https://instagram.fmgf12-1.fna.fbcdn.net/v/t51.2885-19/391204821_349662927437137_6887909049664376690_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fmgf12-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QHsS9OH0FohojeOP6q_5yvlnA1kiQt6uNnu22uZtuq41xrtLxsaYIlBtZpg3F7zVwc&_nc_ohc=bLCcF_hY-WQQ7kNvwFFuftV&_nc_gid=i1pliSPtVIGhQamS22O4mA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfP-yIydobyDFBaat6Rs-rDaaRao53MyjsddeTMSiMsneg&oe=68690B69&_nc_sid=7a9f4b'
            name='Thais Omodei'
            date='13/06/2025'
            message='Que cada amanhecer juntos seja um convite para novos sonhos e que cada pôr do sol celebre as conquistas que vocês construirão lado a lado. Que o respeito e a alegria sejam sempre o alicerce desse amor tão lindo. Estaremos vibrando com vocês em cada passo!'
          />

          <CommentCard
            avatarUrl='https://instagram.fmgf12-1.fna.fbcdn.net/v/t51.2885-19/391204821_349662927437137_6887909049664376690_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fmgf12-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QHsS9OH0FohojeOP6q_5yvlnA1kiQt6uNnu22uZtuq41xrtLxsaYIlBtZpg3F7zVwc&_nc_ohc=bLCcF_hY-WQQ7kNvwFFuftV&_nc_gid=i1pliSPtVIGhQamS22O4mA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfP-yIydobyDFBaat6Rs-rDaaRao53MyjsddeTMSiMsneg&oe=68690B69&_nc_sid=7a9f4b'
            name='Thais Omodei'
            date='13/06/2025'
            message='Que cada amanhecer juntos seja um convite para novos sonhos e que cada pôr do sol celebre as conquistas que vocês construirão lado a lado. Que o respeito e a alegria sejam sempre o alicerce desse amor tão lindo. Estaremos vibrando com vocês em cada passo!'
          />
          <CommentCard
            avatarUrl='https://instagram.fmgf12-1.fna.fbcdn.net/v/t51.2885-19/391204821_349662927437137_6887909049664376690_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fmgf12-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QHsS9OH0FohojeOP6q_5yvlnA1kiQt6uNnu22uZtuq41xrtLxsaYIlBtZpg3F7zVwc&_nc_ohc=bLCcF_hY-WQQ7kNvwFFuftV&_nc_gid=i1pliSPtVIGhQamS22O4mA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfP-yIydobyDFBaat6Rs-rDaaRao53MyjsddeTMSiMsneg&oe=68690B69&_nc_sid=7a9f4b'
            name='Thais Omodei'
            date='13/06/2025'
            message='Que cada amanhecer juntos seja um convite para novos sonhos e que cada pôr do sol celebre as conquistas que vocês construirão lado a lado. Que o respeito e a alegria sejam sempre o alicerce desse amor tão lindo. Estaremos vibrando com vocês em cada passo!'
          />
        </div>
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
        <p className='text-2xl'>Cerimônia</p>
        <p>
          Não percam esse momento lindo e emocionante das nossas vidas. Contamos
          com você para ser ainda mais especial.
        </p>
        <div className='flex flex-col md:flex-row w-full gap-8 md:gap-12'>
          <div className='flex flex-col items-center text-center'>
            <Image
              src={'/png/capa.png'}
              alt='Igreja de Colorado - Paraná'
              className='rounded-md'
              height={360}
              width={400}
            />
            <p className='uppercase'>Paróquia Nossa Senhora Auxliadora</p>
            <p className='italic'>Praça Dom Bosco, s/n - Cnetro, Corodo - PR</p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <Image
              src={'/png/mapaIgreja.png'}
              alt='Igreja de Colorado - Paraná'
              className='rounded-md'
              height={360}
              width={400}
            />
            <p className='uppercase'>
              Clieque no mapa para redirecionar para GPS
            </p>
          </div>
        </div>
      </section>

      <section className='flex flex-col w-full py-8'>
        <p className='text-2xl'>Festa</p>
        Nossa felicidade é ainda maior quando compatilhada! te esperamos para
        celebrar com a gente!
        <Image
          src={'/png/mapaPesqueiro.png'}
          alt='Igreja de Colorado - Paraná'
          className='rounded-md'
          height={360}
          width={400}
        />
        <p>Pesqueiro São Luiz - Colorado Paraná</p>
        <p>Colocar o hário também</p>
      </section>

      <section className='flex flex-col w-full py-8'>
        <p className='text-2xl'>Presentes</p>
        <p>
          Queridos familiares e amigos, para nós, a presença de vocês neste dia
          tão especial é o maior presente que poderíamos receber. Mas, se vocês
          também quiserem nos presentear, ficaremos muito agradecidos. Com amor,
          {` ${BRIDE_AND_GROOM}`}.
        </p>
        <div className='flex flex-wrap gap-4'>
          <ProductCard
            slug='tv-smart'
            images={['/png/capa.png']}
            price={1600}
            title='Tv Smart'
          />
          <ProductCard
            slug='tv-smart'
            images={['/png/capa.png']}
            price={1600}
            title='Tv Smart'
          />
          <ProductCard
            slug='tv-smart'
            images={['/png/capa.png']}
            price={1600}
            title='Tv Smart'
          />
          <ProductCard
            slug='tv-smart'
            images={['/png/capa.png']}
            price={1600}
            title='Tv Smart'
          />
          <ProductCard
            slug='tv-smart'
            images={['/png/products/roboAspiradorXiame.png']}
            price={1600}
            title='Xiaomi Robot Vacuum X20'
          />
          <ProductCard
            slug='tv-smart'
            images={['/png/products/tvSmart.png']}
            price={1600}
            title='Tv Smart'
          />
        </div>
      </section>
      <section className='flex flex-col w-full py-8'>
        <p className='text-2xl'>Dicas</p>
        <div className='flex gap-8'>
          <p className='text-lg'>Padrinos</p>
          <p className='text-lg'>Madrinhas</p>
        </div>
      </section>
    </main>
  );
}

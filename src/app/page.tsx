import Countdown from '@/components/Countdown/Countdown';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import HomeMessages from '@/components/HomeMessages/HomeMessages';

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
            href='/nossas-hostoias'
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

      <HomeMessages />

      <section id='cerimonia' className='flex flex-col w-full py-8'>
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

      <section id='festa' className='flex flex-col w-full py-8'>
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
      <section className='flex flex-col w-full py-8 gap-8'>
        <p className='text-2xl'>Dicas</p>

        {/* Madrinhas */}
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col gap-4 md:w-1/2'>
            <h2 className='text-xl font-semibold'>Madrinhas</h2>
            <h3 className='italic'>Sintam-se lindas e cheias de charme</h3>

            <div className='flex flex-col gap-2'>
              <p className='font-semibold'>Guia de Estilo</p>
              <ul className='list-disc list-inside'>
                <li>Comprimento: longo (até o calcanhar)</li>
                <li>Tecidos: fluidos, sem pedrarias nem brilhos</li>
              </ul>

              <p className='font-semibold mt-2'>Paleta de cores</p>
              <ul className='flex flex-col sm:flex-row gap-2'>
                <li>💗 Fúcsia vibrante</li>
                <li>💗 Rosa médio</li>
                <li>💗 Rosa claro</li>
              </ul>

              <p className='font-semibold mt-2'>Cores proibidas</p>
              <ul className='list-disc list-inside'>
                <li>✕ Branco puro ou off-white</li>
                <li>
                  ✕ Tons de bege, creme ou nude (reservados aos convidados)
                </li>
              </ul>

              <p className='font-semibold mt-4'>Dicas de Comportamento</p>
              <ul className='list-disc list-inside'>
                <li>⏰ Chegue com antecedência</li>
                <li>📷 Evite ficar no corredor durante a cerimônia</li>
                <li>🎉 Aproveite cada momento (sem atrapalhar fotógrafos)</li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col gap-2 md:w-1/2'>
            <p className='font-semibold'>Inspire-se</p>
            <ImageCarousel
              images={[
                '/png/preWedding/DSC03183.jpg',
                '/png/preWedding/DSC03184.jpg',
                '/png/preWedding/DSC03190.jpg',
                '/png/preWedding/DSC03198.jpg',
              ]}
              alt='Referências para madrinhas'
              className='h-64 w-full'
              showIndicators
            />
          </div>
        </div>

        {/* Padrinhos */}
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col gap-4 md:w-1/2'>
            <h2 className='text-xl font-semibold'>Padrinhos</h2>
            <h3 className='italic'>Elegância é a nossa palavra-chave</h3>

            <div className='flex flex-col gap-2'>
              <p className='font-semibold'>Guia de Traje</p>
              <ul className='list-disc list-inside'>
                <li>Terno: cinza chumbo (corte slim ou reto)</li>
                <li>Camisa: branca, sem estampas</li>
                <li>Gravata: prata suave</li>
                <li>Sapato: social preto, bem lustrado</li>
              </ul>

              <p className='font-semibold mt-2'>Paleta de Cores</p>
              <ul className='flex flex-col sm:flex-row gap-2'>
                <li>🔷 Cinza chumbo</li>
                <li>🔷 Branco</li>
                <li>🔷 Prata</li>
              </ul>

              <p className='font-semibold mt-4'>Dicas de Comportamento</p>
              <ul className='list-disc list-inside'>
                <li>⏰ Esteja pronto 15 min antes</li>
                <li>📷 Dê espaço ao fotógrafo</li>
                <li>🎉 Curta o momento junto aos noivos</li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col gap-2 md:w-1/2'>
            <p className='font-semibold'>Inspire-se</p>
            <ImageCarousel
              images={[
                '/png/preWedding/DSC03208.jpg',
                '/png/preWedding/DSC03211.jpg',
                '/png/preWedding/DSC03225.jpg',
              ]}
              alt='Referências para padrinhos'
              className='h-64 w-full'
              showIndicators
            />
          </div>
        </div>

        {/* Convidados */}
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col gap-4 md:w-1/2'>
            <h2 className='text-xl font-semibold'>Convidados</h2>
            <h3 className='italic'>
              Seja parte dessa festa com elegância e bom senso
            </h3>

            <div className='flex flex-col gap-2'>
              <p className='font-semibold'>Guia de Vestimenta</p>
              <ul className='list-disc list-inside'>
                <li>Homens: terno escuro ou social; camisa clara</li>
                <li>
                  Mulheres: vestidos ou terninhos em tons pastel ou escuros
                </li>
              </ul>

              <p className='font-semibold mt-2'>Cores proibidas</p>
              <ul className='list-disc list-inside'>
                <li>⚪ Branco puro / off-white / bege / nude</li>
              </ul>

              <p className='font-semibold mt-4'>Dicas de Comportamento</p>
              <ul className='list-disc list-inside'>
                <li>⏰ Respeite os horários de chegada</li>
                <li>📷 Não use flash nem fique no corredor</li>
                <li>🤫 Mantenha o celular no silencioso</li>
                <li>🥂 Brinde e divirta-se com educação</li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col gap-2 md:w-1/2'>
            <p className='font-semibold'>Inspire-se</p>
            <ImageCarousel
              images={[
                '/png/preWedding/DSC03232.jpg',
                '/png/preWedding/DSC03238.jpg',
                '/png/preWedding/DSC03250.jpg',
                '/png/preWedding/DSC03264.jpg',
              ]}
              alt='Referências para convidados'
              className='h-64 w-full'
              showIndicators
            />
          </div>
        </div>
      </section>
    </main>
  );
}

import Countdown from '@/components/Countdown/Countdown';
import HomeProducts from '@/components/HomeProducts/HomeProducts';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import HomeMessages from '@/components/HomeMessages/HomeMessages';

import { BRIDE_AND_GROOM } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Church,
  Beer,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
  Users,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const weddingDate = new Date('September 27, 2025 16:00:00');

  return (
    <main className='min-h-screen flex flex-col py-8  px-4  text-primary max-w-7xl'>
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
            href='/nossas-historias'
            className='bg-primary text-white text-center rounded-sm text-lg py-2'
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
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <h2
              className='text-4xl md:text-5xl text-primary'
              style={{ fontFamily: 'var(--font-arapey)' }}
            >
              Festa
            </h2>
          </div>

          <div className='max-w-2xl mx-auto'>
            <p
              className='text-xl text-primary/70 mb-6'
              style={{ fontFamily: 'var(--font-arapey)', fontStyle: 'italic' }}
            >
              Nossa felicidade é ainda maior quando compatilhada! te esperamos
              para celebrar com a gente!
            </p>

            <div className='flex items-center justify-center gap-8'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Clock className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Pontualidade
                </span>
              </div>
              <Separator orientation='vertical' className='h-4' />
              <div className='flex items-center gap-2 text-muted-foreground'>
                <MapPin className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Localização
                </span>
              </div>
              <Separator orientation='vertical' className='h-4' />
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Heart className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Celebração
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-full'>
          <Card className='overflow-hidden shadow-none watercolor-texture border-none pt-8 w-full'>
            <CardContent className='space-y-8'>
              <div className='flex flex-col w-full items-center lg:flex-row gap-8'>
                {/* Informações do Local */}
                <div className='flex flex-col gap-8 w-full'>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-3xl md:text-4xl text-primary font-normal'>
                        Paróquia Nossa Senhora Auxliadora
                      </p>

                      <p className='text-lg text-primary/70 italic'>
                        Colorado - Paraná
                      </p>
                    </div>

                    <div className='flex items-center gap-2'>
                      <div className='w-1 h-6 bg-secondary rounded-full'></div>
                      <h4 className='text-xl text-primary'>Endereço</h4>
                    </div>

                    <div className='bg-white/60 rounded-xl p-6 space-y-3'>
                      <div className='flex items-start gap-3'>
                        <MapPin className='w-5 h-5 text-secondary mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='text-primary leading-relaxed'>
                            <strong>Praça Dom Bosco, s/n</strong>
                            <br />
                            Centro, Colorado - PR
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-1 h-6 bg-secondary rounded-full'></div>
                      <h4 className='text-xl text-primary'>Como Chegar</h4>
                    </div>

                    <Button className='w-full bg-secondary hover:bg-secondary/90 text-white  text-lg rounded-xl h-12'>
                      <Navigation className='w-5 h-5 mr-2' />
                      Abrir no GPS / Google Maps
                    </Button>

                    <p className='text-sm text-muted-foreground text-center'>
                      Clique para obter direções e navegação
                    </p>
                  </div>
                </div>

                {/* Mapa/Imagem da Igreja */}
                <div className='w-sm md:w-xl lg:w-5xl'>
                  <div className='relative group cursor-pointer'>
                    <div className='aspect-[4/3] rounded-2xl overflow-hidden bg-muted elegant-shadow'>
                      {/* Usando uma imagem placeholder de uma igreja */}
                      <Image
                        src={'/png/mapaIgreja.png'}
                        alt='Igreja Nossa Senhora Auxiliadora - Colorado PR'
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        height={360}
                        width={520}
                      />

                      {/* Overlay com ícone de mapa */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <div className='bg-white/90 rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                          <MapPin className='w-8 h-8 text-primary' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className='text-center text-sm text-muted-foreground'>
                    Clique na imagem para abrir o mapa
                  </p>
                </div>
              </div>

              <Separator className='my-8' />

              {/* Informações Adicionais */}
              <div className='rounded-2xl p-6'>
                <div className='text-center space-y-4 text-primary'>
                  <div className='flex items-center justify-center gap-2 mb-4'>
                    <Heart className='w-5 h-5 text-secondary' />
                    <h4 className='text-3xl'>Informações Importantes</h4>
                    <Heart className='w-5 h-5  text-secondary' />
                  </div>

                  <div className='flex w-full justify-center gap-8'>
                    <div className='flex items-center gap-2 justify-center'>
                      <Clock className='w-4 h-4  text-secondary' />
                      <span className='text-xl underline'>
                        Chegada: 30 minutos antes na Cerimônia religiosa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className='my-8' />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id='recepção' className='flex flex-col w-full py-8'>
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <h2
              className='text-4xl md:text-5xl text-primary'
              style={{ fontFamily: 'var(--font-arapey)' }}
            >
              Recepção
            </h2>
          </div>

          <div className='max-w-2xl mx-auto'>
            <p
              className='text-xl text-primary/70 mb-6'
              style={{ fontFamily: 'var(--font-arapey)', fontStyle: 'italic' }}
            >
              Não percam esse momento lindo e emocionante das nossas vidas.
              Contamos com você para ser ainda mais especial.
            </p>

            <div className='flex items-center justify-center gap-8'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Clock className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Horário
                </span>
              </div>
              <Separator orientation='vertical' className='h-4' />
              <div className='flex items-center gap-2 text-muted-foreground'>
                <MapPin className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Localização
                </span>
              </div>
              <Separator orientation='vertical' className='h-4' />
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Beer className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Celebração
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-full'>
          <Card className='overflow-hidden shadow-none watercolor-texture border-none pt-8 w-full'>
            <CardContent className='space-y-8'>
              <div className='flex flex-col w-full items-center lg:flex-row gap-8'>
                {/* Informações do Local */}
                <div className='flex flex-col gap-8 w-full'>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-3xl md:text-4xl text-primary font-normal'>
                        Pesqueiro São Luiz
                      </p>

                      <p className='text-lg text-primary/70 italic'>
                        Colorado - Paraná
                      </p>
                    </div>

                    <div className='flex items-center gap-2'>
                      <div className='w-1 h-6 bg-secondary rounded-full'></div>
                      <h4 className='text-xl text-primary'>Endereço</h4>
                    </div>

                    <div className='bg-white/60 rounded-xl p-6 space-y-3'>
                      <div className='flex items-start gap-3'>
                        <MapPin className='w-5 h-5 text-secondary mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='text-primary leading-relaxed'>
                            <strong>Pesqueiro São Luiz</strong>
                            <br />
                            Saída para Santo Inácio, entrada próximo do post
                            policial
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-1 h-6 bg-secondary rounded-full'></div>
                      <h4 className='text-xl text-primary'>Como Chegar</h4>
                    </div>

                    <Button className='w-full bg-secondary hover:bg-secondary/90 text-white  text-lg rounded-xl h-12'>
                      <Navigation className='w-5 h-5 mr-2' />
                      Abrir no GPS / Google Maps
                    </Button>

                    <p className='text-sm text-muted-foreground text-center'>
                      Clique para obter direções e navegação
                    </p>
                  </div>
                </div>

                {/* Mapa/Imagem da Igreja */}
                <div className='w-sm md:w-xl lg:w-5xl'>
                  <div className='relative group cursor-pointer'>
                    <div className='aspect-[4/3] rounded-2xl overflow-hidden bg-muted elegant-shadow'>
                      {/* Usando uma imagem placeholder de uma igreja */}
                      <Image
                        src={'/png/mapaIgreja.png'}
                        alt='Igreja Nossa Senhora Auxiliadora - Colorado PR'
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        height={360}
                        width={520}
                      />

                      {/* Overlay com ícone de mapa */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <div className='bg-white/90 rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                          <MapPin className='w-8 h-8 text-primary' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className='text-center text-sm text-muted-foreground'>
                    Clique na imagem para abrir o mapa
                  </p>
                </div>
              </div>

              <Separator className='my-8' />
            </CardContent>
          </Card>
        </div>
      </section>

      <HomeProducts />
      <section className='flex flex-col w-full py-8 gap-8'>
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <Heart className='w-8 h-8 text-secondary fill-current' />
            <h2
              className='text-5xl md:text-6xl text-primary'
              style={{ fontFamily: 'var(--font-arapey)' }}
            >
              Guia dos Convidados
            </h2>
            <Heart className='w-8 h-8 text-secondary fill-current' />
          </div>

          <div className='max-w-2xl mx-auto'>
            <p
              className='text-xl text-primary/70 mb-6'
              style={{
                fontFamily: 'var(--font-arapey)',
                fontStyle: 'italic',
              }}
            >
              Tudo o que vocês precisam saber para tornar nossa celebração ainda
              mais especial
            </p>

            <div className='flex items-center justify-center gap-8'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Sparkles className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Dicas de Estilo
                </span>
              </div>
              <Separator orientation='vertical' className='h-4' />
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Users className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Etiqueta
                </span>
              </div>
              <Separator orientation='vertical' className='h-4' />
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Heart className='w-4 h-4' />
                <span
                  className='text-sm'
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Inspirações
                </span>
              </div>
            </div>
          </div>
        </div>

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

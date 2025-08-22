import Countdown from '@/components/Countdown/Countdown';
import HomeProducts from '@/components/HomeProducts/HomeProducts';
import HomeMessages from '@/components/HomeMessages/HomeMessages';

import { BRIDE_AND_GROOM } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Heart,
  MapPin,
  Sparkles,
  Users,
  Mars,
  Venus,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import OpenInMapsButton from '@/components/OpenInMapsButton/OpenInMapsButton';
import OpenInMapsImage from '@/components/OpenInMapsImage/OpenInMapsImage';
import StoryPreview from '@/components/StoryPreview/StoryPreview';

export default function Home() {
  const weddingDate = new Date('September 27, 2025 16:00:00');

  const churchCoords = { lat: -22.8382072, lng: -51.9733284 };
  const receptionCoords = { lat: -22.8082686, lng: -51.9427835 };
  return (
    <main className='min-h-screen flex flex-col py-8  px-4  text-primary max-w-7xl'>
      <header className='flex h-screen'>
        <div className='flex flex-col w-full items-center justify-center'>
          <Image
            src={'/png/capa.png'}
            alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
            height={540}
            width={320}
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
              width={343}
            />
          </div>

          <StoryPreview />
          <Link
            href='/nossas-historias'
            className='bg-primary text-white text-center rounded-sm text-lg py-2'
          >
            Continuar lendo
          </Link>
        </div>
        <div className=' hidden md:flex max-w-container mx-auto mt-[1px]  '>
          <Image
            src={'/png/preWedding/DSC03547.jpg'}
            alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
            className='rounded-2xl w-[768px] h-[380px] object-cover'
            height={480}
            width={480}
          />
        </div>
      </section>
      <Separator orientation='horizontal' className='h-4' />

      <HomeMessages />
      <Separator orientation='horizontal' className='h-4' />

      <section id='cerimonia' className='flex flex-col w-full py-8'>
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <h2 className='text-4xl md:text-5xl text-primary'>Festa</h2>
          </div>

          <div className='max-w-2xl mx-auto'>
            <p
              className='text-xl text-primary/70 mb-6'
              style={{ fontFamily: 'var(--font-arapey)', fontStyle: 'italic' }}
            >
              Nossa felicidade é ainda maior quando compatilhada! te esperamos
              para celebrar com a gente!
            </p>

            <div className='flex flex-wrap items-center justify-center gap-2'>
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
            <CardContent className='flex flex-col w-full gap-8 p-0'>
              <div className='flex flex-col w-full items-center lg:flex-row gap-8'>
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

                    <OpenInMapsButton
                      className='w-full bg-secondary hover:bg-secondary/90 text-white text-lg rounded-xl h-12'
                      lat={churchCoords.lat}
                      lng={churchCoords.lng}
                    />

                    <p className='text-sm text-muted-foreground text-center'>
                      Clique para obter direções e navegação
                    </p>
                  </div>
                </div>

                <div className='w-xs md:w-xl lg:w-5xl'>
                  <OpenInMapsImage
                    lat={churchCoords.lat}
                    lng={churchCoords.lng}
                    src='/png/mapaIgreja.png'
                    alt='Igreja Nossa Senhora Auxiliadora - Colorado PR'
                    containerClassName='w-xs md:w-xl lg:w-xl cursor-pointer '
                    overlay={<MapPin className='w-8 h-8 text-primary' />}
                  />

                  <p className='text-center text-sm text-muted-foreground'>
                    Clique na imagem para abrir o mapa
                  </p>
                </div>
              </div>

              <Separator className='my-8' />
              <div className='rounded-2xl p-6'>
                <div className='text-center space-y-4 text-primary'>
                  <div className='flex items-center justify-center gap-2 mb-4'>
                    <Heart className='w-10 h-10 md:w-5 md:h-5 text-secondary' />
                    <h4 className='text-3xl'>Informações Importantes</h4>
                    <Heart className='w-10 h-10 md:w-5 md:h-5  text-secondary' />
                  </div>

                  <div className='flex w-full justify-center gap-8'>
                    <div className='flex items-center gap-2 justify-center'>
                      <Clock className='w-10 h-10 md:w-4 md:h-4   text-secondary' />
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
            <h2 className='text-4xl md:text-5xl text-primary'>Recepção</h2>
          </div>

          <div className='max-w-2xl mx-auto'>
            <p
              className='text-xl text-primary/70 mb-6'
              style={{ fontFamily: 'var(--font-arapey)', fontStyle: 'italic' }}
            >
              Não percam esse momento lindo e emocionante das nossas vidas.
              Contamos com você para ser ainda mais especial.
            </p>

            <div className='flex flex-wrap items-center justify-center gap-2'>
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
            <CardContent className='flex flex-col w-full gap-8 p-0'>
              <div className='flex flex-col w-full items-center lg:flex-row gap-8'>
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

                    <OpenInMapsButton
                      className='w-full bg-secondary hover:bg-secondary/90 text-white text-lg rounded-xl h-12'
                      lat={receptionCoords.lat}
                      lng={receptionCoords.lng}
                    />
                    <p className='text-sm text-muted-foreground text-center'>
                      Clique para obter direções e navegação
                    </p>
                  </div>
                </div>

                <div className='w-xs md:w-xl lg:w-5xl'>
                  <OpenInMapsImage
                    lat={receptionCoords.lat}
                    lng={receptionCoords.lng}
                    src='/png/mapaIgreja.png'
                    alt='Local da recepção, pesqueiro são luiz - Colorado PR'
                    containerClassName='w-xs md:w-xl lg:w-xl cursor-pointer'
                    overlay={<MapPin className='w-8 h-8 text-primary' />}
                  />

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

      <Separator className='my-8' />

      <section className='flex flex-col w-full py-8 gap-8'>
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <Heart className='w-8 h-8 text-secondary fill-current' />
            <h2
              className='text-5xl md:text-6xl text-primary'
              style={{ fontFamily: 'var(--font-arapey)' }}
            >
              Guia
            </h2>
            <Heart className='w-8 h-8 text-secondary fill-current' />
          </div>

          <div className='max-w-2xl mx-auto'>
            <p
              className='text-xl text-primary/70 mb-6'
              style={{ fontFamily: 'var(--font-arapey)', fontStyle: 'italic' }}
            >
              Tudo o que vocês precisam saber para tornar nossa celebração ainda
              mais especial
            </p>

            <div className='flex flex-wrap items-center justify-center gap-2'>
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

        <div className='flex w-full'>
          <Card className='overflow-hidden shadow-none watercolor-texture border-none pt-8 w-full'>
            <CardContent className='flex flex-col w-full gap-8 p-0'>
              <div className='flex flex-col w-full items-center lg:flex-row gap-8'>
                <div className='flex flex-col gap-8 w-full'>
                  <div className='space-y-4'>
                    <div>
                      <Venus className='w-8 h-8 text-secondary' />
                      <p className='text-3xl md:text-4xl text-primary font-normal'>
                        Madrinhas
                      </p>

                      <p className='text-lg text-primary/70 italic'>
                        Sintam-se lindas e cheias de charme
                      </p>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Guia de Estilo
                        </h4>
                      </div>

                      <div className='flex flex-col text-lg'>
                        <p>👗 Comprimento: longo (até o calcanhar)</p>
                        <p>✨ Tecidos: fluidos, sem pedrarias nem brilhos</p>
                        <p>💫 Corte: elegante e clássico</p>
                        <p>💍 Acessórios: delicados e discretos</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Paleta de Cores
                        </h4>
                      </div>

                      <div className='flex flex-col pl-4 text-lg'>
                        <p>Rosa</p>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-red-700 rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Cores que devem ser evitadas
                        </h4>
                      </div>

                      <div className='flex flex-col pl-4 text-lg'>
                        <p>❌ Branco puro ou off-white</p>
                        <p>❌ Off-white</p>
                        <p>❌ Tons de bege</p>
                        <p>❌ Creme</p>
                        <p>❌ Nude</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Dicas de Comportamento
                        </h4>
                      </div>

                      <div className='flex flex-col pl-4 text-lg'>
                        <p>⏰ Chegue com antecedência para fotos especiais</p>
                        <p>📷 Evite ficar no corredor durante a cerimônia</p>
                        <p>
                          🎉 Aproveite cada momento (sem atrapalhar fotógrafos)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-xs md:w-xl lg:w-5xl'>
                  <div className='relative group cursor-pointer'>
                    <div className='flex flex-col w-full items-center justify-center mb-4'>
                      <div className='flex gap-2'>
                        <Sparkles className='w-5 h-5 text-secondary' />
                        <h4
                          className='text-lg text-secondary'
                          style={{ fontFamily: 'var(--font-title)' }}
                        >
                          Inspire-se
                        </h4>
                        <Sparkles className='w-5 h-5 text-secondary' />
                      </div>
                      <p className='text-primary'>
                        Looks inspiradores para o grande dia
                      </p>
                    </div>

                    <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted elegant-shadow'>
                      <Image
                        src={'/png/example/madrinhas.png'}
                        alt='Exemplo de cor e modeo de vestido que as madrinhas devem ir'
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className='my-8' />
            </CardContent>
          </Card>
        </div>

        <div className='flex w-full'>
          <Card className='overflow-hidden shadow-none watercolor-texture border-none pt-8 w-full'>
            <CardContent className='flex flex-col w-full gap-8 p-0'>
              <div className='flex flex-col w-full items-center lg:flex-row gap-8'>
                <div className='flex flex-col gap-8 w-full'>
                  <div className='space-y-4'>
                    <div>
                      <Mars className='w-8 h-8 text-secondary' />
                      <p className='text-3xl md:text-4xl text-primary font-normal'>
                        Padrinhos
                      </p>

                      <p className='text-lg text-primary/70 italic'>
                        Elegância é a palavra-chave
                      </p>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>Guia de Traje</h4>
                      </div>

                      <div className='flex flex-col text-lg'>
                        <p>🤵 Terno: cinza chumbo (corte slim ou reto)</p>
                        <p>👔 Camisa: branca, sem estampas</p>
                        <p>👔 Gravata: prata suave ou tom sobre tom</p>
                        <p>👞 Sapato: social preto, bem lustrado</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Paleta de Cores
                        </h4>
                      </div>

                      <div className='flex flex-col pl-4 text-lg'>
                        <p> Cinza chumbo</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Dicas de Comportamento
                        </h4>
                      </div>

                      <div className='flex flex-col pl-4 text-lg'>
                        <p>⏰ Chegue com antecedência </p>
                        <p>📷 Dê espaço aos fotógrafos durante as fotos</p>
                        <p>🎉 Curta o momento junto aos noivos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-xs md:w-xl lg:w-5xl'>
                  <div className='relative group cursor-pointer'>
                    <div className='flex flex-col w-full items-center justify-center mb-4'>
                      <div className='flex gap-2'>
                        <Sparkles className='w-5 h-5 text-secondary' />
                        <h4
                          className='text-lg text-secondary'
                          style={{ fontFamily: 'var(--font-title)' }}
                        >
                          Inspire-se
                        </h4>
                        <Sparkles className='w-5 h-5 text-secondary' />
                      </div>
                      <p className='text-primary'>
                        Looks inspiradores para o grande dia
                      </p>
                    </div>

                    <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted elegant-shadow'>
                      <Image
                        src={'/png/example/padrinhos.png'}
                        alt='Exemplo de cor e modeo de terno que os padrinhos devem ir'
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className='my-8' />
            </CardContent>
          </Card>
        </div>

        <div className='flex w-full'>
          <Card className='overflow-hidden shadow-none watercolor-texture border-none pt-8 w-full'>
            <CardContent className='flex flex-col w-full gap-8 p-0'>
              <div className='flex flex-col w-full items-center lg:flex-row gap-8'>
                <div className='flex flex-col gap-8 w-full'>
                  <div className='space-y-4'>
                    <div>
                      <Users className='w-8 h-8 text-secondary' />
                      <p className='text-3xl md:text-4xl text-primary font-normal'>
                        Convidados
                      </p>

                      <p className='text-lg text-primary/70 italic'>
                        Sejam parte desta festa com elegância e bom senso
                      </p>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>Guia de Traje</h4>
                      </div>

                      <div className='flex flex-col text-lg'>
                        <p>🤵 Traje social</p>
                        <p>
                          👗 Mulheres: vestidos ou terninhos em tons pastel ou
                          escuros
                        </p>
                        <p>👠 Sapatos: confortáveis para dançar</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Paleta de Cores
                        </h4>
                      </div>

                      <div className='flex flex-col pl-4 text-lg'>
                        <p> Cinza chumbo</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 bg-secondary rounded-full'></div>
                        <h4 className='text-2xl text-primary'>
                          Dicas de Comportamento
                        </h4>
                      </div>

                      <div className='flex flex-col pl-4 text-lg'>
                        <p>⏰ Respeitem os horários de chegada</p>
                        <p>
                          📷 Não usem flash nem fiquem no corredor durante a
                          cerimônia
                        </p>
                        <p>🤫 Mantenham o celular no silencioso</p>
                        <p>🥂 Brindem e divirtam-se com educação</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-xs md:w-xl lg:w-5xl'>
                  <div className='relative group cursor-pointer'>
                    <div className='flex flex-col w-full items-center justify-center mb-4'>
                      <div className='flex gap-2'>
                        <Sparkles className='w-5 h-5 text-secondary' />
                        <h4
                          className='text-lg text-secondary'
                          style={{ fontFamily: 'var(--font-title)' }}
                        >
                          Inspire-se
                        </h4>
                        <Sparkles className='w-5 h-5 text-secondary' />
                      </div>
                      <p className='text-primary'>
                        Looks inspiradores para o grande dia
                      </p>
                    </div>

                    <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted elegant-shadow'>
                      <Image
                        src={'/png/mapaIgreja.png'}
                        alt='Igreja Nossa Senhora Auxiliadora - Colorado PR'
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        fill
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <div className='bg-white/90 rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                          <MapPin className='w-8 h-8 text-primary' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className='my-8' />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

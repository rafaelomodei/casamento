import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import {
  Car,
  Coffee,
  Heart,
  MapPin,
  Phone,
  Snowflake,
  Star,
  Tv,
  Wifi,
  ExternalLink,
  MessageCircle,
  Users,
  Smartphone,
  Bus,
  Plane,
  Info,
} from 'lucide-react';
import { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Hotel {
  id: string;
  nome: string;
  categoria: string;
  preco: string;
  imagens: string[];
  endereco: string;
  telefone: string;
  site?: string;
  descricaoNoivos: string;
  caracteristicas: string[];
  comodidades: {
    icon: JSX.Element;
    nome: string;
    disponivel: boolean;
  }[];
  detalhes: string[];
}

const hoteis: Hotel[] = [
  {
    id: 'bandeirantes',
    nome: 'Hotel Bandeirantes',
    categoria: 'Opção Tradicional',
    preco: 'Valores acessíveis',
    imagens: [
      '/png/hotel/bandeirantes_01.jpg',
      '/png/hotel/bandeirantes_02.jpg',
      '/png/hotel/bandeirantes_03.jpg',
      '/png/hotel/bandeirantes_04.jpg',
      '/png/hotel/bandeirantes_05.jpg',
      '/png/hotel/bandeirantes_06.jpg',
      '/png/hotel/bandeirantes_07.jpg',
      '/png/hotel/bandeirantes_08.jpg',
    ],
    endereco: 'R. São Paulo, 380 - Centro, Colorado - PR, 86690-000',
    telefone: '(44) 3323-1525',
    descricaoNoivos:
      'O Hotel Bandeirantes possui uma estrutura mais tradicional. Muitos quartos passaram por adaptações recentes e oferecem ótimo conforto. É uma opção boa localizada no centro da cidade.',
    caracteristicas: [
      'Estrutura tradicional com melhorias',
      'Muitos quartos reformados',
      'Boa relação custo-benefício',
      'Localização central',
    ],
    comodidades: [
      {
        icon: <Snowflake className='text-secondary' />,
        nome: 'Ar-condicionado',
        disponivel: true,
      },
      { icon: <Tv className='text-secondary' />, nome: 'TV', disponivel: true },
      {
        icon: <Coffee className='text-secondary' />,
        nome: 'Frigobar',
        disponivel: true,
      },
      {
        icon: <Wifi className='text-secondary' />,
        nome: 'Wi-Fi',
        disponivel: true,
      },
      {
        icon: <Car className='text-secondary' />,
        nome: 'Estacionamento',
        disponivel: true,
      },
    ],
    detalhes: [
      'Quartos com camas novas',
      'Frigobar e TV',
      'Ar-condicionado disponível',
    ],
  },
  {
    id: 'sevilha',
    nome: 'Sevilha Park Hotel',
    categoria: 'Opção Tradicional Plus',
    preco: 'Valores superiores',
    site: 'https://pwa.fabapp.com/colorado_digital/editor/28202334',
    imagens: [
      '/png/hotel/sivilha_01.jpg',
      '/png/hotel/sivilha_02.jpg',
      '/png/hotel/sivilha_03.jpg',
      '/png/hotel/sivilha_04.jpg',
      '/png/hotel/sivilha_05.jpg',
      '/png/hotel/sivilha_06.jpg',
      '/png/hotel/sivilha_07.jpg',
      '/png/hotel/sivilha_08.jpg',
      '/png/hotel/sivilha_09.jpg',
      '/png/hotel/sivilha_10.jpg',
    ],
    endereco: 'R. São Paulo, 1250, Colorado - PR, 86690-000',
    telefone: '(44) 9 9836-2286',
    descricaoNoivos:
      'Nossa opção! Os quartos são aconchegantes e foram reformados e melhorados. Ficam no terceiro andar (sem elevador). Tem várias opções de quarto.',
    caracteristicas: [
      'Quartos aconchegantes',
      'Reformados',
      '3º andar sem elevador',
    ],
    comodidades: [
      {
        icon: <Snowflake className='text-secondary' />,
        nome: 'Ar-condicionado',
        disponivel: true,
      },
      { icon: <Tv className='text-secondary' />, nome: 'TV', disponivel: true },
      {
        icon: <Coffee className='text-secondary' />,
        nome: 'Frigobar',
        disponivel: true,
      },
      {
        icon: <Wifi className='text-secondary' />,
        nome: 'Wi-Fi',
        disponivel: true,
      },
      {
        icon: <Car className='text-secondary' />,
        nome: 'Estacionamento',
        disponivel: true,
      },
    ],
    detalhes: [
      'Quartos reformados',
      'Camas novas',
      'Opções com e sem ar-condicionado',
      'Ambiente mais reservado',
    ],
  },
];

function phoneToWhatsApp(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '');
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
  const text = encodeURIComponent(message);
  return `https://wa.me/${withCountry}?text=${text}`;
}

export default function HospedagemPage() {
  return (
    <main className='flex flex-col gap-8 py-8 px-4 max-w-6xl'>
      <PageBreadcrumb />

      <header className='text-center'>
        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Heart className='h-8 w-8 text-primary' />
        </div>
        <h1 className='text-3xl'>Guia de Hospedagem</h1>
        <p className='text-muted-foreground max-w-2xl mx-auto mt-2'>
          Seleção de hotéis simples e bem localizados para facilitar sua estadia
          em Colorado. Confira endereços, telefones e observações rápidas.
        </p>
      </header>

      <section className='grid lg:grid-cols-2 gap-8 '>
        {hoteis.map((hotel) => (
          <Card
            key={hotel.id}
            className='elegant-shadow border-border/20 overflow-hidden pt-0'
          >
            <div className='relative h-[400px] overflow-hidden'>
              <ImageCarousel
                images={hotel.imagens}
                alt={hotel.nome}
                className='h-full'
                objectStyle='object-cover'
                showIndicators
                hoverControls
              />
              <div className='absolute top-4 left-4'>
                <Badge
                  variant='secondary'
                  className='bg-white/90 text-primary border-0 text-sm'
                >
                  {hotel.categoria}
                </Badge>
              </div>
              <div className='absolute top-4 right-4'>
                <Badge
                  variant='outline'
                  className='bg-white/90 border-primary/30 text-sm'
                >
                  {hotel.preco}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <div className='flex items-start justify-between'>
                <div>
                  <CardTitle className='text-2xl mb-2 text-primary'>
                    {hotel.nome}
                  </CardTitle>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      {hotel.endereco}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Phone className='h-4 w-4' />
                      {hotel.telefone}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className='space-y-6'>
              <div className='bg-primary/5 rounded-lg p-4 border-l-4 border-primary/30'>
                <div className='flex items-center gap-2 mb-2'>
                  <Heart className='h-4 w-4 text-primary' />
                  <span className='text-sm  text-primary'>Nossa opinião</span>
                </div>
                <p className='text-sm text-muted-foreground italic'>
                  "{hotel.descricaoNoivos}"
                </p>
              </div>

              {/* Características principais */}
              <div>
                <h4 className='text-2xl mb-3'>Características</h4>
                <div className='grid grid-cols-1 gap-2 text-primary '>
                  {hotel.caracteristicas.map((caracteristica, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-2 text-sm'
                    >
                      <div className='w-1.5 h-1.5 bg-secondary rounded-full'></div>
                      <span className='text-lg'>{caracteristica}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comodidades */}
              <div>
                <h4 className='text-2xl mb-3'>Comodidades</h4>
                <div className='flex flex-wrap gap-2'>
                  {hotel.comodidades.map((comodidade, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full text-xs'
                    >
                      {comodidade.icon}
                      <span className='text-lg text-primary'>
                        {comodidade.nome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className='text-2xl mb-3'>Detalhes</h4>
                <div className='space-y-1'>
                  {hotel.detalhes.map((detalhe, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-2 text-lg text-muted-foreground'
                    >
                      <Star className='h-5 w-5 text-secondary' />
                      <span className='text-lg text-primary'>{detalhe}</span>
                    </div>
                  ))}
                </div>
              </div>

              {hotel.site ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  <Link
                    href={phoneToWhatsApp(
                      hotel.telefone,
                      'Olá, gostaria de fazer uma reserva para do dia 27 de setembro, para o casamento da Maria Rissatti e Rafael Omodei'
                    )}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
                  >
                    <MessageCircle className='h-4 w-4' />
                    Falar no WhatsApp
                  </Link>
                  <Link
                    href={hotel.site}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md border border-primary/30 bg-white hover:bg-muted/50 text-primary transition-colors'
                  >
                    <ExternalLink className='h-4 w-4' />
                    Visitar Site
                  </Link>
                </div>
              ) : (
                <Link
                  href={phoneToWhatsApp(
                    hotel.telefone,
                    'Olá, gostaria de fazer uma reserva para do dia 27 de setembro, para o casamento da Maria Rissatti e Rafael Omodei'
                  )}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
                >
                  <MessageCircle className='h-4 w-4' />
                  Falar no WhatsApp
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </section>
      <div className='mt-16 mb-12'>
        <div className='text-center mb-12'>
          <div className='w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
            <MapPin className='h-8 w-8 text-secondary' />
          </div>

          <h2
            className='text-3xl mb-4'
            style={{ fontFamily: 'var(--font-arapey)' }}
          >
            Como Chegar
          </h2>

          <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Dicas para chegar até Colorado e se deslocar durante a festa.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          <Card className='elegant-shadow border-border/20 text-primary'>
            <CardContent className='p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                <Plane className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl mb-2'>Maringá</h3>
              <Badge variant='secondary' className='mb-3  text-sm text-white'>
                Ponto Principal
              </Badge>
              <p className='text-sm text-muted-foreground mb-3'>
                Cidade principal para desembarque (avião/ônibus). Ideal para
                locação de carros.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-full'></div>
                  <span>Distância: ~1h30 até Colorado</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-full'></div>
                  <span>Melhor opção para locadoras</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='elegant-shadow border-border/20 text-primary'>
            <CardContent className='p-6'>
              <div className='w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4'>
                <Bus className='h-6 w-6 text-secondary' />
              </div>
              <h3 className='text-xl mb-2'>Londrina</h3>
              <Badge variant='outline' className='mb-3 text-sm'>
                Alternativa
              </Badge>
              <p className='text-sm text-muted-foreground mb-3'>
                Outra opção para desembarque, especialmente de ônibus.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-secondary rounded-full'></div>
                  <span>Distância: ~2h até Colorado</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-secondary rounded-full'></div>
                  <span>Mais distante, mas é viável</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='elegant-shadow border-border/20 text-primary'>
            <CardContent className='p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                <Bus className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl mb-2'>Ônibus para Colorado</h3>
              <Badge variant='outline' className='mb-3 text-sm'>
                Atenção
              </Badge>
              <p className='text-sm text-muted-foreground mb-3'>
                Não há passagens diretas. Normalmente os ônibus passam no
                trajeto para Presidente Prudente.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-full'></div>
                  <span>Empresas: Andorinha e Garcia</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-full'></div>
                  <span>Verificar horários disponíveis</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <Card className='elegant-shadow border-border/20'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center'>
                  <Smartphone className='h-6 w-6 text-secondary' />
                </div>
                <div className='flex-1'>
                  <h4
                    className='text-lg mb-2'
                    style={{ fontFamily: 'var(--font-arapey)' }}
                  >
                    Aplicativo Local
                  </h4>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Colorado possui aplicativo de transporte próprio (não é
                    Uber). A disponibilidade pode variar, principalmente em
                    horários noturnos.
                  </p>
                  <div className='flex items-center gap-2 text-xs bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full'>
                    <Info className='h-3 w-3' />
                    <span className='text-sm'>Disponibilidade limitada</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dica dos Noivos */}
          <Card className='elegant-shadow border-border/20'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                  <Heart className='h-6 w-6 text-primary' />
                </div>
                <div className='flex-1'>
                  <h4
                    className='text-lg mb-2'
                    style={{ fontFamily: 'var(--font-arapey)' }}
                  >
                    Dica dos Noivos
                  </h4>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Sempre que possível, combine carona ou alugue um veículo
                    para facilitar o deslocamento até o pesqueiro, onde será a
                    recepção.
                  </p>
                  <div className='flex items-center gap-2 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full'>
                    <Users className='h-3 w-3' />
                    <span className='text-sm'>Recomendação especial</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

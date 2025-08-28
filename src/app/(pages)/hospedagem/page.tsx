import Image from 'next/image';
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
} from 'lucide-react';
import { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Hotel {
  id: string;
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  endereco: string;
  telefone: string;
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
    imagem:
      'https://images.unsplash.com/photo-1563941613898-4a939ab4ef95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhvdGVsJTIwcm9vbSUyMGNsYXNzaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTU5MTQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    endereco: 'Centro da cidade',
    telefone: '(00) 0000-0000',
    descricaoNoivos:
      'O Hotel Bandeirantes possui uma estrutura mais tradicional, mas não se deixem enganar! Muitos quartos passaram por adaptações recentes e oferecem ótimo conforto. É uma opção confiável com boa localização.',
    caracteristicas: [
      'Estrutura tradicional com melhorias',
      'Muitos quartos renovados',
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
      'Frigobar e TV em todos os quartos',
      'Ar-condicionado disponível',
      'Estrutura consolidada',
    ],
  },
  {
    id: 'aconchego',
    nome: 'Hotel Vila Aconchego',
    categoria: 'Opção Tradicional Plus',
    preco: 'Valores superiores',
    imagem:
      'https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbSUyMGNvenklMjBiZWRyb29tfGVufDF8fHx8MTc1NTkxNDIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    endereco: 'Centro da cidade',
    telefone: '(00) 1111-1111',
    descricaoNoivos:
      'Nossa opção favorita! Os quartos são incrivelmente aconchegantes e foram completamente reformados. Ficam no terceiro andar (sem elevador), mas vale cada degrau! O ambiente é muito acolhedor e as camas são divinas.',
    caracteristicas: [
      'Quartos super aconchegantes',
      'Completamente reformados',
      '3º andar sem elevador',
      'Ambiente intimista e acolhedor',
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
      'Quartos novos e reformados',
      'Camas completamente novas',
      'Opções com e sem ar-condicionado',
      'Ambiente mais reservado',
      'Decoração moderna e aconchegante',
    ],
  },
];

function phoneToHref(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return `tel:${digits}`;
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
            <div className='relative h-64 overflow-hidden'>
              <Image
                src={hotel.imagem}
                alt={hotel.nome}
                className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                fill
              />
              <div className='absolute top-4 left-4'>
                <Badge
                  variant='secondary'
                  className='bg-white/90 text-primary border-0'
                >
                  {hotel.categoria}
                </Badge>
              </div>
              <div className='absolute top-4 right-4'>
                <Badge
                  variant='outline'
                  className='bg-white/90 border-primary/30'
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

              <Link
                href={`tel:${hotel.telefone.replace(/\D/g, '')}`}
                className='w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
              >
                <Phone className='h-4 w-4' />
                Entrar em Contato
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

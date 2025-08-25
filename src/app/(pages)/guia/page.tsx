import GuideCard from '@/components/GuideCard';
import PageBreadcrumb from '@/components/PageBreadcrumb';

interface Hotel {
  image: string;
  name: string;
  address: string;
  phone: string;
  notes: string;
}

interface Taxi {
  image: string;
  name: string;
  phone: string;
  pickup: string;
}

interface Rental {
  image: string;
  name: string;
  counter: string;
  phone: string;
  site: string;
}

const hotels: Hotel[] = [
  {
    image: '/png/capa.png',
    name: 'Sevilha Park Hotel',
    address: 'Rua São Paulo, 1250 – Centro',
    phone: '(44) 3323-2856',
    notes: '3★, estacionamento, pet friendly, recepção 24 h',
  },
  {
    image: '/png/capa.png',
    name: 'Hotel Novo Bandeirantes',
    address: 'Rua São Paulo, 380 – Centro',
    phone: '(44) 3323-1525',
    notes: 'Econômico, café da manhã simples',
  },
  {
    image: '/png/capa.png',
    name: 'Hotel Brasil',
    address: 'Centro',
    phone: '(44) 3323-5690',
    notes: 'Opção básica, boa localização',
  },
  {
    image: '/png/capa.png',
    name: 'Serenus Hotel',
    address: 'Centro',
    phone: '(44) 3323-4815',
    notes: 'Quartos familiares',
  },
  {
    image: '/png/capa.png',
    name: 'Hotel Uirapuru',
    address: 'Centro',
    phone: '(44) 3323-1794',
    notes: 'Estrutura enxuta',
  },
];

const taxis: Taxi[] = [
  {
    image: '/png/capa.png',
    name: 'Ponto de Táxi (Rodoviária)',
    phone: '(44) 3323-2124',
    pickup: 'Av. Brasil, Rodoviária',
  },
  {
    image: '/png/capa.png',
    name: 'Táxi Jacir Garcia',
    phone: '(44) 99971-90 xx (24 h)',
    pickup: 'Centro',
  },
  {
    image: '/png/capa.png',
    name: 'João Vieira Táxi',
    phone: '(44) — (consultar na chegada)',
    pickup: 'Av. Paraná, 21',
  },
];

const rentals: Rental[] = [
  {
    image: '/png/capa.png',
    name: 'Localiza',
    counter: 'Saguão de desembarque',
    phone: '(44) 3266-6565',
    site: 'localiza.com',
  },
  {
    image: '/png/capa.png',
    name: 'Avis',
    counter: 'Saguão de desembarque',
    phone: '(44) 3301-7874',
    site: 'avis.com.br',
  },
];

export default function GuiaPage() {
  return (
    <main className='flex flex-col gap-8 py-8 px-4 max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Guia para convidados</h1>
      <p className='text-sm'>
        Se você é de fora e não conhece muito bem Colorado, aqui
        reunimos algumas dicas rápidas para facilitar sua estadia. Veja
        opções de hospedagem e transporte para aproveitar a cidade sem
        preocupações.
      </p>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Hospedagem em Colorado</h2>
        <p className='text-sm'>
          Algumas acomodações simples e bem localizadas para você descansar
          próximo à igreja.
        </p>
        <div className='grid sm:grid-cols-2 gap-4'>
          {hotels.map((hotel) => (
            <GuideCard key={hotel.name} imageSrc={hotel.image} title={hotel.name}>
              <p className='text-sm'>{hotel.address}</p>
              <p className='text-sm'>{hotel.phone}</p>
              <p className='text-sm'>{hotel.notes}</p>
            </GuideCard>
          ))}
        </div>
        <p className='text-sm italic'>Todos ficam a menos de 2 km da Igreja Matriz, onde será a cerimônia.</p>
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Transporte dentro de Colorado</h2>
        <p className='text-sm'>
          Serviços de táxi disponíveis na cidade. Como não há Uber ou 99,
          combine o trajeto com antecedência ou considere alugar um carro.
        </p>
        <div className='grid sm:grid-cols-2 gap-4'>
          {taxis.map((taxi) => (
            <GuideCard key={taxi.name} imageSrc={taxi.image} title={taxi.name}>
              <p className='text-sm'>{taxi.phone}</p>
              <p className='text-sm'>{taxi.pickup}</p>
            </GuideCard>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Aluguel de carro (Aeroporto de Maringá – MGF)</h2>
        <p className='text-sm'>
          Se preferir sair do aeroporto dirigindo, veja algumas locadoras que atendem no saguão de desembarque em Maringá.
        </p>
        <div className='grid sm:grid-cols-2 gap-4'>
          {rentals.map((rental) => (
            <GuideCard key={rental.name} imageSrc={rental.image} title={rental.name}>
              <p className='text-sm'>{rental.counter}</p>
              <p className='text-sm'>{rental.phone}</p>
              <p className='text-sm'>{rental.site}</p>
            </GuideCard>
          ))}
        </div>
        <p className='text-sm'>Distância Maringá ⇄ Colorado: ~82 km (1 h 15 min de carro).</p>
        <p className='text-sm italic'>A maioria das locadoras permite retirada e devolução fora do horário mediante taxa adicional.</p>
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Festa &amp; deslocamento</h2>
        <p className='text-sm'>Endereços da cerimônia e da festa para você se programar.</p>
        <table className='w-full text-sm border-collapse'>
          <thead>
            <tr className='border-b'>
              <th className='text-left py-2'>Ponto</th>
              <th className='text-left py-2'>Endereço / Referência</th>
              <th className='text-left py-2'>Distância*</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td>Igreja Matriz (cerimônia)</td>
              <td>Centro de Colorado</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Pesqueiro São Luiz (festa)</td>
              <td>Estrada Colorado → Santo Inácio, Km 5</td>
              <td>~5 km da igreja (acesso por estrada rural leve)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

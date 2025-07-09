import GuideCard from '@/components/GuideCard';

interface Hotel {
  image: string;
  name: string;
  address: string;
  phone: string;
  notes: string;
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

export default function GuiaPage() {
  return (
    <main className='flex flex-col gap-8 py-8 px-4 max-w-6xl'>
      <h1 className='text-2xl'>Guia para convidados</h1>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Hospedagem em Colorado</h2>
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
        <table className='w-full text-sm border-collapse'>
          <thead>
            <tr className='border-b'>
              <th className='text-left py-2'>Serviço</th>
              <th className='text-left py-2'>Telefone/WhatsApp</th>
              <th className='text-left py-2'>Ponto de embarque</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td>Ponto de Táxi (Rodoviária)</td>
              <td>(44) 3323-2124</td>
              <td>Av. Brasil, Rodoviária</td>
            </tr>
            <tr className='border-b'>
              <td>Táxi Jacir Garcia</td>
              <td>(44) 99971-90 xx (24 h)</td>
              <td>Centro</td>
            </tr>
            <tr>
              <td>João Vieira Táxi</td>
              <td>(44) — (consultar na chegada)</td>
              <td>Av. Paraná, 21</td>
            </tr>
          </tbody>
        </table>
        <p className='text-sm italic'>A cidade não conta com Uber/99; combine o trajeto com antecedência ou considere alugar carro.</p>
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Aluguel de carro (Aeroporto de Maringá – MGF)</h2>
        <table className='w-full text-sm border-collapse'>
          <thead>
            <tr className='border-b'>
              <th className='text-left py-2'>Locadora</th>
              <th className='text-left py-2'>Balcão</th>
              <th className='text-left py-2'>Telefone</th>
              <th className='text-left py-2'>Reserva on-line</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td>Localiza</td>
              <td>Saguão de desembarque</td>
              <td>(44) 3266-6565</td>
              <td>localiza.com</td>
            </tr>
            <tr>
              <td>Avis</td>
              <td>Saguão de desembarque</td>
              <td>(44) 3301-7874</td>
              <td>avis.com.br</td>
            </tr>
          </tbody>
        </table>
        <p className='text-sm'>Distância Maringá ⇄ Colorado: ~82 km (1 h 15 min de carro).</p>
        <p className='text-sm italic'>A maioria das locadoras permite retirada e devolução fora do horário mediante taxa adicional.</p>
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Festa &amp; deslocamento</h2>
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

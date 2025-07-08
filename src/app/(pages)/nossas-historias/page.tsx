'use client'

import { MediaCarousel, MediaItem } from '@/components/MediaCarousel/MediaCarousel'
import PreWeddingGallery from '@/components/PreWeddingGallery/PreWeddingGallery'
import Link from 'next/link'

export default function NossasHistoriasPage() {
  const media: MediaItem[] = [
    { type: 'image', src: '/png/preWedding/DSC03183.jpg' },
    { type: 'image', src: '/png/preWedding/DSC03184.jpg' },
    { type: 'image', src: '/png/preWedding/DSC03190.jpg' }
  ]

  return (
    <main className='flex flex-col gap-4 py-8 px-4 max-w-6xl'>
      <PreWeddingGallery className='mb-4' />
      <h1 className='text-2xl'>Nossa História</h1>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='order-2 md:order-1 md:w-1/2 flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Maria Eduarda e Rafael Geovani</h2>
          <p>
            Nos conhecemos ainda jovens, nos corredores do colégio. Éramos apenas conhecidos de vista, com amigos em comum, mas nada que indicasse que, anos depois, estaríamos escrevendo nossa história juntos.
          </p>
          <p>
            Foi em uma noite comum — mas que se tornaria inesquecível — no dia 9 de maio de 2015, durante uma pizza com os amigos, que tudo começou de verdade. Entre risadas e conversas, algo diferente aconteceu. Naquela noite, Rafael, que sempre voltava cedo para o sítio com seu pai, decidiu ficar na cidade. E foi nessa escolha simples que o destino começou a agir.
          </p>
          <p>
            Subindo as ruas após o encontro, aconteceu o nosso primeiro beijo. A partir dali, começaram os encontros, as conversas, os olhares mais demorados. Alguns meses depois, oficializamos o namoro — embora a maioria já soubesse que algo especial existia entre nós. Vieram os finais de semana juntos, as sextas-feiras ansiosamente esperadas, e assim vivemos intensamente os primeiros dois anos.
          </p>
          <p>
            No terceiro ano, enfrentamos um desafio enorme: Rafael foi aprovado no curso dos seus sonhos, em uma universidade federal em Santa Helena, a 500 km de distância. A notícia trouxe muita alegria, mas também um aperto no coração. Ainda não éramos financeiramente independentes, então os encontros tornaram-se raros, e a saudade virou nossa nova companheira.
          </p>
          <p>
            Logo depois, me mudei para Umuarama para iniciar minha graduação. Estávamos um pouco mais próximos, mas por pouco tempo. Com a minha nova mudança, a distância voltou a crescer. Mesmo assim, enfrentamos tudo com paciência, esperança e muito amor.
          </p>
          <p>
            Em 2020, a pandemia chegou e, entre tantas dificuldades no mundo, tivemos uma dádiva: pudemos ficar mais próximos novamente. Aproveitamos esse período para sonhar e planejar. Rafael trabalhou em diversos serviços para que pudéssemos realizar nossa primeira viagem juntos, em 2021. O destino? Florianópolis — nosso primeiro pedaço do mundo explorado a dois.
          </p>
          <p>
            Com o tempo, as coisas começaram a se alinhar. Rafael conseguiu seu primeiro emprego na área de computação, e eu segui firme na graduação. A distância ainda fazia parte da rotina, mas agora tínhamos cada vez mais certeza do que queríamos: construir uma vida juntos.
          </p>
          <p>
            Sempre sonhamos em nos casar, ter nosso cantinho, nossa família. Em 2023, durante um passeio à vinícola para comemorar o Dia dos Namorados e meu aniversário, veio o pedido de casamento. Era 10 de junho. Rafael, tímido como sempre, mas cheio de carinho e atenção aos detalhes, preparou tudo com muito amor. Foi um dos dias mais felizes da nossa vida.
          </p>
          <p>
            Em 2024, um ano após o pedido, decidimos finalmente morar juntos, em Santa Helena. Mas o nosso maior desejo sempre foi celebrar esse amor diante de Deus, de nossas famílias e dos nossos amigos.
          </p>
          <p>
            Por isso, escolhemos uma data que ficará para sempre em nossos corações: 27 de setembro de 2025. Exatamente 10 anos após o nosso primeiro beijo. Esse dia marcará não só a celebração do nosso amor, mas o início oficial da nossa família, com as bênçãos de Deus e o carinho das pessoas que mais amamos.
          </p>
          <p>Que venha o grande dia!</p>
          <div className='flex flex-col sm:flex-row gap-2 w-full mt-4'>
            <Link
              href='deixar-mensagem/'
              className='text-primary border-primary border text-center rounded-sm text-lg py-2 px-4'
            >
              Deixar uma mensagem
            </Link>
            <Link
              href='mensagens/'
              className='bg-primary text-white text-center rounded-sm text-lg py-2 px-4'
            >
              Ver mensagens
            </Link>
          </div>
        </div>
        <div className='order-1 md:order-2 md:w-1/2'>
          <MediaCarousel
            items={media}
            alt='Fotos do casal'
            className='h-64 sm:h-80 w-full'
            showIndicators
          />
        </div>
      </div>
    </main>
  )
}


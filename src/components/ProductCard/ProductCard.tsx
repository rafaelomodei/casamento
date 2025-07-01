import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

interface ProductCardProps {
  imageSrc: string
  title: string
  href: string
}

export default function ProductCard({ imageSrc, title, href }: ProductCardProps) {
  return (
    <Card className='overflow-hidden p-0 gap-0'>
      <Link href={href}>
        <Image
          src={imageSrc}
          alt={title}
          width={320}
          height={240}
          className='h-48 w-full object-cover'
        />
      </Link>
      <CardContent className='px-4 pt-4'>
        <h3 className='font-semibold text-center'>{title}</h3>
      </CardContent>
      <CardFooter className='px-4 pb-4'>
        <Link
          href={href}
          className='bg-primary text-white text-center w-full rounded-sm py-2'
        >
          Comprar
        </Link>
      </CardFooter>
    </Card>
  )
}

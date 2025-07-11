'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/Providers/auth-provider'

interface Props {
  className?: string
}

export default function UserMenu({ className }: Props) {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`flex items-center gap-2 ${className ?? ''}`}>
          <Image
            src={user.avatar}
            alt={user.name}
            width={32}
            height={32}
            className='size-8 rounded-full object-cover'
          />
          <span className='font-medium'>{user.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

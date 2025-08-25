'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/Providers/auth-provider'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatUserName } from '@/lib/utlils/text'

interface Props {
  className?: string
}

export default function UserMenu({ className }: Props) {
  const { user, signOut } = useAuth()

  if (!user) return null

  const displayName = formatUserName(user.name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-2 [&[data-state=open]>svg]:rotate-180',
            className
          )}
        >
          <Image
            src={user.avatar}
            alt={user.name}
            width={32}
            height={32}
            className='size-8 rounded-full object-cover'
          />
          <span className='font-medium'>{displayName}</span>
          <ChevronDownIcon className='size-4 transition-transform' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

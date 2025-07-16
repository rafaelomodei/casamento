import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface UserMenuProps {
  fullName: string
  avatarUrl?: string
}

function formatDisplayName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return ''
  const firstName = parts[0]
  let displayFirst = firstName
  if (firstName.length > 20) {
    displayFirst = firstName.slice(0, 10) + '...'
  }
  const lastInitial =
    parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() + '.' : ''
  return `${displayFirst} ${lastInitial}`.trim()
}

export default function UserMenu({ fullName, avatarUrl }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)
  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={toggle}
        className='flex items-center gap-2 focus:outline-none'
      >
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={fullName}
            width={32}
            height={32}
            className='rounded-full'
          />
        )}
        <span>{formatDisplayName(fullName)}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className='absolute right-0 z-10 mt-2 w-24 rounded-md border bg-card shadow-md'>
          <button
            className='block w-full px-3 py-1 text-left hover:bg-muted'
            onClick={() => setOpen(false)}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  )
}

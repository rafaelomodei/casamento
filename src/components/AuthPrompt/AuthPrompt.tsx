'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface AuthPromptProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function AuthPrompt({ open, onOpenChange, onConfirm }: AuthPromptProps) {
  const isMobile = useIsMobile()

  const Wrapper = isMobile ? Drawer : Dialog
  const Content = isMobile ? DrawerContent : DialogContent
  const Header = isMobile ? DrawerHeader : DialogHeader
  const Title = isMobile ? DrawerTitle : DialogTitle
  const Description = isMobile ? DrawerDescription : DialogDescription
  const Footer = isMobile ? DrawerFooter : DialogFooter
  const Close = isMobile ? DrawerClose : DialogClose

  const contentClassName = cn(
    'sm:max-w-[500px] text-primary px-4',
    !isMobile && 'rounded-md px-8 py-6'
  )

  return (
    <Wrapper open={open} onOpenChange={onOpenChange}>
      <Content className={contentClassName}>
        <Header>
          <Title className='text-xl'>Login necessário</Title>
          <Description className='text-lg'>
            Para continuar, faça login na plataforma.
          </Description>
        </Header>
        <Footer>
          <Close asChild>
            <Button variant='outline' type='button'>Cancelar</Button>
          </Close>
          <Button type='button' onClick={onConfirm}>
            Fazer login
          </Button>
        </Footer>
      </Content>
    </Wrapper>
  )
}

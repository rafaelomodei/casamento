'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction, useState } from 'react';
import { Loader2 } from 'lucide-react'; // spinner
import { capitalizeFirst } from '@/lib/utlils/text';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useAuth } from '@/Providers/auth-provider';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  requireAuth?: (desc?: string) => boolean;
}

export default function Modal(props: ModalProps) {
  const { open, setOpen, requireAuth } = props;
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const loginMessage =
    'Para deixar seu recado, você precisa estar logado.\nClique em Entrar ou crie sua conta em poucos segundos e volte aqui para compartilhar sua mensagem com Maria Eduarda & Rafael.';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    if (!user) {
      if (requireAuth) {
        requireAuth(loginMessage);
      }
      return;
    }

    setIsSending(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          userId: user.id,
          name: user.name,
          avatar: user.avatar,
        }),
      });
      setMessage('');
      setOpen(false);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    } finally {
      setIsSending(false);
    }
  };

  const Wrapper = isMobile ? Drawer : Dialog;
  const Trigger = isMobile ? DrawerTrigger : DialogTrigger;
  const Content = isMobile ? DrawerContent : DialogContent;
  const Header = isMobile ? DrawerHeader : DialogHeader;
  const Title = isMobile ? DrawerTitle : DialogTitle;
  const Description = isMobile ? DrawerDescription : DialogDescription;
  const Footer = isMobile ? DrawerFooter : DialogFooter;
  const Close = isMobile ? DrawerClose : DialogClose;

  const contentClassName = cn(
    'sm:max-w-[500px] text-primary px-4',
    !isMobile && 'rounded-md px-8 py-6'
  );

  return (
    <Wrapper
      open={open}
      onOpenChange={(o) => {
        if (o) {
          if (!requireAuth || requireAuth(loginMessage)) {
            setOpen(true);
          }
        } else {
          setOpen(false);
        }
      }}
    >
      <Trigger asChild>
        <Button
          className='h-16! not-italic text-xl mt-4 md:m-auto'
          onClick={(e) => {
            if (requireAuth && !requireAuth(loginMessage)) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          Deixar uma mensagem
        </Button>
      </Trigger>
      <Content className={contentClassName}>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <Header>
            <Title className='text-xl'>Deixe sua mensagem</Title>
            <Description className='text-lg'>
              Escreva uma mensagem carinhosa.
            </Description>
          </Header>

          <Textarea
            name='message'
            placeholder='Ex: "Que Deus abençoe essa união!"'
            className='min-h-32 text-lg!'
            value={message}
            onChange={(e) => setMessage(capitalizeFirst(e.currentTarget.value))}
            disabled={isSending}
          />

          <Footer>
            <Close asChild>
              <Button variant='outline' type='button' disabled={isSending}>
                Cancelar
              </Button>
            </Close>
            <Button type='submit' disabled={!message.trim() || isSending}>
              {isSending ? (
                <div className='flex gap-2'>
                  Enviando
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                </div>
              ) : (
                'Enviar'
              )}
            </Button>
          </Footer>
        </form>
      </Content>
    </Wrapper>
  );
}

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
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction, useState } from 'react';
import { Loader2 } from 'lucide-react'; // spinner
import { capitalizeFirst } from '@/lib/utlils/text';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal(props: ModalProps) {
  const { open, setOpen } = props;
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      setMessage('');
      setOpen(false);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='h-16! not-italic text-xl mt-4 md:m-auto'>
          Deixar uma mensagem
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Deixe sua mensagem</DialogTitle>
            <DialogDescription className='text-lg'>
              Escreva uma mensagem carinhosa.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            name='message'
            placeholder='Ex: "Que Deus abençoe essa união!"'
            className='min-h-32 text-lg!'
            value={message}
            onChange={(e) => setMessage(capitalizeFirst(e.currentTarget.value))}
            disabled={isSending}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' type='button' disabled={isSending}>
                Cancelar
              </Button>
            </DialogClose>
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

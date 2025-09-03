import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { CommentCardProps } from './interface';
import { capitalizeFirst } from '@/lib/utlils/text';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function CommentCard({
  avatarUrl,
  name,
  date,
  message,
  isOwner,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const [editedMessage, setEditedMessage] = useState(message);
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isMobile = useIsMobile();
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setEditedMessage(message);
  }, [message]);

  const handleSave = async () => {
    try {
      setSaving(true);
      if (onEdit) await onEdit(editedMessage);
      setEditOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      if (onDelete) await onDelete();
      setConfirmOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className='w-full text-primary'>
      <div className='flex items-start justify-between gap-4 px-6'>
        <div className='flex items-start gap-4'>
          <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className='h-16 w-16 rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <p className='font-semibold'>{name}</p>
            <p className='text-sm text-muted-foreground'>{date}</p>
          </div>
        </div>
        {isOwner && (
          <div className='flex pt-2'>
            {isMobile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' aria-label='Ações'>
                    <MoreVertical className='h-5 w-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='min-w-[10rem]'>
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil className='h-4 w-4' /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant='destructive'
                    onClick={() => setConfirmOpen(true)}
                  >
                    <Trash2 className='h-4 w-4' /> Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='flex gap-2'>
                <Button variant='ghost' size='sm' onClick={() => setEditOpen(true)}>
                  Editar
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setConfirmOpen(true)}
                >
                  Excluir
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <CardContent>
        <p className='text-justify'>{capitalizeFirst(message)}</p>
      </CardContent>

      {/* Edit Message: Drawer on mobile, Dialog on desktop */}
      {isMobile ? (
        <Drawer open={editOpen} onOpenChange={(o) => {
          if (!o) {
            setEditedMessage(message);
          }
          setEditOpen(o);
        }}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Editar mensagem</DrawerTitle>
              <DrawerDescription>Atualize sua mensagem.</DrawerDescription>
            </DrawerHeader>
            <div className='px-4'>
              <Textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                disabled={saving}
                className='min-h-32 text-lg!'
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant='outline'
                  onClick={() => setEditedMessage(message)}
                  disabled={saving}
                >
                  Cancelar
                </Button>
              </DrawerClose>
              <Button
                onClick={handleSave}
                disabled={saving || !editedMessage.trim()}
                className='mb-16'
              >
                {saving ? (
                  <div className='flex gap-2'>
                    Salvando
                    <Loader2 className='h-4 w-4 animate-spin' />
                  </div>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={editOpen} onOpenChange={(o) => {
          if (!o) {
            setEditedMessage(message);
          }
          setEditOpen(o);
        }}>
          <DialogContent className='sm:max-w-[500px] text-primary rounded-md px-8 py-6'>
            <DialogHeader>
              <DialogTitle className='text-xl'>Editar mensagem</DialogTitle>
              <DialogDescription className='text-lg'>
                Atualize sua mensagem.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              disabled={saving}
              className='min-h-32 text-lg!'
            />
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => {
                  setEditedMessage(message);
                  setEditOpen(false);
                }}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving || !editedMessage.trim()}>
                {saving ? (
                  <div className='flex gap-2'>
                    Salvando
                    <Loader2 className='h-4 w-4 animate-spin' />
                  </div>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Delete: Drawer on mobile, AlertDialog on desktop */}
      {isMobile ? (
        <Drawer open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Excluir mensagem</DrawerTitle>
              <DrawerDescription>
                Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline' disabled={deleting}>
                  Cancelar
                </Button>
              </DrawerClose>
              <Button
                variant='destructive'
                onClick={handleConfirmDelete}
                disabled={deleting}
                className='mb-16'
              >
                {deleting ? 'Excluindo...' : 'Excluir'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir mensagem</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant='outline'
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
              >
                Cancelar
              </Button>
              <Button
                variant='destructive'
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Excluindo...' : 'Excluir'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Card>
  );
}

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { CommentCardProps } from './interface';
import { capitalizeFirst } from '@/lib/utlils/text';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CommentCard({
  avatarUrl,
  name,
  date,
  message,
  isOwner,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const [editing, setEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  useEffect(() => {
    setEditedMessage(message);
  }, [message]);

  const handleSave = async () => {
    if (onEdit) await onEdit(editedMessage);
    setEditing(false);
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
        {isOwner && !editing && (
          <div className='flex gap-2 pt-2'>
            <Button variant='ghost' size='sm' onClick={() => setEditing(true)}>
              Editar
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onDelete && onDelete()}
            >
              Excluir
            </Button>
          </div>
        )}
      </div>
      <CardContent>
        {editing ? (
          <div className='flex flex-col gap-2'>
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            />
            <div className='flex justify-end gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setEditing(false);
                  setEditedMessage(message);
                }}
              >
                Cancelar
              </Button>
              <Button
                size='sm'
                onClick={handleSave}
                disabled={!editedMessage.trim()}
              >
                Salvar
              </Button>
            </div>
          </div>
        ) : (
          <p className='text-justify'>{capitalizeFirst(message)}</p>
        )}
      </CardContent>
    </Card>
  );
}

'use client';

import { useEffect, useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { useLoginRedirect } from '@/hooks/useLoginRedirect';
import { useAuth, User as AuthUser } from '@/Providers/auth-provider';
import { CalendarCheck2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { truncateWithEllipsis } from '@/lib/utlils/text';
import { useIsMobile } from '@/hooks/use-mobile';
import { getRandomAvatar } from '@/lib/utlils/randomAvatar';

interface Member extends AuthUser {
  attending?: boolean;
}

export default function ConfirmarPresencaPage() {
  const { requireAuth, dialog } = useAuthRequired();
  const redirectToLogin = useLoginRedirect();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<Record<string, boolean | undefined>>({});
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const commonMessage =
    'Sua resposta foi registrada. Agradecemos por nos avisar.';
  const loginMessage = 'Para confirmar presença, faça login ou cadastre-se.';

  useEffect(() => {
    async function loadFamily() {
      if (!user) return;
      let data: Member[] = [];
      if (user.familyId) {
        const res = await fetch(`/api/users?familyId=${user.familyId}`);
        if (res.ok) {
          data = (await res.json()) as Member[];
        }
      } else {
        const res = await fetch(`/api/users?id=${user.id}`);
        if (res.ok) {
          data = [(await res.json()) as Member];
        }
      }
      setMembers(data);
      const resp: Record<string, boolean | undefined> = {};
      data.forEach((m) => {
        if (m.attending !== undefined) resp[m.id] = m.attending;
      });
      setResponses(resp);
    }
    loadFamily();
  }, [user]);

  async function sendAttendance(userId: string, attending: boolean) {
    if (!requireAuth(loginMessage)) return;
    try {
      await fetch('/api/attendances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          attending,
        }),
      });
      setResponses((prev) => ({ ...prev, [userId]: attending }));
      setMembers((prev) =>
        prev.map((m) => (m.id === userId ? { ...m, attending } : m)),
      );
      setMessage(commonMessage);
    } catch (err) {
      console.error('Erro ao registrar presença:', err);
    }
  }

  async function handleAddMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    try {
      const sex: 'male' | 'female' = 'male';
      const avatar = getRandomAvatar(sex);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          familyId: user.familyId,
          avatar,
          sex,
          downloads: 0,
        }),
      });
      if (res.ok) {
        const created = (await res.json()) as Member;
        setMembers((prev) => [...prev, created]);
        setResponses((prev) => ({ ...prev, [created.id]: undefined }));
        setOpen(false);
        setNewName('');
        setNewPhone('');
      }
    } catch (err) {
      console.error('Erro ao adicionar membro:', err);
    }
  }

  return (
    <main className='flex flex-col w-full gap-4 p-4 min-h-screen  max-w-6xl '>
      <PageBreadcrumb />
      <div className='flex flex-col gap-6 items-center text-center'>
        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
          <CalendarCheck2 className='h-8 w-8 text-secondary' />
        </div>
        <h1 className='text-3xl'>Confirmação de presença</h1>
        {!user ? (
          <>
            <p className='max-w-2xl text-lg'>
              Para responder à confirmação de presença, é necessário estar logado
              na plataforma. {" "}
              <strong>Faça login para continuar.</strong>
            </p>
            <Button onClick={() => redirectToLogin()}>
              Fazer login
            </Button>
          </>
        ) : (
          <>
            <p className='max-w-2xl text-lg'>
              Você confirma a presença dos membros listados abaixo? Responder essa
              confirmação é essencial para que os noivos tenham controle de quem vai
              estar na festa. {" "}
              <strong>
                Sem sua resposta, você e sua família não poderão entrar na festa.
              </strong>
            </p>
            {user.familyId && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant='outline'>Cadastrar novo membro</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastrar novo membro</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddMember} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='newMemberName'>Nome</Label>
                      <Input
                        id='newMemberName'
                        value={newName}
                        onChange={(e) => setNewName(e.currentTarget.value)}
                        required
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='newMemberPhone'>Telefone</Label>
                      <Input
                        id='newMemberPhone'
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.currentTarget.value)}
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => setOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type='submit'>Adicionar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            <div className='w-full overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='text-left py-2'>Nome</th>
                    <th className='text-center py-2'>Presença</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id} className='border-t'>
                      <td className='py-2 text-left'>
                        {isMobile ? truncateWithEllipsis(m.name, 13) : m.name}
                      </td>
                      <td className='py-2'>
                        <div className='flex justify-center gap-2 text-lg'>
                          <Button
                            onClick={() => sendAttendance(m.id, true)}
                            className={cn(
                              'text-lg bg-secondary hover:bg-secondary/90',
                              responses[m.id] === true && 'border-2 border-primary',
                            )}
                          >
                            <Check className='h-8 w-8 mr-2' />
                            Sim
                          </Button>
                          <Button
                            variant='outline'
                            className={cn(
                              'text-lg',
                              responses[m.id] === false && 'border-2 border-primary',
                            )}
                            onClick={() => sendAttendance(m.id, false)}
                          >
                            <X className='h-4 w-4 mr-2' />
                            Não
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {message && <p className='text-md'>{message}</p>}
          </>
        )}
        {dialog}
      </div>
    </main>
  );
}

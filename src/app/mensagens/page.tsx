"use client";

import CommentCard from "@/components/CommentCard/CommentCard";
import { MessageDTO } from "@/domain/messages/entities/MessageDTO";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BRIDE_AND_GROOM } from "@/lib/constants";
import { useEffect, useState } from "react";

interface Message extends MessageDTO {
  avatarUrl: string;
  name: string;
}

export default function MensagensPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      const messagesData: Message[] = data.map((m: MessageDTO) => ({
        ...m,
        avatarUrl: "/logo.svg",
        name: "Convidado",
      }));

      setMessages(messagesData);
    } catch (err) {
      console.error("Erro ao carregar as mensagens:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;
    if (!message?.trim()) return;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      event.currentTarget.reset();
      await getMessages();
      setOpen(false);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <h1 className="text-2xl">Mensagens</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Escrever mensagem</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Nova mensagem</DialogTitle>
              <DialogDescription>
                Escreva uma mensagem carinhosa. Ex: "Que Deus abençoe essa união"
              </DialogDescription>
            </DialogHeader>
            <Textarea
              name="message"
              placeholder="Ex: Felicidades aos noivos!"
              className="min-h-32"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Enviar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {messages.length === 0 ? (
        <p className="py-4">
          Seja o primeiro a deixar uma mensagem para {BRIDE_AND_GROOM}.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex-1 min-w-[min(100%,20rem)] sm:max-w-[calc(50%-0.5rem)]"
            >
              <CommentCard
                avatarUrl={msg.avatarUrl}
                name={msg.name}
                date={new Date(msg.date).toLocaleDateString("pt-BR")}
                message={msg.message}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

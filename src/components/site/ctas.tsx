"use client";

import { useEffect, useMemo, useState } from "react";
import { LocalizedString, useLocale, t } from "./localization";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function StickyCtaBar({ label, href }: { label: LocalizedString; href: string }) {
  const { locale } = useLocale();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] md:hidden">
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 px-4 py-3">
        <Button asChild className="w-full">
          <a href={href}>{t(label, locale)}</a>
        </Button>
      </div>
    </div>
  );
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export function FloatingChatButton({ webhookUrl, intro }: { webhookUrl: string; intro: LocalizedString }) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const introText = useMemo(() => t(intro, locale), [intro, locale]);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: introText }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: introText }];
      }
      return prev;
    });
  }, [introText]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, userMessage, { role: "assistant", content: "" }]);

    let assistantContent = "";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.body) {
        const text = await response.text();
        assistantContent = text || (locale === "en" ? "Thanks! We will reply soon." : "Terima kasih! Kami akan membalas segera.");
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantContent };
          return updated;
        });
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantContent };
          return updated;
        });
      }

      if (!assistantContent.trim()) {
        assistantContent = locale === "en" ? "Thanks! We will reply soon." : "Terima kasih! Kami akan membalas segera.";
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantContent };
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      const fallback = locale === "en" ? "Sorry, chat is unavailable right now." : "Maaf, chat sedang tidak tersedia.";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: fallback };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg text-white shadow-xl transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        aria-label={locale === "en" ? "Open chat" : "Buka chat"}
      >
        💬
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{locale === "en" ? "Clevio Chat" : "Chat Clevio"}</DialogTitle>
          </DialogHeader>
          <div className="flex max-h-80 flex-col gap-3 overflow-y-auto rounded-lg bg-slate-50 p-3">
            {messages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}-${message.content.slice(0, 6)}`}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-6 ${
                  message.role === "assistant" ? "self-start bg-slate-900 text-white" : "self-end bg-white text-slate-900"
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading ? (
              <div className="self-start rounded-lg bg-slate-200 px-3 py-2 text-xs text-slate-600">
                {locale === "en" ? "Typing…" : "Mengetik…"}
              </div>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={locale === "en" ? "Type your message…" : "Tulis pesan Anda…"}
              rows={2}
            />
            <Button onClick={handleSend} disabled={loading}>
              {locale === "en" ? "Send" : "Kirim"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

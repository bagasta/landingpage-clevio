"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LocalizedString, useLocale, t } from "./localization";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Testimonial {
  quote: LocalizedString;
  name: string;
  role: LocalizedString;
  avatar?: string;
}

export function TestimonialSlider({ id, title, items }: { id: string; title: LocalizedString; items: Testimonial[] }) {
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);
  const current = items[index];
  const avatarSrc = current.avatar ?? "https://placehold.co/128x128?text=C";
  const avatarIsLocal = avatarSrc.startsWith("/");
  const backgroundSrc = useMemo(
    () => `https://placehold.co/1024x400?text=Story+${index + 1}`,
    [index],
  );

  return (
    <section id={id} className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <article className="relative mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <Image
            src={backgroundSrc}
            alt={locale === "en" ? "Testimonial background" : "Latar belakang testimoni"}
            width={1024}
            height={400}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/30 to-slate-900/80" />
          <div className="relative z-10 flex flex-col gap-6 p-8 text-white md:flex-row md:items-center md:gap-10">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <Image
                src={avatarSrc}
                alt={`${current.name}`}
                width={96}
                height={96}
                className="h-20 w-20 rounded-full border-2 border-white/60 object-cover md:h-24 md:w-24"
                unoptimized={avatarIsLocal}
              />
              <div className="text-left md:text-white">
                <p className="text-base font-semibold">{current.name}</p>
                <p className="text-sm text-white/80">{t(current.role, locale)}</p>
              </div>
            </div>
            <p className="text-lg leading-7 md:flex-1">“{t(current.quote, locale)}”</p>
          </div>
          <div className="relative z-10 flex justify-center gap-2 pb-6">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setIndex(idx)}
                className={`h-2 w-8 rounded-full transition ${
                  idx === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`${locale === "en" ? "Show testimonial" : "Tampilkan testimoni"} ${idx + 1}`}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export function FAQSection({ id, title, items }: { id: string; title: LocalizedString; items: FAQItem[] }) {
  const { locale } = useLocale();

  return (
    <section id={id} className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <Accordion type="single" collapsible className="mt-6">
          {items.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{t(item.question, locale)}</AccordionTrigger>
              <AccordionContent>{t(item.answer, locale)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

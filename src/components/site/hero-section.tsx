"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LocalizedString, useLocale, t } from "./localization";

type Tone = "warm" | "cool" | "neutral";

interface CTA {
  label: LocalizedString;
  href: string;
}

interface HeroSectionProps {
  title: LocalizedString;
  subtitle: LocalizedString;
  priceBadge?: LocalizedString;
  primaryCta: CTA;
  secondaryCta?: CTA;
  backgroundTone?: Tone;
  image?: {
    src: string;
    alt: LocalizedString;
  };
  eyebrow?: LocalizedString;
}

const toneClasses: Record<Tone, string> = {
  warm: "from-amber-100 via-white to-orange-100",
  cool: "from-sky-100 via-white to-cyan-100",
  neutral: "from-slate-100 via-white to-slate-100",
};

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  priceBadge,
  primaryCta,
  secondaryCta,
  backgroundTone = "neutral",
  image,
}: HeroSectionProps) {
  const { locale } = useLocale();

  return (
    <section id="hero" className={`relative overflow-hidden bg-gradient-to-br ${toneClasses[backgroundTone]} py-16`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.06),_transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-5 md:items-center md:text-left">
          <div className="order-1 md:order-2 md:col-span-3">
            <figure className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
              <Image
                src={image?.src ?? "https://placehold.co/1280x720?text=Clevio"}
                alt={image ? t(image.alt, locale) : "Clevio hero illustration"}
                width={1280}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
              {eyebrow ? (
                <figcaption className="absolute inset-x-0 top-0 bg-gradient-to-b from-slate-900/40 to-transparent px-6 py-4 text-left text-sm font-medium text-white">
                  {t(eyebrow, locale)}
                </figcaption>
              ) : null}
            </figure>
          </div>
          <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:col-span-2 md:items-start">
            {priceBadge ? (
              <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {t(priceBadge, locale)}
              </span>
            ) : null}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{t(title, locale)}</h1>
              <p className="text-lg leading-7 text-slate-600">{t(subtitle, locale)}</p>
            </div>
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:items-stretch">
              <Button asChild className="w-full sm:w-auto">
                <a href={primaryCta.href}>{t(primaryCta.label, locale)}</a>
              </Button>
              {secondaryCta ? (
                <Button asChild variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-white sm:w-auto">
                  <a href={secondaryCta.href}>{t(secondaryCta.label, locale)}</a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

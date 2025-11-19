"use client";

import Image from "next/image";
import { LocalizedString, useLocale, t } from "./localization";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const isLocalAsset = (src?: string) => Boolean(src?.startsWith("/"));

type IconName = string;

function resolveIcon(name: IconName): LucideIcon {
  const formatted = name
    .split(/[-_ ]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  const Icon = (Icons as Record<string, LucideIcon>)[formatted];
  return Icon ?? Icons.Circle;
}

export function IconCardGrid({
  id,
  title,
  items,
  accentColor = "from-slate-100 to-white",
}: {
  id: string;
  title: LocalizedString;
  items: { id: string; en: string; icon: IconName }[];
  accentColor?: string;
}) {
  const { locale } = useLocale();

  return (
    <section id={id} className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = resolveIcon(item.icon);
            return (
              <div
                key={idx}
                className={`group flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br ${accentColor} p-6 transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-slate-500`}
              >
                <span className="rounded-full bg-white/70 p-3 text-slate-900 shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="text-base font-semibold text-slate-800">{locale === "en" ? item.en : item.id}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ImageTileGrid({
  id,
  title,
  items,
}: {
  id: string;
  title: LocalizedString;
  items: { title: LocalizedString; image: { src: string; alt: LocalizedString } }[];
}) {
  const { locale } = useLocale();

  return (
    <section id={id} className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <figure key={idx} className="group relative overflow-hidden rounded-3xl border border-slate-200">
              <Image
                src={item.image.src}
                alt={t(item.image.alt, locale)}
                width={640}
                height={400}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading={idx === 0 ? "eager" : "lazy"}
                unoptimized={isLocalAsset(item.image.src)}
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent p-6 text-lg font-semibold text-white">
                {t(item.title, locale)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const stepColumnClasses: Record<number, string> = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function StepStrip({
  id,
  title,
  steps,
  columns = steps.length,
}: {
  id: string;
  title: LocalizedString;
  steps: {
    title: LocalizedString;
    caption: LocalizedString;
    image: { src: string; alt: LocalizedString };
  }[];
  columns?: number;
}) {
  const { locale } = useLocale();
  const columnClass = stepColumnClasses[columns] ?? "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id={id} className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <div className={`mt-8 grid gap-6 ${columnClass}`}>
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative">
                <Image
                  src={step.image.src}
                  alt={t(step.image.alt, locale)}
                  width={256}
                  height={256}
                  className="h-32 w-32 rounded-2xl object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  unoptimized={isLocalAsset(step.image.src)}
                />
                <span className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{t(step.title, locale)}</h3>
              <p className="text-sm text-slate-600">{t(step.caption, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterGrid({
  id,
  title,
  items,
}: {
  id: string;
  title: LocalizedString;
  items: {
    title: LocalizedString;
    benefit: LocalizedString;
    beforeImage: { src: string; alt: LocalizedString };
    afterImage: { src: string; alt: LocalizedString };
  }[];
}) {
  const { locale } = useLocale();

  return (
    <section id={id} className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((item, idx) => (
            <article
              key={idx}
              className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-slate-900">{t(item.title, locale)}</h3>
              <div className="grid grid-cols-2 gap-3">
                <figure className="relative overflow-hidden rounded-2xl border border-slate-200">
                  <Image
                    src={item.beforeImage.src}
                    alt={t(item.beforeImage.alt, locale)}
                    width={512}
                    height={512}
                    className="h-full w-full object-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                    unoptimized={isLocalAsset(item.beforeImage.src)}
                  />
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    {locale === "en" ? "Before" : "Sebelum"}
                  </figcaption>
                </figure>
                <figure className="relative overflow-hidden rounded-2xl border border-slate-200">
                  <Image
                    src={item.afterImage.src}
                    alt={t(item.afterImage.alt, locale)}
                    width={512}
                    height={512}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    unoptimized={isLocalAsset(item.afterImage.src)}
                  />
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {locale === "en" ? "After" : "Sesudah"}
                  </figcaption>
                </figure>
              </div>
              <p className="text-sm font-medium text-slate-700">{t(item.benefit, locale)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InfographicRow({
  id,
  title,
  items,
  accentColor = "from-slate-900 via-slate-800 to-slate-900",
}: {
  id: string;
  title: LocalizedString;
  items: { title: LocalizedString; icon: IconName }[];
  accentColor?: string;
}) {
  const { locale } = useLocale();

  return (
    <section id={id} className="py-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br text-white shadow-lg">
        <div className={`rounded-3xl bg-gradient-to-br ${accentColor} px-4 py-10 sm:px-8`}>
          <h2 className="text-2xl font-semibold">{t(title, locale)}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div key={idx} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold">{t(item.title, locale)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

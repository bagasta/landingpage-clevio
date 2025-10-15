"use client";

import { Button } from "@/components/ui/button";
import { LocalizedString, useLocale, t } from "./localization";

export function ContactSection({
  title,
  body,
  cta,
}: {
  title: LocalizedString;
  body: LocalizedString;
  cta: { label: LocalizedString; href: string };
}) {
  const { locale } = useLocale();

  return (
    <section id="contact" className="bg-white py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <p className="mt-4 text-sm text-slate-600">{t(body, locale)}</p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <a href={cta.href}>{t(cta.label, locale)}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

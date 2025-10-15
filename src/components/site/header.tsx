"use client";

import Link from "next/link";
import { useLocale, t, LocalizedString, Locale } from "./localization";

interface AnchorNavItem {
  anchor: string;
  label: LocalizedString;
}

function BackArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" className="text-slate-600">
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BackToHome() {
  const { locale } = useLocale();
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-slate-600 transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
    >
      <BackArrowIcon />
      <span>{locale === "en" ? "Back Home" : "Kembali"}</span>
    </Link>
  );
}

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const options: Locale[] = ["id", "en"];

  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs shadow-sm" role="group" aria-label="Language toggle">
      {options.map((option) => {
        const active = locale === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            className={`rounded-full px-3 py-1 font-medium transition ${
              active ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
            }`}
            aria-pressed={active}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export function AnchorNav({ items }: { items: AnchorNavItem[] }) {
  const { locale } = useLocale();

  return (
    <nav aria-label="Section navigation" className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
      {items.map((item) => (
        <a
          key={item.anchor}
          href={`#${item.anchor}`}
          className="transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          {t(item.label, locale)}
        </a>
      ))}
    </nav>
  );
}

export function PageHeader({ items }: { items: AnchorNavItem[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <BackToHome />
        <AnchorNav items={items} />
        <LanguageToggle />
      </div>
    </header>
  );
}

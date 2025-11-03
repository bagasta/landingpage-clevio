'use client';

import { useState, useEffect, useRef } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

type Language = 'id' | 'en';

type ProgramKey = 'INNOVATOR_CAMP' | 'INNOVATOR_PRO' | 'AI_ASSISTANTS';

type ProgramCard = {
  program: ProgramKey;
  logo: string;
  href: string;
  buttonGradient: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  alt: Record<Language, string>;
  ctaLabel: Record<Language, string>;
};

const defaultProgramCards: ProgramCard[] = [
  {
    program: 'INNOVATOR_CAMP',
    logo: '/logo-innovator-camp.png',
    href: '/innovator-camp',
    buttonGradient: 'from-[#1c2974] to-[#1c2974] hover:from-black hover:to-black',
    title: {
      id: 'Innovator Camp',
      en: 'Innovator Camp',
    },
    description: {
      id: 'Program yang menumbuhkan kreativitas dan kepemimpinan inovator muda melalui eksperimen teknologi.',
      en: 'A program that grows young innovators by blending creativity, leadership, and hands-on technology experiments.',
    },
    alt: {
      id: 'Logo Innovator Camp',
      en: 'Innovator Camp Logo',
    },
    ctaLabel: {
      id: 'Pelajari Innovator Camp',
      en: 'Explore Innovator Camp',
    },
  },
  {
    program: 'INNOVATOR_PRO',
    logo: '/logo-innovator-pro.png',
    href: '/innovator-pro',
    buttonGradient: 'from-[#1c2974] to-[#1c2974] hover:from-black hover:to-black',
    title: {
      id: 'Innovator Pro',
      en: 'Innovator Pro',
    },
    description: {
      id: 'Pendampingan profesional untuk merancang inovasi berkelanjutan dan mengoptimalkan kerja dengan AI.',
      en: 'Professional guidance to design sustainable innovations while optimising work with AI.',
    },
    alt: {
      id: 'Logo Innovator Pro',
      en: 'Innovator Pro Logo',
    },
    ctaLabel: {
      id: 'Pelajari Innovator Pro',
      en: 'Explore Innovator Pro',
    },
  },
  {
    program: 'AI_ASSISTANTS',
    logo: '/logo-ai-assistants.png',
    href: '/ai-assistants',
    buttonGradient: 'from-[#1c2974] to-[#1c2974] hover:from-black hover:to-black',
    title: {
      id: 'Clevio AI Assistants',
      en: 'Clevio AI Assistants',
    },
    description: {
      id: 'Platform asisten AI yang berpihak pada manusia untuk mempercepat produktivitas tanpa kehilangan empati.',
      en: 'A human-first AI assistant platform that accelerates productivity without losing empathy.',
    },
    alt: {
      id: 'Logo Clevio AI Assistants',
      en: 'Clevio AI Assistants Logo',
    },
    ctaLabel: {
      id: 'Pelajari AI Assistants',
      en: 'Explore AI Assistants',
    },
  },
];

const copy: Record<Language, {
  principles: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreLabel: string;
  exploreLink: string;
}> = {
  id: {
    principles: 'Clever · Leverage · Human-Centric · Great Good',
    heroTitle: 'Berdayakan Manusia Berinovasi',
    heroSubtitle: 'Clevio Group menggerakkan inovasi cerdas dan berpusat pada manusia untuk menghadirkan solusi berarti bagi masa depan.',
    exploreLabel: 'Apa itu Clevio?',
    exploreLink: 'Mari jelajahi sekarang',
  },
  en: {
    principles: 'Clever · Leverage · Human-Centric · Great Good',
    heroTitle: 'Empowering People to Innovate',
    heroSubtitle: 'Clevio Group drives clever, human-centered innovation to deliver meaningful solutions for the future.',
    exploreLabel: 'What is Clevio?',
    exploreLink: "Let's explore now",
  },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('id');
  const [programCards, setProgramCards] = useState<ProgramCard[]>(defaultProgramCards);
  const [activeCard, setActiveCard] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getProgramSectionId = (program: ProgramKey) => `program-${program.toLowerCase()}`;

  const scrollToCard = (index: number) => {
    setActiveCard(index);
    cardRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadPrograms = async () => {
      try {
        const response = await fetch('/api/programs', { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load program content');
        }
        const data: Array<{
          program: ProgramKey;
          titleId: string;
          titleEn: string;
          descriptionId: string;
          descriptionEn: string;
          ctaLabelId: string;
          ctaLabelEn: string;
          imageAltId: string;
          imageAltEn: string;
        }> = await response.json();

        setProgramCards((prev) =>
          prev.map((card) => {
            const record = data.find((entry) => entry.program === card.program);
            if (!record) return card;
            return {
              ...card,
              title: {
                id: record.titleId,
                en: record.titleEn,
              },
              description: {
                id: record.descriptionId,
                en: record.descriptionEn,
              },
              alt: {
                id: record.imageAltId,
                en: record.imageAltEn,
              },
              ctaLabel: {
                id: record.ctaLabelId,
                en: record.ctaLabelEn,
              },
            } satisfies ProgramCard;
          })
        );
      } catch (error) {
        console.warn('Unable to load program content from API', error);
      }
    };

    loadPrograms();

    return () => controller.abort();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden font-sans bg-gradient-to-br from-white via-[#f6f7fb] to-[#e9ecf5]">
      <div className="fixed top-4 right-4 z-30 md:top-6 md:right-6">
        <div className="flex overflow-hidden rounded-full border border-black/10 bg-white/80 shadow-[0_8px_20px_-12px_rgba(28,41,116,0.45)] backdrop-blur-sm">
          {(['id', 'en'] as Language[]).map((lang) => {
            const isActive = language === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={isActive}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-widest transition ${
                  isActive
                    ? 'bg-[#1c2974] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                    : 'text-black/60 hover:text-black hover:bg-black/[0.04]'
                }`}
              >
                {lang === 'id' ? 'Indonesia' : 'English'}
              </button>
            );
          })}
        </div>
      </div>
      {/* Elegant Textured Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Fine mesh grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(28, 41, 116, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(28, 41, 116, 0.08) 1px, transparent 1px),
              linear-gradient(45deg, rgba(28, 41, 116, 0.06) 0.5px, transparent 0.5px),
              linear-gradient(-45deg, rgba(28, 41, 116, 0.06) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
            backgroundPosition: '0 0, 0 0, 20px 20px, 20px 20px'
          }}
        />

        {/* Subtle radial gradient for depth */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background: `
              radial-gradient(circle at 15% 20%, rgba(28, 41, 116, 0.16) 0%, transparent 55%),
              radial-gradient(circle at 85% 25%, rgba(28, 41, 116, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 50% 80%, rgba(28, 41, 116, 0.14) 0%, transparent 70%)
            `
          }}
        />

        {/* Micro-pattern dots */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(28, 41, 116, 0.16) 0.5px, transparent 0.5px),
              radial-gradient(circle at 75% 25%, rgba(28, 41, 116, 0.12) 0.5px, transparent 0.5px),
              radial-gradient(circle at 25% 75%, rgba(28, 41, 116, 0.16) 0.5px, transparent 0.5px),
              radial-gradient(circle at 75% 75%, rgba(28, 41, 116, 0.12) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '120px 120px, 120px 120px, 120px 120px, 120px 120px',
            backgroundPosition: '0 0, 60px 0, 0 60px, 60px 60px'
          }}
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(28, 41, 116, 0.18) 0%, transparent 45%),
              radial-gradient(circle at 78% 35%, rgba(28, 41, 116, 0.12) 0%, transparent 50%)
            `
          }}
        />
      </div>
      
      {/* Animated gradient overlay for futuristic feel */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(28,41,116,0.12),transparent_55%),radial-gradient(circle_at_72%_78%,rgba(28,41,116,0.1),transparent_55%)] opacity-50 animate-pulse"
        style={{ animationDuration: '14s' }}
      />

      {/* Outer frame */}
      <div className="pointer-events-none absolute inset-6 rounded-[48px] border border-white/30 backdrop-blur-sm" aria-hidden="true" />
      
      {/* Subtle floating particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-[#1c2974]/20 to-[#1c2974]/5 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-20 hidden min-h-screen flex-col items-center justify-center px-6 py-24 md:flex md:px-10">
        <div
          className={`hero-shell relative w-full max-w-4xl transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="pointer-events-none absolute -inset-[4px] rounded-[42px] border border-black/5 bg-gradient-to-br from-white/60 via-white/30 to-white/10 opacity-80 backdrop-blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-20 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#1c2974]/25 via-[#1c2974]/10 to-transparent blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-36 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-t from-[#1c2974]/30 via-[#1c2974]/15 to-transparent blur-[120px]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[38px] border border-black/[0.05] bg-white/80 px-8 py-16 text-center shadow-[0_40px_90px_-45px_rgba(28,41,116,0.45)] backdrop-blur-[80px] sm:px-12">
            <div
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#1c2974]/30 to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center text-center">
              <span
                className={`${poppins.className} text-xs uppercase tracking-[0.65em] text-[#1c2974] md:text-sm`}
              >
                {copy[language].principles}
              </span>
              <h1
                className={`${poppins.className} mt-6 text-3xl font-semibold tracking-tight text-black sm:text-4xl md:text-5xl`}
              >
                {copy[language].heroTitle}
              </h1>
              <p
                className={`${poppins.className} mt-6 max-w-3xl text-[2px] text-black/70 sm:text-lg`}
              >
                {copy[language].heroSubtitle}
              </p>
            </div>
          </div>
        </div>

        <div
          id="learn-more"
          className={`mt-16 grid w-full max-w-5xl gap-8 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } md:grid-cols-3`}
        >
          {programCards.map((card) => (
            <div
              key={card.href}
              id={getProgramSectionId(card.program)}
              className="card-panel group relative z-10 flex h-full flex-col rounded-[28px] border border-black/5 bg-white/80 p-8 text-center shadow-[0_25px_60px_-45px_rgba(28,41,116,0.55)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#1c2974]/20 hover:shadow-[0_35px_85px_-40px_rgba(28,41,116,0.6)] md:p-10"
            >
              <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-black/5 bg-gradient-to-br from-white/70 via-white/40 to-white/10 shadow-[0_20px_45px_-30px_rgba(28,41,116,0.6)] backdrop-blur-xl transition duration-300 group-hover:scale-105">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-80" />
                <img
                  src={card.logo}
                  alt={card.alt[language]}
                  className="relative z-10 h-16 w-auto max-w-[6.5rem] object-contain sm:h-20 sm:max-w-[8rem]"
                />
              </div>
              <h3 className={`${poppins.className} text-lg font-semibold text-[#1c2974]`}> 
                {card.title[language]}
              </h3>
              <p className={`${poppins.className} flex-1 text-sm leading-relaxed text-black/70 sm:text-base`}>
                {card.description[language]}
              </p>
              <a
                href={card.href}
                className={`${poppins.className} mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(28,41,116,0.55)] transition duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 active:scale-95 ${card.buttonGradient}`}
              >
                {card.ctaLabel[language]}
              </a>
            </div>
          ))}
        </div>

        <div
          className={`mt-20 text-center transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className={`${poppins.className} text-sm text-black/70 sm:text-base`}>
            {copy[language].exploreLabel}{' '}
            <a
              href="#learn-more"
              className="relative font-semibold text-[#1c2974] transition hover:text-black"
            >
              {copy[language].exploreLink}
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#1c2974]/40 to-transparent opacity-60" />
            </a>
          </p>
        </div>
      </div>

      <div className="relative z-20 flex min-h-screen flex-col px-4 py-6 md:hidden">
        <div
          className={`hero-shell relative mt-16 mb-14 pb-16 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="pointer-events-none absolute -inset-[4px] rounded-[32px] border border-black/5 bg-gradient-to-br from-white/60 via-white/30 to-white/10 opacity-80 backdrop-blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-12 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#1c2974]/25 via-[#1c2974]/10 to-transparent blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 left-1/2 h-24 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-t from-[#1c2974]/30 via-[#1c2974]/15 to-transparent blur-[80px]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.05] bg-white/80 px-6 py-12 text-center shadow-[0_40px_90px_-45px_rgba(28,41,116,0.45)] backdrop-blur-[80px]">
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#1c2974]/30 to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center text-center">
              <span
                className={`${poppins.className} text-[7px] font-medium uppercase tracking-[0.5em] text-[#1c2974]`}
              >
                {copy[language].principles}
              </span>
              <h1
                className={`${poppins.className} mt-4 text-2xl font-semibold leading-tight tracking-tight text-black`}
              >
                {copy[language].heroTitle}
              </h1>
              <p
               className={`${poppins.className} mt-4 max-w-md leading-relaxed text-black/70 text-[10px]`}
                            >
                     {copy[language].heroSubtitle}
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                {programCards.map((card, index) => (
                  <button
                    key={`${card.program}-mobile`}
                    type="button"
                    onClick={() => scrollToCard(index)}
                    aria-pressed={activeCard === index}
                    className={`flex flex-col items-center gap-2 transition-all duration-200 ${
                      activeCard === index ? 'scale-105' : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all shadow-[0_8px_20px_-10px_rgba(28,41,116,0.4)] ${
                        activeCard === index
                          ? 'border-[#1c2974] bg-[#1c2974]/10 shadow-lg'
                          : 'border-black/10 bg-white hover:border-[#1c2974]/30'
                      }`}
                    >
                      <img
                        src={card.logo}
                        alt={card.alt[language]}
                        className="h-10 w-auto max-w-[3.5rem] object-contain"
                      />
                    </div>
                    <span
                      className={`text-[9px] font-medium uppercase tracking-wider ${
                        activeCard === index ? 'text-[#1c2974]' : 'text-black/50'
                      }`}
                    >
                      {index === 0 ? 'Camp' : index === 1 ? 'Pro' : 'AI'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 pb-8">
          {programCards.map((card, index) => (
            <div
              key={card.href}
              id={getProgramSectionId(card.program)}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`card-panel relative flex flex-col rounded-3xl border bg-white/80 p-6 text-center shadow-[0_25px_60px_-45px_rgba(28,41,116,0.55)] backdrop-blur-2xl transition-all duration-300 ${
                activeCard === index
                  ? 'border-[#1c2974]/20 shadow-[0_35px_85px_-40px_rgba(28,41,116,0.6)]'
                  : 'border-black/5'
              }`}
            >
              <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-black/5 bg-gradient-to-br from-white/70 via-white/40 to-white/10 shadow-[0_20px_45px_-30px_rgba(28,41,116,0.6)] backdrop-blur-xl">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-80" />
                <img
                  src={card.logo}
                  alt={card.alt[language]}
                  className="relative z-10 h-12 w-auto max-w-[5rem] object-contain"
                />
              </div>
              <h3 className={`${poppins.className} text-lg font-semibold text-[#1c2974]`}>
                {card.title[language]}
              </h3>
              <p className={`${poppins.className} mt-2 flex-1 text-sm leading-relaxed text-black/70`}>
                {card.description[language]}
              </p>
              <a
                href={card.href}
                className={`${poppins.className} mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(28,41,116,0.55)] transition duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 active:scale-95 ${card.buttonGradient}`}
              >
                {card.ctaLabel[language]}
              </a>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 mb-4 text-center transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className={`${poppins.className} text-sm text-black/70`}>
            {copy[language].exploreLabel}{' '}
            <button
              type="button"
              onClick={() => scrollToCard(0)}
              className="relative font-semibold text-[#1c2974] transition hover:text-black"
            >
              {copy[language].exploreLink}
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#1c2974]/40 to-transparent opacity-60" />
            </button>
          </p>
        </div>
      </div>

      {/* Enhanced animation styles */}
      <style jsx>{`
        @keyframes gentle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }

        @keyframes halo {
          0% { opacity: 0; transform: translateY(24px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes float-in {
          0% { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hero-shell {
          animation: halo 1s ease-out both, gentle-breathe 12s ease-in-out infinite 1.2s;
        }

        .card-panel {
          animation: float-in 0.85s ease-out both;
        }

        .card-panel:nth-of-type(2) {
          animation-delay: 0.12s;
        }

        .card-panel:nth-of-type(3) {
          animation-delay: 0.24s;
        }
      `}</style>
    </main>
  );
}

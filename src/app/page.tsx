'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const offeringCards = [
  {
    logo: '/logo-innovator-camp.png',
    alt: 'Innovator Camp Logo',
    description:
      'Program yang menumbuhkan kreativitas anak dan remaja melalui teknologi digital.',
    href: '/innovator-camp',
    buttonGradient: 'from-[#1c2974] to-[#1c2974] hover:from-black hover:to-black',
  },
   {
    logo: '/logo-innovator-pro.png',
    alt: 'Innovator Pro Logo',
    description:
      'Program pengembangan profesional untuk berinovasi dan bekerja cerdas dengan AI.',
    href: '/innovator-pro',
    buttonGradient: 'from-[#1c2974] to-[#1c2974] hover:from-black hover:to-black',
  },
  {
    logo: '/logo-ai-assistants.png',
    alt: 'AI Assistants Logo',
    description:
      'Platform untuk menciptakan asisten digital yang membantu manusia berinovasi dan berkarya.',
    href: '/ai-assistants',
    buttonGradient: 'from-[#1c2974] to-[#1c2974] hover:from-black hover:to-black',
  },
 
] as const;

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden font-sans bg-gradient-to-br from-white via-[#f6f7fb] to-[#e9ecf5]">
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

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-24 md:px-10">
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
                Clever . Leverage . Human-Centric . Great Good
              </span>
              <h1
                className={`${poppins.className} mt-6 text-3xl font-semibold tracking-tight text-black sm:text-4xl md:text-5xl`}
              >
                Empowering Humanity Through Clever Innovation
              </h1>
              <p
                className={`${poppins.className} mt-6 max-w-3xl text-base text-black/70 sm:text-lg`}
              >
                Clevio Group menggerakkan inovasi cerdas dan manusiawi untuk kebaikan bersama.
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
          {offeringCards.map((card, index) => (
            <div
              key={card.href}
              className="card-panel group relative z-10 flex h-full flex-col rounded-[28px] border border-black/5 bg-white/80 p-8 text-center shadow-[0_25px_60px_-45px_rgba(28,41,116,0.55)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#1c2974]/20 hover:shadow-[0_35px_85px_-40px_rgba(28,41,116,0.6)] md:p-10"
            >
              <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-black/5 bg-gradient-to-br from-white/70 via-white/40 to-white/10 shadow-[0_20px_45px_-30px_rgba(28,41,116,0.6)] backdrop-blur-xl transition duration-300 group-hover:scale-105">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-80" />
                <img src={card.logo} alt={card.alt} className="relative z-10 h-14 w-auto sm:h-16" />
              </div>
              <p className={`${poppins.className} flex-1 text-sm leading-relaxed text-black/70 sm:text-base`}>
                {card.description}
              </p>
              <a
                href={card.href}
                className={`${poppins.className} mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(28,41,116,0.55)] transition duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 active:scale-95 ${card.buttonGradient}`}
              >
                Explore
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
            What is Clevio?{' '}
            <a
              href="#learn-more"
              className="relative font-semibold text-[#1c2974] transition hover:text-black"
            >
              Let&apos;s explore now
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#1c2974]/40 to-transparent opacity-60" />
            </a>
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

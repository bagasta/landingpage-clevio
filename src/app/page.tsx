'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type Point = { x: number; y: number };

type BranchGeometry = {
  path: string;
  end: Point;
};

type ConnectorGeometry = {
  width: number;
  height: number;
  start: Point;
  junction: Point;
  trunk: string;
  branches: BranchGeometry[];
};

const offeringCards = [
  {
    logo: '/logo-innovator-camp.png',
    alt: 'Innovator Camp Logo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/innovator-camp',
    buttonGradient: 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
  },
  {
    logo: '/logo-ai-assistants.png',
    alt: 'AI Assistants Logo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/ai-assistants',
    buttonGradient: 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700',
  },
  {
    logo: '/logo-innovator-pro.png',
    alt: 'Innovator Pro Logo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/innovator-pro',
    buttonGradient: 'from-lime-400 to-emerald-600 hover:from-lime-500 hover:to-emerald-700',
  },
] as const;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainNodeRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geometryUpdateRef = useRef<() => void>();
  const [geometry, setGeometry] = useState<ConnectorGeometry | null>(null);

  const setChildRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      childRefs.current[index] = node;
      if (node) {
        requestAnimationFrame(() => {
          geometryUpdateRef.current?.();
        });
      }
    },
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateGeometry = () => {
      const container = containerRef.current;
      const mainNode = mainNodeRef.current;
      const children = childRefs.current.filter((node): node is HTMLDivElement => Boolean(node));

      if (!container || !mainNode || children.length === 0) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const mainRect = mainNode.getBoundingClientRect();

      const start: Point = {
        x: mainRect.left + mainRect.width / 2 - containerRect.left,
        y: mainRect.bottom - containerRect.top,
      };

      const childPoints = children.map((child) => {
        const rect = child.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top - containerRect.top,
        };
      });

      if (!childPoints.length) {
        return;
      }

      const minChildY = Math.min(...childPoints.map((point) => point.y));
      const junctionY = Math.max(start.y + 24, minChildY - 48);
      const junction: Point = { x: start.x, y: junctionY };

      const trunk = `M ${start.x} ${start.y} L ${junction.x} ${junction.y}`;

      const branches: BranchGeometry[] = childPoints.map((point) => {
        const controlX = (junction.x + point.x) / 2;
        const controlY = (junction.y + point.y) / 2;
        return {
          path: `M ${junction.x} ${junction.y} Q ${controlX} ${controlY} ${point.x} ${point.y}`,
          end: point,
        };
      });

      setGeometry({
        width: containerRect.width,
        height: containerRect.height,
        start,
        junction,
        trunk,
        branches,
      });
    };

    geometryUpdateRef.current = updateGeometry;
    updateGeometry();

    const handleResize = () => {
      requestAnimationFrame(updateGeometry);
    };

    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateGeometry);
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      if (mainNodeRef.current) {
        resizeObserver.observe(mainNodeRef.current);
      }
      childRefs.current.forEach((node) => {
        if (node) {
          resizeObserver?.observe(node);
        }
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
    };
  }, [mounted]);

  return (
    <main className="min-h-screen bg-white overflow-hidden relative font-sans">
      {/* Elegant Textured Background */}
      <div className="absolute inset-0">
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Fine mesh grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(0deg,rgb(60, 82, 124) 1px, transparent 1px),
              linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
              linear-gradient(45deg, #d1d5db 0.5px, transparent 0.5px),
              linear-gradient(-45deg, #d1d5db 0.5px, transparent 0.5px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
            backgroundPosition: '0 0, 0 0, 20px 20px, 20px 20px'
          }}
        />

        {/* Subtle radial gradient for depth */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #f8fafc 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, #f1f5f9 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, #fefefe 0%, transparent 70%)
            `
          }}
        />

        {/* Micro-pattern dots */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #9ca3af 0.5px, transparent 0.5px),
              radial-gradient(circle at 75% 25%, #9ca3af 0.5px, transparent 0.5px),
              radial-gradient(circle at 25% 75%, #9ca3af 0.5px, transparent 0.5px),
              radial-gradient(circle at 75% 75%, #9ca3af 0.5px, transparent 0.5px)
            `,
            backgroundSize: '120px 120px, 120px 120px, 120px 120px, 120px 120px',
            backgroundPosition: '0 0, 60px 0, 0 60px, 60px 60px'
          }}
        />
      </div>
      
      {/* Animated gradient overlay for futuristic feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Subtle floating particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"
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

      <div
        ref={containerRef}
        className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-24 md:px-10"
      >
        {geometry ? (
          <svg
            className="pointer-events-none absolute inset-0 hidden md:block z-0"
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            preserveAspectRatio="none"
          >
            <path
              d={geometry.trunk}
              stroke="#22367b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.85"
            />
            {geometry.branches.map((branch, index) => (
              <path
                key={`branch-${index}`}
                d={branch.path}
                stroke="#22367b"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.85"
              />
            ))}
            <circle cx={geometry.start.x} cy={geometry.start.y} r="5" fill="#22367b" opacity="0.6" />
            <circle cx={geometry.junction.x} cy={geometry.junction.y} r="4" fill="#22367b" opacity="0.4" />
            {geometry.branches.map((branch, index) => (
              <circle key={`branch-end-${index}`} cx={branch.end.x} cy={branch.end.y} r="6" fill="#22367b" opacity="0.85" />
            ))}
          </svg>
        ) : null}

        <div
          ref={mainNodeRef}
          className={`relative w-full max-w-2xl border-slate-100 bg-white px-10 py-12 text-center shadow-xl transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/60 via-white to-purple-50/40" />
          <div className="relative flex flex-col items-center gap-6">
            <img
              src="/logo-clevio-main.png"
              alt="Clevio Logo"
              className="h-50 w-auto md:h-50"
            />
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
             Clevio Group adalah organisasi yang berdiri di atas empat prinsip utama: Clever, Leverage, Human-Centric, dan Great Good. Setiap langkah yang diambil Clevio berfokus pada cara berpikir yang cerdik dan berorientasi pada kemanusiaan, menciptakan teknologi yang bukan hanya inovatif tetapi juga bermakna bagi kehidupan. Dengan semangat untuk memberdayakan manusia melalui pembelajaran, kreativitas, dan teknologi, Clevio berkomitmen membangun ekosistem yang mendorong lahirnya industri baru serta memberikan kontribusi nyata bagi kebaikan bersama dan masa depan yang berkelanjutan.
            </p>
          </div>
        </div>

        <div
          className={`mt-16 grid w-full max-w-5xl gap-8 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } md:grid-cols-3`}
        >
          {offeringCards.map((card, index) => (
            <div
              key={card.href}
              ref={setChildRef(index)}
              className="relative z-10 flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10"
            >
              <div className="mb-6 flex justify-center">
                <img src={card.logo} alt={card.alt} className="h-20 w-auto md:h-24" />
              </div>
              <p className="flex-1 text-sm leading-relaxed text-slate-600">
                {card.description}
              </p>
              <a
                href={card.href}
                className={`mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 active:scale-95 ${card.buttonGradient}`}
              >
                Explore
              </a>
            </div>
          ))}
        </div>

        <div
          className={`mt-20 transition-all duration-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 md:text-base">
            INNOVATION AT YOUR FINGERTIPS
          </p>
        </div>
      </div>

      {/* Enhanced animation styles */}
      <style jsx>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes gentle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        /* Enhanced hover effects */
        .hover\\:-translate-y-3:hover {
          animation: subtle-float 6s ease-in-out infinite;
        }
        
        /* Background pattern animation */
        @keyframes pattern-drift {
          0% { background-position: 0 0, 30px 30px, 0 0, 20px 20px; }
          100% { background-position: 60px 60px, 90px 90px, 40px 40px, 60px 60px; }
        }
        
        /* Performance optimizations */
        .transform {
          will-change: transform;
        }
        
        /* Enhanced shadow effects */
        .shadow-xl {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .hover\\:shadow-xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </main>
  );
}

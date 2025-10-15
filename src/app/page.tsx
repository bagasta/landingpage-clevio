'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          className="absolute inset-0 opacity-[0.02]"
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

      {/* Connection Lines - BEHIND ALL NODES with perfect alignment */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-13">
        {/* Desktop lines - refined for consistent theming */}
        <svg className="absolute w-full h-full hidden lg:block" style={{ width: '1400px', height: '680px', left: '-700px', top: '-505px' }}>
          {/* Vertical trunk to connect the main node */}
          <path
            id="desktopLineTrunk"
            d="M 700 170 L 700 240"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-lg"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Left connection line */}
          <path
            id="desktopLineLeft"
            d="M 700 240 Q 690 360, 220 560"
            stroke="#22367b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-lg"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="220"
            cy="560"
            r="6"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-lg"
          >
            <animate
              attributeName="r"
              values="6;8;6"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill="#22367b" opacity="0.7">
            <animateMotion dur="3.5s" repeatCount="indefinite">
              <mpath xlinkHref="#desktopLineLeft" />
            </animateMotion>
          </circle>
          
          {/* Center connection line */}
          <path
            id="desktopLineCenter"
            d="M 700 240 Q 690 360, 700 560"
            stroke="#22367b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-lg"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3.5s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="700"
            cy="560"
            r="6"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-lg"
          >
            <animate
              attributeName="r"
              values="6;8;6"
              dur="2s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill="#22367b" opacity="0.7">
            <animateMotion dur="3.5s" begin="0.2s" repeatCount="indefinite">
              <mpath xlinkHref="#desktopLineCenter" />
            </animateMotion>
          </circle>
          
          {/* Right connection line */}
          <path
            id="desktopLineRight"
            d="M 700 240 Q 690 360, 1195 560"
            stroke="#22367b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-lg"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3.5s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="1200"
            cy="560"
            r="6"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-lg"
          >
            <animate
              attributeName="r"
              values="6;8;6"
              dur="2s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill="#22367b" opacity="0.7">
            <animateMotion dur="3.5s" begin="0.4s" repeatCount="indefinite">
              <mpath xlinkHref="#desktopLineRight" />
            </animateMotion>
          </circle>
          <circle cx="700" cy="240" r="5" fill="#22367b" opacity="0.6" className="drop-shadow">
            <animate
              attributeName="opacity"
              values="0.5;0.8;0.5"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Tablet lines - refined for consistent theming */}
        <svg className="absolute w-full h-full hidden md:block lg:hidden" style={{ width: '900px', height: '680px', left: '-450px', top: '-340px' }}>
          {/* Vertical trunk */}
          <path
            id="tabletLineTrunk"
            d="M 450 160 L 450 230"
            stroke="#22367b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-md"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          {/* Left connection line */}
          <path
            id="tabletLineLeft"
            d="M 450 230 Q 340 340, 160 520"
            stroke="#22367b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-md"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="160"
            cy="520"
            r="5"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-md"
          >
            <animate
              attributeName="r"
              values="5;7;5"
              dur="1.9s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#22367b" opacity="0.7">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath xlinkHref="#tabletLineLeft" />
            </animateMotion>
          </circle>
          
          {/* Center connection line */}
          <path
            id="tabletLineCenter"
            d="M 450 230 Q 440 340, 450 520"
            stroke="#22367b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-md"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="450"
            cy="520"
            r="5"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-md"
          >
            <animate
              attributeName="r"
              values="5;7;5"
              dur="1.9s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#22367b" opacity="0.7">
            <animateMotion dur="3s" begin="0.2s" repeatCount="indefinite">
              <mpath xlinkHref="#tabletLineCenter" />
            </animateMotion>
          </circle>
          
          {/* Right connection line */}
          <path
            id="tabletLineRight"
            d="M 450 230 Q 560 340, 740 520"
            stroke="#22367b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-md"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="3s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="740"
            cy="520"
            r="5"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-md"
          >
            <animate
              attributeName="r"
              values="5;7;5"
              dur="1.9s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#22367b" opacity="0.7">
            <animateMotion dur="3s" begin="0.4s" repeatCount="indefinite">
              <mpath xlinkHref="#tabletLineRight" />
            </animateMotion>
          </circle>
          <circle cx="450" cy="230" r="4.5" fill="#22367b" opacity="0.6" className="drop-shadow">
            <animate
              attributeName="opacity"
              values="0.5;0.8;0.5"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Mobile lines - direct straight lines from main card to child cards */}
        <svg className="absolute w-full h-full md:hidden" style={{ width: '320px', height: '720px', left: '-160px', top: '-360px' }}>
          {/* Vertical trunk */}
          <path
            id="mobileLineTrunk"
            d="M 150 130 L 150 190"
            stroke="#22367b"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-sm"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>

          {/* Direct line to left card */}
          <path
            id="mobileLineLeft"
            d="M 150 190 L 80 630"
            stroke="#22367b"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-sm"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="80"
            cy="630"
            r="4"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-sm"
          >
            <animate
              attributeName="r"
              values="4;6;4"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#22367b" opacity="0.7">
            <animateMotion dur="2.8s" repeatCount="indefinite">
              <mpath xlinkHref="#mobileLineLeft" />
            </animateMotion>
          </circle>

          {/* Direct line to center card */}
          <path
            id="mobileLineCenter"
            d="M 150 190 L 150 630"
            stroke="#22367b"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-sm"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="2.8s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="150"
            cy="630"
            r="4"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-sm"
          >
            <animate
              attributeName="r"
              values="4;6;4"
              dur="1.6s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#22367b" opacity="0.7">
            <animateMotion dur="2.8s" begin="0.2s" repeatCount="indefinite">
              <mpath xlinkHref="#mobileLineCenter" />
            </animateMotion>
          </circle>

          {/* Direct line to right card */}
          <path
            id="mobileLineRight"
            d="M 150 190 L 220 630"
            stroke="#22367b"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-sm"
            strokeOpacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.75;0.95;0.75"
              dur="2.8s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="220"
            cy="630"
            r="4"
            fill="#22367b"
            opacity="0.85"
            className="drop-shadow-sm"
          >
            <animate
              attributeName="r"
              values="4;6;4"
              dur="1.6s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#22367b" opacity="0.7">
            <animateMotion dur="2.8s" begin="0.4s" repeatCount="indefinite">
              <mpath xlinkHref="#mobileLineRight" />
            </animateMotion>
          </circle>
          <circle cx="150" cy="190" r="4" fill="#22367b" opacity="0.6" className="drop-shadow-sm">
            <animate
              attributeName="opacity"
              values="0.5;0.8;0.5"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Main container with optimal spacing */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6 md:p-10">
        
        {/* Main Clevio Node - Increased spacing below */}
        <div className={`relative mb-32 md:mb-40 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 px-16 py-10 md:px-20 md:py-12 border border-gray-100" style={{ width: '450px', height: '220px' }}>
            {/* Subtle gradient overlay for elegance */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50/50 to-purple-50/50" />
            
            {/* Network/Hierarchy icon at top */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22367b" strokeWidth="2.5">
                <circle cx="12" cy="5" r="3"/>
                <circle cx="5" cy="19" r="3"/>
                <circle cx="19" cy="19" r="3"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="17" x2="5" y2="19"/>
                <line x1="16" y1="17" x2="19" y2="19"/>
              </svg>
            </div>
            
            <div className="text-center mt-10 z-10 relative">
              {/* Logo/Brand */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#22367b] mb-4 tracking-tight">
                clevio
              </h1>
              
              {/* Tagline */}
              <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide">
                Clever . Leverage . Input . Output
              </p>
            </div>
          </div>
        </div>

        {/* Child Cards Container - Increased spacing between cards */}
        <div className={`flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-32 items-center justify-center w-full max-w-8xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-24 md:mt-28`}>
          
          {/* Left Card - Innovator Camp */}
          <div 
            className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-sm border border-gray-100"
            style={{ zIndex: 10 }}
          >
            {/* Light bulb icon */}
            <div className="flex justify-center mb-6 relative z-10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22367b" strokeWidth="2.5">
                <path d="M12 2v7m0 0a4 4 0 1 0 0 8c1.5 0 2.9-.6 3.9-1.7"/>
                <path d="M12 9v3"/>
                <path d="M8 21h8"/>
                <path d="M12 17v4"/>
              </svg>
            </div>
            
            <div className="text-center relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#22367b] mb-4 uppercase tracking-wide">
                clevio INNOVATOR CAMP
              </h3>
              
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <button 
                onClick={() => window.location.href = '/innovator-camp'}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-full transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Explore
              </button>
            </div>
          </div>

          {/* Center Card - AI Assistants */}
          <div 
            className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-sm border border-gray-100"
            style={{ zIndex: 10 }}
          >
            {/* AI/Robot icon */}
            <div className="flex justify-center mb-6 relative z-10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22367b" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            
            <div className="text-center relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#22367b] mb-4 uppercase tracking-wide">
                clevio AI ASSISTANTS
              </h3>
              
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <button 
                onClick={() => window.location.href = '/ai-assistants'}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Explore
              </button>
            </div>
          </div>

          {/* Right Card - Innovator Pro */}
          <div 
            className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-sm border border-gray-100"
            style={{ zIndex: 10 }}
          >
            {/* Lightning bolt icon */}
            <div className="flex justify-center mb-6 relative z-10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22367b" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            
            <div className="text-center relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#22367b] mb-4 uppercase tracking-wide">
                clevio INNOVATOR PRO
              </h3>
              
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <button 
                onClick={() => window.location.href = '/innovator-pro'}
                className="bg-gradient-to-r from-lime-400 to-emerald-600 hover:from-lime-500 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-full transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Footer Text - Optimized spacing */}
        <div className={`mt-20 md:mt-24 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm md:text-base text-gray-500 uppercase tracking-widest font-light">
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

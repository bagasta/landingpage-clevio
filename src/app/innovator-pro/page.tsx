'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function InnovatorPro() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-emerald-50 overflow-hidden relative font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #84cc16 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #10b981 1px, transparent 1px),
            linear-gradient(45deg, #84cc16 1px, transparent 1px),
            linear-gradient(-45deg, #10b981 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 30px 30px, 0 0, 20px 20px'
        }} />
      </div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6 md:p-10">
        {/* Back Button */}
        <div className={`absolute top-8 left-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-lime-600 hover:text-lime-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        {/* Main Content */}
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-lime-600 mb-6 tracking-tight">
            clevio INNOVATOR PRO
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-lime-100">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Premium Tools</h3>
              <p className="text-sm text-gray-600">Advanced professional-grade features</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-lime-100">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Enterprise Security</h3>
              <p className="text-sm text-gray-600">Bank-level security for your data</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-lime-100">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Priority Support</h3>
              <p className="text-sm text-gray-600">Dedicated assistance for professionals</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-lime-500 to-emerald-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Go Professional</h2>
            <p className="text-lg mb-6 opacity-90">Unlock the full potential of professional innovation</p>
            <button className="bg-white text-lime-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AIAssistants() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 overflow-hidden relative font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #06b6d4 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #3b82f6 1px, transparent 1px),
            linear-gradient(45deg, #06b6d4 1px, transparent 1px),
            linear-gradient(-45deg, #3b82f6 1px, transparent 1px)
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
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        {/* Main Content */}
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-600 mb-6 tracking-tight">
            clevio AI ASSISTANTS
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-cyan-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Automation</h3>
              <p className="text-sm text-gray-600">AI-powered solutions for everyday tasks</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-cyan-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Natural Language</h3>
              <p className="text-sm text-gray-600">Conversational AI that understands you</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-cyan-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 9.96l4.24 4.24M1.54 14.04l4.24-4.24M18.46 14.04l4.24-4.24"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always available when you need assistance</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience AI Power</h2>
            <p className="text-lg mb-6 opacity-90">Transform your workflow with intelligent assistants</p>
            <button className="bg-white text-cyan-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg">
              Try Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
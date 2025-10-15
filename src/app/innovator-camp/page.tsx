'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function InnovatorCamp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 overflow-hidden relative font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #f59e0b 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #ea580c 1px, transparent 1px),
            linear-gradient(45deg, #f59e0b 1px, transparent 1px),
            linear-gradient(-45deg, #ea580c 1px, transparent 1px)
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
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        {/* Main Content */}
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2v7m0 0a4 4 0 1 0 0 8c1.5 0 2.9-.6 3.9-1.7"/>
                <path d="M12 9v3"/>
                <path d="M8 21h8"/>
                <path d="M12 17v4"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-orange-600 mb-6 tracking-tight">
            clevio INNOVATOR CAMP
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hands-on Learning</h3>
              <p className="text-sm text-gray-600">Practical experience with cutting-edge technologies</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Mentorship</h3>
              <p className="text-sm text-gray-600">Learn from industry professionals and experts</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Collaborative Projects</h3>
              <p className="text-sm text-gray-600">Work together on innovative solutions</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Innovate?</h2>
            <p className="text-lg mb-6 opacity-90">Join our next camp and transform your ideas into reality</p>
            <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
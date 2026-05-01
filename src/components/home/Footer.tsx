'use client';

import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="relative w-full bg-black pt-32 pb-10 md:pt-48 md:pb-10 px-4 md:px-10 overflow-hidden">
      {/* Noise Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: `url("/assets/noise bg.png")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* Left Content */}
          <div className="flex flex-col h-full">
            <span className="font-sans font-medium text-[13px] tracking-[0.1em] text-white/40 uppercase mb-10">
              LET&apos;S TALK ABOUT WHAT IS NEXT!
            </span>
            <h2 className="font-serif italic text-white text-[40px] md:text-[56px] leading-[1.1] max-w-[800px] mb-12 lg:mb-0">
              Great products aren&apos;t just<br />
              about what you make - they&apos;re<br />
              about who you make it with.
            </h2>
          </div>

          {/* Right Contact Form Card - Dark Mode */}
          <div className="bg-[#0A0A0A] border border-white/[0.08] p-10 w-full max-w-[580px] lg:ml-auto">
            <form className="space-y-8">
              <div>
                <input 
                  type="text" 
                  placeholder="Enter your legal or nick name"
                  className="w-full bg-transparent border border-white/10 px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-sans text-[15px]"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border border-white/10 px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-sans text-[15px]"
                />
              </div>
              <div>
                <textarea 
                  rows={5}
                  placeholder="Type your message here"
                  className="w-full bg-transparent border border-white/10 px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-sans text-[15px] resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-5 border border-white text-white bg-transparent font-sans font-bold tracking-[0.15em] text-[13px] uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                HIT ME UP
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar - 40px Margin Alignment */}
        <div className="flex flex-row justify-between items-end mt-24 lg:mt-48 pt-0">
          
          {/* Say Hello & Socials */}
          <div className="flex items-center space-x-6">
            <span className="font-serif italic text-[20px] text-white">Say Hello!</span>
            <div className="flex space-x-4">
              <a href="#" className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/90 transition-all">
                <Twitter size={18} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/90 transition-all">
                <Linkedin size={18} fill="currentColor" strokeWidth={0} />
              </a>
            </div>
          </div>
          
          <span className="font-sans text-[13px] text-white/50 uppercase tracking-[0.1em] text-right">
            © {currentYear} NSIKAN ETUKUDOH
          </span>
        </div>
      </div>
    </section>
  );
}

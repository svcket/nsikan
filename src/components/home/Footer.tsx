'use client';

import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Deliberate 3s delay for the industrial "loading" feel requested
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const response = await fetch("https://formspree.io/f/mzdovjpw", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('idle');
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="footer" className="relative w-full bg-black pt-32 pb-10 md:pt-48 md:pb-10 px-4 md:px-10 overflow-hidden">
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
          <div className="bg-[#0A0A0A] border border-white/[0.08] p-10 w-full max-w-[580px] lg:ml-auto rounded-none">
            {status === 'success' ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
                <h3 className="font-serif italic text-white text-[32px] mb-4">Thank You!</h3>
                <p className="text-white/50 font-sans text-[15px] max-w-[300px]">
                  Your message has been received. I&apos;ll get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-10 text-[11px] tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Enter your legal or nick name"
                    className="w-full bg-transparent border border-white/10 px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-sans text-[15px] rounded-none"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-transparent border border-white/10 px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-sans text-[15px] rounded-none"
                  />
                </div>
                <div>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    placeholder="Type your message here"
                    className="w-full bg-transparent border border-white/10 px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-sans text-[15px] resize-none rounded-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 border border-white text-white bg-transparent font-sans font-bold tracking-[0.15em] text-[13px] uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-none disabled:opacity-50 disabled:cursor-wait"
                >
                  {status === 'loading' ? 'SENDING...' : 'HIT ME UP'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar - 40px Margin Alignment */}
        <div className="flex flex-row justify-between items-end mt-24 lg:mt-48 pt-0">
          
          {/* Say Hello & Socials */}
          <div className="flex items-center space-x-6">
            <span className="font-serif italic text-[20px] text-white">Say Hello!</span>
            <div className="flex space-x-4">
              <a href="https://x.com/_svcket" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white flex items-center justify-center text-black hover:bg-white/90 transition-all rounded-none">
                <Twitter size={18} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="https://www.linkedin.com/in/nsikanetukudoh/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white flex items-center justify-center text-black hover:bg-white/90 transition-all rounded-none">
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

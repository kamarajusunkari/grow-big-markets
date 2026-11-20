import React from 'react';
import { Button } from '@/components/ui/button';

interface VelorahHeroProps {
  onCtaClick?: () => void;
}

export const VelorahHero: React.FC<VelorahHeroProps> = ({ onCtaClick }) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#002742]"
    >
      {/* Fullscreen Video Background (Original Untouched Video) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto">
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground select-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where{' '}
          <em className="not-italic text-muted-foreground">
            dreams
          </em>{' '}
          rise{' '}
          <em className="not-italic text-muted-foreground">
            through the silence.
          </em>
        </h1>

        <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-normal">
          We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <Button
          variant="liquid-glass"
          size="hero"
          onClick={onCtaClick}
          className="animate-fade-rise-delay-2 mt-12 cursor-pointer text-base text-foreground font-medium hover:scale-[1.03] transition-all"
        >
          Begin Journey
        </Button>
      </div>
    </section>
  );
};

export default VelorahHero;

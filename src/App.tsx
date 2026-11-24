import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { openWhatsApp } from './lib/utils';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Global handler to direct CTAs to WhatsApp with mobile number +91 9493898990
  const handleOpenCTA = (message?: string) => {
    openWhatsApp(message);
  };

  // Smooth Scroll-Triggered Reveal & Text Reveal Engine
  useEffect(() => {
    const selector = '.reveal-fade-up, .fade-up, .text-reveal, .reveal-scale, .reveal-scale-up';

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -36px 0px',
        threshold: 0.08,
      }
    );

    const observeAll = () => {
      document.querySelectorAll(`${selector}:not(.is-visible)`).forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Listen for dynamically mounted sections or cards
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6EF] text-[#0D0D0C] w-full max-w-full">
      {/* Slide-in Sticky Header (appears when scrolling past the hero) */}
      <Navbar
        onOpenBooking={() => handleOpenCTA('Hi Grow Big Marketers, I would like to connect with your team on WhatsApp.')}
      />

      {/* Main Single-Page Content */}
      <main className="flex-1 w-full max-w-full">
        {/* Vela Hero Section */}
        <Hero onOpenBooking={() => handleOpenCTA('Hi Grow Big Marketers, I would like to book a strategy call for my business.')} />

        <div className="bg-[#f8fafc] text-slate-800 w-full max-w-full">
          <AboutUs onOpenBooking={() => handleOpenCTA('Hi Grow Big Marketers, I want to learn more about your performance marketing and scaling strategies.')} />
          <Services onOpenBooking={(msg) => handleOpenCTA(msg || 'Hi Grow Big Marketers, I want to discuss custom strategy and performance marketing services.')} />
          <Industries onOpenBooking={(msg) => handleOpenCTA(msg || 'Hi Grow Big Marketers, I would like to schedule an industry strategy call.')} />
          <Process onOpenBooking={() => handleOpenCTA('Hi Grow Big Marketers, I would like to understand your growth process and get started.')} />
          <Portfolio />
          <Testimonials />
          <Faq onOpenBooking={() => handleOpenCTA('Hi Grow Big Marketers, I have a question from the FAQ section on your website.')} />
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenCTA('Hi Grow Big Marketers, I want to book a strategy call and discuss a project.')} />

      {/* Floating 24/7 WhatsApp Quick Connect Button (+91 9493898990) */}
      <FloatingWhatsApp />

      {/* Quote & Project Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;

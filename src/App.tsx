import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Industries } from './components/Industries';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Sync theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Global Scroll Reveal Entrance Observer
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const initObserver = () => {
      const elements = document.querySelectorAll('.reveal-fade-up, .reveal-scale-up');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial run + slight delay for dynamically rendered DOM nodes
    initObserver();
    const timeoutId = setTimeout(initObserver, 150);

    return () => {
      clearTimeout(timeoutId);
      const elements = document.querySelectorAll('.reveal-fade-up, .reveal-scale-up');
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <Clients />
        <AboutUs onOpenBooking={() => setIsBookingOpen(true)} />
        <Services onOpenBooking={() => setIsBookingOpen(true)} />
        <Process onOpenBooking={() => setIsBookingOpen(true)} />
        <Industries />
        <Portfolio />
        <Testimonials />
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quote & Project Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;

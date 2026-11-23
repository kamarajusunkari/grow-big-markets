import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6EF] text-[#0D0D0C] w-full max-w-full">
      {/* Slide-in Sticky Header (appears when scrolling past the hero) */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Single-Page Content */}
      <main className="flex-1 w-full max-w-full">
        {/* Vela Hero Section */}
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />

        <div className="bg-[#f8fafc] text-slate-800 w-full max-w-full">
          <AboutUs onOpenBooking={() => setIsBookingOpen(true)} />
          <Services onOpenBooking={() => setIsBookingOpen(true)} />
          <Industries onOpenBooking={() => setIsBookingOpen(true)} />
          <Process onOpenBooking={() => setIsBookingOpen(true)} />
          <Portfolio />
          <Testimonials />
          <Faq />
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Quote & Project Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;

'use client';

import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/b2c/HeroSection';
import { CuratedDestinations } from '@/components/b2c/CuratedDestinations';
import { WhyChooseUs } from '@/components/b2c/WhyChooseUs';
import { CustomerReviews } from '@/components/b2c/CustomerReviews';
import { BookingWizard } from '@/components/b2c/BookingWizard';
import { RagBotModal } from '@/components/b2c/RagBotModal';
import { CustomerAuthModals } from '@/components/common/CustomerAuthModals';
import { useBookingStore } from '@/store/useBookingStore';

export default function HomePage() {
  const { step } = useBookingStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] w-full">
      <Navbar />

      <main className="flex-1 w-full">
        {step > 1 ? (
          /* Step-by-step wizard mode - full width */
          <BookingWizard />
        ) : (
          /* Standard Landing Page - full width */
          <>
            <HeroSection />
            <CuratedDestinations />
            <WhyChooseUs />
            <CustomerReviews />
          </>
        )}
      </main>

      <Footer />
      <RagBotModal />
      <CustomerAuthModals />
    </div>
  );
}

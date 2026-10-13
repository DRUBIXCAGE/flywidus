'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SearchWidget } from './SearchWidget';
import { Sparkles, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';

export function HeroSection({ onSearch }: { onSearch?: () => void }) {
  const { brandName, setIsFestiveOffersOpen } = useBookingStore();

  return (
    <section className="relative pt-10 pb-20 sm:pt-14 sm:pb-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-[#faf9f6] to-[#faf9f6] w-full">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-96 bg-gradient-to-tr from-indigo-200/20 via-saffron-100/25 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Hero Title & Pill */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsFestiveOffersOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-100 shadow-sm text-xs font-bold text-indigo-950 backdrop-blur-sm cursor-pointer hover:border-saffron-300 transition"
          >
            <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
            <span>The Premier Indian Travel Booking Engine</span>
            <span className="text-slate-300">•</span>
            <span className="text-saffron-600 underline">₹0 Convenience Fee with Code FLYINDIASAFE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]"
          >
            Discover India & Beyond.{' '}
            <span className="bg-gradient-to-r from-indigo-950 via-indigo-800 to-saffron-600 bg-clip-text text-transparent">
              {brandName}.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Real-time domestic & international airfares, 5-star heritage hotels, and handcrafted holiday packages across Kashmir, Goa, Kerala, Rajasthan & Dubai.
          </motion.p>

          {/* Quick value props */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-500"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant PNR Issuance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-saffron-500" />
              <span>Direct Airline Net Fares</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-indigo-600" />
              <span>24/7 Human Concierge Desk</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Search Widget - Full Width expansion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full"
        >
          <SearchWidget onSearch={onSearch} />
        </motion.div>
      </div>
    </section>
  );
}

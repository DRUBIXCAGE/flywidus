'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '@/data/mockData';
import { formatINR } from '@/lib/utils';
import { useBookingStore } from '@/store/useBookingStore';

export function CuratedDestinations() {
  const { setActiveTab, setHolidayDestination, setStep } = useBookingStore();

  const handleDestinationClick = (name: string) => {
    setActiveTab('holidays');
    setHolidayDestination(name);
    setStep(2); // Jump to results
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Escapes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Trending Indian & Global Destinations
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            From the snow peaks of Gulmarg to the sunlit beaches of North Goa and desert sands of Dubai.
          </p>
        </div>

        <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
          Handcrafted by Local Indian Travel Experts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {POPULAR_DESTINATIONS.map((dest, idx) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -6 }}
            onClick={() => handleDestinationClick(dest.name)}
            className="group relative h-96 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-100"
          >
            {/* Background Image */}
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Tag */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-900 shadow-xs">
                {dest.tag}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end text-white">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-black tracking-tight">{dest.name}</h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-saffron-500 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 truncate">{dest.subtitle}</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                <span className="text-slate-300">From</span>
                <span className="font-black text-base text-saffron-400">
                  {formatINR(dest.startingPrice)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

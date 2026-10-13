'use client';

import React from 'react';
import { ShieldCheck, Banknote, Clock, Award, CheckCircle2 } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';

const PILLARS = [
  {
    icon: Banknote,
    title: 'Zero Hidden Convenience Fees',
    desc: 'Unlike traditional portals charging ₹399–₹650 per passenger, we pass direct airline net fares with complete transparency.',
    badge: 'Save ₹1,000+ per trip',
  },
  {
    icon: Clock,
    title: '24/7 Human Concierge Desk',
    desc: 'No endless bot loops when your flight is delayed. Reach our Indian travel specialists instantly on WhatsApp or Toll-Free call.',
    badge: 'Under 2-min response',
  },
  {
    icon: ShieldCheck,
    title: 'Instant Refund Shield',
    desc: 'Automated direct UPI and bank reversals within 2 hours of flight cancellation or schedule alterations.',
    badge: '100% Guaranteed',
  },
  {
    icon: Award,
    title: 'Hand-Screened Indian Stays',
    desc: 'From Taj Palaces in Rajasthan to colonial tea bungalows in Munnar, every property is verified for impeccable hospitality.',
    badge: '4.8★ Minimum Rating',
  },
];

export function WhyChooseUs() {
  const { brandName } = useBookingStore();

  return (
    <section className="py-20 bg-white border-y border-slate-200/80 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron-600">
            The {brandName} Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Crafted for the Discerning Indian Traveler
          </h2>
          <p className="text-sm text-slate-500">
            No dark patterns, no surprise charges at the payment screen. Just clean, reliable travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-900 group-hover:bg-indigo-900 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 leading-snug">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-saffron-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{pillar.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

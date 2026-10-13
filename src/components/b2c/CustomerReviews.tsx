'use client';

import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';

const REVIEWS = [
  {
    name: 'Vikram Malhotra',
    location: 'Mumbai, Maharashtra',
    trip: 'Kashmir Luxury 6D/5N',
    text: 'Booked our family vacation with Fly Wid Us. The Dal Lake houseboat, private SUV chauffeur, and Gondola tickets were all arranged flawlessly. Absolutely stress-free experience.',
    rating: 5,
    verified: 'Verified Indian Traveler',
  },
  {
    name: 'Sneha Sen',
    location: 'Kolkata, West Bengal',
    trip: 'IndiGo Flights DEL ⇄ BOM',
    text: 'Saved nearly ₹1,200 on convenience fees compared to other portals for roundtrip tickets. The debounced airport autocomplete is snappy and the checkout took under 60 seconds.',
    rating: 5,
    verified: 'Verified Business Traveler',
  },
  {
    name: 'Rajesh Nair',
    location: 'Bengaluru, Karnataka',
    trip: 'Taj Fort Aguada, Goa',
    text: 'Had to make a last-minute date amendment for our anniversary stay. Their concierge resolved it directly with the hotel manager without any cancellation penalty. Outstanding service!',
    rating: 5,
    verified: 'Verified Vacationer',
  },
];

export function CustomerReviews() {
  const { brandName } = useBookingStore();

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-saffron-600">
          Traveler Love
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Over 50,000+ Journeys Crafted with Care
        </h2>
        <p className="text-sm text-slate-500">
          Read real verified reviews from travelers who chose transparent booking with {brandName}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative"
          >
            <Quote className="w-10 h-10 text-indigo-100 absolute top-6 right-6 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{review.name}</h4>
                <p className="text-xs text-slate-400">{review.location}</p>
                <span className="text-[11px] font-semibold text-indigo-700 block mt-0.5">{review.trip}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

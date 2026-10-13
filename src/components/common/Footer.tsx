'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';
import { AIRPORTS } from '@/data/mockData';

export function Footer() {
  const {
    brandName,
    setFromAirport,
    setToAirport,
    setActiveTab,
    setStep,
    setHolidayDestination,
    openPolicyModal,
    setIsFestiveOffersOpen,
  } = useBookingStore();

  const handleRouteClick = (fromCode: string, toCode: string) => {
    const from = AIRPORTS.find((a) => a.code === fromCode);
    const to = AIRPORTS.find((a) => a.code === toCode);
    if (from) setFromAirport(from);
    if (to) setToAirport(to);
    setActiveTab('flights');
    setStep(2);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleHolidayClick = (destination: string) => {
    setHolidayDestination(destination);
    setActiveTab('holidays');
    setStep(2);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
        {/* Top brand grid - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <Plane className="w-5 h-5 text-saffron-400 rotate-[-15deg]" />
              </div>
              <span className="text-2xl font-black text-white">
                Fly Wid <span className="text-saffron-500">Us</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              India&apos;s premier modern travel booking engine. Seamless bookings for flights, heritage palaces, and handcrafted holiday escapes across India and premier international gateways with zero hidden convenience fees.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>IATA Accredited Agency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-saffron-400" />
                <span>Ministry of Tourism Approved</span>
              </div>
            </div>
          </div>

          {/* Active Flight Routes Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Popular Flight Routes
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleRouteClick('DEL', 'BOM')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Delhi to Mumbai Flights (DEL → BOM)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleRouteClick('DEL', 'GOI')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Delhi to Goa Flights (DEL → GOI)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleRouteClick('BLR', 'DEL')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Bengaluru to Delhi Flights (BLR → DEL)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleRouteClick('BOM', 'DXB')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Mumbai to Dubai Flights (BOM → DXB)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleRouteClick('CCU', 'BKK')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Kolkata to Bangkok Flights (CCU → BKK)
                </button>
              </li>
            </ul>
          </div>

          {/* Holiday Escapes Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Holiday Escapes
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleHolidayClick('Kashmir')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Kashmir & Gulmarg Snow Wonderland
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHolidayClick('Kerala')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Kerala Backwaters & Houseboat
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHolidayClick('Rajasthan')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Royal Rajasthan Heritage Havelis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHolidayClick('Goa')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Goa Coastal Bliss & Beaches
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHolidayClick('Dubai')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Dubai Desert Safari & Burj Khalifa
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Enabled Policy Modals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Portals & Services
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <Link
                  href="/admin"
                  className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                >
                  <span>CRM / CMS Admin Operations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/b2b-login"
                  className="text-saffron-400 hover:text-saffron-300 font-bold flex items-center gap-1"
                >
                  <span>B2B Travel Agent Gateway</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('gst')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Corporate GST Tax Invoicing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('shield')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Trip Shield Zero Cancellation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('terms')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Terms & Conditions of Carriage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('privacy')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom Bar - Full Width */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>Verified Secure Payments via:</span>
            <span className="font-bold text-slate-300">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
            <span>•</span>
            <span className="font-bold text-slate-300">RuPay</span>
            <span>•</span>
            <span className="font-bold text-slate-300">Visa / Mastercard</span>
            <span>•</span>
            <span className="font-bold text-slate-300">Net Banking</span>
          </div>

          <div className="flex items-center gap-1">
            <span>© 2026 {brandName} Technologies Pvt. Ltd. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-saffron-500 fill-saffron-500 inline" />
            <span>in India.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

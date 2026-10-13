'use client';

import React, { useState } from 'react';
import {
  X,
  User,
  Plane,
  Building2,
  Palmtree,
  CheckCircle2,
  Download,
  Calendar,
  Sparkles,
  Ticket,
  ArrowRight,
  LogOut,
  ShieldCheck,
  Award,
  PhoneCall,
  Clock,
  Printer,
  Copy,
} from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';
import { formatINR, formatDate } from '@/lib/utils';
import { Booking } from '@/data/mockData';

export function CustomerAuthModals() {
  const {
    currentUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isMyTripsOpen,
    setIsMyTripsOpen,
    loginCustomer,
    logoutCustomer,
    userBookings,
    applyCoupon,
    isFestiveOffersOpen,
    setIsFestiveOffersOpen,
    policyModal,
    closePolicyModal,
    brandName,
  } = useBookingStore();

  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [selectedETicketBooking, setSelectedETicketBooking] = useState<Booking | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleDemoSignIn = () => {
    loginCustomer('aarav.sharma@gmail.com', 'Aarav Sharma');
  };

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    loginCustomer(inputEmail.trim(), inputName.trim() || undefined);
  };

  const handleApplyOffer = (code: string) => {
    applyCoupon(code);
    setCopiedCoupon(code);
    setTimeout(() => {
      setCopiedCoupon(null);
      setIsFestiveOffersOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* 1. CUSTOMER SIGN IN MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-900 flex items-center justify-center mx-auto mb-2 border border-indigo-100">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Sign In to {brandName}
              </h3>
              <p className="text-xs text-slate-500">
                Access your booked flights, e-tickets, and loyalty rewards
              </p>
            </div>

            {/* Quick Demo Sign In Button */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                  ⚡ Fast Traveler Demo
                </span>
                <span className="text-[10px] font-bold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-full">
                  Instant Access
                </span>
              </div>
              <p className="text-xs text-amber-800">
                Sign in as <strong>Aarav Sharma (Platinum Member)</strong> with 3 pre-loaded domestic trips.
              </p>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Sign In as Aarav Sharma
              </button>
            </div>

            {/* Manual Email Sign In Form */}
            <form onSubmit={handleCustomSignIn} className="space-y-4 pt-1">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200" />
                <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase">
                  Or enter your details
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="e.g. Priya Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address / Mobile Number
                </label>
                <input
                  type="email"
                  required
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue with Email</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. MY TRIPS & BOOKINGS DRAWER / MODAL */}
      {isMyTripsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-md">
          <div className="bg-[#faf9f6] h-full w-full max-w-2xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-950 text-white flex items-center justify-center font-bold text-sm">
                  {currentUser?.name?.slice(0, 2).toUpperCase() || 'TR'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">
                      {currentUser?.name || 'My Journeys'}
                    </h3>
                    {currentUser?.memberTier && (
                      <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
                        ★ {currentUser.memberTier} Tier
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {currentUser?.email || 'Logged in traveler'} • {userBookings.length} Active Bookings
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={logoutCustomer}
                  className="p-2 text-slate-400 hover:text-red-600 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMyTripsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Content: Bookings List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Bookings & E-Tickets ({userBookings.length})
                </span>
                <span className="text-xs text-emerald-600 font-semibold">
                  All PNRs 100% Confirmed
                </span>
              </div>

              {userBookings.length > 0 ? (
                userBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0">
                          {b.type === 'Flight' && <Plane className="w-5 h-5 text-indigo-600" />}
                          {b.type === 'Hotel' && <Building2 className="w-5 h-5 text-emerald-600" />}
                          {b.type === 'Holiday' && <Palmtree className="w-5 h-5 text-saffron-600" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded">
                              {b.pnr}
                            </span>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {b.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mt-1">
                            {b.title}
                          </h4>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-slate-900 block">
                          {formatINR(b.amount)}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold">
                          Paid via UPI / Bank
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Travel: <strong>{formatDate(b.travelDate)}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.passengersCount} Passenger{b.passengersCount > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Action buttons on card */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedETicketBooking(b)}
                        className="px-3.5 py-1.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      >
                        <Ticket className="w-3.5 h-3.5 text-saffron-400" />
                        <span>View E-Ticket</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => alert(`Web check-in initiated for PNR ${b.pnr}. Boarding pass has been sent to ${b.customerPhone}.`)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
                        >
                          Web Check-in
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Connecting with 24/7 Concierge for PNR ${b.pnr}...`)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                          title="Contact Concierge"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-3 bg-white rounded-2xl border border-slate-200">
                  <Plane className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold text-slate-600">No active trips found</p>
                  <p className="text-xs text-slate-400">Search for domestic flights or holiday packages to begin!</p>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Trip Shield Active on all PNRs</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMyTripsOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. E-TICKET VOUCHER PREVIEW MODAL */}
      {selectedETicketBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setSelectedETicketBooking(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Ticket Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-950 text-white flex items-center justify-center shadow-xs">
                  <Plane className="w-5 h-5 text-saffron-400 rotate-[-15deg]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Fly Wid Us • Official Electronic Ticket</h3>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">IATA & DGCA Verified</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Booking Reference</span>
                <span className="text-lg font-black font-mono text-indigo-950">{selectedETicketBooking.pnr}</span>
              </div>
            </div>

            {/* Travel Summary */}
            <div className="p-4 bg-indigo-50/70 rounded-2xl space-y-3 border border-indigo-100 text-xs">
              <div className="font-bold text-indigo-950 text-sm">
                {selectedETicketBooking.title}
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[11px]">Primary Passenger:</span>
                  <strong>{selectedETicketBooking.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Travel Date:</span>
                  <strong>{formatDate(selectedETicketBooking.travelDate)}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Registered Contact:</span>
                  <span>{selectedETicketBooking.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Fare Status:</span>
                  <span className="text-emerald-700 font-bold">Paid & Confirmed ({formatINR(selectedETicketBooking.amount)})</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl">
              <strong>Check-in Notice:</strong> Please present this e-ticket along with an official Indian Government Photo ID (Aadhaar, Passport, or Voter ID) at the airline check-in counter at least 60 minutes before scheduled domestic departure.
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official E-Ticket</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedETicketBooking(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. FESTIVE OFFERS & SALE MODAL */}
      {isFestiveOffersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsFestiveOffersOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-saffron-100 text-saffron-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Diwali & Festive Offers</h3>
                <p className="text-xs text-slate-500">Exclusive coupon codes for Indian domestic & international travel</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  code: 'FLYINDIASAFE',
                  title: '₹1,000 Off + Zero Convenience Fee',
                  desc: 'Valid on IndiGo, Air India, and Vistara roundtrip and one-way domestic flights.',
                  discount: 'Save ₹1,000',
                },
                {
                  code: 'FESTIVE500',
                  title: 'Flat ₹500 Off on Luxury Hotels',
                  desc: 'Applicable on Taj, ITC, Oberoi, and boutique properties across India.',
                  discount: 'Save ₹500',
                },
              ].map((promo) => (
                <div
                  key={promo.code}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-saffron-50 text-saffron-700 border border-saffron-200 px-2.5 py-0.5 rounded-lg">
                        {promo.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600">{promo.discount}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs">{promo.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">{promo.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyOffer(promo.code)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shrink-0 transition"
                  >
                    {copiedCoupon === promo.code ? 'Applied! ✓' : 'Apply Code'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. POLICY & LEGAL MODAL */}
      {policyModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={closePolicyModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 pr-8">{policyModal.title}</h3>
            <div className="text-xs text-slate-600 leading-relaxed p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {policyModal.content}
            </div>

            <button
              type="button"
              onClick={closePolicyModal}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

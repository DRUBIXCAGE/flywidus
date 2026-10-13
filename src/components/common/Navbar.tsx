'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plane,
  Building2,
  Palmtree,
  PhoneCall,
  LayoutDashboard,
  Briefcase,
  User,
  Menu,
  X,
  Sparkles,
  Ticket,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';

export function Navbar() {
  const {
    brandName,
    currency,
    setCurrency,
    currentUser,
    setIsAuthModalOpen,
    setIsMyTripsOpen,
    userBookings,
    setActiveTab,
    setStep,
    setIsFestiveOffersOpen,
    logoutCustomer,
  } = useBookingStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleTabClick = (tab: 'flights' | 'hotels' | 'holidays') => {
    setActiveTab(tab);
    setStep(1);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      {/* Top micro banner - Full Width */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 lg:px-12 w-full hidden sm:block">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFestiveOffersOpen(true)}
              className="flex items-center gap-1.5 text-saffron-400 hover:text-saffron-300 font-bold transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diwali Festive Sale Active:</span>
              <span className="text-white underline decoration-saffron-500">
                Code <strong>FLYINDIASAFE</strong> for ₹0 Convenience Fee (Click to view)
              </span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:180035994387"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
              title="Call our 24/7 Concierge"
            >
              <PhoneCall className="w-3 h-3 text-saffron-400" />
              <span>24/7 Helpline: <strong>+91 1800-FLY-WIDUS</strong></span>
            </a>

            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
              >
                <option value="₹ INR" className="text-slate-900">₹ INR (India)</option>
                <option value="$ USD" className="text-slate-900">$ USD (Global)</option>
                <option value="€ EUR" className="text-slate-900">€ EUR (Europe)</option>
                <option value="AED" className="text-slate-900">AED (UAE)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar - Full Width */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Title with provided logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-950 via-indigo-900 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-900/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Plane className="w-5 h-5 text-saffron-400 rotate-[-15deg] group-hover:rotate-0 transition-transform" />
          </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-indigo-950">
                  Fly Wid
                </span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-saffron-600 ml-1">
                  Us
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 -mt-1 hidden sm:block">
                Travel India & Beyond
              </span>
            </div>
        </Link>

        {/* Center navigation links */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            type="button"
            onClick={() => handleTabClick('flights')}
            className="text-sm font-bold text-slate-700 hover:text-indigo-950 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plane className="w-4 h-4 text-indigo-600" />
            <span>Flights</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('hotels')}
            className="text-sm font-semibold text-slate-600 hover:text-indigo-950 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Hotels</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('holidays')}
            className="text-sm font-semibold text-slate-600 hover:text-indigo-950 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Palmtree className="w-4 h-4 text-slate-400" />
            <span>Holidays & Tours</span>
          </button>
          <button
            type="button"
            onClick={() => setIsFestiveOffersOpen(true)}
            className="text-xs bg-saffron-50 hover:bg-saffron-100 text-saffron-700 font-bold px-3 py-1 rounded-full border border-saffron-200 transition flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
            <span>Diwali Offers</span>
          </button>
        </nav>

        {/* Right portal gateways & Customer Profile */}
        <div className="hidden md:flex items-center gap-3">
          {/* CRM / CMS Portal Link */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200 transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
            <span>CRM / CMS Portal</span>
          </Link>

          {/* B2B Agent Gateway */}
          <Link
            href="/b2b-login"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition"
          >
            <Briefcase className="w-3.5 h-3.5 text-saffron-600" />
            <span>B2B Agent</span>
          </Link>

          {/* Customer Authentication State */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-950 hover:bg-indigo-900 text-white shadow-md transition"
              >
                <div className="w-6 h-6 rounded-full bg-saffron-500 text-indigo-950 flex items-center justify-center font-black text-[11px]">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <span>{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="p-3 border-b border-slate-100 mb-1">
                    <div className="font-bold text-slate-900 text-xs">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                    <span className="inline-block mt-1 text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                      ★ {currentUser.memberTier} Member
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMyTripsOpen(true);
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 rounded-xl transition"
                  >
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-indigo-600" />
                      <span>My Trips & Bookings</span>
                    </div>
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full">
                      {userBookings.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logoutCustomer();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-950 hover:bg-indigo-900 text-white shadow-md shadow-indigo-950/20 transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser ? (
            <button
              type="button"
              onClick={() => setIsMyTripsOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-950 text-white flex items-center gap-1"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Trips ({userBookings.length})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-950 text-white"
            >
              Sign In
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-slate-100">
            <button
              type="button"
              onClick={() => handleTabClick('flights')}
              className="p-2 text-center rounded-xl bg-slate-50 text-xs font-bold text-slate-800"
            >
              Flights
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('hotels')}
              className="p-2 text-center rounded-xl bg-slate-50 text-xs font-bold text-slate-800"
            >
              Hotels
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('holidays')}
              className="p-2 text-center rounded-xl bg-slate-50 text-xs font-bold text-slate-800"
            >
              Holidays
            </button>
          </div>
          <div className="space-y-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 text-indigo-950 text-xs font-bold"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-700" />
              <span>CRM / CMS Admin Portal</span>
            </Link>
            <Link
              href="/b2b-login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold"
            >
              <Briefcase className="w-4 h-4 text-saffron-600" />
              <span>B2B Agent Portal Gateway</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsFestiveOffersOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-saffron-50 text-saffron-900 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-saffron-600" />
              <span>Diwali Festive Offers & Coupons</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

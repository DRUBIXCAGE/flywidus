'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Building2,
  Compass,
  Palmtree,
  ArrowLeftRight,
  Calendar,
  Users,
  Search,
  Check,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { useBookingStore, SearchTab } from '@/store/useBookingStore';
import { DebouncedAutocomplete } from './DebouncedAutocomplete';

const TABS: { id: SearchTab; label: string; icon: React.ElementType }[] = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'tours', label: 'Tours', icon: Compass },
  { id: 'holidays', label: 'Holidays', icon: Palmtree },
];

const SPECIAL_FARES = [
  { id: 'regular', label: 'Regular Fare' },
  { id: 'student', label: 'Student Fare (Extra Baggage)' },
  { id: 'senior', label: 'Senior Citizen' },
  { id: 'defence', label: 'Armed Forces' },
];

export function SearchWidget({ onSearch }: { onSearch?: () => void }) {
  const {
    activeTab,
    setActiveTab,
    tripType,
    setTripType,
    fromAirport,
    toAirport,
    setFromAirport,
    setToAirport,
    swapAirports,
    departDate,
    returnDate,
    setDepartDate,
    setReturnDate,
    adults,
    children,
    infants,
    setPassengersCount,
    cabinClass,
    setCabinClass,
    hotelCity,
    setHotelCity,
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    hotelRooms,
    hotelGuests,
    setHotelRoomsAndGuests,
    holidayDestination,
    setHolidayDestination,
    setStep,
    setIsFestiveOffersOpen,
  } = useBookingStore();

  const [selectedSpecialFare, setSelectedSpecialFare] = useState('regular');
  const [showTravelerModal, setShowTravelerModal] = useState(false);

  const handleSearchClick = () => {
    setStep(2); // Jump to results selection
    if (onSearch) onSearch();
  };

  return (
    <div className="w-full">
      {/* Floating Tab Bar */}
      <div className="flex items-center justify-center -mb-4 relative z-20">
        <div className="inline-flex p-1.5 rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-indigo-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-saffron-600' : 'text-slate-400'
                    }`}
                  />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Glassy Search Container - Full Width */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 pt-10 sm:pt-12 shadow-2xl border border-white/60 relative z-10 w-full">
        <AnimatePresence mode="wait">
          {/* FLIGHTS TAB */}
          {activeTab === 'flights' && (
            <motion.div
              key="flights"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Trip type selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'oneway'}
                      onChange={() => setTripType('oneway')}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>One Way</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'roundtrip'}
                      onChange={() => setTripType('roundtrip')}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Round Trip</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFestiveOffersOpen(true)}
                  className="flex items-center gap-2 text-xs text-saffron-700 bg-saffron-50 hover:bg-saffron-100 px-3.5 py-1.5 rounded-full font-medium border border-saffron-200/60 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                  <span>Book with Code <strong>FLYINDIASAFE</strong> for ₹0 Convenience Fee</span>
                </button>
              </div>

              {/* Grid: From, Swap, To, Dates, Passengers - Full Width Flex Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 items-center">
                {/* FROM */}
                <div className="md:col-span-3">
                  <DebouncedAutocomplete
                    label="From (Departure)"
                    value={fromAirport}
                    onChange={setFromAirport}
                    placeholder="E.g. Delhi (DEL)"
                  />
                </div>

                {/* SWAP BUTTON */}
                <div className="hidden md:flex md:col-span-1 justify-center -mx-3 z-10">
                  <button
                    type="button"
                    onClick={swapAirports}
                    title="Swap Destinations"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-indigo-700 hover:text-white hover:bg-indigo-600 hover:rotate-180 transition-all duration-300 mt-5 cursor-pointer"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                {/* TO */}
                <div className="md:col-span-3">
                  <DebouncedAutocomplete
                    label="To (Arrival)"
                    value={toAirport}
                    onChange={setToAirport}
                    placeholder="E.g. Mumbai (BOM)"
                  />
                </div>

                {/* DATES */}
                <div className={`${tripType === 'roundtrip' ? 'md:col-span-3' : 'md:col-span-2'} grid grid-cols-1 sm:grid-cols-2 gap-2`}>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Departure
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
                      />
                    </div>
                  </div>

                  {tripType === 'roundtrip' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Return
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* PASSENGERS & CLASS */}
                <div className={`${tripType === 'roundtrip' ? 'md:col-span-2' : 'md:col-span-3'} relative`}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Traveller & Class
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTravelerModal(!showTravelerModal)}
                    className="w-full flex items-center justify-between p-3 bg-white/80 rounded-xl border border-slate-200 shadow-xs hover:border-indigo-400 transition text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {adults + children + infants} Traveller{adults + children + infants > 1 ? 's' : ''}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[130px]">{cabinClass}</div>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Dropdown for travelers */}
                  {showTravelerModal && (
                    <div className="absolute right-0 top-full mt-2 z-50 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 space-y-4">
                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Travellers
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <div>
                            <span className="text-sm font-semibold text-slate-800">Adults</span>
                            <span className="block text-[11px] text-slate-400">12+ yrs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPassengersCount(Math.max(1, adults - 1), children, infants)}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-bold text-sm">{adults}</span>
                            <button
                              type="button"
                              onClick={() => setPassengersCount(adults + 1, children, infants)}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <div>
                            <span className="text-sm font-semibold text-slate-800">Children</span>
                            <span className="block text-[11px] text-slate-400">2-12 yrs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPassengersCount(adults, Math.max(0, children - 1), infants)}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-bold text-sm">{children}</span>
                            <button
                              type="button"
                              onClick={() => setPassengersCount(adults, children + 1, infants)}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Cabin Class
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {['Economy', 'Premium Economy', 'Business'].map((cls) => (
                            <button
                              key={cls}
                              type="button"
                              onClick={() => setCabinClass(cls)}
                              className={`p-2 text-xs font-semibold rounded-lg text-left transition cursor-pointer ${
                                cabinClass === cls
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {cls}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowTravelerModal(false)}
                        className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
                      >
                        Apply Travellers
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Fares & Search Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                    Special Fare:
                  </span>
                  {SPECIAL_FARES.map((fare) => (
                    <button
                      key={fare.id}
                      type="button"
                      onClick={() => setSelectedSpecialFare(fare.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        selectedSpecialFare === fare.id
                          ? 'bg-indigo-900 text-white shadow-xs'
                          : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {fare.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-800 hover:from-indigo-900 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <Search className="w-5 h-5 text-saffron-400 group-hover:scale-110 transition-transform" />
                  <span>Search Flights</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* HOTELS TAB */}
          {activeTab === 'hotels' && (
            <motion.div
              key="hotels"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    City, Property or Location
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-3.5 text-indigo-600" />
                    <select
                      value={hotelCity}
                      onChange={(e) => setHotelCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="Mumbai">Mumbai (Gateway of India, Colaba)</option>
                      <option value="Goa">Goa (Candolim, Calangute & Baga Beach)</option>
                      <option value="New Delhi">New Delhi (Diplomatic Enclave, Connaught Place)</option>
                      <option value="Kerala">Kerala (Kumarakom Backwaters & Munnar)</option>
                      <option value="Shimla">Shimla & Himachal Pradesh</option>
                      <option value="Jaipur">Jaipur (Pink City Palaces)</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-4 grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-3 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full px-3 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Rooms & Guests
                  </label>
                  <div className="p-3 bg-white/80 rounded-xl border border-slate-200 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-800">
                      {hotelRooms} Room, {hotelGuests} Guests
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setHotelRoomsAndGuests(1, Math.max(1, hotelGuests - 1))}
                        className="px-2.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setHotelRoomsAndGuests(1, hotelGuests + 1)}
                        className="px-2.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Free cancellation on 85% of luxury properties across India</span>
                </div>
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="px-10 py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-saffron-400" />
                  <span>Explore Hotels</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TOURS & HOLIDAYS TAB */}
          {(activeTab === 'tours' || activeTab === 'holidays') && (
            <motion.div
              key="holidays"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Destination in India or Abroad
                  </label>
                  <select
                    value={holidayDestination}
                    onChange={(e) => setHolidayDestination(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  >
                    <option value="Kashmir">Kashmir (Srinagar & Gulmarg Snow)</option>
                    <option value="Rajasthan">Rajasthan (Jaipur, Udaipur, Jodhpur)</option>
                    <option value="Kerala">Kerala (Backwaters, Munnar Hills)</option>
                    <option value="Goa">Goa (Beaches, Dudhsagar Falls)</option>
                    <option value="Dubai">Dubai & Abu Dhabi Grand Tour</option>
                    <option value="Ladakh">Ladakh (Nubra Valley & Pangong Lake)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Preferred Travel Window
                  </label>
                  <select className="w-full px-3.5 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800">
                    <option>October - November (Festive & Autumn)</option>
                    <option>December - January (Winter Snow & New Year)</option>
                    <option>February - March (Spring Getaways)</option>
                    <option>Custom Dates Available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Travel Group
                  </label>
                  <select className="w-full px-3.5 py-3 bg-white/80 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800">
                    <option>Couple / Honeymoon</option>
                    <option>Family with Kids</option>
                    <option>Group of Friends</option>
                    <option>Solo Explorer</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Curated itineraries with 4★+ verified resorts & private transfers</span>
                </div>
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="px-10 py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-saffron-400" />
                  <span>View Holiday Packages</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

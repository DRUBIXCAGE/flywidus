'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Tag,
  CreditCard,
  QrCode,
  Building,
  Plane,
  Building2,
  Palmtree,
  Sparkles,
  Download,
  Share2,
  Luggage,
  Coffee,
  Calendar,
  UserCheck,
  ChevronLeft,
  ChevronDown,
  Printer,
  Ticket,
  MapPin,
  Compass,
} from 'lucide-react';
import {
  useBookingStore,
  Passenger,
} from '@/store/useBookingStore';
import {
  Flight,
  Hotel,
  HolidayPackage,
  MOCK_FLIGHTS,
  MOCK_HOTELS,
  INITIAL_PACKAGES,
  Booking,
} from '@/data/mockData';
import { formatINR, formatDate } from '@/lib/utils';

export function BookingWizard() {
  const {
    activeTab,
    step,
    setStep,
    fromAirport,
    toAirport,
    departDate,
    selectedFlight,
    selectedHotel,
    selectedPackage,
    setSelectedFlight,
    setSelectedHotel,
    setSelectedPackage,
    passengers,
    updatePassenger,
    couponCode,
    isCouponApplied,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    bookingReference,
    resetBooking,
    addConfirmedBookingToUser,
    currentUser,
    setIsMyTripsOpen,
    brandName,
  } = useBookingStore();

  const [inputCoupon, setInputCoupon] = useState('FLYINDIASAFE');
  const [couponError, setCouponError] = useState('');
  const [selectedPaymentTab, setSelectedPaymentTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [hasGst, setHasGst] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [viewItineraryModalPkg, setViewItineraryModalPkg] = useState<HolidayPackage | null>(null);

  // Filters for Step 2
  const [filterStops, setFilterStops] = useState<'all' | 'nonstop'>('all');
  const [filterAirline, setFilterAirline] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'duration_asc'>('price_asc');

  // Filter flights matching route if possible, or fallback to mock list
  const flightResults = MOCK_FLIGHTS.filter((f) => {
    if (filterStops === 'nonstop' && f.stops !== 0) return false;
    if (filterAirline !== 'all' && f.airline !== filterAirline) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    return a.duration.localeCompare(b.duration);
  });

  const hotelResults = MOCK_HOTELS;
  const packageResults = INITIAL_PACKAGES;

  // Calculation helper
  const getBasePrice = () => {
    if (selectedFlight) return selectedFlight.price * passengers.length;
    if (selectedHotel) return selectedHotel.pricePerNight * 3; // 3 nights default
    if (selectedPackage) return selectedPackage.price * passengers.length;
    return 4950;
  };

  const baseFare = getBasePrice();
  const gstTax = Math.round(baseFare * 0.12);
  const insuranceAmount = includeInsurance ? 199 * passengers.length : 0;
  const convenienceFeeOriginal = 399;
  const convenienceFee = isCouponApplied ? 0 : convenienceFeeOriginal;
  const totalAmount = Math.max(0, baseFare + gstTax + insuranceAmount + convenienceFee - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(inputCoupon);
    if (!success) {
      setCouponError('Invalid coupon. Try "FLYINDIASAFE" for ₹1,000 off!');
    } else {
      setCouponError('');
    }
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);

      // Create confirmed booking and sync to customer trips!
      const newConfirmedBooking: Booking = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: `${passengers[0]?.firstName || 'Aarav'} ${passengers[0]?.lastName || 'Sharma'}`,
        customerEmail: passengers[0]?.email || currentUser?.email || 'traveler@flywidus.com',
        customerPhone: passengers[0]?.phone || '+91 98201 44521',
        type: selectedFlight ? 'Flight' : selectedHotel ? 'Hotel' : 'Holiday',
        title: selectedFlight
          ? `${selectedFlight.airline} ${selectedFlight.flightNumber} (${selectedFlight.from} → ${selectedFlight.to})`
          : selectedHotel
          ? `${selectedHotel.name} (3 Nights)`
          : selectedPackage
          ? `${selectedPackage.title} (${selectedPackage.durationDays}D/${selectedPackage.durationNights}N)`
          : 'Trip Reservation',
        date: new Date().toISOString().split('T')[0],
        travelDate: departDate,
        amount: totalAmount,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        passengersCount: passengers.length,
        pnr: bookingReference,
      };

      addConfirmedBookingToUser(newConfirmedBooking);
      setStep(5); // Complete!
    }, 1200);
  };

  // STEP 2: RESULTS SELECTION (FULL WIDTH)
  if (step === 2) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600">
              <span>Step 2 of 4</span>
              <span>•</span>
              <span>Live Available Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {activeTab === 'flights' && `Flights: ${fromAirport.city} (${fromAirport.code}) ➔ ${toAirport.city} (${toAirport.code})`}
              {activeTab === 'hotels' && `Luxury Stays & Heritage Resorts`}
              {(activeTab === 'tours' || activeTab === 'holidays') && `Curated Holiday Packages & Itineraries`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live airline net fares with zero convenience fee. Travel date: {departDate}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-950 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Modify Search Parameters</span>
          </button>
        </div>

        {/* FLIGHT RESULTS WITH ACTIVE FILTER BAR */}
        {activeTab === 'flights' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">Filter:</span>
                <button
                  type="button"
                  onClick={() => setFilterStops('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    filterStops === 'all' ? 'bg-indigo-950 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Flights
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStops('nonstop')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    filterStops === 'nonstop' ? 'bg-indigo-950 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Non-Stop Only
                </button>

                <div className="h-4 w-[1px] bg-slate-200 mx-1" />

                {['all', 'IndiGo', 'Air India', 'Vistara'].map((airline) => (
                  <button
                    key={airline}
                    type="button"
                    onClick={() => setFilterAirline(airline)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                      filterAirline === airline
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {airline === 'all' ? 'All Airlines' : airline}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800"
                >
                  <option value="price_asc">Price (Lowest First)</option>
                  <option value="duration_asc">Duration (Fastest First)</option>
                </select>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-3.5">
              {flightResults.map((flight) => (
                <motion.div
                  key={flight.id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all p-5 sm:p-6"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    {/* Airline Brand */}
                    <div className="flex items-center gap-4 min-w-[220px]">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-950 text-base shadow-xs">
                        {flight.airlineCode}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{flight.airline}</h4>
                        <span className="text-xs font-mono text-slate-500">{flight.flightNumber}</span>
                        <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                          {flight.seatsLeft} seats remaining at this fare
                        </div>
                      </div>
                    </div>

                    {/* Flight Times & Duration */}
                    <div className="flex items-center gap-6 sm:gap-12">
                      <div className="text-left">
                        <div className="text-2xl font-black text-slate-900">{flight.departureTime}</div>
                        <div className="text-xs font-bold text-slate-700">{flight.from}</div>
                        <div className="text-[11px] text-slate-400">{flight.fromCity}</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-semibold text-slate-500">{flight.duration}</span>
                        <div className="w-24 sm:w-36 h-[2px] bg-slate-300 relative my-1.5">
                          <Plane className="w-3.5 h-3.5 text-indigo-600 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600">
                          {flight.stops === 0 ? 'Non-Stop' : flight.stopDetails || '1 Stop'}
                        </span>
                      </div>

                      <div className="text-left">
                        <div className="text-2xl font-black text-slate-900">{flight.arrivalTime}</div>
                        <div className="text-xs font-bold text-slate-700">{flight.to}</div>
                        <div className="text-[11px] text-slate-400">{flight.toCity}</div>
                      </div>
                    </div>

                    {/* Baggage & Inclusions */}
                    <div className="hidden xl:block text-xs text-slate-500 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Luggage className="w-3.5 h-3.5 text-slate-400" />
                        <span>{flight.baggage}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>{flight.airline === 'Vistara' || flight.airline === 'Air India' ? 'Complimentary Gourmet Meal' : 'Snacks on Purchase'}</span>
                      </div>
                    </div>

                    {/* Price & Book CTA */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <div className="text-right">
                        <div className="text-2xl font-black text-slate-900">{formatINR(flight.price)}</div>
                        <span className="text-[11px] text-slate-400">per traveller</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFlight(flight)}
                        className="px-8 py-3 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/20 transition flex items-center gap-2 group cursor-pointer"
                      >
                        <span>Select Flight</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* HOTEL RESULTS */}
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {hotelResults.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-200">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                      {hotel.tag}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      ★ {hotel.rating}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-slate-900 leading-snug">{hotel.name}</h3>
                    <p className="text-xs text-slate-500 truncate">{hotel.location}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 line-through">{formatINR(hotel.originalPrice)}</div>
                    <div className="text-xl font-black text-slate-900">{formatINR(hotel.pricePerNight)}</div>
                    <span className="text-[10px] text-slate-500">per night + taxes</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedHotel(hotel)}
                    className="px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Book Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HOLIDAY / TOUR RESULTS */}
        {(activeTab === 'tours' || activeTab === 'holidays') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageResults.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full bg-slate-200">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    {pkg.badge && (
                      <span className="absolute top-3 left-3 bg-saffron-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {pkg.durationDays}D / {pkg.durationNights}N
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{pkg.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{pkg.destination}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pkg.itinerarySummary}
                    </p>

                    <ul className="text-xs text-slate-600 space-y-1">
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* View Full Day-by-Day Itinerary Button */}
                    <button
                      type="button"
                      onClick={() => setViewItineraryModalPkg(pkg)}
                      className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-indigo-700" />
                      <span>View Day-by-Day Itinerary ({pkg.durationDays} Days)</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 line-through">{formatINR(pkg.originalPrice)}</div>
                    <div className="text-2xl font-black text-slate-900">{formatINR(pkg.price)}</div>
                    <span className="text-[10px] text-slate-500">per person all-inclusive</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className="px-6 py-3 bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ITINERARY MODAL PREVIEW FOR B2C USERS */}
        {viewItineraryModalPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setViewItineraryModalPkg(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>

              <div>
                <span className="text-[11px] font-bold text-saffron-600 uppercase tracking-widest">
                  Day-by-Day Journey Plan
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {viewItineraryModalPkg.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {viewItineraryModalPkg.durationDays} Days / {viewItineraryModalPkg.durationNights} Nights • {viewItineraryModalPkg.hotelCategory}
                </p>
              </div>

              {/* Day-by-day listing */}
              <div className="space-y-4">
                {viewItineraryModalPkg.itineraryDaysList?.map((day) => (
                  <div key={day.day} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-950 bg-indigo-100/80 px-2.5 py-0.5 rounded-full">
                        Day {day.day}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {day.meals}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{day.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>
                    <div className="text-[11px] text-slate-500 pt-1">
                      <strong>Stay:</strong> {day.stay}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setViewItineraryModalPkg(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackage(viewItineraryModalPkg);
                    setViewItineraryModalPkg(null);
                  }}
                  className="px-6 py-2 bg-indigo-950 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Book This Itinerary
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // STEP 3: PASSENGER / GUEST DETAILS (FULL WIDTH)
  if (step === 3) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-saffron-600">
              Step 3 of 4 • Passenger & Contact Information
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Who is travelling?
            </h2>
            <p className="text-xs text-slate-500">
              Name should match Government issued ID (Aadhaar / Passport / Voter ID)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-900 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Selection</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            {passengers.map((passenger, index) => (
              <div
                key={passenger.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900 text-sm">
                      Traveller {index + 1} (Adult)
                    </span>
                  </div>
                  <div className="flex gap-4">
                    {['male', 'female'].map((gender) => (
                      <label key={gender} className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name={`gender-${index}`}
                          checked={passenger.gender === gender}
                          onChange={() => updatePassenger(index, { gender: gender as any })}
                          className="w-3.5 h-3.5 text-indigo-600"
                        />
                        <span className="capitalize">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      First & Middle Name
                    </label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => updatePassenger(index, { firstName: e.target.value })}
                      placeholder="E.g. Aarav"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Last Name / Surname
                    </label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => updatePassenger(index, { lastName: e.target.value })}
                      placeholder="E.g. Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Email for E-Ticket & Receipt
                    </label>
                    <input
                      type="email"
                      value={passenger.email}
                      onChange={(e) => updatePassenger(index, { email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Mobile Number (WhatsApp Updates)
                    </label>
                    <div className="flex">
                      <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={(e) => updatePassenger(index, { phone: e.target.value })}
                        placeholder="9820144521"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">
                      Seat Preference
                    </label>
                    <select
                      value={passenger.seatPreference}
                      onChange={(e) => updatePassenger(index, { seatPreference: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option>Window (12A)</option>
                      <option>Aisle (12C)</option>
                      <option>Middle (12B)</option>
                      <option>Extra Legroom (+₹600)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">
                      Meal Preference
                    </label>
                    <select
                      value={passenger.mealPreference}
                      onChange={(e) => updatePassenger(index, { mealPreference: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option>Vegetarian Hindu Meal (AVML)</option>
                      <option>Jain Meal (VJML)</option>
                      <option>Non-Vegetarian Meal</option>
                      <option>Fruit Platter</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Travel Insurance Add-on */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">
                    {brandName} Trip Shield Protection
                  </h4>
                  <span className="text-xs font-bold text-emerald-800">
                    +₹199 / traveller
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Covers flight cancellation up to ₹10,000, emergency hospitalization, and lost baggage compensation.
                </p>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Yes, secure my trip with Trip Shield
                  </span>
                </label>
              </div>
            </div>

            {/* GST Details Optional Toggle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-slate-900">Add Business GSTIN (Optional)</span>
                  <p className="text-xs text-slate-500 mt-0.5">Claim up to 18% input tax credit for your company</p>
                </div>
                <input
                  type="checkbox"
                  checked={hasGst}
                  onChange={(e) => setHasGst(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </label>

              {hasGst && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                  <input
                    type="text"
                    placeholder="Company GSTIN (e.g. 07AAAAA0000A1Z5)"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase"
                  />
                  <input
                    type="text"
                    placeholder="Registered Legal Company Name"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5 sticky top-24">
              <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                Fare Summary
              </h3>

              {/* Selected Item Recap */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                {selectedFlight && (
                  <>
                    <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{selectedFlight.airline} ({selectedFlight.flightNumber})</span>
                    </div>
                    <div className="text-slate-600">
                      {selectedFlight.from} ({selectedFlight.fromCity}) ➔ {selectedFlight.to} ({selectedFlight.toCity})
                    </div>
                  </>
                )}
                {selectedHotel && (
                  <>
                    <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{selectedHotel.name}</span>
                    </div>
                    <div className="text-slate-600">{selectedHotel.city} • 3 Nights stay</div>
                  </>
                )}
                {selectedPackage && (
                  <>
                    <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <Palmtree className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{selectedPackage.title}</span>
                    </div>
                    <div className="text-slate-600">{selectedPackage.destination}</div>
                  </>
                )}
              </div>

              {/* Line items */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Base Fare ({passengers.length} traveller)</span>
                  <span className="font-semibold text-slate-900">{formatINR(baseFare)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & GST (12%)</span>
                  <span className="font-semibold text-slate-900">{formatINR(gstTax)}</span>
                </div>
                {includeInsurance && (
                  <div className="flex justify-between">
                    <span>Trip Shield Cover</span>
                    <span className="font-semibold text-slate-900">{formatINR(insuranceAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Convenience Fee</span>
                  <span className="font-semibold text-emerald-600 line-through">₹399</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Total Payable</span>
                  <div className="text-2xl font-black text-slate-900">
                    {formatINR(totalAmount)}
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  ₹0 Fee Active
                </span>
              </div>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full py-4 bg-gradient-to-r from-indigo-950 to-indigo-900 hover:from-indigo-900 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 4: PAYMENT GATEWAY (FULL WIDTH)
  if (step === 4) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-saffron-600">
              Step 4 of 4 • Final Payment
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Complete Your Booking
            </h2>
            <p className="text-xs text-slate-500">
              256-bit encrypted checkout. Instant ticket delivery on WhatsApp & Email.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-900 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Payment Method Selector */}
          <div className="md:col-span-8 space-y-6">
            {/* Promo Code Box */}
            <div className="bg-saffron-50/70 border border-saffron-200/80 rounded-2xl p-4">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-3 text-saffron-600" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter Coupon (e.g. FLYINDIASAFE)"
                    className="w-full pl-9 pr-3 py-2 text-xs font-bold uppercase bg-white rounded-xl border border-saffron-300 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {isCouponApplied && (
                <div className="flex items-center justify-between text-xs text-saffron-800 font-semibold mt-2">
                  <span>Coupon {couponCode} applied! Saved ₹{couponDiscount}.</span>
                  <button type="button" onClick={removeCoupon} className="text-red-600 underline cursor-pointer">Remove</button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-red-600 font-medium mt-2">{couponError}</p>
              )}
            </div>

            {/* Payment Tabs: UPI / Card / Netbanking */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = selectedPaymentTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedPaymentTab(tab.id as any)}
                      className={`flex items-center justify-center gap-1.5 py-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                        isActive
                          ? 'bg-white text-indigo-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Tab */}
              {selectedPaymentTab === 'upi' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-800">Scan QR Code via any UPI App</div>
                      <div className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                    <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg flex items-center justify-center p-1">
                      <QrCode className="w-12 h-12 text-slate-800" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-600">
                      Or Enter Virtual Payment Address (UPI ID)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {selectedPaymentTab === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4111 •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking Tab */}
              {selectedPaymentTab === 'netbanking' && (
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                    <label key={bank} className="flex items-center gap-2 p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
                      <input type="radio" name="bank" defaultChecked={bank === 'HDFC Bank'} className="text-indigo-600" />
                      <span>{bank}</span>
                    </label>
                  ))}
                </div>
              )}

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleProcessPayment}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-3 cursor-pointer"
              >
                {isProcessingPayment ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 animate-spin" />
                    Securing Payment with Bank Gateway...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay {formatINR(totalAmount)} & Confirm Ticket</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Summary */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="font-bold text-sm tracking-wide text-slate-300 uppercase">
                Payment Breakdown
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Base Total</span>
                  <span className="font-semibold text-white">{formatINR(baseFare)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (GST 12%)</span>
                  <span className="font-semibold text-white">{formatINR(gstTax)}</span>
                </div>
                {insuranceAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Trip Shield</span>
                    <span className="font-semibold text-white">{formatINR(insuranceAmount)}</span>
                  </div>
                )}
                {isCouponApplied && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(couponDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-medium">Final Amount</span>
                <span className="text-2xl font-black text-saffron-400">
                  {formatINR(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 5: BOOKING CONFIRMED (FULL WIDTH CONTAINER)
  if (step === 5) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden p-8 sm:p-12 space-y-8 max-w-4xl w-full"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              Booking Confirmed & Guaranteed
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Pack your bags with {brandName}! 🎉
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Confirmation and e-ticket have been delivered to <strong>{passengers[0]?.email}</strong>
            </p>
          </div>

          {/* E-Ticket Card */}
          <div className="rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Booking Reference / PNR
                </span>
                <div className="text-2xl sm:text-3xl font-black text-indigo-950 font-mono tracking-wider">
                  {bookingReference}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Amount Paid
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-700">
                  {formatINR(totalAmount)}
                </div>
              </div>
            </div>

            {/* Travel Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Primary Passenger</span>
                <span className="font-bold text-slate-900 text-base">
                  {passengers[0]?.firstName} {passengers[0]?.lastName}
                </span>
                <span className="block text-slate-500 mt-0.5">Phone: +91 {passengers[0]?.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Travel Date</span>
                <span className="font-bold text-slate-900 text-base">
                  {departDate}
                </span>
                <span className="block text-slate-500 mt-0.5">
                  Route: {selectedFlight ? `${selectedFlight.from} → ${selectedFlight.to}` : (selectedHotel?.name || selectedPackage?.title)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-saffron-400" />
              <span>Download & Print Official E-Ticket</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMyTripsOpen(true)}
              className="py-3.5 px-6 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-indigo-600" />
              <span>View in My Trips</span>
            </button>

            <button
              type="button"
              onClick={resetBooking}
              className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer"
            >
              Book Another Trip
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

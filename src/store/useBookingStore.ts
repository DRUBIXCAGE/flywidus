import { create } from 'zustand';
import { Airport, Flight, Hotel, HolidayPackage, Booking, Customer, AIRPORTS, INITIAL_CUSTOMERS, INITIAL_BOOKINGS } from '@/data/mockData';

export type SearchTab = 'flights' | 'hotels' | 'tours' | 'holidays';
export type TripType = 'oneway' | 'roundtrip';

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  phone: string;
  seatPreference?: string;
  mealPreference?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  chips?: string[];
}

interface BookingState {
  // Brand name
  brandName: string;

  // Currency
  currency: string;
  setCurrency: (currency: string) => void;

  // Customer Auth & Trips
  currentUser: Customer | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isMyTripsOpen: boolean;
  setIsMyTripsOpen: (open: boolean) => void;
  loginCustomer: (email: string, name?: string) => void;
  logoutCustomer: () => void;
  userBookings: Booking[];

  // Modals for general links
  isFestiveOffersOpen: boolean;
  setIsFestiveOffersOpen: (open: boolean) => void;
  policyModal: { isOpen: boolean; title: string; content: string };
  openPolicyModal: (type: 'terms' | 'privacy' | 'gst' | 'shield') => void;
  closePolicyModal: () => void;

  // Tabs & Search params
  activeTab: SearchTab;
  setActiveTab: (tab: SearchTab) => void;

  tripType: TripType;
  setTripType: (tripType: TripType) => void;

  fromAirport: Airport;
  toAirport: Airport;
  setFromAirport: (airport: Airport) => void;
  setToAirport: (airport: Airport) => void;
  swapAirports: () => void;

  departDate: string;
  returnDate: string;
  setDepartDate: (date: string) => void;
  setReturnDate: (date: string) => void;

  adults: number;
  children: number;
  infants: number;
  setPassengersCount: (adults: number, children: number, infants: number) => void;

  cabinClass: string;
  setCabinClass: (cabinClass: string) => void;

  // Hotel search params
  hotelCity: string;
  setHotelCity: (city: string) => void;
  checkInDate: string;
  checkOutDate: string;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  hotelRooms: number;
  hotelGuests: number;
  setHotelRoomsAndGuests: (rooms: number, guests: number) => void;

  // Holiday / Tour search params
  holidayDestination: string;
  setHolidayDestination: (dest: string) => void;
  holidayDuration: string;
  setHolidayDuration: (duration: string) => void;

  // Booking Flow Steps: 1 = Search, 2 = Select, 3 = Details, 4 = Payment, 5 = Confirmation
  step: number;
  setStep: (step: number) => void;

  selectedFlight: Flight | null;
  selectedHotel: Hotel | null;
  selectedPackage: HolidayPackage | null;
  setSelectedFlight: (flight: Flight | null) => void;
  setSelectedHotel: (hotel: Hotel | null) => void;
  setSelectedPackage: (pkg: HolidayPackage | null) => void;

  passengers: Passenger[];
  setPassengers: (passengers: Passenger[]) => void;
  updatePassenger: (index: number, passenger: Partial<Passenger>) => void;

  couponCode: string;
  isCouponApplied: boolean;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  bookingReference: string;
  setBookingReference: (ref: string) => void;

  // Floating RAG Bot
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  isAiTyping: boolean;

  resetBooking: () => void;
  addConfirmedBookingToUser: (booking: Booking) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  brandName: 'Fly Wid Us',
  currency: '₹ INR',
  setCurrency: (currency) => set({ currency }),

  // Pre-authenticated with Demo user Aarav Sharma so trips are instantly visible
  currentUser: INITIAL_CUSTOMERS[0],
  isAuthModalOpen: false,
  setIsAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),
  isMyTripsOpen: false,
  setIsMyTripsOpen: (isMyTripsOpen) => set({ isMyTripsOpen }),

  loginCustomer: (email, name) => {
    const existing = INITIAL_CUSTOMERS.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      set({
        currentUser: existing,
        userBookings: INITIAL_BOOKINGS.filter((b) => b.customerEmail.toLowerCase() === existing.email.toLowerCase()),
        isAuthModalOpen: false,
      });
    } else {
      const newUser: Customer = {
        id: `cust-${Date.now()}`,
        name: name || email.split('@')[0],
        email: email,
        phone: '+91 98200 11223',
        city: 'New Delhi',
        totalBookings: 1,
        totalSpent: 9900,
        memberTier: 'Silver',
        lastInteraction: new Date().toISOString().split('T')[0],
        notes: 'Signed in via Fly Wid Us consumer portal.',
      };
      set({
        currentUser: newUser,
        userBookings: [],
        isAuthModalOpen: false,
      });
    }
  },

  logoutCustomer: () => {
    set({ currentUser: null, isMyTripsOpen: false });
  },

  userBookings: INITIAL_BOOKINGS.filter((b) => b.customerEmail === 'aarav.sharma@gmail.com'),

  addConfirmedBookingToUser: (newBooking) => {
    set((state) => ({
      userBookings: [newBooking, ...state.userBookings],
    }));
  },

  // Modals for general links
  isFestiveOffersOpen: false,
  setIsFestiveOffersOpen: (isFestiveOffersOpen) => set({ isFestiveOffersOpen }),
  policyModal: { isOpen: false, title: '', content: '' },
  openPolicyModal: (type) => {
    let title = '';
    let content = '';
    if (type === 'terms') {
      title = 'Fly Wid Us — Terms & Conditions of Carriage';
      content = 'All flight tickets booked via Fly Wid Us are subject to Directorate General of Civil Aviation (DGCA) India guidelines. Hand baggage and check-in allowances are governed by respective operating carriers (IndiGo, Air India, Vistara, Akasa). Cancellation charges are processed strictly in accordance with airline fare rules.';
    } else if (type === 'privacy') {
      title = 'Privacy Policy & Data Security';
      content = 'Fly Wid Us values your privacy. We never share your government ID details (Aadhaar, Passport) with third parties. All payment processing is 256-bit SSL encrypted and PCI-DSS compliant via RBI certified payment aggregators.';
    } else if (type === 'gst') {
      title = 'Corporate & Business GST Invoicing';
      content = 'You can claim up to 18% Input Tax Credit (ITC) on all business travel. Simply provide your company GSTIN and registered trade name during Step 3 of checkout. Automated B2B GST tax invoices will be dispatched to your registered accounts email within 24 hours of booking.';
    } else if (type === 'shield') {
      title = 'Fly Wid Us Zero Cancellation & Trip Shield';
      content = 'Opting for Trip Shield gives you 100% refund on domestic flight tickets cancelled up to 2 hours prior to scheduled departure. Includes medical emergency protection, baggage delay compensation up to ₹10,000, and free date modification.';
    }
    set({ policyModal: { isOpen: true, title, content } });
  },
  closePolicyModal: () => set({ policyModal: { isOpen: false, title: '', content: '' } }),

  // Search parameters
  activeTab: 'flights',
  setActiveTab: (tab) => set({ activeTab: tab }),

  tripType: 'oneway',
  setTripType: (tripType) => set({ tripType }),

  fromAirport: AIRPORTS[0], // DEL
  toAirport: AIRPORTS[1],   // BOM
  setFromAirport: (airport) => set({ fromAirport: airport }),
  setToAirport: (airport) => set({ toAirport: airport }),
  swapAirports: () => {
    const { fromAirport, toAirport } = get();
    set({ fromAirport: toAirport, toAirport: fromAirport });
  },

  departDate: '2026-10-24',
  returnDate: '2026-10-28',
  setDepartDate: (departDate) => set({ departDate }),
  setReturnDate: (returnDate) => set({ returnDate }),

  adults: 1,
  children: 0,
  infants: 0,
  setPassengersCount: (adults, children, infants) => set({ adults, children, infants }),

  cabinClass: 'Economy',
  setCabinClass: (cabinClass) => set({ cabinClass }),

  hotelCity: 'Mumbai',
  setHotelCity: (hotelCity) => set({ hotelCity }),
  checkInDate: '2026-10-24',
  checkOutDate: '2026-10-27',
  setCheckInDate: (checkInDate) => set({ checkInDate }),
  setCheckOutDate: (checkOutDate) => set({ checkOutDate }),
  hotelRooms: 1,
  hotelGuests: 2,
  setHotelRoomsAndGuests: (hotelRooms, hotelGuests) => set({ hotelRooms, hotelGuests }),

  holidayDestination: 'Kashmir',
  setHolidayDestination: (holidayDestination) => set({ holidayDestination }),
  holidayDuration: '5-7 Days',
  setHolidayDuration: (holidayDuration) => set({ holidayDuration }),

  step: 1,
  setStep: (step) => set({ step }),

  selectedFlight: null,
  selectedHotel: null,
  selectedPackage: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight, step: flight ? 3 : 2 }),
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel, step: hotel ? 3 : 2 }),
  setSelectedPackage: (pkg) => set({ selectedPackage: pkg, step: pkg ? 3 : 2 }),

  passengers: [
    {
      id: 'p-1',
      firstName: 'Aarav',
      lastName: 'Sharma',
      gender: 'male',
      email: 'aarav.sharma@gmail.com',
      phone: '9820144521',
      seatPreference: 'Window (12A)',
      mealPreference: 'Vegetarian Hindu Meal (AVML)',
    },
  ],
  setPassengers: (passengers) => set({ passengers }),
  updatePassenger: (index, passenger) => {
    const passengers = [...get().passengers];
    if (passengers[index]) {
      passengers[index] = { ...passengers[index], ...passenger };
      set({ passengers });
    }
  },

  couponCode: '',
  isCouponApplied: false,
  couponDiscount: 0,
  applyCoupon: (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FLYINDIASAFE') {
      set({ couponCode: clean, isCouponApplied: true, couponDiscount: 1000 });
      return true;
    }
    if (clean === 'FESTIVE500') {
      set({ couponCode: clean, isCouponApplied: true, couponDiscount: 500 });
      return true;
    }
    return false;
  },
  removeCoupon: () => set({ couponCode: '', isCouponApplied: false, couponDiscount: 0 }),

  bookingReference: 'FWU-89214',
  setBookingReference: (ref) => set({ bookingReference: ref }),

  isChatOpen: false,
  setIsChatOpen: (open) => set({ isChatOpen: open }),
  isAiTyping: false,
  chatMessages: [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Namaste! 🙏 I am your Fly Wid Us AI Travel Assistant. How can I assist your journey across India or abroad today?',
      timestamp: 'Just now',
      chips: [
        'Cheapest flights from Delhi to Mumbai',
        'Best time to visit Kashmir & Gulmarg',
        'Weekend packages in Goa under ₹15,000',
        'Baggage allowance for IndiGo & Air India',
      ],
    },
  ],
  addChatMessage: (msg) => {
    const newMessage: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, newMessage],
      isAiTyping: true,
    }));

    setTimeout(() => {
      let botReply = "I can certainly assist you with that! At Fly Wid Us, we partner directly with IndiGo, Air India, Vistara, and luxury resorts like Taj and ITC to guarantee the best Indian market rates with ₹0 convenience fee.";
      const query = msg.text.toLowerCase();

      if (query.includes('kashmir') || query.includes('gulmarg')) {
        botReply = "Kashmir is magical right now! ❄️ Autumn displays golden Chinar leaves, while Gulmarg Phase 2 Gondola already offers fresh snow. Our 6D/5N package includes Dal Lake luxury houseboat stay and private SUV transfers for ₹26,999/person.";
      } else if (query.includes('delhi to mumbai') || query.includes('flight')) {
        botReply = "For Delhi (DEL) to Mumbai (BOM), IndiGo flight 6E-2041 departs at 06:00 AM for just ₹4,950. Air India AI-805 includes 25kg free baggage and complimentary hot breakfast at ₹5,400.";
      } else if (query.includes('goa')) {
        botReply = "Goa is glowing! 🌴 For beach lovers, Taj Fort Aguada in Candolim offers private beach access. Or you can explore our 4D/3N Goa Coastal Bliss package at ₹13,999 with sunset river cruise included.";
      } else if (query.includes('baggage')) {
        botReply = "Domestic baggage policy: IndiGo, Akasa, & SpiceJet allow 15kg check-in + 7kg cabin baggage. Air India allows 20-25kg check-in on most domestic routes.";
      }

      set((state) => ({
        chatMessages: [
          ...state.chatMessages,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'assistant',
            text: botReply,
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          },
        ],
        isAiTyping: false,
      }));
    }, 800);
  },

  resetBooking: () => {
    set({
      step: 1,
      selectedFlight: null,
      selectedHotel: null,
      selectedPackage: null,
      isCouponApplied: false,
      couponCode: '',
      couponDiscount: 0,
      bookingReference: `FWU-${Math.floor(10000 + Math.random() * 90000)}`,
    });
  },
}));

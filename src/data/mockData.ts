export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  logo: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  price: number;
  seatsLeft: number;
  cabinClass: string;
  refundable: boolean;
  baggage: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice: number;
  imageUrl: string;
  tag: string;
  amenities: string[];
  location: string;
  cancellationPolicy: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  stay: string;
  meals: string;
  activities: string[];
}

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  durationNights: number;
  price: number;
  originalPrice: number;
  imageUrl: string;
  badge?: string;
  season: string;
  highlights: string[];
  status: 'Active' | 'Draft' | 'Archived';
  itinerarySummary: string;
  inclusions: string[];
  exclusions: string[];
  hotelCategory: string;
  transportType: string;
  itineraryDaysList: ItineraryDay[];
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: 'Flight' | 'Hotel' | 'Holiday' | 'Tour';
  title: string;
  date: string;
  travelDate: string;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  passengersCount: number;
  pnr: string;
  details?: {
    flightNumber?: string;
    route?: string;
    hotelRoom?: string;
    packageDuration?: string;
    seatNumbers?: string[];
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalBookings: number;
  totalSpent: number;
  memberTier: 'Silver' | 'Gold' | 'Platinum';
  lastInteraction: string;
  notes: string;
}

export const AIRPORTS: Airport[] = [
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', country: 'India' },
  { code: 'GOI', name: 'Dabolim Airport (Goa)', city: 'Goa', country: 'India' },
  { code: 'GOX', name: 'Manohar International Airport (Mopa)', city: 'North Goa', country: 'India' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose Intl', city: 'Kolkata', country: 'India' },
  { code: 'COK', name: 'Cochin International Airport', city: 'Kochi (Kerala)', country: 'India' },
  { code: 'IXC', name: 'Shaheed Bhagat Singh Airport', city: 'Chandigarh', country: 'India' },
  { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', country: 'India' },
  { code: 'SXR', name: 'Sheikh ul-Alam International Airport', city: 'Srinagar (Kashmir)', country: 'India' },
  { code: 'IXL', name: 'Kushok Bakula Rimpochee Airport', city: 'Leh (Ladakh)', country: 'India' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'MLE', name: 'Velana International Airport', city: 'Malé', country: 'Maldives' },
];

export const POPULAR_DESTINATIONS = [
  { name: 'Goa', subtitle: 'Sun, Sand & Beach Vibes', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80', startingPrice: 4999, tag: 'Bestseller' },
  { name: 'Kashmir', subtitle: 'Heaven on Earth & Snow Peaks', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=80', startingPrice: 12499, tag: 'Trending' },
  { name: 'Kerala', subtitle: 'Backwaters & Lush Tea Gardens', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80', startingPrice: 8999, tag: 'Romantic' },
  { name: 'Dubai', subtitle: 'Ultra Modern Luxury & Safaris', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', startingPrice: 24999, tag: 'International' },
  { name: 'Manali & Himachal', subtitle: 'Rohtang Pass & Pine Valleys', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80', startingPrice: 6999, tag: 'Adventure' },
  { name: 'Rajasthan', subtitle: 'Royal Forts & Palaces of Kings', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop&q=80', startingPrice: 10499, tag: 'Heritage' },
];

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'fl-6e-204',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E-2041',
    logo: '6E',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '06:00',
    arrivalTime: '08:15',
    duration: '2h 15m',
    stops: 0,
    price: 4950,
    seatsLeft: 6,
    cabinClass: 'Economy',
    refundable: true,
    baggage: '15 kg Check-in, 7 kg Cabin',
  },
  {
    id: 'fl-ai-805',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI-805',
    logo: 'AI',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '07:30',
    arrivalTime: '09:45',
    duration: '2h 15m',
    stops: 0,
    price: 5400,
    seatsLeft: 9,
    cabinClass: 'Economy',
    refundable: true,
    baggage: '25 kg Check-in (Complimentary Meal), 7 kg Cabin',
  },
  {
    id: 'fl-uk-991',
    airline: 'Vistara',
    airlineCode: 'UK',
    flightNumber: 'UK-991',
    logo: 'UK',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '09:15',
    arrivalTime: '11:30',
    duration: '2h 15m',
    stops: 0,
    price: 6100,
    seatsLeft: 3,
    cabinClass: 'Premium Economy',
    refundable: true,
    baggage: '20 kg Check-in (Gourmet Meal), 7 kg Cabin',
  },
  {
    id: 'fl-qp-1302',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    flightNumber: 'QP-1302',
    logo: 'QP',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '13:40',
    arrivalTime: '15:55',
    duration: '2h 15m',
    stops: 0,
    price: 4620,
    seatsLeft: 12,
    cabinClass: 'Economy',
    refundable: false,
    baggage: '15 kg Check-in, 7 kg Cabin',
  },
  {
    id: 'fl-sg-8162',
    airline: 'SpiceJet',
    airlineCode: 'SG',
    flightNumber: 'SG-8162',
    logo: 'SG',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '18:20',
    arrivalTime: '21:10',
    duration: '2h 50m',
    stops: 1,
    stopDetails: 'via Jaipur (35m layover)',
    price: 4180,
    seatsLeft: 5,
    cabinClass: 'Economy',
    refundable: true,
    baggage: '15 kg Check-in, 7 kg Cabin',
  },
  {
    id: 'fl-6e-5512',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E-5512',
    logo: '6E',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'GOI',
    toCity: 'Goa',
    departureTime: '10:05',
    arrivalTime: '12:45',
    duration: '2h 40m',
    stops: 0,
    price: 6350,
    seatsLeft: 8,
    cabinClass: 'Economy',
    refundable: true,
    baggage: '15 kg Check-in, 7 kg Cabin',
  },
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'ht-taj-mumbai',
    name: 'The Taj Mahal Palace',
    city: 'Mumbai',
    rating: 4.9,
    reviewsCount: 3820,
    pricePerNight: 24500,
    originalPrice: 31000,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    tag: 'Iconic Heritage',
    amenities: ['Sea View Rooms', 'Olympic Pool', 'Jiva Spa', 'Complimentary Breakfast', 'Butler Service'],
    location: 'Apollo Bunder, Colaba, Gateway of India',
    cancellationPolicy: 'Free cancellation up to 48 hrs before check-in',
  },
  {
    id: 'ht-itc-maurya',
    name: 'ITC Maurya, A Luxury Collection Hotel',
    city: 'New Delhi',
    rating: 4.8,
    reviewsCount: 2940,
    pricePerNight: 16800,
    originalPrice: 21500,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
    tag: 'Celebrity Choice',
    amenities: ['Bukhara Dining', 'Kaya Kalp Spa', 'Lush Gardens', 'High Speed Wi-Fi', 'Airport Shuttle'],
    location: 'Diplomatic Enclave, Chanakyapuri',
    cancellationPolicy: 'Free cancellation up to 24 hrs before check-in',
  },
  {
    id: 'ht-taj-aguada',
    name: 'Taj Fort Aguada Resort & Spa',
    city: 'Goa',
    rating: 4.8,
    reviewsCount: 2150,
    pricePerNight: 18500,
    originalPrice: 24000,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    tag: 'Beachfront Resort',
    amenities: ['Private Beach Access', 'Infinity Pool', 'Sunset Bar', 'Kids Club', 'Water Sports'],
    location: 'Sinquerim Beach, Candolim, North Goa',
    cancellationPolicy: 'Free cancellation up to 72 hrs before check-in',
  },
  {
    id: 'ht-kumarakom',
    name: 'Kumarakom Lake Resort',
    city: 'Kerala',
    rating: 4.9,
    reviewsCount: 1780,
    pricePerNight: 19200,
    originalPrice: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80',
    tag: 'Backwater Oasis',
    amenities: ['Meandering Pool', 'Ayurvedic Wellness Spa', 'Houseboat Dining', 'Tea Tasting', 'Yoga Deck'],
    location: 'Vembanad Lake, Kottayam, Kerala',
    cancellationPolicy: 'Free cancellation up to 48 hrs before check-in',
  },
  {
    id: 'ht-wildflower',
    name: 'Wildflower Hall, An Oberoi Resort',
    city: 'Shimla',
    rating: 4.9,
    reviewsCount: 1420,
    pricePerNight: 28000,
    originalPrice: 36000,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    tag: 'Himalayan Luxury',
    amenities: ['Heated Indoor Pool', 'Open Air Cedar Whirlpool', 'Mountain Trekking', 'Boutique Spa'],
    location: 'Chharabra, Shimla, Himachal Pradesh',
    cancellationPolicy: 'Non-refundable discounted rate available',
  },
];

export const INITIAL_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-kashmir-magic',
    title: 'Enchanting Kashmir & Gulmarg Snow Wonderland',
    destination: 'Kashmir (Srinagar, Gulmarg, Pahalgam)',
    durationDays: 6,
    durationNights: 5,
    price: 26999,
    originalPrice: 34999,
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=80',
    badge: 'Bestseller',
    season: 'Autumn / Winter',
    hotelCategory: '4-Star Resorts & Luxury Houseboat',
    transportType: 'Private Chauffeur Sedan / SUV',
    highlights: ['Shikara ride on Dal Lake', 'Gulmarg Gondola Phase 1 & 2', 'Betaab Valley & Aru in Pahalgam', 'Luxury Houseboat stay'],
    status: 'Active',
    itinerarySummary: 'Experience alpine bliss with private transfers, stay in Dal Lake houseboat, and snowy adventures in Gulmarg.',
    inclusions: [
      '5 Nights Deluxe accommodation (1N Dal Lake Houseboat, 2N Gulmarg, 2N Pahalgam)',
      'Daily Buffet Breakfast and Chef Special Dinners',
      'Exclusive Chauffeur-driven private AC vehicle for all transfers and sightseeing',
      '1 Hour Shikara Ride across Dal Lake and Floating Market',
      'Toll taxes, parking, driver allowances, and 24/7 on-ground concierge support'
    ],
    exclusions: [
      'Airfare to/from Srinagar International Airport',
      'Gondola cable car tickets (Phase 1 & 2)',
      'Personal pony rides, snow equipment hire, and camera fees',
      'Any personal expenses, tips, or laundry'
    ],
    itineraryDaysList: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Sunset Shikara',
        description: 'Welcome to the summer capital of Kashmir! Transfer directly to your luxury heritage houseboat on Dal Lake. In the evening, embark on a private sunset Shikara ride across the lotus gardens and floating flower markets.',
        stay: 'Royal Heritage Deluxe Houseboat, Dal Lake',
        meals: 'Dinner Included',
        activities: ['Airport Pick-up', 'Check-in Houseboat', 'Shikara Boat Ride', 'Welcome Kashmiri Kahwa']
      },
      {
        day: 2,
        title: 'Srinagar to Gulmarg Meadow of Flowers & Snow Peaks',
        description: 'Drive along scenic pine avenues towards Gulmarg (2,730m). Check in to your alpine resort and head to the Gulmarg Gondola. Ride Phase 1 to Kongdoori and Phase 2 to Apharwat Peak for breathtaking views of snow-clad Himalayan ranges.',
        stay: 'The Khyber / Pine Palace Resort, Gulmarg',
        meals: 'Breakfast & Dinner',
        activities: ['Scenic Mountain Drive', 'Gulmarg Gondola Ascent', 'Snow activities & Ski photo-ops', 'Evening bonfire']
      },
      {
        day: 3,
        title: 'Gulmarg Golf Course & Transfer to Pahalgam Valley',
        description: 'Enjoy a morning walk across the world’s highest green golf course. Post-breakfast, depart for Pahalgam (Valley of Shepherds), passing saffron fields in Pampore and historic Awantipora ruins.',
        stay: 'Pahalgam Hotel / Grand Mumtaz Resorts',
        meals: 'Breakfast & Dinner',
        activities: ['Gulmarg Heritage Walk', 'Pampore Saffron Farms visit', 'Awantipora Ruins', 'Check-in Pahalgam']
      },
      {
        day: 4,
        title: 'Exploring Betaab Valley, Aru Valley & Chandanwari',
        description: 'Dedicate the full day to discovering the pristine valleys of Pahalgam. Visit picturesque Betaab Valley with Lidder River vistas, scenic Aru Village, and Chandanwari—the starting point of holy Amarnath Yatra.',
        stay: 'Pahalgam Hotel / Grand Mumtaz Resorts',
        meals: 'Breakfast & Dinner',
        activities: ['Betaab Valley exploration', 'Lidder river walk', 'Aru Village local crafts', 'Cafe hopping in Pahalgam market']
      },
      {
        day: 5,
        title: 'Pahalgam to Srinagar & Mughal Gardens Discovery',
        description: 'Return to Srinagar. Explore the timeless Mughal Gardens including Nishat Bagh (Garden of Pleasure), Shalimar Bagh (Abode of Love), and the holy Shankaracharya Temple overlooking Srinagar city.',
        stay: 'Fortune Resort Heevan / Mascot Hotel, Srinagar',
        meals: 'Breakfast & Dinner',
        activities: ['Nishat & Shalimar Bagh', 'Shankaracharya Temple visit', 'Pashmina & Walnut wood shopping in Lal Chowk']
      },
      {
        day: 6,
        title: 'Departure from Srinagar with Fond Memories',
        description: 'Savor your final Kashmiri breakfast. Chauffeur transfer to Sheikh ul-Alam International Airport (SXR) for your onward flight, carrying lifetime memories of paradise on earth.',
        stay: 'Departure Day',
        meals: 'Breakfast Included',
        activities: ['Hotel Check-out', 'Airport drop-off', 'Assisted web check-in']
      }
    ]
  },
  {
    id: 'pkg-rajasthan-royal',
    title: 'Royal Rajasthan Heritage: Jaipur, Jodhpur & Udaipur',
    destination: 'Rajasthan',
    durationDays: 7,
    durationNights: 6,
    price: 31500,
    originalPrice: 42000,
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop&q=80',
    badge: 'Heritage Classic',
    season: 'All Year',
    hotelCategory: '5-Star Heritage Havelis',
    transportType: 'Chauffeur Driven AC Innova Crysta',
    highlights: ['Amber Fort Elephant Ride', 'Mehrangarh Fort private walkthrough', 'Lake Pichola sunset boat cruise', 'Chokhi Dhani cultural night'],
    status: 'Active',
    itinerarySummary: 'Travel back to the era of kings with majestic palaces, desert culture, and authentic Rajasthani dining.',
    inclusions: [
      '6 Nights in Authentic Heritage Hotels (2N Jaipur, 2N Jodhpur, 2N Udaipur)',
      'Daily Royal Breakfast & Curated Traditional Dinners',
      'Private AC Innova Crysta with experienced Chauffeur for all intra-city travel',
      'Exclusive Sunset Boat Cruise on Lake Pichola in Udaipur',
      'All toll, state tax, and monument parking passes'
    ],
    exclusions: [
      'Domestic flights or train tickets to Jaipur / from Udaipur',
      'Monument entry tickets and personal audio guide fees',
      'Camera / Drone permits at forts'
    ],
    itineraryDaysList: [
      {
        day: 1,
        title: 'Arrival in Pink City Jaipur & Chokhi Dhani Village',
        description: 'Arrive at Jaipur Airport / Railway Station and transfer to your Heritage Haveli. In the evening, visit Chokhi Dhani for an authentic Rajasthani cultural evening featuring folk dances, puppet shows, and royal thali feast.',
        stay: 'Alsisar Haveli / Narain Niwas Palace, Jaipur',
        meals: 'Traditional Dinner',
        activities: ['Check-in', 'Chokhi Dhani Cultural Night', 'Traditional Thali']
      },
      {
        day: 2,
        title: 'Jaipur Forts, Hawa Mahal & City Palace',
        description: 'Full-day royal exploration of Amber Fort with panoramic Maota Lake views. Photo-stop at Jal Mahal and Hawa Mahal (Palace of Winds). Tour City Palace museum and Jantar Mantar observatory.',
        stay: 'Alsisar Haveli / Narain Niwas Palace, Jaipur',
        meals: 'Breakfast & Dinner',
        activities: ['Amber Fort', 'Hawa Mahal Photo-stop', 'City Palace & Museum', 'Johari Bazaar shopping']
      },
      {
        day: 3,
        title: 'Jaipur to Jodhpur (The Blue City)',
        description: 'Scenic drive to the Sun City, Jodhpur. Visit the majestic Jaswant Thada marble cenotaph and walk through the cobalt blue alleys of old Brahmpuri.',
        stay: 'Ajit Bhawan Palace / Ratan Vilas, Jodhpur',
        meals: 'Breakfast & Dinner',
        activities: ['Inter-city drive', 'Jaswant Thada', 'Blue City heritage walk', 'Clock Tower spice market']
      },
      {
        day: 4,
        title: 'Mehrangarh Fort & Umaid Bhawan Palace',
        description: 'Visit the formidable Mehrangarh Fort rising 400 feet above the city. Marvel at Sheesh Mahal and Phool Mahal. Later, visit Umaid Bhawan Palace museum—home to the Maharaja of Jodhpur.',
        stay: 'Ajit Bhawan Palace / Ratan Vilas, Jodhpur',
        meals: 'Breakfast & Dinner',
        activities: ['Mehrangarh Fort tour', 'Umaid Bhawan Palace Museum', 'Rooftop Rajasthani dinner']
      },
      {
        day: 5,
        title: 'Jodhpur to Udaipur via Ranakpur Jain Temples',
        description: 'Journey to Udaipur, stopping en route at Ranakpur to admire the breathtaking 1,444 intricately carved marble pillars of the 15th-century Jain Temple.',
        stay: 'Fateh Garh / Jagat Niwas Palace, Udaipur',
        meals: 'Breakfast & Dinner',
        activities: ['Ranakpur Temple stop', 'Arrival in City of Lakes', 'Evening Bagore Ki Haveli folk show']
      },
      {
        day: 6,
        title: 'Udaipur City Palace & Lake Pichola Cruise',
        description: 'Tour the grand Udaipur City Palace along the banks of Lake Pichola. Visit Saheliyon Ki Bari and Jagdish Temple. In the late afternoon, enjoy a tranquil sunset boat cruise on Lake Pichola with views of Lake Palace and Jag Mandir.',
        stay: 'Fateh Garh / Jagat Niwas Palace, Udaipur',
        meals: 'Breakfast & Dinner',
        activities: ['City Palace guided tour', 'Saheliyon Ki Bari', 'Sunset Lake Pichola Cruise']
      },
      {
        day: 7,
        title: 'Bid Farewell to Rajasthan',
        description: 'Enjoy a leisurely breakfast overlooking Lake Pichola. Transfer to Maharana Pratap Airport (UDR) for your journey home.',
        stay: 'Departure Day',
        meals: 'Breakfast Included',
        activities: ['Check-out', 'Airport transfer', 'Souvenir packaging assistance']
      }
    ]
  },
  {
    id: 'pkg-kerala-backwaters',
    title: 'Kerala Gods Own Country: Tea Gardens & Backwaters',
    destination: 'Kerala (Kochi, Munnar, Thekkady, Alleppey)',
    durationDays: 6,
    durationNights: 5,
    price: 22400,
    originalPrice: 28900,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
    badge: 'Trending',
    season: 'Monsoon / Winter',
    hotelCategory: '4-Star Plantation Resorts & Private Houseboat',
    transportType: 'Private AC Chauffeur Vehicle',
    highlights: ['Stay in Traditional Private Houseboat', 'Munnar Tea Plantation Tour', 'Periyar Wildlife Sanctuary boat safari', 'Kathakali cultural show'],
    status: 'Active',
    itinerarySummary: 'Unwind amidst rolling misty hills, aromatic spice gardens, and tranquil palm-fringed lagoons.',
    inclusions: [
      '5 Nights accommodation (2N Munnar, 1N Thekkady, 1N Alleppey Houseboat, 1N Kochi)',
      'All meals on board Alleppey Houseboat (Traditional Kerala Lunch, Tea/Snacks, Dinner, Breakfast)',
      'Buffet breakfast at all resorts',
      'Private AC Cab for all transfers and inter-city travel'
    ],
    exclusions: ['Airfare / Train fare to Kochi', 'Periyar Sanctuary boat safari entry tickets', 'Ayurvedic spa treatments'],
    itineraryDaysList: [
      {
        day: 1,
        title: 'Arrival in Kochi & Drive to Misty Munnar',
        description: 'Arrive at Cochin Airport (COK) and drive through scenic Western Ghats towards Munnar (1,600m). Stop at Cheeyappara and Valara waterfalls.',
        stay: 'Fragrant Nature Munnar / Blanket Hotel',
        meals: 'Dinner Included',
        activities: ['Waterfalls photo stop', 'Scenic Ghat drive', 'Resort check-in']
      },
      {
        day: 2,
        title: 'Munnar Tea Museum, Eravikulam National Park & Mattupetty',
        description: 'Visit Eravikulam National Park to spot the endangered Nilgiri Tahr. Explore Tata Tea Museum with tea-tasting session. Visit Mattupetty Dam and Echo Point.',
        stay: 'Fragrant Nature Munnar / Blanket Hotel',
        meals: 'Breakfast & Dinner',
        activities: ['Eravikulam Park', 'Tea Museum tasting', 'Mattupetty Dam boat ride', 'Echo Point']
      },
      {
        day: 3,
        title: 'Munnar to Thekkady (Periyar Tiger Reserve)',
        description: 'Drive to Thekkady, the spice capital of Kerala. Walk through fragrant cardamom, pepper, and cinnamon plantations. Evening Kathakali and Kalaripayattu martial arts performance.',
        stay: 'Greenwoods Resort / Cardamom County, Thekkady',
        meals: 'Breakfast & Dinner',
        activities: ['Spice Plantation Walk', 'Periyar Lake Safari', 'Kathakali & Martial Arts Show']
      },
      {
        day: 4,
        title: 'Thekkady to Alleppey Luxury Houseboat Cruise',
        description: 'Board your private traditional Kettuvallam (Houseboat) at Alleppey backwaters. Drift past paddy fields, fishing nets, and palm lagoons. Enjoy freshly caught Karimeen fish prepared by on-board chef.',
        stay: 'Private Air-Conditioned Deluxe Houseboat',
        meals: 'Lunch, Evening Snacks & Dinner on Houseboat',
        activities: ['Houseboat Boarding', 'Backwater canal cruise', 'Village walk', 'Sunset on Vembanad Lake']
      },
      {
        day: 5,
        title: 'Alleppey to Fort Kochi Heritage Quarter',
        description: 'Disembark houseboat and transfer to Fort Kochi. Walk past iconic Chinese Fishing Nets, St. Francis Church, Santa Cruz Basilica, and Jewish Synagogue in Jew Town.',
        stay: 'Brunton Boatyard / Fragrant Nature Fort Kochi',
        meals: 'Breakfast & Dinner',
        activities: ['Chinese Fishing Nets', 'Jewish Synagogue', 'Fort Kochi colonial cafe crawl']
      },
      {
        day: 6,
        title: 'Departure from Kochi',
        description: 'Transfer to Cochin International Airport (COK) for your onward flight.',
        stay: 'Departure Day',
        meals: 'Breakfast Included',
        activities: ['Airport Drop-off']
      }
    ]
  },
  {
    id: 'pkg-goa-sun-sand',
    title: 'Goa Coastal Bliss: North & South Beach Escape',
    destination: 'Goa',
    durationDays: 4,
    durationNights: 3,
    price: 13999,
    originalPrice: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    season: 'Winter / Spring',
    hotelCategory: '4-Star Beachside Resort',
    transportType: 'Private AC Vehicle',
    highlights: ['Dudhsagar Waterfalls Jeep Safari', 'Sunset cruise on Mandovi River', 'Scuba diving at Grand Island', 'Old Goa Portuguese Cathedrals'],
    status: 'Active',
    itinerarySummary: 'The ultimate beach getaway blending golden sands, vibrant flea markets, water sports, and heritage architecture.',
    inclusions: ['3 Nights stay in Beach Resort', 'Daily Breakfast Buffet', 'Airport Pick-up and Drop', 'North & South Goa Sightseeing'],
    exclusions: ['Flight tickets', 'Water sports charges at Baga', 'Personal casino expenses'],
    itineraryDaysList: [
      {
        day: 1,
        title: 'Arrival in Goa & Sunset Mandovi River Cruise',
        description: 'Arrive at Dabolim (GOI) or Mopa (GOX) airport. Transfer to your beachside resort. In the evening, enjoy a 1-hour sunset cruise on Mandovi River with Goan folk music.',
        stay: 'Taj Fort Aguada / Radisson Blu Goa',
        meals: 'Dinner Included',
        activities: ['Airport Transfer', 'Mandovi Sunset Cruise', 'Beach stroll']
      },
      {
        day: 2,
        title: 'North Goa Forts, Baga Beach & Flea Markets',
        description: 'Explore Fort Aguada overlooking the Arabian Sea, followed by Calangute, Baga, and Anjuna beaches. Enjoy beach shack dining and water sports.',
        stay: 'Taj Fort Aguada / Radisson Blu Goa',
        meals: 'Breakfast & Dinner',
        activities: ['Fort Aguada', 'Baga beach water sports', 'Anjuna flea market']
      },
      {
        day: 3,
        title: 'Old Goa Heritage Churches & South Goa Mangueshi Temple',
        description: 'Visit Basilica of Bom Jesus (UNESCO heritage) housing relics of St. Francis Xavier, Se Cathedral, and Mangueshi Temple. Relax at serene Colva beach.',
        stay: 'Taj Fort Aguada / Radisson Blu Goa',
        meals: 'Breakfast & Dinner',
        activities: ['Basilica of Bom Jesus', 'Se Cathedral', 'Spice plantation lunch', 'Colva Beach sunset']
      },
      {
        day: 4,
        title: 'Departure from Goa',
        description: 'Check out and transfer to airport with sun-kissed memories of Goa.',
        stay: 'Departure Day',
        meals: 'Breakfast Included',
        activities: ['Airport Transfer']
      }
    ]
  },
  {
    id: 'pkg-dubai-grand',
    title: 'Dubai Glamour & Desert Safari Extravaganza',
    destination: 'Dubai & Abu Dhabi',
    durationDays: 5,
    durationNights: 4,
    price: 44999,
    originalPrice: 58000,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    badge: 'International',
    season: 'Winter',
    hotelCategory: '4-Star Deluxe City Hotel',
    transportType: 'Private Coach & 4x4 Dune Land Cruiser',
    highlights: ['Burj Khalifa 124th Floor tickets', 'Desert Safari with BBQ & Tanoura show', 'Dhow Marina Dinner Cruise', 'Abu Dhabi Sheikh Zayed Mosque'],
    status: 'Active',
    itinerarySummary: 'A luxury international gateway featuring the worlds tallest skyscrapers, desert thrill, and world-class shopping.',
    inclusions: ['4 Nights Hotel stay', 'UAE Tourist Visa included', 'Desert Safari with BBQ', 'Burj Khalifa tickets', 'Marina Dhow Cruise'],
    exclusions: ['International flights', 'Tourism Dirham Fee (payable directly at hotel)', 'Personal shopping'],
    itineraryDaysList: [
      {
        day: 1,
        title: 'Arrival in Dubai & Marina Dhow Cruise Dinner',
        description: 'Welcome to Dubai! Check in to your hotel. In the evening, cruise along Dubai Marina on a luxury wooden Dhow with 5-star international buffet dinner and live entertainment.',
        stay: 'Millennium Place Dubai Marina / Aloft Palm',
        meals: 'Dinner on Cruise',
        activities: ['Airport Pickup', 'Marina Dhow Dinner Cruise']
      },
      {
        day: 2,
        title: 'Dubai City Tour & Burj Khalifa At The Top',
        description: 'Half-day panoramic city tour visiting Dubai Frame, Jumeirah Beach, and Burj Al Arab. Evening visit to Dubai Mall to watch the Fountain Show and ascend to 124th Floor of Burj Khalifa.',
        stay: 'Millennium Place Dubai Marina',
        meals: 'Breakfast Included',
        activities: ['Dubai City Tour', 'Burj Khalifa 124th Floor', 'Dubai Mall Fountain Show']
      },
      {
        day: 3,
        title: 'Thrill Desert Safari with Dune Bashing & BBQ Feast',
        description: 'Afternoon pickup in 4x4 Land Cruiser for adrenaline-pumping dune bashing in the golden desert. Camel riding, sandboarding, henna painting, Tanoura dance, belly dancing, and BBQ dinner under the stars.',
        stay: 'Millennium Place Dubai Marina',
        meals: 'Breakfast & BBQ Safari Dinner',
        activities: ['Dune Bashing 4x4', 'Camel Safari', 'BBQ Dinner & Cultural Show']
      },
      {
        day: 4,
        title: 'Day Trip to Abu Dhabi & Sheikh Zayed Grand Mosque',
        description: 'Full day excursion to the UAE capital. Visit the breathtaking Sheikh Zayed Grand Mosque with pure white marble domes, Emirates Palace, and photo-stop at Ferrari World on Yas Island.',
        stay: 'Millennium Place Dubai Marina',
        meals: 'Breakfast & Lunch',
        activities: ['Abu Dhabi Grand Mosque', 'Corniche Walk', 'Ferrari World photo-stop']
      },
      {
        day: 5,
        title: 'Shopping & Departure',
        description: 'Morning free for shopping at Meena Bazaar or Gold Souk. Transfer to Dubai International Airport (DXB) for your flight home.',
        stay: 'Departure Day',
        meals: 'Breakfast Included',
        activities: ['Airport Transfer']
      }
    ]
  },
  {
    id: 'pkg-ladakh-passes',
    title: 'High Altitude Odyssey: Leh, Nubra & Pangong Lake',
    destination: 'Ladakh',
    durationDays: 7,
    durationNights: 6,
    price: 33500,
    originalPrice: 42900,
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop&q=80',
    badge: 'Adventure',
    season: 'Summer / Autumn',
    hotelCategory: 'Boutique Hotel & Luxury Glamping',
    transportType: 'Private 4x4 SUV',
    highlights: ['Khardung La Pass (Highest Motorable Road)', 'Double-hump camel ride in Hunder dunes', 'Camping next to turquoise Pangong Lake', 'Thiksey Monastery early morning prayers'],
    status: 'Draft',
    itinerarySummary: 'Embark on a bucket-list journey across majestic Himalayan passes, Buddhist monasteries, and crystal blue glacial waters.',
    inclusions: ['Inner line permits', 'Oxygen cylinder in vehicle', 'Camps & Boutique hotel', 'Breakfast & Dinner'],
    exclusions: ['Flights to Leh', 'Camel ride in Hunder', 'Personal medical expenses'],
    itineraryDaysList: [
      {
        day: 1,
        title: 'Arrival in Leh & Acclimatization',
        description: 'Arrival at Kushok Bakula Rimpochee Airport (IXL). Complete rest day to acclimatize to high altitude (3,500m). Evening gentle stroll in Leh Market.',
        stay: 'Grand Dragon / The Zen Ladakh',
        meals: 'Dinner Included',
        activities: ['Rest & Acclimatization', 'Leh Market walk']
      },
      {
        day: 2,
        title: 'Leh Monasteries, Hall of Fame & Shanti Stupa',
        description: 'Visit Shey Palace, Thiksey Monastery, Hall of Fame museum, and sunset at Shanti Stupa overlooking Leh valley.',
        stay: 'Grand Dragon / The Zen Ladakh',
        meals: 'Breakfast & Dinner',
        activities: ['Thiksey Monastery', 'Shanti Stupa sunset', 'Hall of Fame']
      },
      {
        day: 3,
        title: 'Leh to Nubra Valley via Khardung La Pass',
        description: 'Cross Khardung La Pass (17,582 ft)—one of the worlds highest motorable passes. Descend to Nubra Valley and ride double-humped Bactrian camels at Hunder white sand dunes.',
        stay: 'Nubra Organic Retreat Camps, Hunder',
        meals: 'Breakfast & Dinner',
        activities: ['Khardung La Pass crossing', 'Hunder sand dunes camel ride', 'Diskit Monastery']
      },
      {
        day: 4,
        title: 'Nubra Valley to Pangong Lake via Shyok River',
        description: 'Drive along scenic Shyok River to the surreal turquoise Pangong Tso (14,270 ft), extending from India to Tibet. Watch the lake change shades of blue as the sun sets.',
        stay: 'Pangong Glamping Tents, Spangmik',
        meals: 'Breakfast & Dinner',
        activities: ['Shyok river route', 'Pangong Lake arrival', 'Star gazing']
      },
      {
        day: 5,
        title: 'Pangong Lake to Leh via Chang La Pass',
        description: 'Catch sunrise over Pangong Lake. Return to Leh crossing Chang La Pass (17,590 ft). En route visit Hemis Monastery.',
        stay: 'Grand Dragon / The Zen Ladakh',
        meals: 'Breakfast & Dinner',
        activities: ['Pangong sunrise', 'Chang La pass', 'Hemis Monastery']
      },
      {
        day: 6,
        title: 'Magnetic Hill & Sangam Confluence',
        description: 'Visit the gravity-defying Magnetic Hill, Gurudwara Pathar Sahib, and Sangam (confluence of Indus and Zanskar rivers).',
        stay: 'Grand Dragon / The Zen Ladakh',
        meals: 'Breakfast & Dinner',
        activities: ['Magnetic Hill', 'Sangam confluence', 'Shopping']
      },
      {
        day: 7,
        title: 'Departure from Leh',
        description: 'Transfer to Leh Airport with Himalayan memories.',
        stay: 'Departure Day',
        meals: 'Breakfast Included',
        activities: ['Airport Transfer']
      }
    ]
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-9021',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@gmail.com',
    customerPhone: '+91 98201 44521',
    type: 'Flight',
    title: 'IndiGo 6E-2041 (DEL -> BOM)',
    date: '2026-10-12',
    travelDate: '2026-10-24',
    amount: 9900,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    passengersCount: 2,
    pnr: '6E-FWU88',
    details: {
      flightNumber: '6E-2041',
      route: 'DEL (New Delhi) → BOM (Mumbai)',
      seatNumbers: ['12A', '12B']
    }
  },
  {
    id: 'BK-9022',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@gmail.com',
    customerPhone: '+91 98201 44521',
    type: 'Holiday',
    title: 'Enchanting Kashmir & Gulmarg Snow Wonderland (6D/5N)',
    date: '2026-10-11',
    travelDate: '2026-11-05',
    amount: 53998,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    passengersCount: 2,
    pnr: 'KSH-9120',
    details: {
      packageDuration: '6 Days / 5 Nights',
      route: 'Srinagar • Gulmarg • Pahalgam • Dal Lake'
    }
  },
  {
    id: 'BK-9023',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@gmail.com',
    customerPhone: '+91 98201 44521',
    type: 'Hotel',
    title: 'The Taj Mahal Palace, Mumbai (Superior Room)',
    date: '2026-10-10',
    travelDate: '2026-10-28',
    amount: 49000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    passengersCount: 2,
    pnr: 'TAJ-7714',
    details: {
      hotelRoom: 'Superior Sea-View Luxury Room (3 Nights)',
      route: 'Colaba, Mumbai'
    }
  },
  {
    id: 'BK-9024',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@outlook.com',
    customerPhone: '+91 94260 88210',
    type: 'Holiday',
    title: 'Kerala Gods Own Country: Tea Gardens & Backwaters',
    date: '2026-10-09',
    travelDate: '2026-11-20',
    amount: 44800,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    passengersCount: 2,
    pnr: 'KER-4412',
  },
  {
    id: 'BK-9025',
    customerName: 'Rohan Mukherjee',
    customerEmail: 'rohan.m@techcorp.in',
    customerPhone: '+91 98311 00342',
    type: 'Flight',
    title: 'Vistara UK-991 (DEL -> BOM) Premium Econ',
    date: '2026-10-08',
    travelDate: '2026-10-25',
    amount: 12200,
    status: 'Pending',
    paymentStatus: 'Pending',
    passengersCount: 2,
    pnr: 'UK-7890',
  },
  {
    id: 'BK-9026',
    customerName: 'Ananya Reddy',
    customerEmail: 'ananya.reddy@gmail.com',
    customerPhone: '+91 98490 12894',
    type: 'Flight',
    title: 'SpiceJet SG-8162 (DEL -> BOM)',
    date: '2026-10-07',
    travelDate: '2026-10-18',
    amount: 4180,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    passengersCount: 1,
    pnr: 'SG-2244',
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98201 44521',
    city: 'New Delhi',
    totalBookings: 5,
    totalSpent: 112898,
    memberTier: 'Platinum',
    lastInteraction: '2026-10-12',
    notes: 'Frequent business traveler on DEL-BOM route. Prefers aisle seat and Jain meal.',
  },
  {
    id: 'cust-102',
    name: 'Priya Patel',
    email: 'priya.patel@outlook.com',
    phone: '+91 94260 88210',
    city: 'Ahmedabad',
    totalBookings: 3,
    totalSpent: 112000,
    memberTier: 'Gold',
    lastInteraction: '2026-10-11',
    notes: 'Booked Kashmir honeymoon package. Requested high-floor Dal lake view houseboat.',
  },
  {
    id: 'cust-103',
    name: 'Rohan Mukherjee',
    email: 'rohan.m@techcorp.in',
    phone: '+91 98311 00342',
    city: 'Kolkata',
    totalBookings: 2,
    totalSpent: 62000,
    memberTier: 'Silver',
    lastInteraction: '2026-10-10',
    notes: 'Corporate account billing inquiry. Sent corporate GST invoice.',
  },
  {
    id: 'cust-104',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@gmail.com',
    phone: '+91 98490 12894',
    city: 'Hyderabad',
    totalBookings: 4,
    totalSpent: 74500,
    memberTier: 'Gold',
    lastInteraction: '2026-10-09',
    notes: 'Loyal customer. Requested assistance with web check-in & extra baggage.',
  },
  {
    id: 'cust-105',
    name: 'Vikram Malhotra',
    email: 'vikram.m@investments.com',
    phone: '+91 98110 56789',
    city: 'Mumbai',
    totalBookings: 6,
    totalSpent: 198000,
    memberTier: 'Platinum',
    lastInteraction: '2026-10-08',
    notes: 'High net worth traveler. Prefers 5-star properties and business class upgrades.',
  },
];

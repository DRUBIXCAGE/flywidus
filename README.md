# Fly wid Us - B2C Travel Booking Portal & CRM/CMS

A modern, highly interactive, minimalist B2C travel booking portal targeting the Indian market, paired with a deeply integrated CRM/CMS operations dashboard and future-proofed B2B gateway.

---

## 🚀 Tech Stack & Design Architecture

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI style tokens, Glassmorphism, Micro-interactions
- **Animations:** Framer Motion (smooth tab pills, expanding search filters, floating cards)
- **State Management:** Zustand (`useBookingStore` & `useAdminStore`)
- **Icons:** Lucide React
- **Typography & Theme:** Inter font, Deep Indigo (`#1e1b4b` / `#312e81`), Soft Saffron (`#f97316` / `#ea580c`), Warm White (`#faf9f6`)
- **Currency:** Indian Rupees (`₹` INR formatted via `Intl.NumberFormat('en-IN')`)

---

## 📂 Project Structure

```
c:/flywidus/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Inter font and SEO metadata
│   │   ├── globals.css            # Base Tailwind styles & glassmorphic utility classes
│   │   ├── page.tsx               # Main B2C Portal & Booking Wizard switch
│   │   ├── b2b-login/
│   │   │   └── page.tsx           # Corporate B2B Agent Portal Gateway
│   │   └── admin/
│   │       ├── layout.tsx         # Admin layout with collapsible CrmSidebar
│   │       ├── page.tsx           # Operations Dashboard (Metrics, charts, live feed)
│   │       ├── bookings/
│   │       │   └── page.tsx       # Bookings CRM (Status toggles & details)
│   │       ├── packages/
│   │       │   └── page.tsx       # Holiday Packages CMS (Catalog, Add/Edit modal)
│   │       ├── customers/
│   │       │   └── page.tsx       # Customer Relationship Management & interaction logs
│   │       └── settings/
│   │           └── page.tsx       # GDS Integrations, GST tax rules & promo codes
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx         # Responsive header with branding & currency switcher
│   │   │   └── Footer.tsx         # Minimalist footer with Indian routes & trust badges
│   │   ├── b2c/
│   │   │   ├── HeroSection.tsx    # Hero section with embedded floating search widget
│   │   │   ├── SearchWidget.tsx   # Glassy 4-tab widget [Flights | Hotels | Tours | Holidays]
│   │   │   ├── DebouncedAutocomplete.tsx # Debounced location picker (DEL, BOM, GOI, etc.)
│   │   │   ├── BookingWizard.tsx  # 5-step interactive wizard (Search -> Select -> Details -> Pay -> E-Ticket)
│   │   │   ├── CuratedDestinations.tsx # Handcrafted Indian & global destination showcase
│   │   │   ├── WhyChooseUs.tsx    # Zero convenience fee, human concierge pillars
│   │   │   ├── CustomerReviews.tsx# Verified Indian traveler testimonials
│   │   │   └── RagBotModal.tsx    # Floating action button + slide-up RAG assistant
│   │   └── crm/
│   │       ├── CrmSidebar.tsx     # Collapsible left slider with mobile drawer
│   │       ├── CrmHeader.tsx      # Top bar with carrier sync indicator
│   │       ├── DashboardMetrics.tsx # Minimalist Recharts/SVG revenue trajectory chart
│   │       ├── BookingsTable.tsx  # Data-dense bookings table with instant status toggles
│   │       ├── PackagesCMS.tsx    # Holiday packages catalog with Add/Edit modal form
│   │       └── CustomersCRM.tsx   # Customer tiers, lifetime spend ₹ & notes log
│   ├── data/
│   │   └── mockData.ts            # Realistic airports, flights (IndiGo, AI), hotels (Taj, ITC), packages
│   ├── lib/
│   │   └── utils.ts               # cn class merger & formatINR Indian currency utility
│   └── store/
│       ├── useBookingStore.ts     # Zustand store for booking flow, search & AI chat
│       └── useAdminStore.ts       # Zustand store for CRM, CMS packages & live metrics
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.mjs
```

---

## 🌟 Key Features Implemented

### 1. B2C User Portal (Public Facing)
- **Glassy 4-Tab Search Widget:** Seamlessly switch between `[Flights | Hotels | Tours | Holidays]`.
- **Live Debounced Autocomplete:** Typing `"DEL"` instantly matches `New Delhi (DEL)`, `"BOM"` matches `Mumbai (BOM)`, `"GOI"` matches `Goa (GOI)`, etc.
- **5-Step Booking Flow Wizard:**
  1. *Search:* Quick parameters with one-way/round-trip and special fares (Student, Defence, Senior Citizen).
  2. *Select:* Realistic Indian airline cards (IndiGo, Air India, Vistara, Akasa Air, SpiceJet) and 5-star hotels (The Taj Mahal Palace, ITC Maurya, Oberoi Amarvilas).
  3. *Passenger Details:* Multi-passenger form, seat preference, meal selection (AVML/VJML), Aadhaar/ID match notice, and optional business GSTIN.
  4. *Payment Gateway:* UPI QR code & VPA simulation (Google Pay, PhonePe, Paytm), Credit/Debit Card, Net Banking, and promo code engine (`FLYINDIASAFE` for ₹1,000 off + ₹0 convenience fee).
  5. *Confirmation Voucher:* Instant PNR generation (`FWU-89214`) and printable/downloadable e-ticket.
- **Floating RAG Bot Assistant:** Sleek bottom-right button opening "Fly wid Us Assistant" with sample prompt pills and conversational responses.

### 2. CRM / CMS Dashboard (Admin Facing)
- **Collapsible Slider Sidebar:** Desktop collapsing state with tooltips and mobile hamburger drawer.
- **Analytics & Revenue Chart:** Minimalist monthly revenue trajectory chart (May–October), category breakdown (Flights 52%, Holidays 31%, Hotels 17%), and key KPI cards in ₹.
- **Holiday Packages CMS:** Add, edit, delete, and toggle Active/Draft status for vacation packages with image previews, pricing, and itinerary days.
- **Bookings CRM:** Instant status toggles (`Confirmed`, `Pending`, `Cancelled`) and payment status (`Paid`, `Pending`, `Refunded`).
- **Customers CRM:** Lifetime spend in ₹, loyalty tiers (`Platinum`, `Gold`, `Silver`), and timestamped interaction notes.

### 3. Corporate B2B Agent Gateway
- Route `/b2b-login` with corporate dark minimalist theme.
- Features list: Wholesale net fares, mark-up engine, rolling deposit credit line, and demo auto-fill credentials.

---

## 🛠️ How to Run Locally

```bash
# Development Server
npm run dev

# Production Build & Start
npm run build
npm run start
```
The application runs locally on `http://localhost:3000`.

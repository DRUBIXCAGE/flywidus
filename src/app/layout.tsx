import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fly Wid Us | Premier Indian B2C Travel Booking & Flight Search Portal',
  description:
    'Book domestic and international flights, luxury heritage hotels, and handcrafted holiday packages across India with zero convenience fee.',
  keywords: [
    'flight booking',
    'India travel',
    'cheap flights India',
    'Kashmir tour packages',
    'Goa hotels',
    'IndiGo flight booking',
    'Air India flights',
    'luxury hotels India',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#faf9f6] text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}

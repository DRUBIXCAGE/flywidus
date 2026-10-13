'use client';

import React from 'react';
import { CrmHeader } from '@/components/crm/CrmHeader';
import { BookingsTable } from '@/components/crm/BookingsTable';

export default function BookingsAdminPage() {
  return (
    <>
      <CrmHeader
        title="Bookings & Reservations CRM"
        subtitle="Filter, review, and toggle live flight, hotel, and holiday booking status"
      />

      <main className="p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 w-full">
        <BookingsTable />
      </main>
    </>
  );
}

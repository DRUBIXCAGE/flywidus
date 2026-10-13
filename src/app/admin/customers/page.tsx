'use client';

import React from 'react';
import { CrmHeader } from '@/components/crm/CrmHeader';
import { CustomersCRM } from '@/components/crm/CustomersCRM';

export default function CustomersAdminPage() {
  return (
    <>
      <CrmHeader
        title="Customer Relationship Management (CRM)"
        subtitle="Manage loyalty tiers, traveler preferences, and historical interaction logs"
      />

      <main className="p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 w-full">
        <CustomersCRM />
      </main>
    </>
  );
}

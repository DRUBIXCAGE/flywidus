'use client';

import React from 'react';
import { CrmHeader } from '@/components/crm/CrmHeader';
import { PackagesCMS } from '@/components/crm/PackagesCMS';

export default function PackagesAdminPage() {
  return (
    <>
      <CrmHeader
        title="Holiday Packages CMS"
        subtitle="Create, edit, and organize holiday itineraries and seasonal promotions"
      />

      <main className="p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 w-full">
        <PackagesCMS />
      </main>
    </>
  );
}

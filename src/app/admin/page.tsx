'use client';

import React from 'react';
import { CrmHeader } from '@/components/crm/CrmHeader';
import { DashboardMetrics } from '@/components/crm/DashboardMetrics';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <>
      <CrmHeader
        title="Operations Dashboard"
        subtitle="Real-time revenue, booking pipeline, and inventory status"
        actionButton={
          <Link
            href="/admin/packages"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Plus className="w-4 h-4 text-saffron-400" />
            <span>Manage Packages</span>
          </Link>
        }
      />

      <main className="p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 w-full">
        <DashboardMetrics />
      </main>
    </>
  );
}

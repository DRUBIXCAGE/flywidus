import React from 'react';
import { CrmSidebar } from '@/components/crm/CrmSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Collapsible Left-side Sidebar Slider */}
      <CrmSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

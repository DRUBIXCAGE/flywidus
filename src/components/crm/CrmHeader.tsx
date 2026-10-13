'use client';

import React from 'react';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Plus,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import Link from 'next/link';

interface CrmHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function CrmHeader({ title, subtitle, actionButton }: CrmHeaderProps) {
  const { setIsMobileSidebarOpen } = useAdminStore();

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* System sync status badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>IndiGo & Air India GDS Live</span>
        </div>

        {/* Notification bell */}
        <div className="relative">
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-saffron-500 absolute top-2.5 right-2.5" />
          </button>
        </div>

        {/* Action Button if supplied */}
        {actionButton}
      </div>
    </header>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Palmtree,
  Users,
  Briefcase,
  Settings,
  Plane,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
  X,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  locked?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Holiday Packages', href: '/admin/packages', icon: Palmtree, badge: 'CMS' },
  { name: 'Customers', href: '/admin/customers', icon: Users, badge: 'CRM' },
  { name: 'B2B Portal', href: '/b2b-login', icon: Briefcase, locked: true, badge: 'Soon' },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function CrmSidebar() {
  const pathname = usePathname();
  const {
    isSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useAdminStore();

  const sidebarContent = (
    <aside
      className={`h-screen bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Branding */}
      <div>
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <Plane className="w-5 h-5 text-saffron-400 rotate-[-15deg]" />
            </div>
            {!isSidebarCollapsed && (
              <div className="truncate">
                <div className="text-base font-black text-white tracking-tight">
                  Fly Wid <span className="text-saffron-400">Us</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  CRM & CMS Desk
                </div>
              </div>
            )}
          </Link>

          {/* Collapse toggle (desktop) */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 items-center justify-center text-slate-400 hover:text-white transition"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-colors duration-150 group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
                title={isSidebarCollapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  {!isSidebarCollapsed && <span>{item.name}</span>}
                </div>

                {!isSidebarCollapsed && (
                  <div className="flex items-center gap-1.5">
                    {item.locked && <Lock className="w-3 h-3 text-slate-500" />}
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          item.badge === 'CMS'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : item.badge === 'CRM'
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : 'bg-saffron-500/20 text-saffron-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-800 space-y-3">
        {/* Switch to B2C Portal */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition ${
            isSidebarCollapsed ? 'justify-center' : ''
          }`}
          title="Back to Public B2C Portal"
        >
          <ExternalLink className="w-4 h-4 text-saffron-400 shrink-0" />
          {!isSidebarCollapsed && <span>View B2C Portal</span>}
        </Link>

        {/* Admin profile snippet */}
        {!isSidebarCollapsed && (
          <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Administrator</div>
              <div className="text-[10px] text-slate-400 truncate">HQ Operations • Delhi</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </div>

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-xs h-full bg-slate-900">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import React from 'react';
import {
  Banknote,
  CalendarCheck,
  Users,
  TrendingUp,
  ArrowUpRight,
  Plane,
  Building2,
  Palmtree,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { formatINR } from '@/lib/utils';
import Link from 'next/link';

export function DashboardMetrics() {
  const { getMetrics, bookings, packages } = useAdminStore();
  const metrics = getMetrics();

  // Monthly revenue mock bars
  const revenueHistory = [
    { month: 'May', revenue: 98000, bookings: 12 },
    { month: 'Jun', revenue: 124000, bookings: 18 },
    { month: 'Jul', revenue: 112000, bookings: 15 },
    { month: 'Aug', revenue: 145000, bookings: 22 },
    { month: 'Sep', revenue: 184000, bookings: 28 },
    { month: 'Oct', revenue: 219098, bookings: 34, current: true },
  ];

  const maxRevenue = Math.max(...revenueHistory.map((d) => d.revenue));

  return (
    <div className="space-y-8">
      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {formatINR(metrics.totalRevenue)}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% from last month</span>
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Bookings
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {metrics.totalBookings}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-1">
              <span className="text-emerald-600 font-bold">{metrics.confirmedBookings} Confirmed</span>
              <span>•</span>
              <span className="text-amber-600 font-bold">{metrics.pendingBookings} Pending</span>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Users
            </span>
            <div className="w-10 h-10 rounded-xl bg-saffron-50 text-saffron-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              12,480
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+8.2% monthly visits</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Conversion Rate
            </span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              4.3%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Industry average is ~2.8%
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Trend Minimalist Bar Chart */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Revenue Trajectory (₹ INR)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Monthly gross transactional value from Indian domestic & international bookings
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 font-semibold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-900" />
                Gross Booking Value
              </span>
            </div>
          </div>

          {/* Minimalist Bar Chart Container */}
          <div className="pt-6">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-200/80 pb-3">
              {revenueHistory.map((item) => {
                const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[11px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatINR(item.revenue)}
                    </div>
                    <div className="w-full max-w-[52px] bg-slate-100 rounded-t-xl overflow-hidden h-44 flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-110 ${
                          item.current
                            ? 'bg-gradient-to-t from-indigo-900 to-indigo-700 shadow-md'
                            : 'bg-indigo-200/70'
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-bold ${item.current ? 'text-indigo-950 font-black' : 'text-slate-500'}`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Breakdown & Quick Stats */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              Bookings by Category
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live booking distribution
            </p>
          </div>

          <div className="space-y-4 py-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-indigo-950">
                  <Plane className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Domestic & Int&apos;l Flights</span>
                </span>
                <span>52%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-700 rounded-full" style={{ width: '52%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-indigo-950">
                  <Palmtree className="w-3.5 h-3.5 text-saffron-600" />
                  <span>Holiday Packages</span>
                </span>
                <span>31%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-saffron-500 rounded-full" style={{ width: '31%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-indigo-950">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Heritage Hotels & Stays</span>
                </span>
                <span>17%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '17%' }} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/admin/packages"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-indigo-950 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <span>Manage CMS Packages ({packages.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Stream */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              Live Bookings Feed
            </h3>
            <p className="text-xs text-slate-500">
              Recent traveler transactions across the portal
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900"
          >
            View All in CRM →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-2">PNR / Ref</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">Trip / Details</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {bookings.slice(0, 4).map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-2 font-mono font-bold text-indigo-950">
                    {booking.pnr}
                  </td>
                  <td className="py-3 px-2">
                    <span className="font-bold text-slate-900 block">{booking.customerName}</span>
                    <span className="text-[11px] text-slate-400">{booking.customerEmail}</span>
                  </td>
                  <td className="py-3 px-2 font-medium">
                    {booking.title}
                  </td>
                  <td className="py-3 px-2 font-bold text-slate-900">
                    {formatINR(booking.amount)}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : booking.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {booking.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3" />}
                      {booking.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {booking.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

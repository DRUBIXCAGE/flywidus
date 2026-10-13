'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Plane,
  Building2,
  Palmtree,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { formatINR, formatDate } from '@/lib/utils';
import { Booking } from '@/data/mockData';

export function BookingsTable() {
  const { bookings, updateBookingStatus, updatePaymentStatus } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Cancelled'>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Filter bookings
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesType = typeFilter === 'All' || b.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search PNR, customer, flight..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Status filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(['All', 'Confirmed', 'Pending', 'Cancelled'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg transition ${
                  statusFilter === status
                    ? 'bg-white text-indigo-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-white rounded-xl border border-slate-200 text-slate-700 focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Flight">Flights</option>
            <option value="Hotel">Hotels</option>
            <option value="Holiday">Holidays</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Traveler / Customer</th>
                <th className="py-3.5 px-4">Travel Itinerary</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Booking Status (Toggle)</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* PNR */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-indigo-950 text-xs bg-indigo-50/70 border border-indigo-200/60 px-2 py-1 rounded-md">
                      {b.pnr}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                      {b.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900">{b.customerName}</div>
                    <div className="text-[11px] text-slate-400">{b.customerEmail}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{b.customerPhone}</div>
                  </td>

                  {/* Itinerary */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900 truncate">
                      {b.type === 'Flight' && <Plane className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                      {b.type === 'Hotel' && <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      {b.type === 'Holiday' && <Palmtree className="w-3.5 h-3.5 text-saffron-600 shrink-0" />}
                      <span className="truncate">{b.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {b.passengersCount} Traveller{b.passengersCount > 1 ? 's' : ''}
                    </div>
                  </td>

                  {/* Travel Date */}
                  <td className="py-4 px-4 font-medium text-slate-600">
                    {formatDate(b.travelDate)}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-4 font-black text-slate-900">
                    {formatINR(b.amount)}
                  </td>

                  {/* Interactive Status Toggle */}
                  <td className="py-4 px-4">
                    <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                      {(['Confirmed', 'Pending', 'Cancelled'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => updateBookingStatus(b.id, st)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                            b.status === st
                              ? st === 'Confirmed'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : st === 'Pending'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-red-600 text-white shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </td>

                  {/* Payment Status */}
                  <td className="py-4 px-4">
                    <select
                      value={b.paymentStatus}
                      onChange={(e) => updatePaymentStatus(b.id, e.target.value as any)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        b.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : b.paymentStatus === 'Pending'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(b)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Booking Overview
                </span>
                <h3 className="text-xl font-black text-indigo-950 font-mono">
                  {selectedBooking.pnr}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-bold text-slate-900">{selectedBooking.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Email:</span>
                <span className="font-semibold text-slate-800">{selectedBooking.customerEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Phone:</span>
                <span className="font-mono text-slate-800">{selectedBooking.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Trip / Route:</span>
                <span className="font-semibold text-slate-900">{selectedBooking.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Travel Date:</span>
                <span className="font-medium text-slate-800">{formatDate(selectedBooking.travelDate)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Total Amount:</span>
                <span className="font-black text-base text-emerald-700">{formatINR(selectedBooking.amount)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBooking(null)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Search,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  MessageSquarePlus,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { formatINR, formatDate } from '@/lib/utils';
import { Customer } from '@/data/mockData';

export function CustomersCRM() {
  const { customers, addCustomerNote } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newNote, setNewNote] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !newNote.trim()) return;

    addCustomerNote(selectedCustomer.id, newNote.trim());
    setNewNote('');
    // Update local selected reference
    const updated = customers.find((c) => c.id === selectedCustomer.id);
    if (updated) setSelectedCustomer(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top search & stats */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, city, email or phone..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <span>Total Registered Clients: <strong className="text-slate-900">{customers.length}</strong></span>
          <span>•</span>
          <span className="text-indigo-600 font-bold">2 Platinum Tier</span>
        </div>
      </div>

      {/* Customers List Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Member Tier</th>
                <th className="py-3.5 px-4">Bookings</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4 text-right">CRM History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 block text-xs">{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {c.id}</span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-slate-600 font-medium">{c.email}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{c.phone}</div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.city}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.memberTier === 'Platinum'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : c.memberTier === 'Gold'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      <span>{c.memberTier}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 font-bold text-slate-900">
                    {c.totalBookings} trips
                  </td>

                  <td className="py-4 px-4 font-black text-slate-900">
                    {formatINR(c.totalSpent)}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(c)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-[11px] transition flex items-center gap-1 ml-auto"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      <span>Interaction Notes</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer CRM Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Client CRM Card
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {selectedCustomer.name} ({selectedCustomer.memberTier})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl">
              <div>
                <span className="text-slate-400 block">Total Lifetime Spend</span>
                <span className="font-black text-indigo-950 text-sm">{formatINR(selectedCustomer.totalSpent)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Completed Trips</span>
                <span className="font-bold text-slate-900 text-sm">{selectedCustomer.totalBookings} Bookings</span>
              </div>
            </div>

            {/* Interaction Log History */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Traveler Profile & Interaction Log:
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-h-40 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {selectedCustomer.notes}
              </div>
            </div>

            {/* Add New Note */}
            <form onSubmit={handleAddNote} className="space-y-3 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-800">
                Append New Interaction Note:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="e.g. Sent hotel confirmation voucher via WhatsApp..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs rounded-xl transition"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

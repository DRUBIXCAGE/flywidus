'use client';

import React, { useState } from 'react';
import { CrmHeader } from '@/components/crm/CrmHeader';
import {
  Save,
  ShieldCheck,
  Zap,
  Globe,
  Bell,
  CheckCircle,
} from 'lucide-react';

export default function SettingsAdminPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <CrmHeader
        title="Portal & System Settings"
        subtitle="Configure Indian taxation rates, API synchronization, and security preferences"
      />

      <main className="p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 w-full max-w-5xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* General Business Config */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Taxation & Currency Rules</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Default Display Currency
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold">
                  <option>₹ INR (Indian Rupee)</option>
                  <option>$ USD (US Dollar)</option>
                  <option>AED (UAE Dirham)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Aviation GST Tax Rate
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold">
                  <option>12% (Standard Domestic Aviation)</option>
                  <option>18% (Business / Multi-modal)</option>
                  <option>5% (Tier 2/3 UDAN Routes)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Default Active Promo Code
                </label>
                <input
                  type="text"
                  defaultValue="FLYINDIASAFE"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono font-bold uppercase"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Convenience Fee Waiver
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold">
                  <option>Enabled (₹0 on Promo)</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Connected Flight GDS / Airline APIs */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-saffron-600" />
              <span>Direct Carrier Integrations</span>
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { name: 'IndiGo Direct NDC Connect', status: 'Connected • Latency 140ms', active: true },
                { name: 'Air India / Vistara New API', status: 'Connected • Latency 180ms', active: true },
                { name: 'Akasa Air Direct Push Engine', status: 'Connected • Latency 95ms', active: true },
                { name: 'Razorpay UPI & Bharat QR Gateway', status: 'Operational • Live Mode', active: true },
              ].map((api, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <span className="font-bold text-slate-900 block">{api.name}</span>
                      <span className="text-[11px] text-slate-500">{api.status}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            {saved ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Settings successfully saved and propagated!</span>
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4 text-saffron-400" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

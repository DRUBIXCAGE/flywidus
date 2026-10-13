'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Plane,
  ShieldCheck,
  Building,
  KeyRound,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';

export default function B2BLoginPage() {
  const [agentId, setAgentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedInNotice, setLoggedInNotice] = useState(false);

  const handleFillDemo = () => {
    setAgentId('FWU-AG-8821');
    setEmail('corporate.agent@delhitravels.com');
    setPassword('••••••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLoggedInNotice(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
      {/* Background Subtle Corporate Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Top Header */}
      <div className="w-full flex items-center justify-between relative z-10 pb-6 border-b border-slate-900">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Plane className="w-5 h-5 text-saffron-400 rotate-[-15deg]" />
          </div>
          <div>
            <div className="text-xl font-black text-white tracking-tight">
              Fly Wid <span className="text-saffron-400">Us</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block -mt-1">
              B2B Agent & Corporate Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Consumer Portal</span>
        </Link>
      </div>

      {/* Center Corporate Gateway Container */}
      <div className="max-w-4xl w-full mx-auto my-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Value Pitch for Travel Agents */}
        <div className="md:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-saffron-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Agent Sub-routing Gateway (Future-Proofed)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Institutional Travel Desk for Verified Agents & Enterprises
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            Access wholesale net fares for IndiGo, Air India, and Vistara with customized mark-ups, consolidated monthly GST invoicing, and high-credit balance lines.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Direct API Net Fares with Dynamic Mark-up Control',
              'Consolidated Monthly Corporate GST & Input Tax Credit',
              'Sub-Agent Staff Accounts & Multi-tier Approvals',
              'Instant Seat Blocking for Group Fares (10+ Travelers)',
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Corporate Login Card */}
        <div className="md:col-span-6">
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-black text-white">Agent Sign In</h2>
                <p className="text-xs text-slate-400 mt-0.5">Enter authorized agency credentials</p>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-saffron-400 bg-saffron-500/10 px-2.5 py-1 rounded-lg border border-saffron-500/20 hover:bg-saffron-500/20 transition"
              >
                Fill Demo
              </button>
            </div>

            {loggedInNotice ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-sm text-white">Agency Authenticated!</h3>
                <p className="text-xs text-slate-300">
                  Sub-routing module initialized for <strong>Delhi Travels Pvt Ltd</strong>. Transitioning to dedicated B2B agent terminal...
                </p>
                <Link
                  href="/admin"
                  className="inline-block mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
                >
                  Enter CRM / Operations Portal
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Agency ID / Corporate Account Code
                  </label>
                  <input
                    type="text"
                    required
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    placeholder="e.g. FWU-AG-8821"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono uppercase focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Registered Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@agencydomain.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Security Passkey / Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-saffron-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-saffron-500" />
                    <span>Remember terminal</span>
                  </label>
                  <span className="text-saffron-400 hover:underline cursor-pointer">Forgot passkey?</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>{isSubmitting ? 'Verifying Agency Credentials...' : 'Authenticate & Open Terminal'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal bar - Full Width */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 relative z-10 pt-6 border-t border-slate-900">
        <div>
          <span>Ministry of Civil Aviation • IATA Agency Code 14-3 9201</span>
        </div>
        <div>
          <span>© 2026 Fly Wid Us B2B Network • All wholesale transactions subject to RBI guidelines</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ArrowRight, BarChart3, Box, Layers, Play, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MainLandingUi() {
  return (
    <main className="w-full flex flex-col bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial from-indigo-50/50 to-transparent z-0" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest animate-fade-in">
              <Zap size={14} fill="currentColor" /> Now in Private Beta
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[0.95]">
              The Operating <br />
              <span className="text-indigo-600">System for Retail.</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              A high-performance POS ecosystem designed for owners who demand precision. Track inventory, analyze growth, and scale with a unified console.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link href="/owner/dashboard">
                <Button className="h-16 px-10 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-100 active:scale-95">
                  Launch Console <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Button variant="outline" className="h-16 px-10 border-slate-200 text-slate-600 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                <Play className="mr-2" size={16} fill="currentColor" /> Watch System Demo
              </Button>
            </div>
          </div>

          {/* MOCKUP PREVIEW */}
          <div className="flex-1 w-full relative">
            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[40] blur-3xl" />
            <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-[32] shadow-2xl border-8 border-slate-800 overflow-hidden group">
              {/* Decorative "Inner Dashboard" look */}
              <div className="absolute top-0 left-0 w-full h-12 bg-slate-800 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="p-6 rounded-full bg-white/5 border border-white/10 text-white/20 group-hover:scale-110 group-hover:text-indigo-400 transition-all duration-500">
                  <Play size={48} fill="currentColor" />
                </div>
                <span className="mt-4 text-white/30 text-[10] font-black uppercase tracking-[0.4em]">Initialize Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - "BENTO" GRID STYLE */}
      <section className="py-32 px-6 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-[11] font-black text-indigo-600 uppercase tracking-[0.4em]">Engine Capabilities</h2>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tighter uppercase">Everything you need to scale</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-4 p-10 rounded-[32] bg-white border border-slate-200 hover:border-indigo-200 transition-all group overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <Box size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Smart Inventory (CRUD)</h3>
                <p className="text-slate-500 font-medium max-w-sm">Full control over your product lifecycle. Manage variations, batch pricing, and stock alerts with zero latency.</p>
              </div>
              <div className="absolute right-[-20] bottom-[-20] opacity-5 group-hover:opacity-10 transition-opacity">
                <Box size={200} />
              </div>
            </div>

            {/* Feature 2 - Small */}
            <div className="md:col-span-2 p-10 rounded-[32] bg-slate-900 text-white border border-slate-800 hover:border-slate-700 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Growth Analytics</h3>
              <p className="text-slate-400 text-sm font-medium">Real-time revenue monitoring and monthly profit projections.</p>
            </div>

            {/* Feature 3 - Small */}
            <div className="md:col-span-2 p-10 rounded-[32] bg-white border border-slate-200 hover:border-indigo-200 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Layers size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Multi-Tenant</h3>
              <p className="text-slate-500 text-sm font-medium">Built for individual owners and expanding teams.</p>
            </div>

            {/* Feature 4 - Medium/Callout */}
            <div className="md:col-span-4 p-10 rounded-[32] bg-indigo-600 text-white transition-all flex flex-col justify-center relative overflow-hidden">
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-none">Built for 2027 Standards</h3>
              <p className="text-indigo-100 font-medium max-w-md">Our architecture is built for speed. Experience the fastest receipt recognition and inventory management in the market.</p>
              <CheckCircle2 size={120} className="absolute right-[-10] top-[-10] text-indigo-500/50 rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-white flex flex-col items-center">
        <div className="max-w-4xl w-full bg-slate-900 rounded-[40] p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl font-extrabold tracking-tighter uppercase leading-tight">
              Ready to modernize <br /> your operations?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">Join the initial cohort of owners transforming their businesses with our POS Engine.</p>
            <Button className="h-16 px-12 bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95">Secure Beta Access</Button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-10 border-t border-slate-100 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-slate-900 p-2 rounded-lg text-white">
            <LayoutGrid size={20} />
          </div>
          <span className="font-black uppercase tracking-[0.3em] text-slate-900">Console POS</span>
        </div>

        <div className="pt-8 border-t border-slate-100 w-full max-w-7xl text-slate-400 text-[10] font-black uppercase tracking-[0.3em] flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2026 Engine Core v1.0.4 - Tangerang Dev Hub</p>
          <div className="flex gap-8">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">System Support</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Privacy</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Simple LayoutGrid icon for footer logo
function LayoutGrid({ size }: { size: number }) {
  return <Box size={size} />;
}

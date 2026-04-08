"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Store, User, LayoutDashboard, PackageSearch } from "lucide-react";

export default function OwnerNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Side: Shop Brand & Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/owner/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <Store size={20} />
            </div>
            <span>
              Admin<span className="text-red-500">Panel</span>
            </span>
          </Link>

          {/* Main Owner Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/owner/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 transition-colors">
              <LayoutDashboard size={16} />
              Overview
            </Link>
            <Link href="/dashboard/products" className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 transition-colors">
              <PackageSearch size={16} />
              Inventory
            </Link>
          </div>
        </div>

        {/* Right Side: Tools & Account */}
        <div className="flex items-center gap-3">
          {/* Shop Indicator (Good for your Multi-tenant logic) */}
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Active Store</span>
            <span className="text-sm font-medium text-slate-900">Main Street Branch</span>
          </div>

          <div className="h-8 w-px bg-slate-200 mx-2" />

          {/* Notification & Settings */}
          <Button variant="ghost" size="icon" className="text-slate-500">
            <Bell size={20} />
          </Button>

          <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Settings size={20} />
            </Button>
          </Link>

          {/* Profile Dropdown Placeholder */}
          <Button variant="outline" size="sm" className="rounded-full gap-2 px-3">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
              <User size={14} className="text-slate-500" />
            </div>
            <span className="hidden lg:inline text-xs font-bold">Charles</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

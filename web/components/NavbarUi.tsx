"use client";

import { LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function NavbarUi() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-slate-900 p-2 rounded-xl text-white group-hover:bg-indigo-600 transition-colors">
            <LayoutGrid size={22} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-slate-900">
            Console<span className="text-indigo-600">POS</span>
          </span>
        </Link>

        {/* CENTER LINKS - HIDDEN ON MOBILE */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Pricing"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className=" font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* ACTION SECTION */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-6 w-[1] bg-slate-200 mx-2" />

          <Sheet>
            <SheetTrigger>
              <Button className="...">Deploy System</Button>
            </SheetTrigger>
            <SheetContent className="w-[400] sm:w-[540] flex flex-col gap-8 p-12">
              <SheetHeader>
                <SheetTitle className="text-3xl font-black uppercase tracking-tighter">Access Gate</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4">
                {/* Option 1: Owner */}
                <Link href="/form/ownerLogin" className="p-6 border rounded-2xl hover:border-indigo-600 transition-all group">
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600">Owner Terminal</h4>
                  <p className="text-sm text-slate-500">Resume your business session.</p>
                </Link>

                {/* Option 2: Sign Up */}
                <Link href="/form/signUp" className="p-6 bg-slate-900 rounded-2xl group">
                  <h4 className="font-bold text-white">Initialize New Business</h4>
                  <p className="text-sm text-slate-400">Deploy a new retail infrastructure.</p>
                </Link>

                {/* Option 3: Admin */}
                <Link href="/form/adminLogin" className="mt-auto text-center text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900">
                  System Root Access →
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

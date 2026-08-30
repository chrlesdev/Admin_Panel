"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Store, Plus, Settings, ArrowRight, Edit3, Trash2, LayoutGrid, Activity, ShieldCheck } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function EditShopUi() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/v1/shop/${id}/delete`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Shop removed from console");
        setShops((prev) => prev.filter((s) => s.id !== id));
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("Backend Connection Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="text-slate-300 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-full transition-all cursor-pointer">
            <Settings size={22} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[420] rounded-[32] border-none shadow-2xl p-8">
          <DialogHeader className="space-y-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Settings size={24} />
            </div>
            <DialogTitle className="text-3xl font-extrabold tracking-tighter text-slate-900">Shop Settings</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium leading-relaxed">
              Administrative controls for <span className="text-indigo-600 font-bold">{shop.shopName}</span>. Changes are applied in real-time.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-8 gap-3 flex flex-col">
            <div
              onClick={() => router.push(`/owner/shop/${shop.id}/edit`)}
              className="w-full flex items-center justify-start gap-4 h-16 px-6 font-bold border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-300 rounded-2xl transition-all cursor-pointer group/btn"
            >
              <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover/btn:bg-indigo-50 group-hover/btn:border-indigo-100">
                <Edit3 size={18} className="text-slate-600 group-hover/btn:text-indigo-600" />
              </div>
              <span className="text-slate-700 tracking-tight">MODIFY CONFIGURATION</span>
            </div>

            <AlertDialog>
              <AlertDialogTrigger>
                <div className="w-full flex items-center justify-start gap-4 h-16 px-6 font-bold border border-slate-100 bg-red-50/30 hover:bg-red-50 hover:border-red-200 rounded-2xl transition-all cursor-pointer group/del">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover/del:bg-red-100 group-hover/del:border-red-200">
                    <Trash2 size={18} className="text-slate-400 group-hover/del:text-red-600" />
                  </div>
                  <span className="text-slate-500 group-hover/del:text-red-600 tracking-tight uppercase">Decommission Store</span>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[32] border-none p-10">
                <AlertDialogHeader className="space-y-4">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto">
                    <Trash2 size={28} />
                  </div>
                  <AlertDialogTitle className="text-3xl font-extrabold tracking-tighter text-center">Security Check</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-500 font-medium text-center">
                    You are about to delete <span className="text-slate-900 font-bold">{shop.shopName}</span>. This will purge all associated terminal data and cannot be reversed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-10 gap-3 flex flex-col sm:flex-row">
                  <AlertDialogCancel className="rounded-2xl font-bold border-slate-200 h-14 flex-1 text-xs uppercase tracking-widest">Abort</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(shop.id)} className="rounded-2xl font-bold bg-red-600 hover:bg-red-700 h-14 flex-1 text-xs uppercase tracking-widest">
                    Confirm Purge
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </DialogContent>
      </Dialog>
      <h1>test </h1>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Store, Plus, Settings, ArrowRight, Edit3, Trash2, LayoutGrid, Activity, ShieldCheck } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Shop {
  platform: { name: string };
  id: string;
  shopName: string;
  ownerId: string;
}

export default function DashboardUi() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:8000/api/v1/owner/user", {
          method: "GET",
          credentials: "include",
        });
        const userData = await userRes.json();

        const shopRes = await fetch(`http://localhost:8000/api/v1/shop/${userData.data.id}/shop`, {
          method: "GET",
          credentials: "include",
        });
        const shopData = await shopRes.json();
        setShops(shopData.data || []);
      } catch (error) {
        toast.error("Backend Connection Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shrink-0">
                <LayoutGrid size={24} />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter uppercase">Dashboard</h1>
            </div>
            <p className="text-slate-500 font-medium tracking-tight">Central management for your retail infrastructure.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-6 bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm mr-4">
              <div className="flex flex-col">
                <span className=" font-black text-slate-400 uppercase tracking-widest">Total Stores</span>
                <span className="text-lg font-bold text-slate-900">{shops.length}</span>
              </div>
              <div className="h-8 w-[1] bg-slate-100" />
              <div className="flex flex-col">
                <span className=" font-black text-slate-400 uppercase tracking-widest">System</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                  <ShieldCheck size={14} /> ONLINE
                </span>
              </div>
            </div>

            <Link href="/owner/createShop">
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all gap-2 h-14 px-8 font-bold uppercase tracking-widest text-xs rounded-2xl">
                <Plus size={20} />
                Deploy Shop
              </Button>
            </Link>
          </div>
        </div>

        {/* SHOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="h-[300] rounded-3xl bg-white border border-slate-200 animate-pulse" />)
          ) : (
            <>
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className="group bg-white border border-slate-200 rounded-[32] p-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-200 transition-all duration-500 flex flex-col justify-between h-[320]"
                >
                  <div className="min-w-0">
                    {" "}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                        <Store size={28} />
                      </div>

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
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-[6] h-[6] rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className=" font-black text-indigo-600 uppercase tracking-[0.3em] truncate">{shop.platform?.name || "Marketplace"}</span>
                    </div>
                    {/* FIXED: Added break-all and line-clamp to prevent overflow */}
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tighter uppercase leading-[0.95] break-all line-clamp-2 min-h-[60]">{shop.shopName}</h3>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <Button
                      onClick={() => router.push(`/owner/shop/${shop.id}`)}
                      className="flex-1 h-16 flex items-center justify-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-[20] text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-[0.98]"
                    >
                      Access Shop
                      <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              ))}

              <Link
                href="/owner/createShop"
                className="group h-[320] flex flex-col items-center justify-center gap-6 rounded-[32] border-2 border-dashed border-slate-200 bg-transparent transition-all hover:bg-white hover:border-indigo-300 hover:shadow-xl"
              >
                <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all duration-500 shadow-sm">
                  <Plus size={40} />
                </div>
                <div className="text-center">
                  <p className=" font-black text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-[0.25em]">Initialize</p>
                  <p className="text-sm font-bold text-slate-500">New Marketplace</p>
                </div>
              </Link>
            </>
          )}
        </div>

        <footer className="mt-24 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 font-black uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
            <div className="w-[8] h-[8] rounded-full bg-indigo-200 shrink-0" />
            <p className="">Kernel Version 1.0.4-LTS</p>
          </div>
          <div className="flex gap-8 ">
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Global Support</span>
            <span className="text-slate-300">© 2026</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

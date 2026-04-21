"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Store, Plus, Settings, ArrowRight, Edit3, Trash2 } from "lucide-react";

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
  platformName?: string;
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

        console.log("shop :", shopData);
        setShops(shopData.data || []);
      } catch (error) {
        toast.error("Backend Connection Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = () => {};

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Store Overview</h1>
            <p className="text-slate-500 mt-2 font-medium">Manage your connected marketplaces and point-of-sale configurations.</p>
          </div>

          <Link href="/owner/createShop">
            <Button className="shadow-sm hover:shadow-lg transition-all gap-2 h-12 px-8 font-bold uppercase tracking-tight">
              <Plus size={20} />
              Add New Shop
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="h-60 rounded-2xl bg-white border border-slate-200 animate-pulse" />)
          ) : (
            <>
              {shops.map((shop) => (
                <div key={shop.id} className="group bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Store size={28} />
                      </div>

                      <Dialog>
                        <DialogTrigger>
                          <button className="text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-50 rounded-full transition-colors">
                            <Settings size={22} />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400] rounded-3xl border-none shadow-2xl">
                          <DialogHeader className="space-y-3">
                            <DialogTitle className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                              <Settings className="text-blue-600" size={20} />
                              Shop Settings
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">
                              You are managing <span className="text-slate-900 font-bold">{shop.shopName}</span>. Select an action below.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="pt-6 gap-3 flex flex-col">
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-4 h-14 font-bold border-slate-200 hover:bg-slate-50 hover:border-blue-300 rounded-xl transition-all"
                              onClick={() => router.push(`/owner/shop/${shop.id}/edit`)}
                            >
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50">
                                <Edit3 size={18} className="text-slate-600" />
                              </div>
                              EDIT STORE DETAILS
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Button variant="outline" className="w-full justify-start gap-4 h-14 font-bold border-slate-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-all group">
                                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-red-100 transition-colors">
                                    <Trash2 size={18} className="text-slate-600 group-hover:text-red-600" />
                                  </div>
                                  <span className="group-hover:text-red-600">REMOVE STORE</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="rounded-3xl border-none">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-2xl font-bold tracking-tighter">Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-slate-500 font-medium">
                                    This will permanently delete <span className="text-slate-900 font-bold">{shop.shopName}</span> and all its inventory data. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-6 gap-3">
                                  <AlertDialogCancel className="rounded-xl font-bold border-slate-200 h-12">CANCEL</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(shop.id)} className="rounded-xl font-bold bg-red-600 hover:bg-red-700 h-12">
                                    DELETE PERMANENTLY
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-[0.25em]">{shop.platform?.name || "Offline Store"}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{shop.shopName}</h3>
                  </div>

                  <div className="mt-10">
                    <Button
                      onClick={() => router.push(`/owner/shop/${shop.id}`)}
                      className="w-full h-14 flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-sm font-bold uppercase tracking-wide transition-all group-hover:translate-y-[-2] shadow-md"
                    >
                      Open Shop <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add Shop "Dashed" Card */}
              <Link
                href="/owner/createShop"
                className="group h-60 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-transparent transition-all hover:bg-white hover:border-blue-400 hover:shadow-inner"
              >
                <div className="p-4 rounded-full bg-slate-100 border border-slate-200 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                  <Plus size={32} />
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Connect Marketplace</span>
              </Link>
            </>
          )}
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>POS Management Engine v1.0.4</p>
          <div className="flex gap-6">
            <span>Tangerang Dev Hub</span>
            <span>Support</span>
            <span>© 2026</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

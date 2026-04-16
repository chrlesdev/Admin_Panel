"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Store, Plus, LayoutDashboard, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Shop {
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
          method: "Get",
          credentials: "include",
        });

        const userData = await userRes.json();

        const shopRes = await fetch(`http://localhost:8000/api/v1/shop/${userData.data.id}/shop`, {
          method: "Get",
          credentials: "include",
        });

        const shopData = await shopRes.json();

        console.log(shopData.data[1].id);

        setShops(shopData.data);
      } catch (error) {
        toast.error("Backend Connection Failed");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Store Overview</h1>
          <p className="text-zinc-500 text-sm">Manage and monitor your connected marketplaces.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          /* Pulsing refined skeleton */
          [1, 2].map((i) => <div key={i} className="h-[160] rounded-xl bg-zinc-900/50 animate-pulse border border-zinc-800" />)
        ) : (
          <>
            {shops.map((shop) => (
              <div key={shop.id} className="group relative flex flex-col justify-between p-6 rounded-xl bg-zinc-900 border border-zinc-800 transition-all hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-black border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      <Store size={20} className="text-zinc-400 group-hover:text-white" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1">Marketplace</h2>
                      <h3 className="text-lg font-bold text-white leading-tight">{shop.shopName}</h3>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-800/50">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer uppercase tracking-widest" onClick={() => router.push(`/owner/shop/${shop.id}`)}>
                    <LayoutDashboard size={14} /> Enter Shop
                  </button>
                  <ChevronRight size={16} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}

            <button className="group h-[160] flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-zinc-800 bg-transparent transition-all hover:bg-zinc-900/40 hover:border-zinc-600 cursor-pointer">
              <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform">
                <Plus size={24} className="text-zinc-500 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Add New Shop</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

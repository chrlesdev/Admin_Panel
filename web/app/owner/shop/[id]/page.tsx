"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, ArrowLeft, Plus, Search, MoreVertical } from "lucide-react";
import Link from "next/link";

interface shopDetaill {
  id: string;
  shopName: string;
  ownerId: string;
}

interface productDetail {
  id: string;
  productName: string;
  productStock: number;
  productCostPrice: number;
  productSellingPrice: number;
}

export default function ShopDetails() {
  const params = useParams();
  const shopId = params.id;

  const [shopDetail, setShopDetail] = useState<shopDetaill>();
  const [productDetails, setProductDetails] = useState<productDetail[]>([]);

  useEffect(() => {
    if (!shopId) return;
    const fetchShopDetail = async () => {
      const response = await fetch(`http://localhost:8000/api/v1/shop/${shopId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      const productResponse = await fetch(`http://localhost:8000/api/v1/product/${shopId}/product`, {
        method: "GET",
        credentials: "include",
      });

      const productData = await productResponse.json();
      const items = productData.data[0]?.products || [];

      setProductDetails(items);
      setShopDetail(data.data);
    };
    fetchShopDetail();
  }, [shopId]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/owner/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold tracking-tighter text-white">{shopDetail?.shopName || "Loading..."}</h1>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] uppercase font-bold tracking-widest">Active</span>
            </div>
            <p className="text-zinc-500 text-sm font-mono">ID: {shopId}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all">
              <Search size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-zinc-200 transition-all">
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">Total Inventory</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">{productDetails.length}</h3>
              <Package className="text-zinc-700" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-zinc-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500 text-center">Stock</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {productDetails.map((product) => (
                <tr key={product.id} className="group hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-200">{product.productName}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.productStock > 10 ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"}`}>{product.productStock} in stock</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 font-mono">Rp {product.productSellingPrice.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {productDetails.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 italic">
                    No products found in this marketplace.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

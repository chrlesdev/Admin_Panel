"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, ArrowLeft, Plus, Search, Edit3, MoreVertical, Store, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) return;
    const fetchShopDetail = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchShopDetail();
  }, [shopId]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <Link href="/owner/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-10 text-sm font-semibold group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO DASHBOARD
        </Link>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-blue-600">
              <Store size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 uppercase">{shopDetail?.shopName || "Loading..."}</h1>
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-[10px] uppercase font-black tracking-widest">Live Terminal</span>
              </div>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Inventory Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-600 font-bold uppercase text-xs h-11 px-5 shadow-sm">
              <Search size={16} className="mr-2" /> Search Product
            </Button>
            <Link href={"/owner/product/newProduct"} className="bg-slate-900 text-white font-bold uppercase text-xs h-11 px-5 shadow-lg hover:bg-blue-700 transition-all">
              <Plus size={16} className="mr-2" /> Add Product
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Total Products</p>
              <Package className="text-blue-500" size={20} />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tighter">{productDetails.length}</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Product Info</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Stock Level</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Unit Price</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {productDetails.map((product) => (
                  <tr key={product.id} className="group hover:bg-blue-50/30 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-500 transition-colors">
                          <Tag size={16} />
                        </div>
                        <span className="font-bold text-slate-800 tracking-tight">{product.productName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          product.productStock > 10 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                        }`}
                      >
                        {product.productStock} units
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-600">Rp {product.productSellingPrice.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right">
                      <Dialog>
                        <DialogTrigger className="p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </DialogTrigger>
                        <DialogContent>
                          <div className="w-full flex items-center justify-start gap-4 h-16 px-6 font-bold border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-300 rounded-2xl transition-all cursor-pointer group/btn">
                            <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover/btn:bg-indigo-50 group-hover/btn:border-indigo-100">
                              <Edit3 size={18} className="text-slate-600 group-hover/btn:text-indigo-600" />
                            </div>
                            <span className="text-slate-700 tracking-tight">Edit Product</span>
                          </div>
                          <div className="w-full flex items-center justify-start gap-4 h-16 px-6 font-bold border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-300 rounded-2xl transition-all cursor-pointer group/btn">
                            <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover/btn:bg-indigo-50 group-hover/btn:border-indigo-100">
                              <Edit3 size={18} className="text-slate-600 group-hover/btn:text-indigo-600" />
                            </div>
                            <span className="text-slate-700 tracking-tight">Delete Product</span>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {productDetails.length === 0 && !loading && (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <div className="p-4 bg-slate-50 rounded-full mb-4">
                <Package size={32} className="text-slate-900" />
              </div>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">No Products Found</p>
              <p className="text-slate-400 text-sm mt-1">Start by adding your first item to this marketplace.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

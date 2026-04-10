"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface shopDetaill {
  id: string;
  shopName: string;
  ownerId: string;
}

export default function ShopDetails() {
  const params = useParams();
  const shopId = params.id;

  const [shopDetail, setShopDetail] = useState<shopDetaill>();

  useEffect(() => {
    if (!shopId) return;

    const fetchShopDetail = async () => {
      // Now you can use the ID from the URL to fetch data for ONLY this shop
      const response = await fetch(`http://localhost:8000/api/v1/shop/${shopId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setShopDetail(data.data);
    };

    fetchShopDetail();
  }, [shopId]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Halo coi ini detail shopnya</h1>
      <p className="text-zinc-500 font-mono mt-2">Managing Shop ID: {shopId}</p>

      {shopDetail && (
        <div className="mt-6 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h2 className="text-xl">{shopDetail.shopName}</h2>
        </div>
      )}
    </div>
  );
}

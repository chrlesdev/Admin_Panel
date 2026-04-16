"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface shopDetaill {
  id: string;
  shopName: string;
  ownerId: string;
}

interface productDetail {
  id: string;
  productName: string;
  producStock: Int32Array;
  productCostPrice: Float16Array;
  productSellingPrice: Float16Array;
}

export default function ShopDetails() {
  const params = useParams();
  const shopId = params.id;

  const [shopDetail, setShopDetail] = useState<shopDetaill>();
  const [productDetails, setProductDetails] = useState<any[]>([]);

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
      console.log("product Data : ", productData.data);

      if (productData.data && productData.data[0]?.products) {
        setProductDetails(productData.data[0].products);
      } else {
        setProductDetails(productData.data);
      }

      setProductDetails(productData.data);
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
          <div>
            {productDetails.map((product) => (
              <div key={product.id}>product Name: {product.products.id}</div>
            ))}

            <p>Total Products: {productDetails.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

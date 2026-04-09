"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardUi() {
  useEffect(() => {
    const userData = async () => {
      try {
        const userDatas = await fetch("http://localhost:8000/api/v1/owner", {
          credentials: "include",
        });

        const datas = await userDatas.json();

        console.log("user Datas :", datas);
      } catch (error) {
        toast.error("Connection failed. Is the backend running?");
        console.error("Auth Error:", error);
      }
    };
    userData();
  }, []);

  return (
    <div>
      <h1>wlee</h1>
    </div>
  );
}

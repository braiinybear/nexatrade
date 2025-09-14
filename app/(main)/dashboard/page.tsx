"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setProfile(snap.data());
      }
    });
    return () => unsub();
  }, [user]);

  const balance = profile?.balance || 0;
  const currency = profile?.currency || "USD";
  const accountNumber = profile?.accountNumber || "------";

  // Currency symbol mapping
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    RUB: "₽",
    AUD: "A$",
    CAD: "C$",
    CNY: "¥",
    NZD: "NZ$",
    CHF: "Fr",
    // Add more as needed
  };
  const currencySymbol = currencySymbols[currency] || "$";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER BALANCE SECTION */}
      <div className="bg-blue-600 text-white p-6 rounded-b-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <span>{currencySymbol}</span>
            <span>{balance.toFixed(2)}</span>
            <span className="text-base font-normal text-blue-100">{currency}</span>
          </h1>
          <p className="mt-1 text-sm text-blue-100">Account #{accountNumber}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              💳
            </div>
            <p className="text-sm mt-2">Deposit</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              📈
            </div>
            <p className="text-sm mt-2">Trade</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              💵
            </div>
            <p className="text-sm mt-2">Withdraw</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              ⋯
            </div>
            <p className="text-sm mt-2">More</p>
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 space-y-4 p-4">
        {/* OCTA REWARDS */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">Challenges</Button>
              <Button variant="outline" size="sm">My rewards</Button>
            </div>
            <div className="mt-4 bg-blue-100 p-4 rounded-xl">
              <Image src={""} alt="image" className="w-40 h-40" />

              <p className="font-medium">Unlock your welcome cashback reward</p>
              <Button className="mt-2 w-full bg-blue-600 text-white">Activate</Button>
            </div>
          </CardContent>
        </Card>

        {/* TOP DAILY MOVERS */}
        <div>
          <h2 className="font-semibold mb-2">Top daily movers</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="font-medium">NAS100</p>
                <p className="text-green-600">+0.47%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="font-medium">NZDUSD</p>
                <p className="text-red-600">-0.39%</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SPACE CHANNELS */}
        <div>
          <h2 className="font-semibold mb-2">Space channels</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <div>
                <p className="font-medium">GBPUSD chart patterns</p>
                <p className="text-sm text-gray-600">GBPUSD formed the Triangle pattern</p>
              </div>
              <div>
                <p className="font-medium">USDJPY chart patterns</p>
                <p className="text-sm text-gray-600">USDJPY formed a bearish H&S pattern</p>
              </div>
              <div>
                <p className="font-medium">ETHUSD support and resistance</p>
                <p className="text-sm text-gray-600">ETHUSD is moving in the 4,280–4,800 range</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

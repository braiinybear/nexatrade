"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";

// ✅ Define proper type for user profile
type UserProfile = {
  balance?: number;
  currency?: string;
  accountNumber?: string;
  // Add other fields as needed
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      }
    });

    return () => unsub();
  }, [user]);

  const balance = profile?.balance ?? 0;
  const currency = profile?.currency ?? "USD";
  const accountNumber = profile?.accountNumber ?? "------";

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
          {["💳 Deposit", "📈 Trade", "💵 Withdraw", "⋯ More"].map((action) => {
            const [emoji, label] = action.split(" ");
            return (
              <div key={label} className="flex flex-col items-center">
                <div className="bg-white text-blue-600 p-4 rounded-full shadow">
                  {emoji}
                </div>
                <p className="text-sm mt-2">{label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 space-y-4 p-4">
        {/* REWARDS CARD */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">Challenges</Button>
              <Button variant="outline" size="sm">My rewards</Button>
            </div>
            <div className="mt-4 bg-blue-100 p-4 rounded-xl">
              {/* ❗ Replace with a real image path */}

              <div className="w-full justify-center items-center flex">
              <p className="font-medium">Unlock your welcome cashback reward</p>
              <div className="w-40 h-40 relative mb-2">
                <Image
                  src="/3d wallet.png"
                  alt="Rewards image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              </div>
              <Button className="mt-2 w-full bg-blue-600 text-white">Activate</Button>
            </div>
          </CardContent>
        </Card>

        {/* TOP DAILY MOVERS */}
        <div>
          <h2 className="font-semibold mb-2">Top daily movers</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { symbol: "NAS100", change: "+0.47%", up: true },
              { symbol: "NZDUSD", change: "-0.39%", up: false },
            ].map(({ symbol, change, up }) => (
              <Card key={symbol}>
                <CardContent className="p-4 text-center">
                  <p className="font-medium">{symbol}</p>
                  <p className={up ? "text-green-600" : "text-red-600"}>{change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SPACE CHANNELS */}
        <div>
          <h2 className="font-semibold mb-2">Space channels</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              {[
                {
                  title: "GBPUSD chart patterns",
                  desc: "GBPUSD formed the Triangle pattern",
                },
                {
                  title: "USDJPY chart patterns",
                  desc: "USDJPY formed a bearish H&S pattern",
                },
                {
                  title: "ETHUSD support and resistance",
                  desc: "ETHUSD is moving in the 4,280–4,800 range",
                },
              ].map((item, i) => (
                <div key={i}>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

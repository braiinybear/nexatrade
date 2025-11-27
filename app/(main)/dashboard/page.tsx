"use client";

import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
// import Image from "next/image";
import {
  Wallet,
  TrendingUp,
  Download,
  MoreHorizontal,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
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
    <div className="bg-blue-600 flex flex-col min-h-screen overflow-hidden">
      {/* BLUE HEADER WITH BALANCE & ACCOUNT INFO */}
      <div className="bg-blue-600 text-white pt-16 sm:pt-20 pb-6 sm:pb-8 px-3 sm:px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto w-full">
          {/* Account badges and account number */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs sm:text-sm">
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">MT4</span>
            <span className="text-xs font-bold bg-white/30 px-2 py-1 rounded-full">REAL</span>
            <span className="text-xs text-blue-100 truncate">{accountNumber}</span>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-100 flex-shrink-0" />
          </div>

          {/* Large balance display */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-4xl sm:text-6xl font-bold mb-2">
              {currencySymbol}{balance.toFixed(2)}
            </div>
          </div>

          {/* Quick action buttons in circle */}
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            {[
              { label: "Deposit", icon: Download },
              { label: "Trade", icon: TrendingUp },
              { label: "Withdraw", icon: Wallet },
              { label: "More", icon: ChevronRight },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 sm:gap-2">
                <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition flex-shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </button>
                <span className="text-xs text-white text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 rounded-t-[30px] flex-1 px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4 max-w-4xl mx-auto w-full mb-15 overflow-y-auto">
        {/* REWARDS CAROUSEL */}
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Rewards</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 justify-between">
            {[
              "You will never trade alone",
              "Check your knowledge",
              "1 ep.1 minute academy",
              "1 ep.2 minute academy",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-600 flex items-center justify-center bg-white shadow-sm"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600 flex items-center justify-center p-2">
                  <p className="text-xs font-semibold text-white text-center leading-tight">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR DEPOSIT METHODS */}
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Popular deposit methods</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="border-2 rounded-xl">
            <div className="p-3 sm:p-4">
              <div className="flex justify-around items-center gap-2 sm:gap-3">
                {/* India Netbanking with emoji */}
                <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-xl sm:text-2xl shadow-md flex-shrink-0">
                    ⚡
                  </div>
                  <p className="text-xs text-center text-gray-700 font-medium">
                    India Netbanking
                  </p>
                </div>

                {/* UPI with image */}
                <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#271544] to-[#300f55] flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
                    <Image
                      src="/upi-logo.png"
                      alt="UPI"
                      width={36}
                      height={36}
                      priority
                    />
                  </div>
                  <p className="text-xs text-center text-gray-700 font-medium">
                    UPI
                  </p>
                </div>

                {/* Tether with image */}
                <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#35b335] flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
                    <div className="rounded-[50%] bg-white border-0">
                      <Image
                        src="/t-symb.png"
                        alt="Tether"
                        width={36}
                        height={36}
                        priority
                      />
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-700 font-medium">
                    Tether (TRC20)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP DAILY MOVERS */}
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Top daily movers</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { symbol: "NZDUSD", change: 0.93, up: true, icon: "📊" },
              { symbol: "ETHUSD", change: 1.68, up: false, icon: "📈" },
            ].map((item) => (
              <div key={item.symbol} className="border-2 rounded-2xl border-gray-200">
                <div className="p-3 sm:p-4">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="text-2xl sm:text-3xl">{item.icon}</div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{item.symbol}</p>
                    <div className="flex items-center gap-1">
                      {item.up ? (
                        <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                      )}
                      <p className={`text-sm sm:text-base font-bold ${item.up ? "text-green-600" : "text-red-600"}`}>
                        {item.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SPACE CHANNELS */}
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Space channels</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="border-2 rounded-xl border-gray-200">
            <div className="p-3 sm:p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white flex-shrink-0">
                  📊
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">USDJPY chart patterns</p>
                  <p className="text-xs text-gray-600 truncate">The mid-term outlook for USDJPY</p>
                  <p className="text-xs text-gray-500 mt-1">14:29</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



"use client";

import { useContext, useEffect, useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
// import Image from "next/image";
import {
  Banknote,
  TrendingUp,
  CreditCard,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { UserInfoContext } from "@/context/UserInfoContext";

// ✅ Define proper type for user profile
type UserProfile = {
  balance?: number;
  currency?: string;
  accountNumber?: string;
  // Add other fields as needed
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { setUserInfo } = useContext(UserInfoContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Sliding overlay state: the absolute overlay will translate up by this amount
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [overlayOffset, setOverlayOffset] = useState(0);
  const MAX_OVERLAY_OFFSET = 240; // px - maximum slide distance (matches header height)

  // Wheel handler: while overlay isn't fully collapsed, consume wheel to move overlay.
  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY;
    if (delta > 0 && overlayOffset < MAX_OVERLAY_OFFSET) {
      // scrolling down -> collapse overlay (move up)
      e.preventDefault();
      setOverlayOffset((v) => Math.min(v + delta, MAX_OVERLAY_OFFSET));
      return;
    }
    if (delta < 0 && overlayOffset > 0) {
      // scrolling up -> expand overlay (move down)
      e.preventDefault();
      setOverlayOffset((v) => Math.max(v + delta, 0));
      return;
    }
    // otherwise allow inner scrolling when collapsed
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const start = touchStartY.current;
    if (start == null) return;
    const y = e.touches[0]?.clientY ?? 0;
    const delta = start - y; // positive when swiping up

    if (delta > 0 && overlayOffset < MAX_OVERLAY_OFFSET) {
      e.preventDefault();
      setOverlayOffset((v) => Math.min(v + delta, MAX_OVERLAY_OFFSET));
      touchStartY.current = y;
      return;
    }
    if (delta < 0 && overlayOffset > 0) {
      e.preventDefault();
      setOverlayOffset((v) => Math.max(v + delta, 0));
      touchStartY.current = y;
      return;
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
        setUserInfo(snap.data());
      }
    });

    return () => unsub();
  }, [user]);

  const balance = profile?.balance ?? 0;
  const currency = profile?.currency ?? "USD";

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
    <div className="bg-blue-600 flex flex-col h-screen overflow-auto relative">
      {/* BLUE HEADER WITH BALANCE & ACCOUNT INFO */}
      <div className="bg-blue-600 text-white pt-20 pb-8 h-[16rem] px-4 top-0 z-10 flex flex-col items-center justify-center ">
        <div className="w-full">

          {/* Large balance display */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold mb-2">
              {currencySymbol}{balance.toFixed(2)}
            </div>
          </div>

          {/* Quick action buttons in circle */}
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { label: "Deposit", icon: CreditCard },
              { label: "Trade", icon: TrendingUp },
              { label: "Withdraw", icon: Banknote },
              { label: "More", icon: ChevronRight },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <button className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition">
                  <Icon className="h-6 w-6 text-white" />
                </button>
                <span className="text-xs text-white text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={overlayRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="absolute z-20 top-0 w-full"
        style={{ transform: `translateY(-${overlayOffset}px)`, transition: "transform 180ms linear", touchAction: overlayOffset < MAX_OVERLAY_OFFSET ? 'none' : 'auto' }}
      >
        <div className="bg-transparent h-[16rem]">

        </div>
        {/* <div className="h-[20rem]"> */}
      {/* MAIN CONTENT */}
      <div
        ref={innerRef}
        className="bg-gray-50 rounded-t-[30px] flex-1 px-4 py-4 space-y-4 w-full sm:max-w-4xl sm:mx-auto"
        // keep a small top padding so content doesn't hide under rounded edge when header collapsed
        style={{ paddingTop: 8, overflowY: overlayOffset >= MAX_OVERLAY_OFFSET ? 'auto' : 'hidden' }}
      >
        {/* REWARDS CAROUSEL */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Rewards</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 justify-between">
             <div
                className="flex-shrink-0 w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center bg-white shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center p-2">
                  <p className="text-xs font-semibold text-white text-center leading-tight">
                    You will never trade alone
                  </p>
                </div>
              </div>
            {[
              // "Check your knowledge",
              ["1", "ep.1", "minute academy"],
              ["1", "ep.2", "minute", "minute academy"],
              ["1", "ep.3", "minute", "minute academy"],
              ["1", "ep.4", "minute", "minute academy"],
              ["1", "ep.5", "minute", "minute academy"],
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center bg-white shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2">
                  <div className="text-[10px] font-bold  text-center leading-tight">
                    <p className="flex gap-1 items-center justify-center">
                      <span className="text-lg text-[#cc9a11] font-[900] "> {text[0]}</span>
                       <span className="p-1 font-bold rounded-3xl bg-[#279c5c8c]">{text[1]}</span>
                    </p>
                    <p className="font-bold">{text[2]}</p>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR DEPOSIT METHODS */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Popular deposit methods</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="border-2 rounded-xl">
            <div className="p-4">
              <div className="flex justify-around items-center ">
                {/* India Netbanking with emoji */}
                <div className="flex flex-col items-center gap-2 ">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl shadow-md">
                    <Zap className="text-white fill-white" />

                  </div>
                  <p className="text-xs text-center text-gray-700 font-medium">
                    India Netbanking
                  </p>
                </div>

                {/* UPI with image */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#271544] to-[#300f55] flex items-center justify-center shadow-md overflow-hidden">
                    <Image
                      src="/upi-logo.png"
                      alt="UPI"
                      width={40}
                      height={40}
                      priority
                    />
                  </div>
                  <p className="text-xs text-center text-gray-700 font-medium">
                    UPI
                  </p>
                </div>

                {/* Tether with image */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                    {/* <div className="rounded-[50%] bg-white border-0"> */}
                      <Image
                        src="/t-symb.png"
                        alt="Tether"
                        width={40}
                        height={40}
                        className="w-full h-full"
                        priority
                      />
                    {/* </div> */}
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Top daily movers</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { symbol: "NZDUSD", change: 0.93, up: true, icon: "📊" },
              { symbol: "ETHUSD", change: 1.68, up: false, icon: "📈" },
            ].map((item) => (
              <div key={item.symbol} className="border-2 rounded-2xl border-gray-200">
                <div className="p-4">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-3xl">{item.icon}</div>
                    <p className="font-semibold text-gray-800">{item.symbol}</p>
                    <div className="flex items-center gap-1">
                      {item.up ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                      <p className={item.up ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Space channels</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white flex-shrink-0">
                  📊
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">USDJPY chart patterns</p>
                  <p className="text-xs text-gray-600">The mid-term outlook for USDJPY</p>
                  <p className="text-xs text-gray-500 mt-1">14:29</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      {/* </div > */}

        </div>

      </div>




    </div>
  );
}



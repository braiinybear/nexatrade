"use client";

import { ChevronDown } from "lucide-react";

export default function BalanceCard({
  currencySymbol,
  balance,
  currency,
  accountNumber,
}: {
  currencySymbol: string;
  balance: number;
  currency: string;
  accountNumber: string;
}) {
  return (
    <section className="bg-blue-600 text-white pb-6 ">
      <div className="px-4 pt-16">
        <div className="flex items-center justify-center">
          <p className="text-5xl font-bold tracking-tight">{currencySymbol}{balance.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-full">MT4</span>
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">REAL</span>
          <span className="text-xs text-blue-100">{accountNumber}</span>
          <ChevronDown className="h-4 w-4 text-blue-100" />
        </div>
      </div>
    </section>
  );
}


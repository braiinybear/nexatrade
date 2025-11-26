"use client";

import { Wallet, LineChart, WalletCards, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DepositModal } from "@/components/deposit-modal";
import { WithdrawModal } from "@/components/withdraw-modal";

const items = [
  { label: "Deposit", icon: Wallet, key: "deposit" },
  { label: "Trade", icon: LineChart, key: "trade" },
  { label: "Withdraw", icon: WalletCards, key: "withdraw" },
  { label: "More", icon: MoreHorizontal, key: "more" },
];

export default function QuickActions() {
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div className="bg-blue-600 text-white ">
      <div className="px-4 py-8">
        <div className="grid grid-cols-4 gap-4">
          {items.map((it) => {
            const Icon = it.icon;
            const onClick = () => {
              if (it.key === "deposit") setDepositOpen(true);
              if (it.key === "withdraw") setWithdrawOpen(true);
            };
            return (
              <button
                key={it.key}
                className="flex flex-col items-center gap-2 active:scale-95"
                onClick={onClick}
              >
                <span className="h-14 w-14 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-medium">{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </div>
  );
}


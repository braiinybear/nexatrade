"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Wallet,
  Clock,
  Shuffle,
  Rocket,
  X,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/lib/hooks/useAuth";
import { DepositModal } from "@/components/deposit-modal"; // 👈 import modal
import { WithdrawModal } from "../withdraw-modal";

export function Sidebar({
  desktop,
  mobile,
  open,
  onClose,
}: {
  desktop?: boolean;
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [depositOpen, setDepositOpen] = useState(false); // 👈 state for modal
  const [withdrawOpen, setWithdrawOpen] = useState(false); // 👈 state for modal

  // Fetch Firestore profile data
  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setProfile(snap.data());
      }
    });
    return () => unsub();
  }, [user]);

  const content = (
    <div className="flex flex-col h-full">
      {/* Profile Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          {profile?.photoURL ? (
            <img
              src={profile.photoURL}
              alt="avatar"
              className="h-12 w-12 rounded-full"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200" />
          )}
          <div>
            <p className="font-semibold text-gray-800">
              {profile?.name || user?.displayName || "New User"}
            </p>
            <p className="text-xs text-gray-500">
              {profile?.email || user?.email}
            </p>
          </div>
        </div>
        <Settings className="h-5 w-5 text-gray-500" />
      </div>

      {/* Octa Rewards Banner */}
      <div className="m-4 rounded-lg border p-3 flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">Nexa Trade</p>
          <p className="text-xs text-gray-500">
            Trade. Earn XP. Unlock privileges.
          </p>
        </div>
        <span className="text-xs font-semibold text-blue-600">NEW</span>
      </div>

      {/* Trading Account Card */}
      <div className="mx-4 mb-4 p-4 border rounded-lg">
        <p className="text-xs text-gray-500 mb-1">Trading account</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            #{profile?.accountNumber || "------"}
          </span>
          <span className="text-gray-400">▼</span>
        </div>
        <p className="text-sm text-gray-700 mt-1">
          Balance: ${profile?.balance?.toFixed(2) || "0.00"}
        </p>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-2 rounded-lg bg-gray-100 text-sm font-medium">
            Trade
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
            onClick={() => setDepositOpen(true)} // 👈 open modal
          >
            Deposit
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
            onClick={() => setWithdrawOpen(true)} // 👈 open modal
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Fund Management */}
      <div className="px-4 text-xs font-semibold text-gray-400">
        Fund management
      </div>
      <nav className="flex flex-col px-2 mt-1">
        <SidebarLink href="/wallet" icon={Wallet} label="Trading accounts" />
        <SidebarLink href="/history" icon={Clock} label="Operation history" />
        <SidebarLink href="/transfer" icon={Shuffle} label="Internal transfer" />
      </nav>

      {/* Trading Tools */}
      <div className="px-4 mt-4 text-xs font-semibold text-gray-400">
        Trading tools
      </div>
      <nav className="flex flex-col px-2 mt-1">
        <SidebarLink href="/space" icon={Rocket} label="Space" badge="NEW" />
      </nav>

      <div className="flex-1" />

      {/* Deposit Modal */}
      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </div>
  );

  if (desktop) {
    return <aside className="flex flex-col w-full bg-white">{content}</aside>;
  }

  if (mobile) {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={onClose}
          />
        )}
        <aside
          className={cn(
            "fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold">Menu</span>
            <button onClick={onClose}>
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          {content}
        </aside>
      </>
    );
  }

  return null;
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  badge,
}: {
  href: string;
  icon: any;
  label: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition text-gray-700 hover:bg-gray-100"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        {label}
      </div>
      {badge && (
        <span className="ml-auto text-xs font-semibold text-blue-600">
          {badge}
        </span>
      )}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineChart,  Wallet, Briefcase, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { name: "Space", href: "/space", icon: Rocket },
  { name: "Trade", href: "/trade", icon: LineChart },
  { name: "Orders", href: "/orders", icon: Briefcase },
  { name: "Dashboard", href: "/dashboard", icon: Wallet },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md flex justify-between items-center px-2 py-1 sm:px-8 sm:py-2 border-t border-gray-100">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center flex-1 min-w-0 py-2 sm:py-3 text-[11px] sm:text-xs gap-1 transition select-none",
              active ? "text-blue-600 font-semibold" : "text-gray-500"
            )}
            style={{ minWidth: 0 }}
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 mb-0.5" />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

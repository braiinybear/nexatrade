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
    <nav className="flex justify-around items-center py-2 bg-white shadow-md">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center text-xs transition",
              active ? "text-blue-600" : "text-gray-500"
            )}
          >
            <Icon className="h-6 w-6 mb-1" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

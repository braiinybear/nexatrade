"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { Sidebar } from "@/components/layout/sidebar";

export function HeaderWrapper() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitleMap: Record<string, string> = {
    "/": "Dashboard",
    // "/wallet": "Wallet",
    // "/history": "Operation History",
    // "/transfer": "Transfer",
    // "/space": "Space",
  };

  const title = pageTitleMap[pathname] || "Nexa Trade";

  return (
    <>
      <AppHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar mobile open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

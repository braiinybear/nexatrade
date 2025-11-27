"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

export function AppHeader({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick?: () => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 h-12 sm:h-14 bg-blue-600 flex items-center px-3 sm:px-4 z-30 gap-2">
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-1.5 rounded-md hover:bg-blue-500 transition"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>
      <Image objectFit="cover" width={70} height={50} src={"https://octafx.my/wp-content/uploads/2024/07/octafx_logo_black.svg"} alt={title} className="h-auto w-auto max-w-[60px] sm:max-w-[80px]" />
    </header>
  );
}

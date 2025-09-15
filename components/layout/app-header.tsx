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
    <header className="fixed top-0 left-0 right-0 h-14 bg-blue-600 flex items-center px-4 z-30">
      {/* Mobile toggle button */}
      <button
        className="md:hidden mr-3 p-2 rounded-md hover:bg-gray-100"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6 text-gray-700" />
      </button>
      <Image objectFit="cover" width={80} height={60} src={"https://octafx.my/wp-content/uploads/2024/07/octafx_logo_black.svg"} alt={title} />
      {/* <h1 className="text-lg font-semibold">{title}</h1> */}
    </header>
  );
}

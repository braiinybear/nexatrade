"use client";

import { UserInfoContext } from "@/context/UserInfoContext";
import { ChevronRight, Menu } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

export function AppHeader({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick?: () => void;
}) {

    const { userInfo } = useContext(UserInfoContext);


      const accountNumber = userInfo?.accountNumber ?? "------";
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

         {/* Account badges and account number */}
          <div className="flex items-center justify-center gap-2 mb-6 absolute top-0 right-0 p-2">
            <span className="text-xs font-bold text-white">MT<span className="text-[#e4a725]">4</span></span>
            <span className="text-[11px] text-white bg-[#0841bb] px-2 py-1 rounded-full">REAL</span>
            <span className="text-[10px] text-blue-100">{accountNumber.split("#")[1]}</span>
            <div className="">
              <ChevronRight className="h-[14px] text-blue-100 rotate-[-90deg]" />
              <ChevronRight className="h-[14px] text-blue-100 rotate-90" />

            </div>
          </div>

    </header>
  );
}

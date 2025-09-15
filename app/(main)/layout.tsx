import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { HeaderWrapper } from "@/components/layout/header-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fixed header at top */}
      <HeaderWrapper />

      <div className="flex min-h-screen pt-14">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r bg-white">
          <Sidebar desktop />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:mb-14">
          {/* Add pb-16 on mobile to avoid overlap with bottom nav */}
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
        </div>
      </div>

      {/* Bottom nav: fixed on mobile, hidden on desktop */}
      <div className="mt-6">
        <div className="sticky bottom-0 left-0 w-full border-t bg-white z-50">
          <BottomNav />
        </div>
      </div>
    </>
  );
}

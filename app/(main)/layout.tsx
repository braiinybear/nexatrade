import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { HeaderWrapper } from "@/components/layout/header-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fixed header at top */}
      <HeaderWrapper />

      <div className="flex min-h-screen pt-12 sm:pt-14">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r bg-white nt-card overflow-y-auto max-h-[calc(100vh-3.5rem)]">
          <Sidebar desktop />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col nt-container overflow-hidden">
          {/* Add pb-16 on mobile to avoid overlap with bottom nav */}
          <main className="flex-1 pb-16 md:pb-0 overflow-y-auto">{children}</main>
        </div>
      </div>

      {/* Bottom nav: fixed on mobile, hidden on desktop */}
      <div className="md:hidden fixed bottom-0 left-0 w-full border-t bg-white z-50 h-16 sm:h-16 nt-card">
        <BottomNav />
      </div>
    </>
  );
}

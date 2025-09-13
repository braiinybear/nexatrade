import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { HeaderWrapper } from "@/components/layout/header-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fixed header at top */}
      <HeaderWrapper />

      <div className="flex min-h-screen pt-14"> 
        {/* 👆 pt-14 pushes sidebar + content below fixed header */}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r bg-white">
          <Sidebar desktop />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </div>

      {/* Bottom nav on mobile */}
      <div className="sticky bottom-0 left-0 w-full border-t bg-white">
        <BottomNav />
      </div>
    </>
  );
}

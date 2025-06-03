import React from "react";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardUnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex">
          <div className="w-full max-w-6xl">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
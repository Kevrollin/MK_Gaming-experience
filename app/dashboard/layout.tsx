import type React from "react"
import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { DashboardNav } from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "Dashboard | GameArena",
  description: "Manage your gaming profile, tournaments, and settings",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] py-8">
        <aside className="hidden md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}


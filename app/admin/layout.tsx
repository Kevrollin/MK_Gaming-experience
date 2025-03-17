import type React from "react"
import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Admin Dashboard | GameArena",
  description: "Manage games, tournaments, users, and site settings",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] py-8">
        <aside className="hidden md:block">
          <AdminNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}


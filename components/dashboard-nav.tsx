"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Settings, Trophy, BarChart3, CreditCard, Shield, Gamepad2, Bell } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const isAdmin = user?.role === "admin"

  const routes = [
    {
      href: "/dashboard",
      label: "Profile",
      icon: User,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/tournaments",
      label: "My Tournaments",
      icon: Trophy,
      active: pathname === "/dashboard/tournaments",
    },
    {
      href: "/dashboard/games",
      label: "My Games",
      icon: Gamepad2,
      active: pathname === "/dashboard/games",
    },
    {
      href: "/dashboard/stats",
      label: "Stats",
      icon: BarChart3,
      active: pathname === "/dashboard/stats",
    },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: Bell,
      active: pathname === "/dashboard/notifications",
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
      icon: CreditCard,
      active: pathname === "/dashboard/billing",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/dashboard/settings",
    },
  ]

  if (isAdmin) {
    routes.push({
      href: "/admin",
      label: "Admin Panel",
      icon: Shield,
      active: pathname.startsWith("/admin"),
    })
  }

  return (
    <nav className="grid items-start gap-2">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={route.active ? "default" : "ghost"}
            className={cn("w-full justify-start", route.active ? "bg-blue-500 hover:bg-blue-600" : "")}
          >
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  )
}


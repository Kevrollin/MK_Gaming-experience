"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Settings, Trophy, BarChart3, Gamepad2, Shield, Home, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      label: "Overview",
      icon: Home,
      active: pathname === "/admin",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: Users,
      active: pathname === "/admin/users",
    },
    {
      href: "/admin/games",
      label: "Games",
      icon: Gamepad2,
      active: pathname === "/admin/games",
    },
    {
      href: "/admin/tournaments",
      label: "Tournaments",
      icon: Trophy,
      active: pathname === "/admin/tournaments",
    },
    {
      href: "/admin/reports",
      label: "Reports",
      icon: AlertTriangle,
      active: pathname === "/admin/reports",
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
      active: pathname === "/admin/analytics",
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-2">
        <Shield className="h-5 w-5 text-blue-500" />
        <span className="font-heading text-lg font-bold">Admin Panel</span>
      </div>
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
    </div>
  )
}


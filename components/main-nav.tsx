"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Gamepad2, Users, BarChart, Home } from "lucide-react"
import { useAuth } from "./auth-provider"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Gamepad2 className="mr-2 h-4 w-4" />
            Games
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/games"
                  >
                    <Gamepad2 className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">All Games</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Browse our collection of competitive games and start playing today.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <Link href="/games/chess" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Chess</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Test your strategic skills in online chess matches.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/games/efootball" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">E-Football</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Compete in virtual football tournaments and leagues.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/games/pubg" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">PUBG</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Battle royale competitions with teams from around the world.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/tournaments" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Trophy className="mr-2 h-4 w-4" />
              Tournaments
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/leaderboards" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <BarChart className="mr-2 h-4 w-4" />
              Leaderboards
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/community" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Users className="mr-2 h-4 w-4" />
              Community
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}


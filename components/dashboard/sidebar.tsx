"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  BarChart3,
  Camera,
  Settings,
  Crown,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, pro: false },
  { name: "Scan Receipt", href: "/dashboard/scan", icon: Camera, pro: false },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt, pro: false },
  { name: "Budgets", href: "/dashboard/budgets", icon: PieChart, pro: false },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, pro: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, pro: false },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, userProfile, signOut } = useAuth()

  // Get user display info
  const displayName = userProfile?.name || user?.email?.split("@")[0] || "User"
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
  const planType = userProfile?.isPro ? "Pro Plan" : "Free Plan"

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace("/")
    } catch (error) {
      console.error("[v0] Sign out error:", error)
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <Image
          src="/images/logo.png"
          alt="SmartSpend Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-display text-lg font-bold text-sidebar-foreground">
          SmartSpend
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const isLocked = item.pro && !userProfile?.isPro
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">{item.name}</span>
              {isLocked && (
                <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4">
        <div className="rounded-lg bg-primary/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sidebar-foreground">Upgrade to Pro</span>
          </div>
          <p className="mb-3 text-xs text-sidebar-foreground/70">
            Get unlimited scans and advanced analytics
          </p>
          <Button size="sm" className="w-full" asChild>
            <Link href="/dashboard/upgrade">Upgrade Now</Link>
          </Button>
        </div>
      </div>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="font-semibold">{initials}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">{displayName}</p>
            <p className="text-xs text-sidebar-foreground/70">{planType}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}

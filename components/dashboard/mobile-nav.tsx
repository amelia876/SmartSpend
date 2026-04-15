"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  BarChart3,
  Camera,
  Settings,
  Menu,
  Crown,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Scan Receipt", href: "/dashboard/scan", icon: Camera },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Budgets", href: "/dashboard/budgets", icon: PieChart },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, userProfile, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  // Get user display info
  const displayName = userProfile?.name || user?.email?.split("@")[0] || "User"
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
  const planType = userProfile?.isPro ? "Pro Plan" : "Free Plan"

  const handleSignOut = async () => {
    try {
      setOpen(false)
      await signOut()
      router.replace("/")
    } catch (error) {
      console.error("[v0] Sign out error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="SmartSpend Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-display text-lg font-bold text-foreground">
          SmartSpend
        </span>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center gap-2 border-b border-border px-6">
              <Image
                src="/images/logo.png"
                alt="SmartSpend Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-display text-lg font-bold text-foreground">
                SmartSpend
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Upgrade Banner */}
            <div className="p-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Upgrade to Pro</span>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">
                  Get unlimited scans and advanced analytics
                </p>
                <Button size="sm" className="w-full" asChild onClick={() => setOpen(false)}>
                  <Link href="/dashboard/upgrade">Upgrade Now</Link>
                </Button>
              </div>
            </div>

            {/* User Section */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="font-semibold">{initials}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{planType}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

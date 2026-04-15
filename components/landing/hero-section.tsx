import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, PieChart, Wallet } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-card py-16 md:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Text Content - Centered */}
          <div className="flex flex-col items-center text-center gap-5 lg:flex-1 lg:max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Now available for everyone
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Track Expenses. <span className="text-primary">Master Your Budget.</span>
            </h1>

            <p className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground px-2 sm:px-0">
              SmartSpend makes managing your money effortless. Scan receipts, 
              track expenses automatically, and stay on top of your budget 
              with intelligent insights.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            <div className="flex flex-row items-center gap-4 sm:gap-6 pt-4 justify-center flex-wrap">
              <div className="flex flex-col items-center">
                <span className="font-display text-xl sm:text-2xl font-bold text-foreground">50K+</span>
                <span className="text-xs sm:text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="h-6 sm:h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <span className="font-display text-xl sm:text-2xl font-bold text-foreground">$2M+</span>
                <span className="text-xs sm:text-sm text-muted-foreground">Money Tracked</span>
              </div>
              <div className="h-6 sm:h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <span className="font-display text-xl sm:text-2xl font-bold text-foreground">4.9</span>
                <span className="text-xs sm:text-sm text-muted-foreground">App Rating</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview - Right Side */}
          <div className="relative flex justify-center lg:flex-1">
            {/* Dashboard Preview Card */}
            <div className="relative w-full max-w-md animate-float rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="SmartSpend"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-display font-semibold text-foreground">Dashboard</span>
                </div>
                <span className="text-sm text-muted-foreground">April 2026</span>
              </div>

              <div className="mb-6 rounded-xl bg-primary/10 p-4">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="font-display text-3xl font-bold text-foreground">$4,829.50</p>
                <p className="text-sm text-primary">+12.5% from last month</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center rounded-lg bg-secondary p-3">
                  <Camera className="mb-1 h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Scan</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-secondary p-3">
                  <PieChart className="mb-1 h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Budget</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-secondary p-3">
                  <Wallet className="mb-1 h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Expenses</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-chart-2/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-chart-2">G</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Groceries</p>
                      <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                    </div>
                  </div>
                  <span className="font-medium text-foreground">-$45.80</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-chart-3/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-chart-3">T</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Transport</p>
                      <p className="text-xs text-muted-foreground">Today, 9:15 AM</p>
                    </div>
                  </div>
                  <span className="font-medium text-foreground">-$12.50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

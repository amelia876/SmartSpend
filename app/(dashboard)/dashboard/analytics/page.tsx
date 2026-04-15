"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Receipt, ArrowUpRight, Crown, Lock, BarChart3, Zap } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const monthlyData = [
  { name: "Jan", spending: 1200, budget: 1500 },
  { name: "Feb", spending: 1450, budget: 1500 },
  { name: "Mar", spending: 1100, budget: 1500 },
  { name: "Apr", spending: 1350, budget: 1500 },
]

const categoryData = [
  { name: "Groceries", value: 420, color: "oklch(0.65 0.18 160)" },
  { name: "Transport", value: 180, color: "oklch(0.7 0.15 280)" },
  { name: "Entertainment", value: 150, color: "oklch(0.75 0.15 80)" },
  { name: "Utilities", value: 245, color: "oklch(0.72 0.15 220)" },
  { name: "Food & Drink", value: 189, color: "oklch(0.65 0.2 30)" },
]

const weeklyComparison = [
  { name: "Week 1", thisMonth: 320, lastMonth: 280 },
  { name: "Week 2", thisMonth: 290, lastMonth: 350 },
  { name: "Week 3", thisMonth: 410, lastMonth: 320 },
  { name: "Week 4", thisMonth: 280, lastMonth: 290 },
]

export default function AnalyticsPage() {
  const { userProfile } = useAuth()
  const isPro = userProfile?.isPro ?? false
  const totalSpending = categoryData.reduce((acc, item) => acc + item.value, 0)
  const avgDaily = Math.round(totalSpending / 30)
  const transactionCount = 47

  if (!isPro) {
    const features = [
      { icon: BarChart3, label: "Monthly trend charts", desc: "Visualize spending patterns over time with interactive charts." },
      { icon: TrendingUp, label: "Spending breakdown", desc: "See exactly where your money goes by category." },
      { icon: Zap, label: "Weekly comparisons", desc: "Compare week-over-week and month-over-month spending." },
      { icon: Lock, label: "Export reports", desc: "Download your data as PDF or CSV anytime." },
    ]

    return (
      <div className="space-y-4 md:space-y-6">
        {/* Full-page two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:min-h-[calc(100vh-12rem)]">

          {/* LEFT — hero panel */}
          <div
            className="flex flex-col justify-between rounded-2xl p-6 sm:p-10 text-white"
            style={{ background: "linear-gradient(145deg, #f59e0b 0%, #ea580c 100%)" }}
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 mb-6">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
                Pro Feature
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
                Unlock powerful<br />spending analytics.
              </h1>
              <p className="text-base text-white/80 leading-relaxed max-w-sm">
                Free accounts don&apos;t include analytics. Upgrade to Pro to access charts, trends, category breakdowns, and exportable reports.
              </p>
            </div>

            {/* Decorative chart preview */}
            <div className="mt-10 bg-white/10 rounded-xl p-4">
              <div className="flex items-end justify-between gap-2 h-24">
                {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/30 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-white/60 mt-3 text-center">Sample monthly spending trend</p>
            </div>
          </div>

          {/* RIGHT — features + CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
                Analytics
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Understand your spending patterns and make smarter decisions.
              </p>

              <div className="space-y-3">
                {features.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)" }}
                    >
                      <Icon className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="w-full gap-2 font-semibold text-base"
                style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
              >
                <Link href="/dashboard/upgrade">
                  <Crown className="h-4 w-4" />
                  Upgrade to Pro
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Already on Pro?{" "}
                <Link href="/dashboard/settings" className="text-primary hover:underline">
                  Check your account
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
            Analytics
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Understand your spending patterns and trends
          </p>
        </div>
        <Select defaultValue="april">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="april">April 2026</SelectItem>
            <SelectItem value="march">March 2026</SelectItem>
            <SelectItem value="february">February 2026</SelectItem>
            <SelectItem value="january">January 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-3">
        <Card className="border-border">
          <CardContent className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-5">
            <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <p className="font-display text-lg sm:text-2xl font-bold text-foreground">
                  ${totalSpending.toLocaleString()}
                </p>
                <span className="hidden sm:flex items-center text-xs text-chart-2">
                  <TrendingDown className="h-3 w-3" />
                  -8%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-5">
            <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-chart-2/10 shrink-0">
              <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-chart-2" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground">Daily Avg</p>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <p className="font-display text-lg sm:text-2xl font-bold text-foreground">
                  ${avgDaily}
                </p>
                <span className="hidden sm:flex items-center text-xs text-destructive">
                  <ArrowUpRight className="h-3 w-3" />
                  +5%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-5">
            <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-chart-4/10 shrink-0">
              <Receipt className="h-4 w-4 sm:h-6 sm:w-6 text-chart-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground">Transactions</p>
              <p className="font-display text-lg sm:text-2xl font-bold text-foreground">
                {transactionCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card className="border-border">
          <CardHeader className="pb-2 px-3 sm:px-6">
            <CardTitle className="font-display text-base sm:text-lg">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="h-[220px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.72 0.15 220)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.72 0.15 220)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 250)" />
                  <XAxis dataKey="name" stroke="oklch(0.5 0.03 250)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.5 0.03 250)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.01 250)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}`, ""]}
                  />
                  <Area type="monotone" dataKey="spending" stroke="oklch(0.72 0.15 220)" strokeWidth={2} fillOpacity={1} fill="url(#colorSpending)" name="Spending" />
                  <Area type="monotone" dataKey="budget" stroke="oklch(0.5 0.03 250)" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} name="Budget" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spending by Category */}
        <Card className="border-border">
          <CardHeader className="pb-2 px-3 sm:px-6">
            <CardTitle className="font-display text-base sm:text-lg">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="h-[220px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.01 250)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}`, ""]}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Comparison */}
      <Card className="border-border">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <CardTitle className="font-display text-base sm:text-lg">Weekly Comparison</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="h-[220px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 250)" />
                <XAxis dataKey="name" stroke="oklch(0.5 0.03 250)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.03 250)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.9 0.01 250)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value}`, ""]}
                />
                <Bar dataKey="thisMonth" fill="oklch(0.72 0.15 220)" name="This Month" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lastMonth" fill="oklch(0.9 0.01 250)" name="Last Month" radius={[4, 4, 0, 0]} />
                <Legend formatter={(value) => <span className="text-sm text-foreground">{value}</span>} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

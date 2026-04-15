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
  const isPro = false // This would come from user subscription status
  const totalSpending = categoryData.reduce((acc, item) => acc + item.value, 0)
  const avgDaily = Math.round(totalSpending / 30)
  const transactionCount = 47

  if (!isPro) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
            Analytics
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Understand your spending patterns and trends
          </p>
        </div>

        {/* Blurred preview + upgrade overlay */}
        <div className="relative rounded-xl overflow-hidden">
          {/* Blurred background charts (decorative) */}
          <div className="pointer-events-none select-none blur-sm opacity-40 space-y-4">
            <div className="grid gap-3 grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-4">
                    <div className="h-4 w-16 bg-muted rounded mb-2" />
                    <div className="h-8 w-24 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="h-[180px] bg-muted/50 rounded" />
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="h-[180px] bg-muted/50 rounded" />
                </CardContent>
              </Card>
            </div>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="h-[180px] bg-muted/50 rounded" />
              </CardContent>
            </Card>
          </div>

          {/* Upgrade overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <div className="text-center px-6 py-8 max-w-sm mx-auto">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mx-auto mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                Analytics is a Pro Feature
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Unlock detailed spending charts, category breakdowns, and weekly comparisons with a Pro subscription.
              </p>
              <div className="space-y-2 text-left mb-6 bg-card border border-border rounded-lg p-4">
                <p className="text-xs font-semibold text-foreground mb-2">What you&apos;ll get:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BarChart3 className="h-3.5 w-3.5 text-primary shrink-0" />
                    Monthly trend charts and comparisons
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <PieChart className="h-3.5 w-3.5 text-primary shrink-0" />
                    Spending breakdown by category
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                    Weekly comparisons and averages
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5 text-primary shrink-0" />
                    Export reports as PDF or CSV
                  </div>
                </div>
              </div>
              <Button
                asChild
                className="w-full gap-2"
                style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
              >
                <Link href="/dashboard/upgrade">
                  <Crown className="h-4 w-4" />
                  Upgrade to Pro
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
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

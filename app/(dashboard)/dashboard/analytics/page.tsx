"use client"

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
import { TrendingUp, TrendingDown, DollarSign, Receipt, ArrowUpRight } from "lucide-react"

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
  const totalSpending = categoryData.reduce((acc, item) => acc + item.value, 0)
  const avgDaily = Math.round(totalSpending / 30)
  const transactionCount = 47

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Understand your spending patterns and trends
          </p>
        </div>
        <Select defaultValue="april">
          <SelectTrigger className="w-[180px]">
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
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spending</p>
              <div className="flex items-center gap-2">
                <p className="font-display text-2xl font-bold text-foreground">
                  ${totalSpending.toLocaleString()}
                </p>
                <span className="flex items-center text-xs text-chart-2">
                  <TrendingDown className="h-3 w-3" />
                  -8%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
              <TrendingUp className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Average</p>
              <div className="flex items-center gap-2">
                <p className="font-display text-2xl font-bold text-foreground">
                  ${avgDaily}
                </p>
                <span className="flex items-center text-xs text-destructive">
                  <ArrowUpRight className="h-3 w-3" />
                  +5%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
              <Receipt className="h-6 w-6 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="font-display text-2xl font-bold text-foreground">
                {transactionCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-lg">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
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
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-lg">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
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
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-lg">Weekly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
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

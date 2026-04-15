"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Mon", amount: 120 },
  { name: "Tue", amount: 85 },
  { name: "Wed", amount: 210 },
  { name: "Thu", amount: 65 },
  { name: "Fri", amount: 180 },
  { name: "Sat", amount: 290 },
  { name: "Sun", amount: 145 },
]

export function SpendingChart() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg">Weekly Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.15 220)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.72 0.15 220)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 250)" />
              <XAxis
                dataKey="name"
                stroke="oklch(0.5 0.03 250)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.5 0.03 250)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.9 0.01 250)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`$${value}`, "Spent"]}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="oklch(0.72 0.15 220)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

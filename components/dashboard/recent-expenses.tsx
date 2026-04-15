import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingCart, Car, Coffee, Film, Zap } from "lucide-react"

const expenses = [
  {
    id: 1,
    merchant: "Whole Foods",
    category: "Groceries",
    amount: -45.80,
    date: "Today, 2:30 PM",
    icon: ShoppingCart,
    iconBg: "bg-chart-2/20",
    iconColor: "text-chart-2",
  },
  {
    id: 2,
    merchant: "Uber",
    category: "Transport",
    amount: -12.50,
    date: "Today, 9:15 AM",
    icon: Car,
    iconBg: "bg-chart-3/20",
    iconColor: "text-chart-3",
  },
  {
    id: 3,
    merchant: "Starbucks",
    category: "Food & Drink",
    amount: -6.75,
    date: "Yesterday, 8:00 AM",
    icon: Coffee,
    iconBg: "bg-chart-4/20",
    iconColor: "text-chart-4",
  },
  {
    id: 4,
    merchant: "Netflix",
    category: "Entertainment",
    amount: -15.99,
    date: "Apr 10, 2026",
    icon: Film,
    iconBg: "bg-chart-5/20",
    iconColor: "text-chart-5",
  },
  {
    id: 5,
    merchant: "Electric Company",
    category: "Utilities",
    amount: -89.00,
    date: "Apr 8, 2026",
    icon: Zap,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
]

export function RecentExpenses() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-display text-lg">Recent Expenses</CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-primary">
          <Link href="/dashboard/expenses">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${expense.iconBg}`}>
                  <expense.icon className={`h-5 w-5 ${expense.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {expense.merchant}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {expense.category} • {expense.date}
                  </p>
                </div>
              </div>
              <span className="font-medium text-foreground">
                ${Math.abs(expense.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

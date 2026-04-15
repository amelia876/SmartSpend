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
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 sm:px-6">
        <CardTitle className="font-display text-base sm:text-lg">Recent Expenses</CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-primary text-xs sm:text-sm">
          <Link href="/dashboard/expenses">
            <span className="hidden sm:inline">View All</span>
            <span className="sm:hidden">All</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="space-y-1">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-lg p-2 sm:p-3 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full shrink-0 ${expense.iconBg}`}>
                  <expense.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${expense.iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {expense.merchant}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    <span className="sm:hidden">{expense.category}</span>
                    <span className="hidden sm:inline">{expense.category} - {expense.date}</span>
                  </p>
                </div>
              </div>
              <span className="font-medium text-foreground text-sm sm:text-base ml-2 shrink-0">
                ${Math.abs(expense.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

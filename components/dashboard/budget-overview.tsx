import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight } from "lucide-react"

const budgets = [
  {
    category: "Groceries",
    spent: 320,
    limit: 400,
    color: "bg-chart-2",
  },
  {
    category: "Transport",
    spent: 180,
    limit: 200,
    color: "bg-chart-3",
  },
  {
    category: "Entertainment",
    spent: 95,
    limit: 150,
    color: "bg-chart-4",
  },
]

export function BudgetOverview() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-display text-lg">Budget Overview</CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-primary">
          <Link href="/dashboard/budgets">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.limit) * 100)
          const isOverBudget = percentage >= 90

          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {budget.category}
                </span>
                <span className={`text-sm ${isOverBudget ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                  ${budget.spent} / ${budget.limit}
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={percentage}
                  className="h-2"
                />
                <div
                  className={`absolute left-0 top-0 h-2 rounded-full ${budget.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              {isOverBudget && (
                <p className="text-xs text-destructive">
                  {percentage >= 100 ? "Over budget!" : "Approaching limit"}
                </p>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface BudgetsHeaderProps {
  totalBudget: number
  totalSpent: number
  onCreateClick: () => void
}

export function BudgetsHeader({ totalBudget, totalSpent, onCreateClick }: BudgetsHeaderProps) {
  const remaining = totalBudget - totalSpent
  const percentUsed = Math.round((totalSpent / totalBudget) * 100)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Budgets
          </h1>
          <p className="text-muted-foreground">
            Manage your spending limits by category
          </p>
        </div>
        <Button onClick={onCreateClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Budget
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="font-display text-2xl font-bold text-foreground">
              ${totalBudget.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Spent This Month</p>
            <p className="font-display text-2xl font-bold text-foreground">
              ${totalSpent.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{percentUsed}% of total</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className={`font-display text-2xl font-bold ${remaining >= 0 ? "text-chart-2" : "text-destructive"}`}>
              ${Math.abs(remaining).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {remaining >= 0 ? "available to spend" : "over budget"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

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
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
            Budgets
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your spending limits by category
          </p>
        </div>
        <Button onClick={onCreateClick} className="gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Create Budget
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-3">
        <Card className="border-border">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">Total Budget</p>
            <p className="font-display text-lg sm:text-2xl font-bold text-foreground">
              ${totalBudget.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">Spent</p>
            <p className="font-display text-lg sm:text-2xl font-bold text-foreground">
              ${totalSpent.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground hidden sm:block">{percentUsed}% of total</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">Remaining</p>
            <p className={`font-display text-lg sm:text-2xl font-bold ${remaining >= 0 ? "text-chart-2" : "text-destructive"}`}>
              ${Math.abs(remaining).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {remaining >= 0 ? "available" : "over budget"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

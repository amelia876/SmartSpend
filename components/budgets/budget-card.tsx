import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Pencil, Trash2, ShoppingCart, Car, Film, Zap, Coffee, Folder } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "shopping-cart": ShoppingCart,
  car: Car,
  film: Film,
  zap: Zap,
  coffee: Coffee,
  folder: Folder,
}

interface Budget {
  id: string
  category: string
  spent: number
  limit: number
  color: string
  icon: string
}

interface BudgetCardProps {
  budget: Budget
  onDelete: () => void
  onEdit?: () => void
}

export function BudgetCard({ budget, onDelete, onEdit }: BudgetCardProps) {
  const percentage = Math.round((budget.spent / budget.limit) * 100)
  const isOverBudget = percentage >= 100
  const isNearLimit = percentage >= 80 && percentage < 100
  const remaining = budget.limit - budget.spent

  const Icon = iconMap[budget.icon] || Folder

  return (
    <Card className={`border-border transition-all hover:shadow-lg ${isOverBudget ? "border-destructive/50 border-2" : ""}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2 p-3 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg ${budget.color}/20 shrink-0`}>
            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${budget.color.replace("bg-", "text-")}`} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{budget.category}</h3>
            <p className="text-xs text-muted-foreground">
              {percentage}% used
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-lg sm:text-2xl font-bold text-foreground">
              ${budget.spent.toFixed(2)}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              of ${budget.limit.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-xs sm:text-sm font-medium ${remaining >= 0 ? "text-chart-2" : "text-destructive"}`}>
              {remaining >= 0 ? `$${remaining.toFixed(2)} left` : `$${Math.abs(remaining).toFixed(2)} over`}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative h-3 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${budget.color}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Progress</span>
            <span className="text-xs font-bold text-foreground">{Math.min(percentage, 100)}%</span>
          </div>
        </div>

        {isOverBudget && (
          <div className="rounded-lg bg-destructive/10 p-2 border border-destructive/30">
            <p className="text-xs font-medium text-destructive">
              You&apos;ve exceeded this budget by ${Math.abs(remaining).toFixed(2)}!
            </p>
          </div>
        )}
        {isNearLimit && !isOverBudget && (
          <div className="rounded-lg bg-chart-5/10 p-2 border border-chart-5/30">
            <p className="text-xs font-medium text-chart-5">
              Approaching budget limit - ${remaining.toFixed(2)} remaining
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

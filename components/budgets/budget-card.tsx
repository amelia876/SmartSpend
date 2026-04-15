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
    <Card className={`border-border transition-all hover:shadow-lg hover:scale-105 ${isOverBudget ? "border-destructive/50 border-2" : ""}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${budget.color}/20`}>
            <Icon className={`h-5 w-5 ${budget.color.replace("bg-", "text-")}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{budget.category}</h3>
            <p className="text-xs text-muted-foreground">
              {percentage}% used
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
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
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-foreground">
              ${budget.spent.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              of ${budget.limit.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${remaining >= 0 ? "text-chart-2" : "text-destructive"}`}>
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

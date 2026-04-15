"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BudgetsHeader } from "@/components/budgets/budgets-header"
import { BudgetCard } from "@/components/budgets/budget-card"
import { CreateBudgetDialog } from "@/components/budgets/create-budget-dialog"
import { Empty } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { PieChart, Crown, Zap, BarChart3, Lock } from "lucide-react"

const FREE_BUDGET_LIMIT = 3

const initialBudgets = [
  {
    id: "1",
    category: "Groceries",
    spent: 320,
    limit: 400,
    color: "bg-chart-2",
    icon: "shopping-cart",
  },
  {
    id: "2",
    category: "Transport",
    spent: 180,
    limit: 200,
    color: "bg-chart-3",
    icon: "car",
  },
  {
    id: "3",
    category: "Entertainment",
    spent: 95,
    limit: 150,
    color: "bg-chart-4",
    icon: "film",
  },
]

export default function BudgetsPage() {
  const router = useRouter()
  const [budgets, setBudgets] = useState(initialBudgets)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [isPro] = useState(false)

  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0)

  const handleCreateClick = () => {
    if (!isPro && budgets.length >= FREE_BUDGET_LIMIT) {
      setShowUpgradeDialog(true)
    } else {
      setIsCreateOpen(true)
    }
  }

  const handleCreateBudget = (newBudget: { category: string; limit: number; color?: string }) => {
    const defaultColors = ["bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-primary"]
    setBudgets([
      ...budgets,
      {
        id: String(Date.now()),
        category: newBudget.category,
        spent: 0,
        limit: newBudget.limit,
        color: newBudget.color || defaultColors[budgets.length % defaultColors.length],
        icon: "folder",
      },
    ])
    setIsCreateOpen(false)
  }

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <BudgetsHeader
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        onCreateClick={handleCreateClick}
        budgetCount={budgets.length}
        isPro={isPro}
      />

      {budgets.length === 0 ? (
        <Empty
          icon={<PieChart className="h-12 w-12" />}
          title="No budgets yet"
          description="Create your first budget to start tracking your spending limits."
        />
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onDelete={() => handleDeleteBudget(budget.id)}
            />
          ))}
        </div>
      )}

      <CreateBudgetDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateBudget}
      />

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-xl">Upgrade to Pro</DialogTitle>
            </div>
            <DialogDescription className="text-left">
              You&apos;ve reached the <span className="font-semibold text-foreground">3 budget limit</span> for free accounts. Upgrade to Pro for unlimited budgets.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-foreground font-medium mb-3">With Pro, you get:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-primary shrink-0" />
                  Unlimited budgets across all categories
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary shrink-0" />
                  Advanced analytics and spending insights
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  Unlimited receipt scans per day
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary shrink-0" />
                  Edit expenses anytime, no 24-hour limit
                </li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Free plan is limited to {FREE_BUDGET_LIMIT} budgets.
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowUpgradeDialog(false)}
              className="w-full sm:w-auto"
            >
              Maybe Later
            </Button>
            <Button
              onClick={() => {
                setShowUpgradeDialog(false)
                router.push("/dashboard/upgrade")
              }}
              className="w-full sm:w-auto gap-2"
              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
            >
              <Crown className="h-4 w-4" />
              Upgrade Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

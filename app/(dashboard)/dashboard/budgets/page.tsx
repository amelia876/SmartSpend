"use client"

import { useState } from "react"
import { BudgetsHeader } from "@/components/budgets/budgets-header"
import { BudgetCard } from "@/components/budgets/budget-card"
import { CreateBudgetDialog } from "@/components/budgets/create-budget-dialog"
import { Empty } from "@/components/ui/empty"
import { PieChart } from "lucide-react"

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
  {
    id: "4",
    category: "Utilities",
    spent: 145,
    limit: 250,
    color: "bg-primary",
    icon: "zap",
  },
  {
    id: "5",
    category: "Food & Drink",
    spent: 89,
    limit: 200,
    color: "bg-chart-5",
    icon: "coffee",
  },
]

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0)

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
    <div className="space-y-6">
      <BudgetsHeader
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      {budgets.length === 0 ? (
        <Empty
          icon={<PieChart className="h-12 w-12" />}
          title="No budgets yet"
          description="Create your first budget to start tracking your spending limits."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  )
}

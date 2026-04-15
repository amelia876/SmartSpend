"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, MoreVertical, Pencil, Trash2, ShoppingCart, Car, Coffee, Film, Zap, CreditCard, TrendingDown, Calendar } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  groceries: ShoppingCart,
  transport: Car,
  "food-drink": Coffee,
  entertainment: Film,
  utilities: Zap,
  other: CreditCard,
}

const colorMap: Record<string, string> = {
  groceries: "bg-chart-2/20 text-chart-2",
  transport: "bg-chart-3/20 text-chart-3",
  "food-drink": "bg-chart-4/20 text-chart-4",
  entertainment: "bg-chart-5/20 text-chart-5",
  utilities: "bg-primary/20 text-primary",
  other: "bg-muted text-muted-foreground",
}

const expenses = [
  { id: 1, merchant: "Whole Foods", category: "groceries", amount: 67.42, date: "Apr 14, 2026", createdAt: new Date("2026-04-14") },
  { id: 2, merchant: "Uber", category: "transport", amount: 12.50, date: "Apr 14, 2026", createdAt: new Date("2026-04-14") },
  { id: 3, merchant: "Starbucks", category: "food-drink", amount: 6.75, date: "Apr 13, 2026", createdAt: new Date("2026-04-13") },
  { id: 4, merchant: "Netflix", category: "entertainment", amount: 15.99, date: "Apr 10, 2026", createdAt: new Date("2026-04-10") },
  { id: 5, merchant: "Electric Company", category: "utilities", amount: 89.00, date: "Apr 8, 2026", createdAt: new Date("2026-04-08") },
  { id: 6, merchant: "Target", category: "groceries", amount: 45.23, date: "Apr 7, 2026", createdAt: new Date("2026-04-07") },
  { id: 7, merchant: "Gas Station", category: "transport", amount: 52.00, date: "Apr 5, 2026", createdAt: new Date("2026-04-05") },
  { id: 8, merchant: "Chipotle", category: "food-drink", amount: 14.50, date: "Apr 4, 2026", createdAt: new Date("2026-04-04") },
  { id: 9, merchant: "Spotify", category: "entertainment", amount: 9.99, date: "Apr 1, 2026", createdAt: new Date("2026-04-01") },
  { id: 10, merchant: "Water Bill", category: "utilities", amount: 35.00, date: "Apr 1, 2026", createdAt: new Date("2026-04-01") },
]

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editAmount, setEditAmount] = useState<string>("")
  const [isPro, setIsPro] = useState(false)

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.merchant.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalFiltered = filteredExpenses.reduce((acc, e) => acc + e.amount, 0)
  const mostRecent = filteredExpenses.length > 0 ? filteredExpenses[0] : null

  const canEdit = (expense: typeof expenses[0]) => {
    const now = new Date()
    const diffHours = (now.getTime() - expense.createdAt.getTime()) / (1000 * 60 * 60)
    return diffHours < 24 || isPro
  }

  const handleEdit = (expense: typeof expenses[0]) => {
    if (canEdit(expense)) {
      setEditingId(expense.id)
      setEditAmount(expense.amount.toString())
    }
  }

  const saveEdit = () => {
    // In a real app, this would save to the database
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Expenses
          </h1>
          <p className="text-muted-foreground">
            View and manage all your transactions
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/expenses/add">
            <Plus className="h-4 w-4" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Stats Blocks */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                <p className="font-display text-3xl font-bold text-foreground">
                  ${totalFiltered.toFixed(2)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Most Recent</p>
                <p className="font-display text-2xl font-bold text-foreground">
                  {mostRecent ? mostRecent.merchant : "N/A"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mostRecent ? `$${mostRecent.amount.toFixed(2)}` : ""}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/20">
                <Calendar className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
                <p className="font-display text-3xl font-bold text-foreground">
                  {filteredExpenses.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Average: ${(totalFiltered / filteredExpenses.length).toFixed(2)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/20">
                <ShoppingCart className="h-6 w-6 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="food-drink">Food & Drink</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-display text-lg">
            {filteredExpenses.length} Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {filteredExpenses.map((expense) => {
              const Icon = iconMap[expense.category] || CreditCard
              const colorClass = colorMap[expense.category] || colorMap.other
              const isEditing = editingId === expense.id
              const canEditThis = canEdit(expense)

              return (
                <div key={expense.id} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-secondary">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{expense.merchant}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {expense.category.replace("-", " & ")}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{expense.date}</span>
                        {!canEditThis && (
                          <Badge variant="outline" className="text-xs text-destructive">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <Dialog open={isEditing} onOpenChange={(open) => !open && setEditingId(null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Expense</DialogTitle>
                            <DialogDescription>
                              Update the expense amount for {expense.merchant}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              type="number"
                              step="0.01"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="text-lg"
                            />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingId(null)}>
                              Cancel
                            </Button>
                            <Button onClick={saveEdit}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span className="font-medium text-foreground min-w-20 text-right">
                        ${expense.amount.toFixed(2)}
                      </span>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(expense)}
                          disabled={!canEditThis}
                          className={!canEditThis ? "opacity-50 cursor-not-allowed" : ""}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          {canEditThis ? "Edit" : "Edit (Locked)"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

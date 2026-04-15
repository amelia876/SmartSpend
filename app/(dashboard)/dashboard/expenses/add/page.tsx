"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, DollarSign, Store, Calendar, Tag, FileText, Crown, Check } from "lucide-react"

const FREE_EXPENSE_LIMIT = 3
// In a real app this count would come from the database
const CURRENT_EXPENSE_COUNT = 10

const categories = [
  { value: "groceries", label: "Groceries" },
  { value: "transport", label: "Transport" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities", label: "Utilities" },
  { value: "shopping", label: "Shopping" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
]

export default function AddExpensePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    merchant: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  // Free users are limited to FREE_EXPENSE_LIMIT expenses
  const isPro = false
  const isAtLimit = !isPro && CURRENT_EXPENSE_COUNT >= FREE_EXPENSE_LIMIT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard/expenses")
  }

  if (isAtLimit) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10">
            <Link href="/dashboard/expenses">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
              Add Expense
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manually record a new expense
            </p>
          </div>
        </div>

        <div className="flex items-start justify-center pt-4 sm:pt-8">
          <Card className="w-full max-w-sm border-border overflow-hidden shadow-lg">
            {/* Amber gradient header band */}
            <div
              className="flex flex-col items-center gap-3 px-6 py-8 text-white"
              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Crown className="h-7 w-7 text-white" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">Free Plan</p>
                <h2 className="font-display text-2xl font-bold text-white">
                  Limit Reached
                </h2>
                <p className="text-sm text-white/80 mt-1">
                  {FREE_EXPENSE_LIMIT} of {FREE_EXPENSE_LIMIT} expenses used
                </p>
              </div>
            </div>

            {/* Body */}
            <CardContent className="p-6 space-y-5">
              <p className="text-sm text-muted-foreground text-center">
                Upgrade to <span className="font-semibold text-foreground">SmartSpend Pro</span> for unlimited expenses and more powerful features.
              </p>

              {/* Perks list */}
              <ul className="space-y-3">
                {[
                  "Unlimited expense entries",
                  "Advanced analytics dashboard",
                  "Edit expenses anytime",
                  "Unlimited receipt scans",
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-foreground">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => router.push("/dashboard/upgrade")}
                  className="w-full gap-2 font-semibold"
                  style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
                >
                  <Crown className="h-4 w-4" />
                  Upgrade to Pro
                </Button>
                <Button variant="ghost" asChild className="w-full text-muted-foreground">
                  <Link href="/dashboard/expenses">Maybe later</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10">
          <Link href="/dashboard/expenses">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
            Add Expense
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manually record a new expense
          </p>
        </div>
      </div>

      <Card className="max-w-2xl border-border">
        <CardHeader>
          <CardTitle className="font-display text-lg">Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="merchant">Merchant / Vendor</FieldLabel>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="merchant"
                    placeholder="e.g., Whole Foods, Uber, Netflix"
                    className="pl-10"
                    value={formData.merchant}
                    onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="amount">Amount</FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      disabled={isLoading}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="date">Date</FieldLabel>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="notes">Notes (optional)</FieldLabel>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="notes"
                    placeholder="Add any additional details..."
                    className="min-h-[80px] pl-10"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </Field>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    "Save Expense"
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/expenses">Cancel</Link>
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

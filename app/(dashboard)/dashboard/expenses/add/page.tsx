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
import { ArrowLeft, DollarSign, Store, Calendar, Tag, FileText, Crown, Check, Zap, BarChart3, Lock } from "lucide-react"

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
    const perks = [
      { icon: Zap, label: "Unlimited expense entries", desc: "Track as many expenses as you need, no caps." },
      { icon: BarChart3, label: "Advanced analytics", desc: "Charts, trends, and weekly breakdowns." },
      { icon: Lock, label: "Edit expenses anytime", desc: "No 24-hour lock — full control over your data." },
      { icon: DollarSign, label: "Unlimited receipt scans", desc: "Scan and extract receipts without daily limits." },
    ]

    return (
      <div className="space-y-4 md:space-y-6">
        {/* Back header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <Link href="/dashboard/expenses">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">Back to Expenses</p>
        </div>

        {/* Full-page two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:min-h-[calc(100vh-12rem)]">

          {/* LEFT — hero panel */}
          <div
            className="flex flex-col justify-between rounded-2xl p-6 sm:p-10 text-white"
            style={{ background: "linear-gradient(145deg, #f59e0b 0%, #ea580c 100%)" }}
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 mb-6">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
                Free Plan Limit
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
                You&apos;ve hit your<br />expense limit.
              </h1>
              <p className="text-base text-white/80 leading-relaxed max-w-sm">
                Free accounts are limited to {FREE_EXPENSE_LIMIT} expenses. Upgrade to Pro and take full control of your finances with no restrictions.
              </p>
            </div>

            {/* Usage bar */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white/80">Expenses used</p>
                <p className="text-sm font-bold text-white">{FREE_EXPENSE_LIMIT}/{FREE_EXPENSE_LIMIT}</p>
              </div>
              <div className="h-2 w-full rounded-full bg-white/20">
                <div className="h-2 w-full rounded-full bg-white" />
              </div>
              <p className="text-xs text-white/60 mt-2">100% of your free allocation used</p>
            </div>
          </div>

          {/* RIGHT — perks + CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
                Upgrade to SmartSpend Pro
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Everything in Free, plus the tools serious budgeters need.
              </p>

              <div className="space-y-3">
                {perks.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)" }}
                    >
                      <Icon className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                    <Check
                      className="ml-auto h-4 w-4 shrink-0 text-orange-500 mt-0.5"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <Button
                onClick={() => router.push("/dashboard/upgrade")}
                size="lg"
                className="w-full gap-2 font-semibold text-base"
                style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
              >
                <Crown className="h-4 w-4" />
                Upgrade to Pro
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/expenses">Maybe later</Link>
              </Button>
            </div>
          </div>

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

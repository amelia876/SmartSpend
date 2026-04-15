"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

const categories = [
  "Groceries",
  "Transport",
  "Entertainment",
  "Utilities",
  "Food & Drink",
  "Shopping",
  "Healthcare",
  "Education",
  "Travel",
  "Other",
]

const colors = [
  { name: "Blue", value: "bg-chart-2", display: "bg-blue-500" },
  { name: "Cyan", value: "bg-chart-3", display: "bg-cyan-500" },
  { name: "Orange", value: "bg-chart-4", display: "bg-orange-500" },
  { name: "Red", value: "bg-chart-5", display: "bg-red-500" },
  { name: "Primary", value: "bg-primary", display: "bg-sky-400" },
  { name: "Purple", value: "bg-purple-500", display: "bg-purple-500" },
]

interface CreateBudgetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { category: string; limit: number; color?: string }) => void
}

export function CreateBudgetDialog({ open, onOpenChange, onSubmit }: CreateBudgetDialogProps) {
  const [category, setCategory] = useState("")
  const [limit, setLimit] = useState("")
  const [color, setColor] = useState("bg-chart-2")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (category && limit) {
      onSubmit({ category, limit: parseFloat(limit), color })
      setCategory("")
      setLimit("")
      setColor("bg-chart-2")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Create New Budget</DialogTitle>
          <DialogDescription>
            Set a spending limit for a category and choose a color to track your expenses.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Monthly Limit</FieldLabel>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-7"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel>Budget Color</FieldLabel>
              <div className="grid grid-cols-6 gap-2">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`relative h-10 w-10 rounded-lg border-2 transition-all ${
                      color === c.value ? "border-foreground scale-110" : "border-transparent"
                    } ${c.display}`}
                    title={c.name}
                  >
                    {color === c.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!category || !limit}>
              Create Budget
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

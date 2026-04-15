import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Plus, PieChart } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild className="gap-2">
        <Link href="/dashboard/scan">
          <Camera className="h-4 w-4" />
          Scan Receipt
        </Link>
      </Button>
      <Button variant="outline" asChild className="gap-2">
        <Link href="/dashboard/expenses/add">
          <Plus className="h-4 w-4" />
          Add Expense
        </Link>
      </Button>
      <Button variant="outline" asChild className="gap-2">
        <Link href="/dashboard/budgets">
          <PieChart className="h-4 w-4" />
          View Budgets
        </Link>
      </Button>
    </div>
  )
}

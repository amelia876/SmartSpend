import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Plus, PieChart } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <Button asChild className="gap-2 text-sm h-9 px-3 sm:h-10 sm:px-4">
        <Link href="/dashboard/scan">
          <Camera className="h-4 w-4" />
          <span className="hidden xs:inline">Scan</span> Receipt
        </Link>
      </Button>
      <Button variant="outline" asChild className="gap-2 text-sm h-9 px-3 sm:h-10 sm:px-4">
        <Link href="/dashboard/expenses/add">
          <Plus className="h-4 w-4" />
          Add Expense
        </Link>
      </Button>
      <Button variant="outline" asChild className="gap-2 text-sm h-9 px-3 sm:h-10 sm:px-4">
        <Link href="/dashboard/budgets">
          <PieChart className="h-4 w-4" />
          Budgets
        </Link>
      </Button>
    </div>
  )
}

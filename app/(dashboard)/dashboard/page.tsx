import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentExpenses } from "@/components/dashboard/recent-expenses"
import { BudgetOverview } from "@/components/dashboard/budget-overview"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Spinner } from "@/components/ui/spinner"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <QuickActions />
      
      <Suspense fallback={<div className="flex justify-center py-8"><Spinner /></div>}>
        <StatsCards />
      </Suspense>

      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<div className="flex justify-center py-8"><Spinner /></div>}>
          <SpendingChart />
        </Suspense>
        <Suspense fallback={<div className="flex justify-center py-8"><Spinner /></div>}>
          <BudgetOverview />
        </Suspense>
      </div>

      <Suspense fallback={<div className="flex justify-center py-8"><Spinner /></div>}>
        <RecentExpenses />
      </Suspense>
    </div>
  )
}

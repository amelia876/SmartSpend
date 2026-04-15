import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Receipt, PiggyBank, AlertCircle } from "lucide-react"

const stats = [
  {
    title: "Total Balance",
    value: "$4,829.50",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "This Month",
    value: "$1,234.80",
    change: "-8.3%",
    trend: "down",
    icon: Receipt,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Savings",
    value: "$892.00",
    change: "+23.1%",
    trend: "up",
    icon: PiggyBank,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    title: "Budget Alerts",
    value: "2",
    change: "categories",
    trend: "neutral",
    icon: AlertCircle,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardContent className="p-3 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.title}</p>
                <p className="font-display text-lg sm:text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-chart-2 shrink-0" />
                  )}
                  {stat.trend === "down" && (
                    <TrendingDown className="h-3 w-3 text-destructive shrink-0" />
                  )}
                  <span
                    className={`text-xs ${
                      stat.trend === "up"
                        ? "text-chart-2"
                        : stat.trend === "down"
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`rounded-lg p-1.5 sm:p-2.5 ${stat.bgColor} shrink-0`}>
                <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

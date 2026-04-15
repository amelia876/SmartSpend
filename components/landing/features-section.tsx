import { Camera, PieChart, Bell, Shield, Zap, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Camera,
    title: "Smart Receipt Scanning",
    description: "Snap a photo of any receipt and let our AI automatically extract merchant, amount, date, and category.",
  },
  {
    icon: PieChart,
    title: "Budget Management",
    description: "Set monthly budgets for different categories and track your progress with visual insights.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified when you are approaching budget limits or when unusual spending is detected.",
  },
  {
    icon: TrendingUp,
    title: "Spending Analytics",
    description: "Understand your spending patterns with detailed charts and trends over time.",
  },
  {
    icon: Zap,
    title: "Auto-Categorization",
    description: "Expenses are automatically categorized based on merchant and receipt data.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and never shared. Bank-level security standards.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-card py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need to Manage Money
          </h2>
          <p className="text-lg text-muted-foreground">
            SmartSpend combines powerful features with an intuitive interface 
            to make expense tracking effortless.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group border-border bg-background transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="inline-flex rounded-lg bg-primary/10 p-4 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground text-center">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

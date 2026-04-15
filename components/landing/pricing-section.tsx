import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with expense tracking",
    features: [
      "2 receipt scans per day",
      "Basic expense tracking",
      "Monthly spending summary",
      "Up to 3 budget categories",
      "7-day expense history",
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$3",
    period: "per month",
    description: "For serious budgeters who want full control",
    features: [
      "Unlimited receipt scans",
      "Advanced AI categorization",
      "Unlimited budget categories",
      "Full expense history",
      "Spending analytics & trends",
      "Export to CSV/PDF",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Start Free Trial",
    href: "/signup",
    highlighted: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-card py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden ${
                plan.highlighted
                  ? "border-primary bg-background shadow-xl"
                  : "border-border bg-background"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute right-0 top-0">
                  <div className="rounded-bl-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                </div>
              )}
              <CardHeader className="pb-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Camera, Sparkles, BarChart3 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Scan Your Receipt",
    description: "Take a photo of any receipt using our app. Works with printed and digital receipts.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Does the Work",
    description: "Our smart AI extracts all the details - merchant, total, date, and even line items.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track & Analyze",
    description: "Watch your expenses get categorized automatically and gain insights into your spending.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            How SmartSpend Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to take control of your finances
          </p>
        </div>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                    <step.icon className="h-10 w-10" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card font-display text-sm font-bold text-primary shadow-md">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Check, Zap, CreditCard, ArrowLeft, Crown, Sparkles } from "lucide-react"

const features = [
  "Unlimited receipt scans",
  "Advanced analytics & reports",
  "Budget alerts & notifications",
  "Expense editing anytime",
  "Custom categories",
  "Priority support",
  "Data export (CSV/PDF)",
  "Receipt history (3+ years)",
]

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
  { id: "paypal", label: "PayPal", icon: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.403 2.933l-.836 5.312-.292 1.856a.67.67 0 0 0 .663.772h4.723c.519 0 .96-.38 1.04-.894l.04-.207.83-5.258.053-.291c.08-.514.52-.894 1.04-.894h.654c4.26 0 7.6-1.73 8.573-6.73.315-1.618.226-2.974-.689-4.394z"/>
    </svg>
  )},
  { id: "zelle", label: "Zelle", icon: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13.559 24h-2.48a.477.477 0 0 1-.407-.742l8.614-13.832H6.477A.477.477 0 0 1 6 8.95V6.472c0-.264.213-.477.477-.477h11.046a.477.477 0 0 1 .407.742L9.316 20.569h6.207c.263 0 .477.214.477.477v2.477a.477.477 0 0 1-.477.477h-1.964z"/>
    </svg>
  )},
  { id: "cashapp", label: "Cash App", icon: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M23.59 3.47A5.1 5.1 0 0 0 20.53.41C19.37.05 18.03 0 16.1 0H7.9C5.97 0 4.63.05 3.47.41A5.1 5.1 0 0 0 .41 3.47C.05 4.63 0 5.97 0 7.9v8.2c0 1.93.05 3.27.41 4.43a5.1 5.1 0 0 0 3.06 3.06c1.16.36 2.5.41 4.43.41h8.2c1.93 0 3.27-.05 4.43-.41a5.1 5.1 0 0 0 3.06-3.06c.36-1.16.41-2.5.41-4.43V7.9c0-1.93-.05-3.27-.41-4.43zM17.42 16.18l-1.24 1.08a.601.601 0 0 1-.84-.08 4.722 4.722 0 0 0-2.59-1.38c-.69-.14-1.36-.08-1.84.16-.39.2-.57.54-.48.91.09.37.47.6.95.72.47.13 1.06.18 1.67.18.56 0 1.14.05 1.69.22a3.31 3.31 0 0 1 1.38.78 2.88 2.88 0 0 1 .82 1.42c.21.9.07 1.9-.5 2.72a3.96 3.96 0 0 1-2.56 1.54c-.62.14-1.19.16-1.69.16a6.28 6.28 0 0 1-2.89-.66 5.803 5.803 0 0 1-1.22-.79l1.03-1.34c.17-.22.5-.28.74-.13.63.37 1.32.62 2.1.72.81.1 1.52-.01 2.04-.36.37-.25.56-.66.48-1.08-.08-.39-.42-.64-.89-.76-.42-.11-1-.16-1.6-.18a6.33 6.33 0 0 1-1.7-.19 3.08 3.08 0 0 1-1.35-.75 2.74 2.74 0 0 1-.78-1.38c-.21-.92-.05-1.94.55-2.77a4.08 4.08 0 0 1 2.6-1.55c1.1-.22 2.16-.17 3.09.11.64.19 1.23.49 1.74.89.25.2.29.56.09.81z"/>
    </svg>
  )},
]

export default function UpgradeProPage() {
  const router = useRouter()
  const { upgradeToPro } = useAuth()
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Demo: Upgrade user to Pro
    await upgradeToPro()
    
    // Redirect to dashboard with success
    router.push("/dashboard?upgraded=true")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 mb-4 sm:mb-6">
            <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </div>
          <Badge className="mb-3 sm:mb-4 gap-2 bg-primary/10 text-primary border-primary/30 text-xs sm:text-sm">
            <Sparkles className="h-3 w-3" />
            Limited Time Offer - Save 20%
          </Badge>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance px-2">
            Upgrade to SmartSpend Pro
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground px-4 sm:px-0">
            Unlock unlimited scans, advanced analytics, and take full control of your finances
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-5 max-w-6xl mx-auto">
          {/* Pro Benefits - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-border overflow-hidden">
              <div className="bg-primary/10 px-6 py-4 border-b border-border">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Everything in Pro
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 shrink-0">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Comparison */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-display">Choose Your Plan</CardTitle>
                <CardDescription>All plans include a 7-day free trial</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border bg-secondary/30 cursor-pointer hover:border-primary/50 transition-colors">
                  <div>
                    <p className="font-semibold text-foreground">Monthly</p>
                    <p className="text-sm text-muted-foreground">Billed monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-foreground">$2.99</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border-2 border-primary bg-primary/5 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-bl font-medium">
                    Best Value
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Annual</p>
                    <p className="text-sm text-muted-foreground">Save 20% - Billed yearly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-foreground">$28.80</p>
                    <p className="text-xs text-muted-foreground">/year ($2.40/mo)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Selection - Right Side */}
          <div className="lg:col-span-2">
            <Card className="border-border sticky top-4 shadow-xl">
              <CardHeader className="text-center border-b border-border bg-secondary/30">
                <CardTitle className="font-display text-xl">Complete Your Purchase</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Payment Methods */}
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    const isSelected = selectedPayment === method.id
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-secondary/50"
                        }`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}>
                          <Icon />
                        </div>
                        <span className="font-medium text-foreground">{method.label}</span>
                        {isSelected && (
                          <div className="ml-auto">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Payment Form based on selection */}
                {selectedPayment === "card" && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Card Number</FieldLabel>
                        <Input placeholder="1234 5678 9012 3456" />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field>
                          <FieldLabel>Expiry</FieldLabel>
                          <Input placeholder="MM/YY" />
                        </Field>
                        <Field>
                          <FieldLabel>CVC</FieldLabel>
                          <Input placeholder="123" />
                        </Field>
                      </div>
                    </FieldGroup>
                  </div>
                )}

                {selectedPayment === "paypal" && (
                  <div className="pt-4 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      You will be redirected to PayPal to complete your purchase securely.
                    </p>
                    <div className="flex justify-center">
                      <div className="bg-[#003087] text-white px-6 py-2 rounded-lg font-semibold text-lg">
                        PayPal
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment === "zelle" && (
                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Send payment to the following Zelle account:
                    </p>
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">payments@smartspend.com</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      After sending payment, your account will be upgraded within 24 hours.
                    </p>
                  </div>
                )}

                {selectedPayment === "cashapp" && (
                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Send payment to our Cash App:
                    </p>
                    <div className="bg-[#00D632]/10 rounded-lg p-4 text-center border border-[#00D632]/30">
                      <p className="text-sm text-muted-foreground">Cashtag</p>
                      <p className="font-semibold text-[#00D632] text-xl">$SmartSpendApp</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      After sending payment, your account will be upgraded within 24 hours.
                    </p>
                  </div>
                )}

                {/* Pay Button */}
                <Button 
                  className="w-full text-base h-12 gap-2" 
                  size="lg" 
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : selectedPayment === "card" ? (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Pay $28.80/year
                    </>
                  ) : selectedPayment === "paypal" ? (
                    "Continue with PayPal"
                  ) : (
                    "I've Sent Payment"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure payment. Cancel anytime. 30-day money-back guarantee.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-muted-foreground text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span>7-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

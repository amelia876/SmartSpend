"use client"

import { useAuth } from "@/contexts/auth-context"

export function DashboardHeader() {
  const { user, userProfile } = useAuth()
  
  // Get first name for greeting
  const fullName = userProfile?.name || user?.email?.split("@")[0] || "there"
  const firstName = fullName.split(" ")[0]

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
        Welcome back, {firstName}
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">{currentDate}</p>
    </div>
  )
}

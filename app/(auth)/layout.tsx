"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navbar — same style as landing page header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Left: back button + logo */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9 shrink-0"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="SmartSpend Logo"
                width={38}
                height={38}
                className="rounded-full"
              />
              <span className="font-display text-xl font-bold text-foreground">
                SmartSpend
              </span>
            </Link>
          </div>

          {/* Center nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              How It Works
            </Link>
          </nav>

          {/* Right: auth links */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Split-screen body */}
      <div className="flex flex-1">
        {/* Left panel — blue gradient with decorative circles */}
        <div
          className="hidden w-2/5 relative overflow-hidden lg:flex flex-col justify-between p-12"
          style={{ background: "linear-gradient(135deg, #004aad 0%, #38b6ff 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute left-40 bottom-20 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -right-10 top-1/3 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute left-1/4 top-20 w-32 h-32 rounded-full bg-white/10" />

          {/* Welcome text */}
          <div className="relative z-10 mt-auto space-y-4">
            <h1 className="font-display text-5xl font-bold text-white tracking-wide">
              WELCOME
            </h1>
            <p className="text-xl text-white/90 font-medium">
              Your Smart Financial Companion
            </p>
            <p className="max-w-xs text-white/70 leading-relaxed">
              Join thousands of users saving smarter, spending wiser, and building better financial habits.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 mt-10 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold text-white">50K+</span>
              <span className="text-sm text-white/70">Active Users</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold text-white">4.9</span>
              <span className="text-sm text-white/70">App Rating</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold text-white">$2M+</span>
              <span className="text-sm text-white/70">Tracked</span>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex flex-1 items-center justify-center bg-card p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}

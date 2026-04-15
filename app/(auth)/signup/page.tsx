"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, Mail, Lock, GraduationCap, Briefcase, Building, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const roles = [
  { id: "student", label: "Student", icon: GraduationCap, description: "Track spending and learn financial habits" },
  { id: "personal", label: "Personal", icon: Briefcase, description: "Manage personal finances with ease" },
  { id: "business", label: "Business", icon: Building, description: "Control business expenses and budgets" },
]

const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "India", 
  "Germany", "France", "Japan", "Brazil", "Mexico", "South Africa",
  "Nigeria", "Kenya", "Ghana", "Singapore", "Other"
]

export default function SignupPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [selectedRole, setSelectedRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    // Student specific
    age: "",
    gender: "",
    institution: "",
    // Business specific
    businessName: "",
    industry: "",
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.country) newErrors.country = "Country is required"
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (selectedRole === "student") {
      if (!formData.age) newErrors.age = "Age is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
    }

    if (selectedRole === "business") {
      if (!formData.businessName) newErrors.businessName = "Business name is required"
      if (!formData.industry) newErrors.industry = "Industry is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      console.log("[v0] Starting signup...")
      await signUp(formData.email, formData.password, {
        email: formData.email,
        name: formData.name,
        role: selectedRole as "student" | "personal" | "business",
        country: formData.country,
        institution: formData.institution || undefined,
        businessName: formData.businessName || undefined,
        businessType: formData.industry || undefined,
      })
      console.log("[v0] Signup successful, redirecting...")
      // Use replace to prevent back button going to signup
      router.replace("/dashboard")
    } catch (error: unknown) {
      console.error("[v0] Signup error:", error)
      const firebaseError = error as { code?: string; message?: string }
      if (firebaseError.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already registered" })
      } else if (firebaseError.code === "auth/weak-password") {
        setErrors({ password: "Password is too weak" })
      } else {
        setErrors({ general: firebaseError.message || "An error occurred. Please try again." })
      }
      setIsLoading(false)
    }
  }

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Create Account</h2>
          <p className="text-sm text-muted-foreground">
            Choose your account type to get started
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary hover:border-primary/50 transition-all text-left group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{role.label}</p>
                  <p className="text-xs text-muted-foreground">{role.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    )
  }

  // Signup Form Screen
  return (
    <div className="w-full max-w-md">
      <button
        onClick={() => setSelectedRole("")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="mb-4 text-center">
        <h2 className="font-display text-xl font-bold text-foreground mb-1">Sign up as {roles.find(r => r.id === selectedRole)?.label}</h2>
        <p className="text-xs text-muted-foreground">Fill in your details to create an account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {errors.general && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {errors.general}
          </div>
        )}
        <FieldGroup>
          {/* Common Fields */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                placeholder="John Doe"
                className="pl-10 h-10 bg-secondary/50 text-base"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10 h-10 bg-secondary/50 text-base"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
              <SelectTrigger className="h-10 bg-secondary/50">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <FieldError>{errors.country}</FieldError>}
          </Field>

          {/* Student-specific fields */}
          {selectedRole === "student" && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <Field>
                  <FieldLabel htmlFor="age">Age</FieldLabel>
                  <Input
                    id="age"
                    type="number"
                    placeholder="18"
                    className="h-10 bg-secondary/50 text-base"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={isLoading}
                  />
                  {errors.age && <FieldError>{errors.age}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="gender">Gender</FieldLabel>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger className="h-10 bg-secondary/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <FieldError>{errors.gender}</FieldError>}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="institution">Institution (Optional)</FieldLabel>
                <Input
                  id="institution"
                  placeholder="University or School name"
                  className="h-10 bg-secondary/50 text-base"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  disabled={isLoading}
                />
              </Field>
            </>
          )}

          {/* Business-specific fields */}
          {selectedRole === "business" && (
            <>
              <Field>
                <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  className="h-10 bg-secondary/50 text-base"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  disabled={isLoading}
                />
                {errors.businessName && <FieldError>{errors.businessName}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="industry">Industry</FieldLabel>
                <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                  <SelectTrigger className="h-10 bg-secondary/50">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && <FieldError>{errors.industry}</FieldError>}
              </Field>
            </>
          )}

          {/* Password fields */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pl-10 pr-16 h-10 bg-secondary/50 text-base"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-10 pr-16 h-10 bg-secondary/50 text-base"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}
          </Field>

          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold mt-2"
            style={{ background: 'linear-gradient(135deg, #004aad 0%, #38b6ff 100%)' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">Terms</Link>
        {" "}and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
      </p>
    </div>
  )
}

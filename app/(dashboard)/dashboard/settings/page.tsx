"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"
import { User, Bell, Shield, CreditCard, Crown, Users, Mail, X, Check, Clock, Zap, Lock, BarChart3 } from "lucide-react"

const FREE_TEAM_LIMIT = 2

// Start with empty team for demo - business owner can invite up to 2 for free
const mockTeamMembers: { id: number; name?: string; email: string; role: string; status: string }[] = []

export default function SettingsPage() {
  const { user, userProfile, updateProfile, upgradeToPro, downgradeToFree } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    country: "",
    institution: "",
    businessName: "",
  })

  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    weeklyReport: true,
    newFeatures: false,
  })

  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showTeamUpgradeDialog, setShowTeamUpgradeDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteError, setInviteError] = useState("")
  const [isInviting, setIsInviting] = useState(false)

  // Populate profile fields once Firebase data is available
  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name || "",
        email: userProfile.email || user?.email || "",
        country: userProfile.country || "",
        institution: userProfile.institution || "",
        businessName: userProfile.businessName || "",
      })
    } else if (user) {
      setProfile((prev) => ({ ...prev, email: user.email || "" }))
    }
  }, [userProfile, user])

  const handleSaveProfile = async () => {
    setIsLoading(true)
    setSaveError("")
    setSaveSuccess(false)

    try {
      await updateProfile({
        name: profile.name,
        country: profile.country || undefined,
        institution: profile.institution || undefined,
        businessName: profile.businessName || undefined,
      })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error: unknown) {
      const err = error as { message?: string }
      setSaveError(err.message || "Failed to save changes. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isBusiness = userProfile?.role === "business"
  const isStudent = userProfile?.role === "student"
  const isPro = userProfile?.isPro === true
  const isAtTeamLimit = !isPro && teamMembers.length >= FREE_TEAM_LIMIT

  const handleInviteClick = () => {
    if (isAtTeamLimit) {
      setShowTeamUpgradeDialog(true)
    } else {
      setShowInviteDialog(true)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground md:text-3xl">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="font-display text-lg">Profile</CardTitle>
            </div>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Your full name"
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  value={profile.email}
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed here</p>
              </Field>
              <Field>
                <FieldLabel>Country</FieldLabel>
                <Input
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  placeholder="Your country"
                />
              </Field>
              {isStudent && (
                <Field>
                  <FieldLabel>Institution</FieldLabel>
                  <Input
                    value={profile.institution}
                    onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                    placeholder="Your school or university"
                  />
                </Field>
              )}
              {isBusiness && (
                <Field>
                  <FieldLabel>Business Name</FieldLabel>
                  <Input
                    value={profile.businessName}
                    onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                    placeholder="Your business name"
                  />
                </Field>
              )}
              <div className="flex items-center gap-3 pt-1">
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                {saveSuccess && (
                  <span className="flex items-center gap-1 text-sm text-chart-2">
                    <Check className="h-4 w-4" />
                    Saved
                  </span>
                )}
              </div>
              {saveError && (
                <p className="text-sm text-destructive">{saveError}</p>
              )}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="font-display text-lg">Notifications</CardTitle>
            </div>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Budget Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
              </div>
              <Switch
                checked={notifications.budgetAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, budgetAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Report</p>
                <p className="text-sm text-muted-foreground">Receive a summary of your spending each week</p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Features</p>
                <p className="text-sm text-muted-foreground">Be the first to know about new features</p>
              </div>
              <Switch
                checked={notifications.newFeatures}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newFeatures: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle className="font-display text-lg">Subscription</CardTitle>
            </div>
            <CardDescription>Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{isPro ? "Pro Plan" : "Free Plan"}</p>
                  <Badge variant="secondary">Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isPro ? "Unlimited scans & advanced analytics" : "2 scans per day"}
                </p>
              </div>
            </div>
            {isPro ? (
              <div className="rounded-lg border border-chart-2/50 bg-chart-2/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-chart-2" />
                  <p className="font-semibold text-foreground">You&apos;re on Pro!</p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Enjoy unlimited scans, advanced analytics, and all premium features.
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Want to test free experience?
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={downgradeToFree}
                  >
                    Downgrade (Demo)
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-primary/50 bg-primary/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">Upgrade to Premium</p>
                </div>
                <ul className="mb-4 space-y-1 text-sm text-muted-foreground">
                  <li>Unlimited receipt scans</li>
                  <li>Advanced analytics</li>
                  <li>Export to CSV/PDF</li>
                  <li>Priority support</li>
                </ul>
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl font-bold text-foreground">
                    $3<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/upgrade">Upgrade Now</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="font-display text-lg">Security</CardTitle>
            </div>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Team Management - Only for Business accounts */}
      {isBusiness && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="font-display text-lg">Team Management</CardTitle>
                {!isPro && (
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    {teamMembers.length}/{FREE_TEAM_LIMIT} free
                  </Badge>
                )}
              </div>
              <Button 
                onClick={handleInviteClick} 
                className="gap-2"
                variant={isAtTeamLimit ? "outline" : "default"}
              >
                {isAtTeamLimit ? (
                  <Crown className="h-4 w-4 text-amber-500" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                Invite Member
              </Button>
            </div>
            <CardDescription>
              {isPro 
                ? "Manage your organization members and send invitations" 
                : `Invite up to ${FREE_TEAM_LIMIT} team members for free. Upgrade to Pro for unlimited.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground mb-1">No team members yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Invite colleagues to collaborate on expense tracking
                </p>
                <Button onClick={handleInviteClick} variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Send First Invite
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name || member.email}</p>
                        {member.name && <p className="text-sm text-muted-foreground">{member.email}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {member.status === "pending" ? (
                        <Badge variant="outline" className="gap-1 text-chart-4">
                          <Clock className="h-3 w-3" />
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <Check className="h-3 w-3" />
                          {member.role}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setTeamMembers(teamMembers.filter((m) => m.id !== member.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an email invitation to add a new member to your organization. They will be able
              to access SmartSpend under your business account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Field>
              <FieldLabel htmlFor="inviteEmail">Email Address</FieldLabel>
              <Input
                id="inviteEmail"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => {
                  setInviteEmail(e.target.value)
                  setInviteError("")
                }}
              />
              {inviteError && <FieldError>{inviteError}</FieldError>}
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!inviteEmail.trim()) { setInviteError("Email is required"); return }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) { setInviteError("Please enter a valid email"); return }
                if (teamMembers.some((m) => m.email === inviteEmail)) { setInviteError("This email is already invited"); return }
                setIsInviting(true)
                await new Promise((resolve) => setTimeout(resolve, 1000))
                setTeamMembers([...teamMembers, { id: Date.now(), email: inviteEmail, role: "Member", status: "pending" }])
                setInviteEmail("")
                setShowInviteDialog(false)
                setIsInviting(false)
              }}
              disabled={isInviting}
            >
              {isInviting ? <><Spinner className="mr-2 h-4 w-4" />Sending...</> : "Send Invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Team Upgrade Dialog */}
      <Dialog open={showTeamUpgradeDialog} onOpenChange={setShowTeamUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-xl">Upgrade to Pro</DialogTitle>
            </div>
            <DialogDescription className="text-left">
              You&apos;ve reached the <span className="font-semibold text-foreground">{FREE_TEAM_LIMIT} team member limit</span> for free business accounts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-foreground font-medium mb-3">With Pro, your business gets:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  Unlimited team members
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary shrink-0" />
                  Team spending analytics
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  Unlimited receipt scans for all members
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary shrink-0" />
                  Advanced permissions and roles
                </li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Free business accounts are limited to {FREE_TEAM_LIMIT} team members.
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowTeamUpgradeDialog(false)}
              className="w-full sm:w-auto"
            >
              Maybe Later
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto gap-2"
              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
            >
              <Link href="/dashboard/upgrade">
                <Crown className="h-4 w-4" />
                Upgrade Now
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

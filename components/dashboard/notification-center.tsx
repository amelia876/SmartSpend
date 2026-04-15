"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Check, X, AlertCircle, TrendingUp, Gift, Receipt } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotifications, type Notification as FirebaseNotification } from "@/hooks/use-firebase-data"
import { useAuth } from "@/contexts/auth-context"

// Mock notifications for when user is not logged in or no Firebase notifications
const mockNotifications = [
  {
    id: "mock-1",
    type: "budget" as const,
    title: "Budget Alert",
    message: "You've reached 90% of your groceries budget",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "mock-2",
    type: "receipt" as const,
    title: "Receipt Scanned",
    message: "Your Whole Foods receipt has been processed successfully",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "mock-3",
    type: "report" as const,
    title: "Weekly Report Ready",
    message: "Your spending summary for this week is ready to view",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "mock-4",
    type: "promo" as const,
    title: "Exclusive Offer",
    message: "Get Pro for 50% off for the first month",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "budget":
      return <AlertCircle className="h-5 w-5 text-chart-5" />
    case "receipt":
      return <Receipt className="h-5 w-5 text-chart-2" />
    case "report":
      return <TrendingUp className="h-5 w-5 text-primary" />
    case "promo":
      return <Gift className="h-5 w-5 text-chart-4" />
    default:
      return <Check className="h-5 w-5 text-chart-2" />
  }
}

export function NotificationCenter() {
  const { user } = useAuth()
  const { 
    notifications: firebaseNotifications, 
    loading, 
    markAsRead: firebaseMarkAsRead, 
    markAllAsRead: firebaseMarkAllAsRead,
    deleteNotification: firebaseDeleteNotification 
  } = useNotifications()
  
  // Use local state for mock data when not logged in
  const [localNotifications, setLocalNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  // Use Firebase notifications if user is logged in and has notifications, otherwise use mock
  const notifications = user && firebaseNotifications.length > 0 
    ? firebaseNotifications 
    : localNotifications

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = async (id: string) => {
    if (user && firebaseNotifications.length > 0) {
      await firebaseMarkAsRead(id)
    } else {
      setLocalNotifications(
        localNotifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      )
    }
  }

  const markAllAsRead = async () => {
    if (user && firebaseNotifications.length > 0) {
      await firebaseMarkAllAsRead()
    } else {
      setLocalNotifications(localNotifications.map((n) => ({ ...n, read: true })))
    }
  }

  const deleteNotification = async (id: string) => {
    if (user && firebaseNotifications.length > 0) {
      await firebaseDeleteNotification(id)
    } else {
      setLocalNotifications(localNotifications.filter((n) => n.id !== id))
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-secondary transition-colors cursor-pointer group ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />
        <div className="px-4 py-2">
          <Button variant="ghost" className="w-full text-xs" size="sm">
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

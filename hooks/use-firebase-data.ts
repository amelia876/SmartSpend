"use client"

import { useState, useEffect } from "react"
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
  limit,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"

// Types
export interface Expense {
  id: string
  merchant: string
  amount: number
  category: string
  date: Date
  notes?: string
  receiptUrl?: string
  createdAt: Date
}

export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  color: string
  icon: string
  period: "monthly" | "weekly"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "budget" | "receipt" | "report" | "promo"
  read: boolean
  createdAt: Date
}

// Expenses Hook
export function useExpenses() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setExpenses([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("date", "desc"),
      limit(100)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expenseData: Expense[] = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            merchant: data.merchant,
            amount: data.amount,
            category: data.category,
            date: data.date?.toDate() || new Date(),
            notes: data.notes,
            receiptUrl: data.receiptUrl,
            createdAt: data.createdAt?.toDate() || new Date(),
          }
        })
        setExpenses(expenseData)
        setLoading(false)
      },
      (err) => {
        console.error("Error fetching expenses:", err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  const addExpense = async (expense: Omit<Expense, "id" | "createdAt">) => {
    if (!user) throw new Error("User not authenticated")

    await addDoc(collection(db, "expenses"), {
      ...expense,
      userId: user.uid,
      date: Timestamp.fromDate(expense.date),
      createdAt: serverTimestamp(),
    })
  }

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    const expenseRef = doc(db, "expenses", id)
    const updateData: Record<string, unknown> = { ...updates }
    
    if (updates.date) {
      updateData.date = Timestamp.fromDate(updates.date)
    }
    
    await updateDoc(expenseRef, updateData)
  }

  const deleteExpense = async (id: string) => {
    await deleteDoc(doc(db, "expenses", id))
  }

  return { expenses, loading, error, addExpense, updateExpense, deleteExpense }
}

// Budgets Hook
export function useBudgets() {
  const { user } = useAuth()
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setBudgets([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, "budgets"),
      where("userId", "==", user.uid)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const budgetData: Budget[] = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            category: data.category,
            limit: data.limit,
            spent: data.spent || 0,
            color: data.color,
            icon: data.icon,
            period: data.period || "monthly",
          }
        })
        setBudgets(budgetData)
        setLoading(false)
      },
      (err) => {
        console.error("Error fetching budgets:", err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  const addBudget = async (budget: Omit<Budget, "id" | "spent">) => {
    if (!user) throw new Error("User not authenticated")

    await addDoc(collection(db, "budgets"), {
      ...budget,
      spent: 0,
      userId: user.uid,
      createdAt: serverTimestamp(),
    })
  }

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    await updateDoc(doc(db, "budgets", id), updates)
  }

  const deleteBudget = async (id: string) => {
    await deleteDoc(doc(db, "budgets", id))
  }

  return { budgets, loading, error, addBudget, updateBudget, deleteBudget }
}

// Notifications Hook
export function useNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setNotifications([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(20)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationData: Notification[] = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            message: data.message,
            type: data.type,
            read: data.read || false,
            createdAt: data.createdAt?.toDate() || new Date(),
          }
        })
        setNotifications(notificationData)
        setLoading(false)
      },
      (err) => {
        console.error("Error fetching notifications:", err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), { read: true })
  }

  const markAllAsRead = async () => {
    if (!user) return
    
    const unreadNotifications = notifications.filter((n) => !n.read)
    await Promise.all(
      unreadNotifications.map((n) =>
        updateDoc(doc(db, "notifications", n.id), { read: true })
      )
    )
  }

  const deleteNotification = async (id: string) => {
    await deleteDoc(doc(db, "notifications", id))
  }

  return { notifications, loading, markAsRead, markAllAsRead, deleteNotification }
}

// Dashboard Stats Hook
export function useDashboardStats() {
  const { expenses } = useExpenses()
  const { budgets } = useBudgets()

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const transactionCount = expenses.length

  // Get spending by category
  const spendingByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  // Get recent expenses (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentExpenses = expenses.filter((e) => e.date >= sevenDaysAgo)

  return {
    totalSpent,
    totalBudget,
    transactionCount,
    spendingByCategory,
    recentExpenses,
    budgets,
  }
}

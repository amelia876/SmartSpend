"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface UserProfile {
  uid: string
  email: string
  name: string
  role: "student" | "personal" | "business"
  country: string
  institution?: string
  businessName?: string
  businessType?: string
  isPro: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, profile: Omit<UserProfile, "uid" | "isPro" | "createdAt">) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (data: Partial<Pick<UserProfile, "name" | "country" | "institution" | "businessName" | "businessType">>) => Promise<void>
  upgradeToPro: () => Promise<void>
  downgradeToFree: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Function to fetch user profile
  const fetchUserProfile = async (uid: string) => {
    const cacheKey = `smartspend_profile_${uid}`
    
    // First, try to load from localStorage immediately (for fast UI)
    let cachedProfile: UserProfile | null = null
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const data = JSON.parse(cached)
        cachedProfile = { ...data, createdAt: new Date(data.createdAt) } as UserProfile
        setUserProfile(cachedProfile)
      }
    } catch {}

    // Then try Firestore to get the latest data
    try {
      const profileDoc = await getDoc(doc(db, "users", uid))
      if (profileDoc.exists()) {
        const data = profileDoc.data()
        const profile = {
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        } as UserProfile
        setUserProfile(profile)
        // Update localStorage cache
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ ...profile, createdAt: profile.createdAt.toISOString() }))
        } catch {}
      } else if (!cachedProfile) {
        // No Firestore doc and no cache - profile doesn't exist
        setUserProfile(null)
      }
    } catch {
      // Firestore failed - we already set profile from cache above if it existed
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      
      if (firebaseUser) {
        // Await profile fetch so userProfile is populated before loading = false
        await fetchUserProfile(firebaseUser.uid)
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (
    email: string,
    password: string,
    profile: Omit<UserProfile, "uid" | "isPro" | "createdAt">
  ) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = userCredential.user

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      country: profile.country,
      isPro: false,
      createdAt: new Date(),
    }

    // Build Firestore document - only include defined optional fields
    const firestoreData: Record<string, unknown> = {
      uid,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      country: profile.country,
      isPro: false,
      createdAt: serverTimestamp(),
    }

    // Only add optional fields if they have values
    if (profile.institution) {
      firestoreData.institution = profile.institution
      userProfile.institution = profile.institution
    }
    if (profile.businessName) {
      firestoreData.businessName = profile.businessName
      userProfile.businessName = profile.businessName
    }
    if (profile.businessType) {
      firestoreData.businessType = profile.businessType
      userProfile.businessType = profile.businessType
    }

    // Try to save profile to Firestore with a timeout
    // Don't block signup if Firestore write fails (e.g., offline)
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firestore timeout")), 5000)
      )
      await Promise.race([
        setDoc(doc(db, "users", uid), firestoreData),
        timeoutPromise
      ])
    } catch {
      // Firestore failed - profile is cached locally and will work offline
    }

    setUserProfile(userProfile)
    // Cache to localStorage so profile survives browser restarts
    try {
      localStorage.setItem(`smartspend_profile_${uid}`, JSON.stringify({ ...userProfile, createdAt: userProfile.createdAt.toISOString() }))
    } catch {}
  }

  const signOut = async () => {
    // Don't clear sessionStorage cache - keep it so profile persists across logins
    // when Firestore is offline. The cache is keyed by uid, so switching users
    // will naturally use a different cache key.
    await firebaseSignOut(auth)
    setUserProfile(null)
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid)
    }
  }

  const updateProfile = async (
    data: Partial<Pick<UserProfile, "name" | "country" | "institution" | "businessName" | "businessType">>
  ) => {
    if (!user) throw new Error("No user logged in")

    // Build update object - strip out undefined values so Firestore doesn't reject them
    const updates: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== "") {
        updates[key] = value
      }
    }

    await updateDoc(doc(db, "users", user.uid), updates)

    // Update local state immediately so UI reflects change without a re-fetch
    setUserProfile((prev) => (prev ? { ...prev, ...data } : prev))
  }

  // Demo function to upgrade to Pro (for demonstration purposes)
  const upgradeToPro = async () => {
    if (!user) throw new Error("No user logged in")

    try {
      await updateDoc(doc(db, "users", user.uid), { isPro: true })
    } catch (error) {
      console.error("[v0] Failed to update Firestore:", error)
    }

    setUserProfile((prev) => {
      const updated = prev ? { ...prev, isPro: true } : prev
      if (updated) {
        try { localStorage.setItem(`smartspend_profile_${user.uid}`, JSON.stringify({ ...updated, createdAt: updated.createdAt.toISOString() })) } catch {}
      }
      return updated
    })
  }

  // Demo function to downgrade to Free (for demonstration purposes)
  const downgradeToFree = async () => {
    if (!user) throw new Error("No user logged in")

    try {
      await updateDoc(doc(db, "users", user.uid), { isPro: false })
    } catch (error) {
      console.error("[v0] Failed to update Firestore:", error)
    }

    setUserProfile((prev) => {
      const updated = prev ? { ...prev, isPro: false } : prev
      if (updated) {
        try { localStorage.setItem(`smartspend_profile_${user.uid}`, JSON.stringify({ ...updated, createdAt: updated.createdAt.toISOString() })) } catch {}
      }
      return updated
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        refreshProfile,
        updateProfile,
        upgradeToPro,
        downgradeToFree,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

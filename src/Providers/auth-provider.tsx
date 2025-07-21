'use client'

import React from 'react'
import { signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '@/infra/repositories/firebase/config'

export interface User {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  sex: 'male' | 'female';
}

interface AuthContextProps {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)

const STORAGE_KEY = 'user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored) as User)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  const signIn = React.useCallback((u: User) => {
    setUser(u)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch {
      // ignore
    }
  }, [])

  const signOut = React.useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    try {
      if (auth) firebaseSignOut(auth)
    } catch {
      // ignore
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

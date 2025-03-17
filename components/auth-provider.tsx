"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase" // Use the updated Supabase client


type User = {
  id: string
  username: string
  email: string
  role: "user" | "admin"
  level: number
  avatar?: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoading(true)
      if (session) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    // Initial session check
    checkUser()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function checkUser() {
    try {
      setIsLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        await fetchUserProfile(session.user)
      }
    } catch (error) {
      console.error("Error checking user session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchUserProfile(supabaseUser: SupabaseUser) {
    try {
      setSupabaseUser(supabaseUser)

      // Get user profile from profiles table
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", supabaseUser.id).single()

      if (error) {
        throw error
      }

      if (profile) {
        setUser({
          id: profile.id,
          username: profile.username,
          email: supabaseUser.email || "",
          role: profile.is_admin ? "admin" : "user",
          level: profile.level,
          avatar: profile.avatar_url || undefined,
          isAdmin: profile.is_admin,
        })
      } else {
        // Profile doesn't exist yet, might need to create one
        setUser(null)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      setUser(null)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // User profile will be fetched by the auth state change listener
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) {
        console.error("🔴 Supabase Auth Error:", authError);
        throw new Error(authError.message || "Registration failed.");
      }
  
      if (!authData.user) {
        throw new Error("❌ User creation failed. Check Supabase settings.");
      }
  
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          username,
          email,
          is_admin: false,
          level: 1,
          experience_points: 0,
        },
      ]);
  
      if (profileError) {
        console.error("🔴 Supabase Profile Insert Error:", JSON.stringify(profileError, null, 2));
        throw new Error(profileError?.message || "Profile creation failed. Check logs for details.");
      }
      
    } catch (error: any) {
      console.error("🔴 Registration Failed:", error);
      throw new Error(error.message || "Unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


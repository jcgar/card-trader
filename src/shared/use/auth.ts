"use client"

import { useState, useEffect } from "react"
import type { User } from "@/shared/app/types"

// Simular una llamada a la API para obtener el usuario actual
const fetchCurrentUser = async (): Promise<User | null> => {
  // En una implementación real, esto sería una llamada a tu API
  const storedUser = localStorage.getItem("currentUser")
  return storedUser ? JSON.parse(storedUser) : null
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCurrentUser().then((fetchedUser) => {
      setUser(fetchedUser)
      setLoading(false)
    })
  }, [])

  const login = async (userData: User) => {
    // En una implementación real, esto sería una llamada a tu API de login
    localStorage.setItem("currentUser", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = async () => {
    // En una implementación real, esto sería una llamada a tu API de logout
    localStorage.removeItem("currentUser")
    setUser(null)
  }

  return { user, loading, login, logout, isLoggedIn: !!user }
}


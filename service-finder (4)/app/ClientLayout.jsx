"use client"

import { useEffect } from "react"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"
import ScrollToTop from "@/components/ScrollToTop"
import ChatBot from "@/components/ChatBot"

export default function ClientLayout({ children }) {
  // Set up dark mode based on user preference
  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme")

      if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  return (
    <body className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <AuthProvider>
        {children}
        <ScrollToTop />
        <ChatBot />
      </AuthProvider>
    </body>
  )
}


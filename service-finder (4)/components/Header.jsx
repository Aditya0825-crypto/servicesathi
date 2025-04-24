"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Notifications from "./Notifications"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    // Check if dark mode is enabled in localStorage
    const isDark = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(isDark)

    // Apply the theme class only once on initial load
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    // Update the DOM and localStorage
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("darkMode", newDarkMode ? "true" : "false")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-black text-white dark:bg-white dark:text-black rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
              SS
            </div>
            <span className="ml-2 font-bold text-xl text-gray-900 dark:text-white">ServiceSarthi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium ${
                isActive("/")
                  ? "text-primary dark:text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium ${
                isActive("/services") || pathname.startsWith("/services/")
                  ? "text-primary dark:text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Services
            </Link>
            <Link
              href="/providers"
              className={`text-sm font-medium ${
                isActive("/providers") || pathname.startsWith("/providers/")
                  ? "text-primary dark:text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Providers
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${
                isActive("/about")
                  ? "text-primary dark:text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${
                isActive("/contact")
                  ? "text-primary dark:text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            {user && (
              <div className="relative">
                <Notifications />
              </div>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md ${
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md ${
                isActive("/services") || pathname.startsWith("/services/")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Services
            </Link>
            <Link
              href="/providers"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md ${
                isActive("/providers") || pathname.startsWith("/providers/")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Providers
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md ${
                isActive("/about")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md ${
                isActive("/contact")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Contact
            </Link>

            {/* Auth Links for Mobile */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    closeMenu()
                    logout()
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}


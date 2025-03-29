"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, LogOut, Bell } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth-context"
import Notifications from "@/components/Notifications"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = async () => {
    await logout()
    setIsProfileOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-white p-1.5 rounded-md shadow-sm">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <span className="text-xl font-bold font-heading">
            Service<span className="text-gray-500">Sarthi</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/providers"
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Providers
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors relative overflow-hidden group"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 relative z-10" />
            ) : (
              <Moon className="h-5 w-5 relative z-10" />
            )}
            <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></span>
          </button>

          {user ? (
            <Notifications />
          ) : (
            <Link
              href="/login"
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Bell className="h-5 w-5" />
            </Link>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center overflow-hidden shadow-sm">
                  {user.image ? (
                    <img
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-medium">{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className="font-medium">{user.name.split(" ")[0]}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-md py-1 z-10 border border-border">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors relative overflow-hidden group"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 relative z-10" />
            ) : (
              <Moon className="h-5 w-5 relative z-10" />
            )}
            <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></span>
          </button>

          <button
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/providers"
                  className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Providers
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              {user && (
                <Link
                  href="/dashboard/notifications"
                  className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </Link>
              )}

              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center overflow-hidden shadow-sm">
                        {user.image ? (
                          <img
                            src={user.image || "/placeholder.svg"}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-medium text-lg">{user.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center w-full px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full px-4 py-2 rounded-md border border-input bg-card text-center font-medium hover:bg-accent hover:text-accent-foreground transition-colors block mb-2 shadow-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground text-center font-medium hover:bg-primary/90 transition-colors block shadow-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


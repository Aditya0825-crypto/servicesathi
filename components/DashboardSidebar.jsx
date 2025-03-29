"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Calendar, Settings, LogOut, Home, Star, MessageSquare } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleSignOut = async () => {
    await logout()
  }

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "My Bookings", href: "/dashboard/bookings", icon: <Calendar className="h-5 w-5" /> },
    { label: "My Reviews", href: "/dashboard/reviews", icon: <Star className="h-5 w-5" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  // Get the first letter of the user's name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U"
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center">Please log in to view your dashboard</p>
        <div className="mt-4 flex justify-center">
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mr-4 text-lg font-semibold">
            {user.image ? (
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitial(user.name)
            )}
          </div>
          <div>
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}


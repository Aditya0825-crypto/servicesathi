"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function NotificationBadge() {
  const router = useRouter()
  const { user } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)
  const [showBadge, setShowBadge] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    // Only show notifications if user is logged in
    if (user) {
      // Simulate getting notifications
      setUnreadCount(3)
      setShowBadge(true)

      // Show notification preview after a delay
      const timer = setTimeout(() => {
        setShowPreview(true)
      }, 3000)

      // Hide notification preview after some time
      const hideTimer = setTimeout(() => {
        setShowPreview(false)
      }, 8000)

      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    } else {
      // Reset state if user is not logged in
      setUnreadCount(0)
      setShowBadge(false)
      setShowPreview(false)
    }
  }, [user])

  // Don't render anything if user is not logged in
  if (!user) {
    return null
  }

  const handleViewAll = () => {
    setShowPreview(false)
    router.push("/dashboard/notifications")
  }

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 max-w-xs border border-gray-200"
          >
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3 flex-shrink-0">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm">New Notifications</h4>
                <p className="text-gray-600 text-sm mt-1">You have {unreadCount} unread notifications</p>
                <button className="text-primary text-sm font-medium mt-2 inline-block" onClick={handleViewAll}>
                  View all
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bg-primary text-white p-3 rounded-full shadow-lg relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/dashboard/notifications")}
      >
        <Bell className="h-6 w-6" />
        <AnimatePresence>
          {showBadge && unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, X, Calendar, PenToolIcon as Tool, Star, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"

export default function Notifications() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef(null)

  // Sample notification data
  const sampleNotifications = [
    {
      id: 1,
      type: "booking",
      title: "Booking Confirmed",
      message: "Your plumbing service has been confirmed for tomorrow at 10:00 AM.",
      time: "2 hours ago",
      read: false,
      link: "/dashboard/bookings",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: 2,
      type: "service",
      title: "Service Completed",
      message: "Your electrical repair service has been marked as completed. Please leave a review.",
      time: "Yesterday",
      read: false,
      link: "/dashboard/reviews",
      icon: <Tool className="h-5 w-5" />,
    },
    {
      id: 3,
      type: "review",
      title: "New Review",
      message: "A service provider has responded to your review.",
      time: "3 days ago",
      read: true,
      link: "/dashboard/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      id: 4,
      type: "message",
      title: "New Message",
      message: "You have a new message from Sharma Plumbing Solutions.",
      time: "1 week ago",
      read: true,
      link: "/dashboard/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: 5,
      type: "reminder",
      title: "Upcoming Service",
      message: "Reminder: You have a house cleaning service scheduled for tomorrow.",
      time: "Just now",
      read: false,
      link: "/dashboard/bookings",
      icon: <Clock className="h-5 w-5" />,
    },
  ]

  // Initialize notifications only if user is logged in
  useEffect(() => {
    if (user) {
      setNotifications(sampleNotifications)
      setUnreadCount(sampleNotifications.filter((n) => !n.read).length)
    } else {
      setNotifications([])
      setUnreadCount(0)
    }
  }, [user])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)

    // If opening the dropdown, add a slight delay before marking as read
    if (!isOpen && user) {
      setTimeout(() => {
        markAllAsRead()
      }, 3000)
    }
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotifications(updatedNotifications)
    setUnreadCount(0)
  }

  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id)
    setNotifications(updatedNotifications)
    setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
  }

  // Get background color based on notification type
  const getTypeColor = (type) => {
    switch (type) {
      case "booking":
        return "bg-blue-100 text-blue-600"
      case "service":
        return "bg-green-100 text-green-600"
      case "review":
        return "bg-yellow-100 text-yellow-600"
      case "message":
        return "bg-purple-100 text-purple-600"
      case "reminder":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // If user is not logged in, just show the bell icon without notifications
  if (!user) {
    return (
      <Link href="/login" className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
        <Bell className="h-5 w-5" />
      </Link>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors relative"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-card rounded-md shadow-lg py-1 z-50 border border-border max-h-[70vh] overflow-y-auto"
          >
            <div className="px-4 py-2 border-b border-border flex justify-between items-center">
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-primary hover:text-primary-dark">
                  Mark all as read
                </button>
              )}
            </div>

            {notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-4 py-3 border-b border-border last:border-b-0 relative ${!notification.read ? "bg-primary/5" : ""}`}
                  >
                    <Link href={notification.link} onClick={() => setIsOpen(false)}>
                      <div className="flex">
                        <div className={`${getTypeColor(notification.type)} p-2 rounded-full mr-3 flex-shrink-0`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1 pr-6">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                      aria-label="Remove notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {!notification.read && (
                      <span className="absolute top-3 right-10 h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                <div className="flex justify-center mb-2">
                  <Bell className="h-8 w-8 text-gray-300" />
                </div>
                <p>No notifications</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


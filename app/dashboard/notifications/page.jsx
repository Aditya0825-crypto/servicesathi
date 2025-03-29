"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DashboardSidebar from "@/components/DashboardSidebar"
import { Calendar, PenToolIcon as Tool, Star, MessageSquare, Clock, X, ArrowLeft, Bell } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function NotificationsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])

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

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/login")
      return
    }

    setNotifications(sampleNotifications)
  }, [user, router])

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
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

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 hidden md:block">
            <DashboardSidebar />
          </div>
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Link href="/dashboard" className="md:hidden mr-2">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  <h1 className="text-2xl font-bold">Notifications</h1>
                </div>
                {notifications.some((n) => !n.read) && (
                  <button onClick={markAllAsRead} className="text-sm text-primary hover:text-primary-dark">
                    Mark all as read
                  </button>
                )}
              </div>

              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg relative ${!notification.read ? "bg-primary/5 border-primary/20" : "border-gray-200"}`}
                    >
                      <Link href={notification.link}>
                        <div className="flex">
                          <div className={`${getTypeColor(notification.type)} p-3 rounded-full mr-4 flex-shrink-0`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 pr-8">
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-gray-400 text-sm mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        aria-label="Remove notification"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      {!notification.read && (
                        <span className="absolute top-4 right-12 h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-gray-500">You don't have any notifications at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import ServiceIcon from "./ServiceIcons"
import UserDashboard from "@/components/UserDashboard"


export default function DashboardOverview() {
  const [recentBookings, setRecentBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.bookings && user.bookings.length > 0) {
      // Get the most recent 3 bookings and ensure dates are formatted
      const formattedBookings = user.bookings.slice(0, 3).map((booking) => ({
        ...booking,
        formattedDate: booking.date instanceof Date ? formatDate(booking.date) : booking.date,
      }))

      setRecentBookings(formattedBookings)
      setIsLoading(false)
    } else {
      // Simulate API call
      setTimeout(() => {
        const mockBookings = [
          {
            id: "booking-1",
            serviceTitle: "Plumbing Repair",
            providerName: "Sharma Plumbing Solutions",
            category: "plumbing",
            date: new Date(Date.now() + 86400000 * 2), // 2 days from now
            formattedDate: formatDate(new Date(Date.now() + 86400000 * 2)),
            time: "10:00 AM",
            status: "confirmed",
            location: "Home",
            price: "₹800",
          },
          {
            id: "booking-2",
            serviceTitle: "Deep House Cleaning",
            providerName: "Swachh Home Cleaners",
            category: "cleaning",
            date: new Date(Date.now() - 86400000 * 3), // 3 days ago
            formattedDate: formatDate(new Date(Date.now() - 86400000 * 3)),
            time: "09:30 AM",
            status: "completed",
            location: "Home",
            price: "₹1,200",
          },
        ]

        setRecentBookings(mockBookings)
        setIsLoading(false)
      }, 1000)
    }
  }, [user])

  // Format date to string
  const formatDate = (date) => {
    if (!date) return ""

    // Check if date is a Date object
    if (date instanceof Date) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }

    // If it's already a string, return it
    return date
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Confirmed</span>
      case "pending":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
      case "completed":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Completed</span>
      case "cancelled":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Cancelled</span>
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700 mb-1">Total Bookings</h3>
            <p className="text-2xl font-bold">{user?.bookings?.length || 0}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-700 mb-1">Completed</h3>
            <p className="text-2xl font-bold">{user?.bookings?.filter((b) => b.status === "completed").length || 0}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-700 mb-1">Upcoming</h3>
            <p className="text-2xl font-bold">
              {user?.bookings?.filter((b) => b.status === "confirmed" || b.status === "pending").length || 0}
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-3">Recent Bookings</h2>

        {recentBookings.length > 0 ? (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="mr-3">
                    <ServiceIcon category={booking.category} size="md" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{booking.serviceTitle}</h4>
                        <p className="text-sm text-gray-600">{booking.providerName}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500">
                      <div className="flex items-center mr-4 mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{booking.formattedDate || formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center mr-4 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center mr-4 mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="font-medium">{booking.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <Link
                href="/dashboard/bookings"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                View All Bookings
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">You don't have any bookings yet</p>
            <Link href="/services" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              Browse Services
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}


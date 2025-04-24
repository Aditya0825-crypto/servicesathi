"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import ServiceIcon from "./ServiceIcons"

export default function UserBookings() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return

      try {
        const res = await fetch(`/api/bookings?userId=${user.id}`)
        const data = await res.json()

        if (res.ok) {
          const formatted = data.bookings.map((booking) => ({
            ...booking,
            formattedDate: new Date(booking.date).toLocaleDateString("en-IN"),
            status: booking.status?.toLowerCase() || "pending",
            serviceTitle: booking.serviceDetails?.title || "Service",
            providerName: booking.serviceDetails?.provider || "Provider",
            price: booking.serviceDetails?.price || "₹800",
            category: booking.serviceDetails?.category || "other",
            location: booking.address || "Unknown",
          }))

          setBookings(formatted)
        } else {
          console.error("Error fetching bookings:", data.error)
        }
      } catch (error) {
        console.error("❌ API Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [user])

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

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") {
      return booking.status === "confirmed" || booking.status === "pending"
    } else if (activeTab === "completed") {
      return booking.status === "completed"
    } else if (activeTab === "cancelled") {
      return booking.status === "cancelled"
    }
    return true
  })

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please log in to view your bookings.</p>
        <Link href="/login" className="px-6 py-2 bg-primary text-white rounded-md">
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {["upcoming", "completed", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 font-medium ${
              activeTab === tab ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No {activeTab} bookings found.</div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <ServiceIcon category={booking.category} />
                  </div>
                  <div>
                    <h3 className="font-bold">{booking.serviceTitle}</h3>
                    <p className="text-sm text-gray-500">{booking.providerName}</p>
                  </div>
                </div>
                {getStatusBadge(booking.status)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {booking.formattedDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {booking.time || "Flexible"}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {booking.location}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">{booking.price}</span>
                <Link
                  href={`/bookings/${booking.id}`}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


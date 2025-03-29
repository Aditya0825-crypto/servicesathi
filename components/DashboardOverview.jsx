"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, AlertCircle, Trash2, Search } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function DashboardOverview() {
  const { user, deleteBooking } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState(null)
  const [isCancelling, setIsCancelling] = useState(false)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Filter bookings based on search term
  const filteredBookings =
    user?.bookings?.filter(
      (booking) =>
        booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.providerName.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  // Sort bookings by date (newest first)
  const sortedBookings = [...filteredBookings].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Get upcoming bookings
  const upcomingBookings = sortedBookings.filter(
    (booking) => new Date(booking.date) > new Date() && booking.status !== "CANCELLED",
  )

  // Get completed bookings
  const completedBookings = sortedBookings.filter((booking) => booking.status === "COMPLETED")

  // Calculate total spent
  const totalSpent = completedBookings.reduce((total, booking) => {
    // Extract numeric value from price string (e.g., "₹300-500/hr" -> 400)
    const priceMatch = booking.price?.match(/₹(\d+)-(\d+)/)
    if (priceMatch) {
      // Use average of price range
      const avgPrice = (Number.parseInt(priceMatch[1]) + Number.parseInt(priceMatch[2])) / 2
      return total + avgPrice
    }
    return total
  }, 0)

  // Handle cancel booking
  const handleCancelBooking = (booking) => {
    setBookingToCancel(booking)
    setShowCancelModal(true)
  }

  // Confirm cancel booking
  const confirmCancelBooking = async () => {
    if (!bookingToCancel) return

    setIsCancelling(true)

    try {
      const result = await deleteBooking(bookingToCancel.id)

      if (result.success) {
        setShowCancelModal(false)
        setBookingToCancel(null)
      } else {
        setError(result.error || "Failed to cancel booking")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsCancelling(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to ServiceSarthi</h1>
        <p className="mb-4">Please sign in to view your dashboard.</p>
        <Link
          href="/login"
          className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors inline-block"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold mr-4">
            {user.image ? (
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-1">Upcoming Bookings</h3>
            <p className="text-3xl font-bold text-primary">{upcomingBookings.length}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-1">Completed Services</h3>
            <p className="text-3xl font-bold text-primary">{completedBookings.length}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-1">Total Spent</h3>
            <p className="text-3xl font-bold text-primary">
              {completedBookings.length > 0 ? `₹${Math.round(totalSpent)}` : "₹0"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Bookings</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : sortedBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
            <Link
              href="/services"
              className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0">
                      <img
                        src={booking.serviceImage || "/placeholder.svg?height=100&width=100"}
                        alt={booking.serviceName || "Service"}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{booking.serviceName || "Service"}</h3>
                      <p className="text-gray-600 text-sm">{booking.providerName || "Provider"}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(booking.date)}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {booking.time}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.address}, {booking.city}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-col items-end">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : booking.status === "CONFIRMED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                    </div>

                    <div className="text-gray-900 font-medium mt-2">{booking.price}</div>

                    <div className="flex mt-2">
                      {new Date(booking.date) > new Date() && booking.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleCancelBooking(booking)}
                          className="text-red-600 hover:text-red-800 flex items-center text-sm"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Cancel Booking</h3>
            <p className="mb-6">
              Are you sure you want to cancel your booking for {bookingToCancel?.serviceName} on{" "}
              {formatDate(bookingToCancel?.date)} at {bookingToCancel?.time}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                disabled={isCancelling}
              >
                No, Keep It
              </button>
              <button
                onClick={confirmCancelBooking}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors flex items-center"
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


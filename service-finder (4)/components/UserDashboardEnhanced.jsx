"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  AlertCircle,
  CreditCard,
  BarChart2,
  TrendingUp,
  Users,
} from "lucide-react"
import ServiceIcon from "./ServiceIcons"

export default function UserDashboardEnhanced() {
  const [activeTab, setActiveTab] = useState("overview")
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedServices: 0,
    upcomingServices: 0,
    favoriteProviders: 0,
    totalSpent: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBookings = [
        {
          id: "booking-1",
          serviceTitle: "Plumbing Repair",
          providerName: "Sharma Plumbing Solutions",
          category: "plumbing",
          date: new Date(Date.now() + 86400000 * 2), // 2 days from now
          time: "10:00 AM",
          status: "confirmed",
          location: "Home",
          price: "₹800",
          rating: null,
        },
        {
          id: "booking-2",
          serviceTitle: "Deep House Cleaning",
          providerName: "Swachh Home Cleaners",
          category: "cleaning",
          date: new Date(Date.now() - 86400000 * 3), // 3 days ago
          time: "09:30 AM",
          status: "completed",
          location: "Home",
          price: "₹1,200",
          rating: 4.5,
        },
        {
          id: "booking-3",
          serviceTitle: "Electrical Wiring",
          providerName: "Patel Electrical Services",
          category: "electrical",
          date: new Date(Date.now() + 86400000 * 5), // 5 days from now
          time: "02:00 PM",
          status: "pending",
          location: "Office",
          price: "₹1,500",
          rating: null,
        },
      ]

      setBookings(mockBookings)

      // Calculate stats
      const completed = mockBookings.filter((b) => b.status === "completed").length
      const upcoming = mockBookings.filter((b) => b.status !== "completed" && b.status !== "cancelled").length

      setStats({
        totalBookings: mockBookings.length,
        completedServices: completed,
        upcomingServices: upcoming,
        favoriteProviders: 2,
        totalSpent: "₹3,500",
      })

      setIsLoading(false)
    }, 1000)
  }, [])

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview()
      case "bookings":
        return renderBookings()
      case "favorites":
        return renderFavorites()
      case "payments":
        return renderPayments()
      default:
        return renderOverview()
    }
  }

  const renderOverview = () => {
    if (isLoading) {
      return (
        <div className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      )
    }

    return (
      <div>
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Services</p>
                <p className="text-2xl font-bold">{stats.completedServices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full mr-3">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Services</p>
                <p className="text-2xl font-bold">{stats.upcomingServices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full mr-3">
                <CreditCard className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold">{stats.totalSpent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent bookings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold">Recent Bookings</h3>
            <Link href="#" onClick={() => setActiveTab("bookings")} className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>

          <div>
            {bookings.length > 0 ? (
              <div>
                {bookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="p-4 border-b border-gray-100 last:border-0">
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

                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="mr-3">
                            {booking.date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">You don't have any bookings yet</p>
                <Link href="/services" className="mt-3 inline-block px-4 py-2 bg-primary text-white rounded-md text-sm">
                  Browse Services
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Activity and trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold">Your Activity</h3>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BarChart2 className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium">Service Usage</span>
              </div>
              <div className="text-sm text-gray-500">Last 6 months</div>
            </div>

            {/* Simple activity chart */}
            <div className="h-40 flex items-end space-x-2">
              {[15, 30, 20, 45, 25, 60].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-primary rounded-t-sm" style={{ height: `${height}%` }}></div>
                  <div className="text-xs text-gray-500 mt-1">{["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <div className="flex items-center text-gray-500 mb-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">Most Used Service</span>
                </div>
                <p className="font-medium">House Cleaning</p>
              </div>

              <div className="border rounded-md p-3">
                <div className="flex items-center text-gray-500 mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">Favorite Provider</span>
                </div>
                <p className="font-medium">Swachh Home Cleaners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderBookings = () => {
    if (isLoading) {
      return (
        <div className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold">All Bookings</h3>
        </div>

        {bookings.length > 0 ? (
          <div>
            {bookings.map((booking) => (
              <div key={booking.id} className="p-4 border-b border-gray-100 last:border-0">
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
                        <span>
                          {booking.date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
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

                    {booking.status === "completed" && (
                      <div className="mt-3 flex items-center">
                        <div className="flex items-center mr-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{booking.rating}</span>
                        </div>
                        <button className="text-primary text-sm hover:underline">
                          {booking.rating ? "Edit Review" : "Leave Review"}
                        </button>
                      </div>
                    )}

                    <div className="mt-3 flex space-x-2">
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                      >
                        View Details
                      </Link>

                      {booking.status !== "completed" && booking.status !== "cancelled" && (
                        <button className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm">
                          Cancel
                        </button>
                      )}

                      {booking.status === "completed" && !booking.rating && (
                        <button className="px-3 py-1 bg-primary text-white hover:bg-primary/90 rounded-md text-sm">
                          Rate Service
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">You don't have any bookings yet</p>
            <Link href="/services" className="mt-3 inline-block px-4 py-2 bg-primary text-white rounded-md text-sm">
              Browse Services
            </Link>
          </div>
        )}
      </div>
    )
  }

  const renderFavorites = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold">Favorite Providers</h3>
        </div>

        <div className="p-8 text-center">
          <p className="text-gray-500">Your favorite providers will appear here</p>
          <Link href="/providers" className="mt-3 inline-block px-4 py-2 bg-primary text-white rounded-md text-sm">
            Browse Providers
          </Link>
        </div>
      </div>
    )
  }

  const renderPayments = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold">Payment History</h3>
        </div>

        <div className="p-8 text-center">
          <p className="text-gray-500">Your payment history will appear here</p>
          <Link
            href="/profile/payment-methods"
            className="mt-3 inline-block px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            Manage Payment Methods
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Dashboard tabs */}
      <div className="mb-6 border-b">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === "overview" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === "bookings" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === "favorites" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === "payments" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Payments
          </button>
        </div>
      </div>

      {/* Tab content */}
      {renderTabContent()}

      {/* Custom CSS for hiding scrollbar but allowing scroll */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  )
}


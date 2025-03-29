"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DashboardSidebar from "@/components/DashboardSidebar"
import { useAuth } from "@/lib/auth-context"
import { Briefcase, Users, Star, Calendar, TrendingUp } from "lucide-react"

export default function ProviderDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect if user is not a provider
  useEffect(() => {
    if (!loading && user && user.role !== "PROVIDER") {
      router.push("/dashboard")
    }
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== "PROVIDER") {
    return null // Will redirect in useEffect
  }

  // Mock data for provider dashboard
  const stats = [
    { label: "Total Services", value: 8, icon: <Briefcase className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
    {
      label: "Active Bookings",
      value: 12,
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Customers",
      value: 45,
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Average Rating",
      value: "4.8",
      icon: <Star className="h-6 w-6" />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ]

  const recentBookings = [
    {
      id: "booking1",
      customer: "Rajesh Kumar",
      service: "Plumbing Repair",
      date: "2023-04-15",
      time: "10:00 AM",
      status: "COMPLETED",
      amount: "₹850",
    },
    {
      id: "booking2",
      customer: "Priya Sharma",
      service: "Pipe Installation",
      date: "2023-04-18",
      time: "2:30 PM",
      status: "CONFIRMED",
      amount: "₹1,200",
    },
    {
      id: "booking3",
      customer: "Amit Patel",
      service: "Drain Cleaning",
      date: "2023-04-20",
      time: "11:00 AM",
      status: "PENDING",
      amount: "₹600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <DashboardSidebar />
          </div>
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-4 ${stat.color}`}>{stat.icon}</div>
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Bookings</h2>
                <button className="text-primary hover:text-primary-dark text-sm font-medium">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{booking.customer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{booking.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{booking.date}</div>
                          <div className="text-gray-500 text-sm">{booking.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "CONFIRMED"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Performance Overview</h2>
                <div className="flex space-x-2">
                  <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Performance chart will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


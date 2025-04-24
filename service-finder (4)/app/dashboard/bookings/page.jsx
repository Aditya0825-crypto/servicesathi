"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DashboardSidebar from "@/components/DashboardSidebar"
import UserBookings from "@/components/UserBookings"

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <DashboardSidebar />
          </div>
          <div className="md:w-3/4">
            <UserBookings />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


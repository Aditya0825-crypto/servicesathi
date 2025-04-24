"use client"

import { useEffect, useState } from "react"
import DashboardSidebar from "./DashboardSidebar"
import DashboardOverview from "./DashboardOverview"
import UserBookings from "./UserBookings"
import UserProfile from "./UserProfile"
import UserReviews from "./UserReviews"
import { useAuth } from "@/lib/auth-context"

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please Log In</h2>
        <p>You must be logged in to view your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="flex">
      <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-6">
        {activeSection === "overview" && <DashboardOverview />}
        {activeSection === "bookings" && <UserBookings />}
        {activeSection === "profile" && <UserProfile />}
        {activeSection === "reviews" && <UserReviews />}
      </main>
    </div>
  )
}

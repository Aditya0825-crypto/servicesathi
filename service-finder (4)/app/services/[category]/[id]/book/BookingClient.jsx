"use client"

import BookingForm from "@/components/BookingForm"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function BookingClient({ service }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Book: {service.title}</h1>
        <BookingForm service={service} />
      </main>
      <Footer />
    </div>
  )
}

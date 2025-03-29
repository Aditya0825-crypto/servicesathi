"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function BookingSuccess({ booking }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay the animation slightly for better effect
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your appointment has been successfully scheduled for {formatDate(booking?.date)} at {booking?.time}.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gray-50 p-6 rounded-lg mb-6 max-w-md mx-auto"
      >
        <h3 className="font-bold mb-4 text-left">Booking Details</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">{formatDate(booking?.date)}</p>
              <p className="text-gray-500 text-sm">{booking?.time}</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">{booking?.address}</p>
              <p className="text-gray-500 text-sm">
                {booking?.city}, {booking?.zipCode}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">{booking?.serviceName}</p>
              <p className="text-gray-500 text-sm">{booking?.providerName}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          View My Bookings
        </Link>
        <Link
          href="/"
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  )
}


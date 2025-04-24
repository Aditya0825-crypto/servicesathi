"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

const availableTimes = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"]

export default function BookingForm({ service }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    city: "Pune",
    zipCode: "",
    serviceDetails: "",
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep = () => {
    const errors = {}
    const today = new Date()
    const selectedDate = new Date(formData.date)

    if (step === 1) {
      if (!formData.date) {
        errors.date = "Date is required"
      } else if (selectedDate.toDateString() === today.toDateString()) {
        const [hour, minutePart] = formData.time?.split(":") || []
        const [minute, modifier] = minutePart?.split(" ") || []
        let hours = parseInt(hour)
        const minutes = parseInt(minute)

        if (modifier === "PM" && hours < 12) hours += 12
        if (modifier === "AM" && hours === 12) hours = 0

        const bookingTime = new Date(selectedDate)
        bookingTime.setHours(hours)
        bookingTime.setMinutes(minutes)

        if (!formData.time) {
          errors.time = "Time is required"
        } else if (bookingTime < new Date()) {
          errors.time = "Time must be in the future"
        }
      } else if (selectedDate < today.setHours(0, 0, 0, 0)) {
        errors.date = "Date must be in the future"
      }

      if (!formData.time) {
        errors.time = "Time is required"
      }
    }

    if (step === 2) {
      if (!formData.address) errors.address = "Address is required"
      if (!formData.zipCode || !/^[0-9]{5,6}$/.test(formData.zipCode)) errors.zipCode = "Valid ZIP code is required"
      if (!formData.name) errors.name = "Name is required"
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required"
      if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) errors.phone = "Valid 10-digit phone is required"
    }

    if (step === 3) {
      if (!formData.paymentMethod) errors.paymentMethod = "Please select a payment method"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!service?.id || !service?.title) {
      setError("Service information is missing. Please refresh the page.")
      setIsSubmitting(false)
      return
    }

    if (!validateStep()) {
      setIsSubmitting(false)
      return
    }

    try {
      const bookingData = {
        ...formData,
        userId: user?.id,
        serviceId: service.id,
        status: "pending",
        serviceDetails: {
          title: service.title,
          provider: service.provider,
          price: service.price,
          category: service.category
        }
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Booking failed")
      }

      setSuccess(true)
    } catch (err) {
      console.error("❌ Booking error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-4">
          Your appointment is scheduled for {formData.date} at {formData.time}.
        </p>
        <p className="text-gray-600 mb-6">
          A confirmation email has been sent to {formData.email}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Return Home
          </Link>
          <Link href="/dashboard/bookings" className="px-6 py-2 border text-gray-700 rounded-md hover:bg-gray-100">
            View My Bookings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 max-w-2xl mx-auto mt-6">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 text-center font-medium ${step === s ? "text-primary" : "text-gray-400"}`}>
              Step {s}
            </div>
          ))}
        </div>

        {/* Step 1: Schedule */}
        {step === 1 && (
          <>
            <h3 className="text-xl font-bold mb-4">Schedule Your Appointment</h3>
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border rounded-md"
              />
              {fieldErrors.date && <p className="text-sm text-red-500 mt-1">{fieldErrors.date}</p>}
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <label
                    key={time}
                    className={`px-4 py-2 border rounded-md text-center cursor-pointer ${
                      formData.time === time ? "bg-primary text-white" : "hover:border-primary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={time}
                      onChange={handleChange}
                      checked={formData.time === time}
                      className="sr-only"
                    />
                    {time}
                  </label>
                ))}
              </div>
              {fieldErrors.time && <p className="text-sm text-red-500 mt-1">{fieldErrors.time}</p>}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 2: Address & Contact */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-bold mb-4">Service Details</h3>
            <div className="mb-4">
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              {fieldErrors.address && <p className="text-sm text-red-500 mt-1">{fieldErrors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <select name="city" value={formData.city} onChange={handleChange} className="border rounded-md p-2">
                <option>Pune</option>
                <option>Pimpri-Chinchwad</option>
                <option>Kothrud</option>
                <option>Hinjewadi</option>
              </select>
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              {fieldErrors.zipCode && <p className="text-sm text-red-500 mt-1 col-span-2">{fieldErrors.zipCode}</p>}
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Details</label>
              <textarea
                name="serviceDetails"
                value={formData.serviceDetails}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-md"
              ></textarea>
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mb-2 border rounded-md"
              />
              {fieldErrors.name && <p className="text-sm text-red-500 mt-1">{fieldErrors.name}</p>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mb-2 border rounded-md"
              />
              {fieldErrors.email && <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              {fieldErrors.phone && <p className="text-sm text-red-500 mt-1">{fieldErrors.phone}</p>}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <>
            <h3 className="text-xl font-bold mb-4">Payment Method</h3>
            <div className="mb-4 space-y-2">
              {fieldErrors.paymentMethod && <p className="text-sm text-red-500 mb-2">{fieldErrors.paymentMethod}</p>}
              {["credit-card", "upi", "cash"].map((method) => (
                <label key={method} className="flex items-center border p-3 rounded-md cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {method === "credit-card" && "Credit/Debit Card"}
                  {method === "upi" && "UPI Payment"}
                  {method === "cash" && "Cash on Service"}
                </label>
              ))}
            </div>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-70"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
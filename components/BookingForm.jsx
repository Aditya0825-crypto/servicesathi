"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function BookingForm({ id, category }) {
  const router = useRouter()
  const { user, updateUserBookings } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    city: "Pune", // Default to Pune
    zipCode: "",
    serviceDetails: "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    paymentMethod: "credit-card",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState("")

  // This would normally come from an API or database
  const service = {
    id: id,
    category: category,
    title:
      category === "plumbing"
        ? "Professional Plumbing Services"
        : category === "electrical"
          ? "Expert Electrical Services"
          : category === "cleaning"
            ? "Home Cleaning Services"
            : "Professional Services",
    provider: "Pune Professional Services",
    image: "/placeholder.svg?height=100&width=100",
    price: "₹300-500/hr",
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user) {
      setError("Please log in to book a service")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      try {
        const newBooking = {
          id: `booking-${Date.now()}`,
          serviceId: id,
          serviceName: service.title,
          serviceImage: service.image,
          providerName: service.provider,
          date: new Date(formData.date),
          time: formData.time,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          status: "CONFIRMED",
          price: service.price,
          createdAt: new Date(),
        }

        // Update user's bookings in context
        updateUserBookings(newBooking)

        setIsSubmitting(false)
        setIsComplete(true)
      } catch (error) {
        console.error("Booking error:", error)
        setError("Failed to create booking. Please try again.")
        setIsSubmitting(false)
      }
    }, 1500)
  }

  const nextStep = () => {
    // Validate current step
    if (step === 1 && (!formData.date || !formData.time)) {
      setError("Please select a date and time")
      return
    }

    if (step === 2 && (!formData.address || !formData.city || !formData.zipCode)) {
      setError("Please fill in all address fields")
      return
    }

    setError("")
    setStep(step + 1)
  }

  const prevStep = () => {
    setError("")
    setStep(step - 1)
  }

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to book a service. Create an account to enjoy seamless booking experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!isComplete ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="font-bold text-lg">{service.title}</h2>
                <p className="text-gray-600">{service.provider}</p>
                <p className="text-gray-900 font-medium">{service.price}</p>
              </div>
            </div>

            <div className="flex mb-8">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  1
                </div>
                <div className="text-xs mt-1">Schedule</div>
              </div>
              <div className={`flex-1 h-0.5 self-center ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  2
                </div>
                <div className="text-xs mt-1">Details</div>
              </div>
              <div className={`flex-1 h-0.5 self-center ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  3
                </div>
                <div className="text-xs mt-1">Payment</div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Schedule Your Appointment</h3>

                  <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                      Select a Date
                    </label>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Select a Time</label>
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">Available Times</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {availableTimes.map((time) => (
                        <label
                          key={time}
                          className={`px-4 py-2 border rounded-md text-center cursor-pointer transition-colors ${
                            formData.time === time
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 hover:border-primary"
                          }`}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={time}
                            checked={formData.time === time}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Service Details</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Service Location</label>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">Address in Pune</span>
                    </div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Pune">Pune</option>
                        <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
                        <option value="Kothrud">Kothrud</option>
                        <option value="Hinjewadi">Hinjewadi</option>
                        <option value="Baner">Baner</option>
                        <option value="Viman Nagar">Viman Nagar</option>
                        <option value="Kharadi">Kharadi</option>
                      </select>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Pin Code"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="serviceDetails" className="block text-gray-700 font-medium mb-2">
                      Describe Your Service Needs
                    </label>
                    <textarea
                      id="serviceDetails"
                      name="serviceDetails"
                      rows="4"
                      placeholder="Please provide details about the service you need..."
                      value={formData.serviceDetails}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Your Contact Information</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Payment Information</h3>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Select Payment Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:border-primary">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === "credit-card"}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <CreditCard className="h-5 w-5 text-gray-500 mx-2" />
                        <span>Credit or Debit Card</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:border-primary">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === "upi"}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="mx-2 font-bold text-primary">UPI</span>
                        <span>Payment</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:border-primary">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="mx-2">Pay in Cash</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h4 className="font-bold mb-2">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span>{service.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Provider:</span>
                        <span>{service.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span>{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span>
                          {formData.address}, {formData.city}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Estimated Price:</span>
                          <span>{service.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Final price will be determined after service completion based on time and materials.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
                    >
                      {isSubmitting ? (
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
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully scheduled for {formData.date} at {formData.time}.
          </p>
          <p className="text-gray-600 mb-6">
            A confirmation email has been sent to {formData.email} with all the details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}


"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

const categories = [
  "plumbing",
  "electrical",
  "cleaning",
  "painting",
  "carpentry",
  "appliance-repair",
  "pest-control",
  "gardening",
  "moving",
  "other"
]

export default function AddServiceForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "plumbing",
    price: "",
    provider: "",
    city: "Pune",
    availability: "all",
    phone: "",
    email: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { user } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const serviceData = {
        ...formData,
        providerId: user?.id,
        status: "active"
      }

      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to add service")
      }

      router.push("/dashboard/services")
      router.refresh()
    } catch (err) {
      console.error("❌ Error adding service:", err)
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Please login to add services.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Service</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Service Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
            placeholder="e.g. Professional Plumbing Service"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Describe your service..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="e.g. ₹500-1000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Provider/Business Name</label>
          <input
            type="text"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Your business name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="Pune">Pune</option>
              <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
              <option value="Kothrud">Kothrud</option>
              <option value="Hinjewadi">Hinjewadi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="all">All Days</option>
              <option value="weekdays">Weekdays Only</option>
              <option value="weekends">Weekends Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your contact number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your email address"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Service"}
        </button>
      </div>
    </form>
  )
} 
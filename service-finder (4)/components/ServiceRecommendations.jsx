"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ThumbsUp, Star, MapPin, ArrowRight } from "lucide-react"
import ServiceIcon from "./ServiceIcons"

export default function ServiceRecommendations() {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userPreferences, setUserPreferences] = useState({
    location: "Pune",
    budget: "medium", // low, medium, high
    urgency: "normal", // urgent, normal, flexible
    quality: "high", // standard, high, premium
  })

  // Mock data - in a real app, this would come from an API based on user behavior
  useEffect(() => {
    // Simulate API call with delay
    const timer = setTimeout(() => {
      // Generate recommendations based on user preferences
      const mockRecommendations = generateRecommendations(userPreferences)
      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [userPreferences])

  // Function to generate recommendations based on preferences
  const generateRecommendations = (prefs) => {
    // This would be replaced with actual recommendation logic or API call
    const allServices = [
      {
        id: "rec-1",
        title: "Premium Plumbing Service",
        provider: "Sharma Plumbing Solutions",
        category: "plumbing",
        rating: 4.8,
        reviews: 127,
        price: "₹400/hr",
        location: "Kothrud, Pune",
        match: 95,
        tags: ["premium", "emergency", "high-quality"],
        href: "/services/plumbing/rec-1",
      },
      {
        id: "rec-2",
        title: "Expert Electrical Repairs",
        provider: "Patel Electrical Services",
        category: "electrical",
        rating: 4.7,
        reviews: 94,
        price: "₹350/hr",
        location: "Baner, Pune",
        match: 92,
        tags: ["high-quality", "reliable", "same-day"],
        href: "/services/electrical/rec-2",
      },
      {
        id: "rec-3",
        title: "Professional House Cleaning",
        provider: "Swachh Home Cleaners",
        category: "cleaning",
        rating: 4.9,
        reviews: 156,
        price: "₹300/hr",
        location: "Viman Nagar, Pune",
        match: 88,
        tags: ["thorough", "eco-friendly", "flexible"],
        href: "/services/cleaning/rec-3",
      },
      {
        id: "rec-4",
        title: "Custom Carpentry Solutions",
        provider: "Singh Furniture Works",
        category: "carpentry",
        rating: 4.6,
        reviews: 83,
        price: "₹450/hr",
        location: "Hinjewadi, Pune",
        match: 85,
        tags: ["custom", "premium", "high-quality"],
        href: "/services/carpentry/rec-4",
      },
    ]

    // Filter based on preferences (simplified example)
    const filtered = [...allServices]

    // Sort by match percentage (in a real app, this would be calculated)
    return filtered.sort((a, b) => b.match - a.match)
  }

  const updatePreferences = (key, value) => {
    setIsLoading(true)
    setUserPreferences({
      ...userPreferences,
      [key]: value,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Recommended for You</h2>
        <p className="text-gray-600 text-sm">Personalized service recommendations based on your preferences</p>
      </div>

      {/* Preference controls */}
      <div className="p-4 border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={userPreferences.location}
              onChange={(e) => updatePreferences("location", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Pune">Pune</option>
              <option value="Kothrud">Kothrud</option>
              <option value="Baner">Baner</option>
              <option value="Hinjewadi">Hinjewadi</option>
              <option value="Viman Nagar">Viman Nagar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <select
              value={userPreferences.budget}
              onChange={(e) => updatePreferences("budget", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="low">Economy</option>
              <option value="medium">Standard</option>
              <option value="high">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
            <select
              value={userPreferences.urgency}
              onChange={(e) => updatePreferences("urgency", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="urgent">Urgent (Today)</option>
              <option value="normal">Soon (This Week)</option>
              <option value="flexible">Flexible (Anytime)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quality Preference</label>
            <select
              value={userPreferences.quality}
              onChange={(e) => updatePreferences("quality", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="standard">Standard Quality</option>
              <option value="high">High Quality</option>
              <option value="premium">Premium Service</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Finding the perfect services for you...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((service) => (
              <Link key={service.id} href={service.href} className="group">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <ServiceIcon category={service.category} size="md" />
                        <div className="ml-3">
                          <h3 className="font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                          <p className="text-sm text-gray-600">{service.provider}</p>
                        </div>
                      </div>
                      <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {service.match}% Match
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-500 mr-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{service.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{service.location}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="font-bold text-gray-900">{service.price}</div>
                      <div className="flex items-center text-primary text-sm font-medium group-hover:underline">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {service.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


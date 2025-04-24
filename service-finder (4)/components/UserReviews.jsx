"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Edit2, Trash2, AlertCircle } from "lucide-react"
import ServiceIcon from "./ServiceIcons"

export default function UserReviews() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockReviews = [
        {
          id: "review-1",
          serviceTitle: "Deep House Cleaning",
          providerName: "Swachh Home Cleaners",
          category: "cleaning",
          date: new Date(Date.now() - 86400000 * 3), // 3 days ago
          rating: 4.5,
          comment:
            "Very professional service. They did a thorough job cleaning my apartment. Will definitely use again.",
        },
        {
          id: "review-2",
          serviceTitle: "Furniture Assembly",
          providerName: "Kumar Furniture Works",
          category: "carpentry",
          date: new Date(Date.now() - 86400000 * 10), // 10 days ago
          rating: 5,
          comment:
            "Excellent service! The technician was very skilled and assembled my furniture quickly and perfectly.",
        },
      ]

      setReviews(mockReviews)
      setIsLoading(false)
    }, 1000)
  }, [])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300 fill-current" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">My Reviews</h1>
      </div>

      {/* Reviews List */}
      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-4 border-b border-gray-100 last:border-0">
              <div className="flex items-start">
                <div className="mr-3">
                  <ServiceIcon category={review.category} size="md" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{review.serviceTitle}</h4>
                      <p className="text-sm text-gray-600">{review.providerName}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center">
                    <div className="flex mr-2">{renderStars(review.rating)}</div>
                    <span className="text-sm font-medium">{review.rating}</span>
                  </div>

                  <p className="mt-2 text-gray-700">{review.comment}</p>

                  <div className="mt-3 flex space-x-2">
                    <button className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </button>
                    <button className="flex items-center px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">You haven't written any reviews yet</p>
            <Link
              href="/dashboard/bookings"
              className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              View Your Bookings
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}


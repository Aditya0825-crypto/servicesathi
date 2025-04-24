"use client"

import { useState } from "react"
import { Star, ThumbsUp, Flag } from "lucide-react"

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "2 months ago",
    comment:
      "Excellent service! Very professional and completed the work on time. Would definitely recommend to others in Pune.",
    helpful: 12,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 4,
    date: "3 months ago",
    comment:
      "Good service overall. Arrived on time and did a thorough job. The pricing was reasonable for Pune standards.",
    helpful: 8,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Amit Desai",
    rating: 5,
    date: "1 month ago",
    comment:
      "Very satisfied with the quality of work. The technician was knowledgeable and fixed our issue quickly. Will use again for sure.",
    helpful: 15,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Neha Joshi",
    rating: 4,
    date: "2 weeks ago",
    comment: "Professional service and good communication. They explained everything clearly before starting the work.",
    helpful: 6,
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

export default function ProviderReviews({ providerId }) {
  const [reviews] = useState(mockReviews)
  const [helpfulReviews, setHelpfulReviews] = useState([])

  const markHelpful = (reviewId) => {
    if (!helpfulReviews.includes(reviewId)) {
      setHelpfulReviews([...helpfulReviews, reviewId])
    }
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  // Rating distribution
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) ? "text-yellow-500 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600 mt-1">{reviews.length} reviews</div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const percentage = (ratingDistribution[rating] / reviews.length) * 100
              return (
                <div key={rating} className="flex items-center">
                  <div className="flex items-center w-20">
                    <span className="text-sm text-gray-600">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current ml-1" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="w-12 text-right text-sm text-gray-600">{ratingDistribution[rating]}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start">
              <img
                src={review.avatar || "/placeholder.svg"}
                alt={review.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-semibold">{review.name}</h4>
                  <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
                <div className="flex items-center mt-3">
                  <button
                    onClick={() => markHelpful(review.id)}
                    className={`flex items-center text-sm mr-4 ${
                      helpfulReviews.includes(review.id)
                        ? "text-primary font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({helpfulReviews.includes(review.id) ? review.helpful + 1 : review.helpful})
                  </button>
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  )
}


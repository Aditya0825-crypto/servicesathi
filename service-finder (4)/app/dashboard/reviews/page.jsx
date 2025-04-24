"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DashboardSidebar from "@/components/DashboardSidebar"
import { useAuth } from "@/lib/auth-context"
import { Star, Edit, Trash, AlertCircle } from "lucide-react"

export default function ReviewsPage() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockReviews = [
        {
          id: "review1",
          serviceTitle: "Plumbing Repair",
          providerName: "Sharma Plumbing Solutions",
          date: new Date(Date.now() - 86400000 * 15), // 15 days ago
          rating: 4,
          comment: "Great service! The plumber was professional and fixed the issue quickly.",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "review2",
          serviceTitle: "Deep House Cleaning",
          providerName: "Swachh Home Cleaners",
          date: new Date(Date.now() - 86400000 * 30), // 30 days ago
          rating: 5,
          comment: "Excellent cleaning service. My house has never been cleaner. Will definitely use again!",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "review3",
          serviceTitle: "Furniture Assembly",
          providerName: "Kumar Furniture Works",
          date: new Date(Date.now() - 86400000 * 45), // 45 days ago
          rating: 3,
          comment: "The assembly was done correctly, but they were late and left some mess behind.",
          image: "/placeholder.svg?height=100&width=100",
        },
      ]

      setReviews(mockReviews)
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatDate = (date) => {
    if (!date) return ""

    if (date instanceof Date) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }

    return date
  }

  const handleDeleteReview = (reviewId) => {
    if (confirm("Are you sure you want to delete this review?")) {
      // In a real app, you would call an API to delete the review
      setReviews(reviews.filter((review) => review.id !== reviewId))
    }
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
      ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <DashboardSidebar />
            </div>
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <DashboardSidebar />
          </div>
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold">My Reviews</h1>
              </div>

              {reviews.length > 0 ? (
                <div>
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 border-b border-gray-100 last:border-0">
                      <div className="flex">
                        <img
                          src={review.image || "/placeholder.svg"}
                          alt={review.providerName}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{review.serviceTitle}</h3>
                              <p className="text-sm text-gray-600">{review.providerName}</p>
                            </div>
                            <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                          </div>

                          <div className="flex items-center mt-2 mb-3">
                            <div className="flex mr-2">{renderStars(review.rating)}</div>
                          </div>

                          <p className="text-gray-700 mb-4">{review.comment}</p>

                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm flex items-center">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm flex items-center"
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">You haven't written any reviews yet</p>
                  <p className="text-gray-500 mb-4">
                    After completing a service, you can rate and review your experience
                  </p>
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                    Browse Services
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


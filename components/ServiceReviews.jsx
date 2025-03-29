import { Star, ThumbsUp } from "lucide-react"

export default function ServiceReviews({ id }) {
  // This would normally come from an API or database
  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent service! The plumber arrived on time, quickly diagnosed the issue with our leaky faucet, and fixed it efficiently. Very professional and knowledgeable. Would definitely hire again.",
      helpful: 12,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great service overall. Fixed our clogged drain quickly. Only giving 4 stars because the appointment was rescheduled once, but the work itself was excellent.",
      helpful: 8,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Amit Patel",
      rating: 5,
      date: "2 months ago",
      comment:
        "Excellent service! The plumber explained everything clearly and gave us options for our water heater replacement. Fair pricing and quality work. Highly recommend!",
      helpful: 15,
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  const ratingStats = {
    average: 4.8,
    total: 127,
    distribution: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">{ratingStats.average}</div>
            <div className="flex items-center text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <div className="text-gray-600">{ratingStats.total} reviews</div>
          </div>

          <div className="md:w-2/3">
            {ratingStats.distribution.map((item) => (
              <div key={item.stars} className="flex items-center mb-2">
                <div className="w-24 flex items-center text-gray-600">
                  <span>{item.stars}</span>
                  <Star className="h-4 w-4 text-yellow-500 fill-current ml-1" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <div className="w-16 text-right text-gray-600 text-sm">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex items-center">
                          <div className="flex items-center text-yellow-500 mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 my-3">{review.comment}</p>
                    <button className="flex items-center text-gray-500 text-sm hover:text-gray-700">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            View All Reviews
          </button>
        </div>
      </div>
    </div>
  )
}


import { NextResponse } from "next/server"

// Update the API route to work without Prisma
// Use mock data for preview

// Replace the GET function with a simpler version:
export async function GET(request, { params }) {
  try {
    const { id } = params

    // For preview, return mock data
    const mockProvider = {
      id: id,
      businessName: "Sharma Plumbing Solutions",
      description: "Professional plumbing services with over 15 years of experience.",
      category: "Plumbing",
      address: "123 Service Street",
      city: "Delhi NCR",
      state: "Delhi",
      zipCode: "110001",
      verified: true,
      featured: true,
      memberSince: new Date("2020-01-01"),
      completedJobs: 1240,
      createdAt: new Date(),
      user: {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+91 98765 43210",
        image: "/placeholder.svg?height=100&width=100",
      },
      services: [
        {
          id: "service1",
          title: "Basic Plumbing Service",
          description: "Includes inspection, minor repairs, and maintenance of basic plumbing systems.",
          price: "₹500-800",
          duration: "1-2 hours",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "service2",
          title: "Drain Cleaning & Unclogging",
          description: "Professional drain cleaning service to remove blockages and ensure proper water flow.",
          price: "₹600-1000",
          duration: "1-3 hours",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      _count: {
        services: 2,
        bookings: 150,
      },
    }

    const mockReviews = [
      {
        id: "review1",
        rating: 5,
        comment: "Excellent service! The plumber arrived on time and fixed the issue quickly.",
        helpful: 12,
        createdAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
        user: {
          name: "Rajesh Kumar",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "review2",
        rating: 4,
        comment: "Good service overall. Fixed our clogged drain quickly.",
        helpful: 8,
        createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
        user: {
          name: "Priya Sharma",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
    ]

    const mockRatingStats = {
      average: 4.8,
      total: 127,
      distribution: [
        { stars: 1, count: 1, percentage: 1 },
        { stars: 2, count: 1, percentage: 1 },
        { stars: 3, count: 4, percentage: 3 },
        { stars: 4, count: 13, percentage: 10 },
        { stars: 5, count: 108, percentage: 85 },
      ],
    }

    return NextResponse.json({
      provider: mockProvider,
      reviews: mockReviews,
      ratingStats: mockRatingStats,
    })
  } catch (error) {
    console.error("Error fetching provider:", error)
    return NextResponse.json({ error: "Failed to fetch provider" }, { status: 500 })
  }
}


// Mock data to replace Prisma client queries

// Mock Users
export const users = [
  {
    id: "user1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    emailVerified: new Date(),
    image: "/placeholder.svg?height=100&width=100",
    phone: "+91 98765 43210",
    role: "USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "user2",
    name: "Priya Patel",
    email: "priya@example.com",
    emailVerified: new Date(),
    image: "/placeholder.svg?height=100&width=100",
    phone: "+91 98765 43211",
    role: "PROVIDER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock Providers
export const providers = [
  {
    id: "provider1",
    userId: "user2",
    businessName: "Sharma Plumbing Solutions",
    description: "Professional plumbing services with over 15 years of experience.",
    category: "Plumbing",
    address: "123 Service Street",
    city: "Delhi NCR",
    state: "Delhi",
    zipCode: "110001",
    coverImage: "/placeholder.svg?height=400&width=1200",
    verified: true,
    featured: true,
    memberSince: new Date("2020-01-01"),
    completedJobs: 1240,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "provider2",
    userId: "user3",
    businessName: "Patel Electrical Services",
    description: "Licensed electricians providing high-quality electrical services.",
    category: "Electrical",
    address: "456 Service Avenue",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    coverImage: "/placeholder.svg?height=400&width=1200",
    verified: true,
    featured: true,
    memberSince: new Date("2019-05-15"),
    completedJobs: 980,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock Services
export const services = [
  {
    id: "service1",
    title: "Professional Plumbing Services",
    description: "Expert plumbing services for residential and commercial properties.",
    price: "₹300-500/hr",
    duration: "1-3 hours",
    image: "/placeholder.svg?height=300&width=400",
    providerId: "provider1",
    category: "Plumbing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "service2",
    title: "Expert Electrical Repairs & Installation",
    description: "Licensed electricians providing high-quality electrical services.",
    price: "₹350-600/hr",
    duration: "1-4 hours",
    image: "/placeholder.svg?height=300&width=400",
    providerId: "provider2",
    category: "Electrical",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock Bookings
export const bookings = [
  {
    id: "booking1",
    userId: "user1",
    serviceId: "service1",
    providerId: "provider1",
    date: new Date(Date.now() + 86400000 * 3), // 3 days from now
    time: "10:00 AM",
    status: "CONFIRMED",
    address: "789 Customer Lane",
    city: "Delhi",
    zipCode: "110001",
    notes: "Please bring all necessary tools.",
    createdAt: new Date(),
    updatedAt: new Date(),
    service: services.find((s) => s.id === "service1"),
    provider: {
      ...providers.find((p) => p.id === "provider1"),
      user: users.find((u) => u.id === "user2"),
    },
  },
  {
    id: "booking2",
    userId: "user1",
    serviceId: "service2",
    providerId: "provider2",
    date: new Date(Date.now() + 86400000 * 7), // 7 days from now
    time: "2:00 PM",
    status: "PENDING",
    address: "789 Customer Lane",
    city: "Delhi",
    zipCode: "110001",
    notes: "The circuit breaker keeps tripping.",
    createdAt: new Date(),
    updatedAt: new Date(),
    service: services.find((s) => s.id === "service2"),
    provider: {
      ...providers.find((p) => p.id === "provider2"),
      user: users.find((u) => u.id === "user2"),
    },
  },
]

// Mock Reviews
export const reviews = [
  {
    id: "review1",
    userId: "user1",
    providerId: "provider1",
    rating: 5,
    comment: "Excellent service! The plumber arrived on time and fixed the issue quickly.",
    helpful: 12,
    createdAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
    updatedAt: new Date(Date.now() - 86400000 * 14),
    user: users.find((u) => u.id === "user1"),
  },
  {
    id: "review2",
    userId: "user3",
    providerId: "provider1",
    rating: 4,
    comment: "Good service overall. Fixed our clogged drain quickly.",
    helpful: 8,
    createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
    updatedAt: new Date(Date.now() - 86400000 * 30),
    user: {
      id: "user3",
      name: "Amit Patel",
      image: "/placeholder.svg?height=50&width=50",
    },
  },
]

// Helper functions to simulate database operations
export function getProviderById(id) {
  const provider = providers.find((p) => p.id === id)
  if (!provider) return null

  const providerReviews = reviews.filter((r) => r.providerId === id)
  const totalRating = providerReviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = providerReviews.length > 0 ? totalRating / providerReviews.length : 0

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0] // 1-5 stars
  providerReviews.forEach((review) => {
    ratingDistribution[review.rating - 1]++
  })

  const ratingStats = {
    average: averageRating,
    total: providerReviews.length,
    distribution: [
      {
        stars: 1,
        count: ratingDistribution[0],
        percentage: providerReviews.length > 0 ? (ratingDistribution[0] / providerReviews.length) * 100 : 0,
      },
      {
        stars: 2,
        count: ratingDistribution[1],
        percentage: providerReviews.length > 0 ? (ratingDistribution[1] / providerReviews.length) * 100 : 0,
      },
      {
        stars: 3,
        count: ratingDistribution[2],
        percentage: providerReviews.length > 0 ? (ratingDistribution[2] / providerReviews.length) * 100 : 0,
      },
      {
        stars: 4,
        count: ratingDistribution[3],
        percentage: providerReviews.length > 0 ? (ratingDistribution[3] / providerReviews.length) * 100 : 0,
      },
      {
        stars: 5,
        count: ratingDistribution[4],
        percentage: providerReviews.length > 0 ? (ratingDistribution[4] / providerReviews.length) * 100 : 0,
      },
    ],
  }

  return {
    provider: {
      ...provider,
      user: users.find((u) => u.id === provider.userId),
      services: services.filter((s) => s.providerId === id),
      _count: {
        services: services.filter((s) => s.providerId === id).length,
        bookings: bookings.filter((b) => b.providerId === id).length,
      },
    },
    reviews: providerReviews,
    ratingStats,
  }
}

export function getUserBookings(userId) {
  return bookings.filter((b) => b.userId === userId)
}

export function getServiceById(id) {
  const service = services.find((s) => s.id === id)
  if (!service) return null

  const provider = providers.find((p) => p.id === service.providerId)

  return {
    ...service,
    provider: {
      ...provider,
      user: users.find((u) => u.id === provider.userId),
    },
  }
}


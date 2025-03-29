import { NextResponse } from "next/server"

// Update the API route to work without Prisma
// Use mock data for preview

// Replace the GET function with a simpler version:
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const city = searchParams.get("city")
    const featured = searchParams.get("featured") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")

    // For preview, return mock data
    const mockProviders = [
      {
        id: "provider1",
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
          image: "/placeholder.svg?height=100&width=100",
        },
        averageRating: 4.8,
        reviewCount: 127,
        _count: {
          services: 3,
          reviews: 127,
        },
      },
      {
        id: "provider2",
        businessName: "Patel Electrical Services",
        description: "Licensed electricians providing high-quality electrical services.",
        category: "Electrical",
        address: "456 Service Avenue",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        verified: true,
        featured: true,
        memberSince: new Date("2019-05-15"),
        completedJobs: 980,
        createdAt: new Date(),
        user: {
          name: "Amit Patel",
          email: "amit@example.com",
          image: "/placeholder.svg?height=100&width=100",
        },
        averageRating: 4.7,
        reviewCount: 94,
        _count: {
          services: 4,
          reviews: 94,
        },
      },
    ]

    // Filter by category if provided
    let filteredProviders = mockProviders
    if (category) {
      filteredProviders = filteredProviders.filter((provider) => provider.category === category)
    }

    // Filter by city if provided
    if (city) {
      filteredProviders = filteredProviders.filter((provider) =>
        provider.city.toLowerCase().includes(city.toLowerCase()),
      )
    }

    // Filter by featured if provided
    if (featured) {
      filteredProviders = filteredProviders.filter((provider) => provider.featured)
    }

    return NextResponse.json({
      providers: filteredProviders,
      pagination: {
        total: filteredProviders.length,
        pages: Math.ceil(filteredProviders.length / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching providers:", error)
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 })
  }
}


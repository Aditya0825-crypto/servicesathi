import { NextResponse } from "next/server"

// Update the API route to work without Prisma
// Use mock data for preview

// Replace the GET function with a simpler version:
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const city = searchParams.get("city")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")

    // For preview, return mock data
    const mockServices = [
      {
        id: "service1",
        title: "Professional Plumbing Services",
        description: "Expert plumbing services for residential and commercial properties.",
        price: "₹300-500/hr",
        duration: "1-3 hours",
        image: "/placeholder.svg?height=300&width=400",
        category: "Plumbing",
        createdAt: new Date(),
        provider: {
          id: "provider1",
          businessName: "Sharma Plumbing Solutions",
          city: "Delhi NCR",
          verified: true,
          user: {
            name: "Rahul Sharma",
            image: "/placeholder.svg?height=100&width=100",
          },
        },
      },
      {
        id: "service2",
        title: "Expert Electrical Repairs & Installation",
        description: "Licensed electricians providing high-quality electrical services.",
        price: "₹350-600/hr",
        duration: "1-4 hours",
        image: "/placeholder.svg?height=300&width=400",
        category: "Electrical",
        createdAt: new Date(),
        provider: {
          id: "provider2",
          businessName: "Patel Electrical Services",
          city: "Mumbai",
          verified: true,
          user: {
            name: "Amit Patel",
            image: "/placeholder.svg?height=100&width=100",
          },
        },
      },
    ]

    // Filter by category if provided
    let filteredServices = mockServices
    if (category) {
      filteredServices = filteredServices.filter((service) => service.category === category)
    }

    // Filter by city if provided
    if (city) {
      filteredServices = filteredServices.filter((service) =>
        service.provider.city.toLowerCase().includes(city.toLowerCase()),
      )
    }

    return NextResponse.json({
      services: filteredServices,
      pagination: {
        total: filteredServices.length,
        pages: Math.ceil(filteredServices.length / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}


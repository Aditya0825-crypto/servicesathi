import { NextResponse } from "next/server"

// Update the API route to work without Prisma
// Use mock data for preview

// Replace the GET function with a simpler version:
export async function GET() {
  try {
    // For preview, return mock data
    const mockBookings = [
      {
        id: "booking1",
        date: new Date(Date.now() + 86400000 * 3), // 3 days from now
        time: "10:00 AM",
        status: "CONFIRMED",
        address: "789 Customer Lane",
        city: "Delhi",
        zipCode: "110001",
        notes: "Please bring all necessary tools.",
        createdAt: new Date(),
        service: {
          id: "service1",
          title: "Professional Plumbing Services",
          description: "Expert plumbing services for residential and commercial properties.",
          price: "₹300-500/hr",
          image: "/placeholder.svg?height=300&width=400",
        },
        provider: {
          id: "provider1",
          businessName: "Sharma Plumbing Solutions",
          city: "Delhi NCR",
          verified: true,
        },
      },
      {
        id: "booking2",
        date: new Date(Date.now() + 86400000 * 7), // 7 days from now
        time: "2:00 PM",
        status: "PENDING",
        address: "789 Customer Lane",
        city: "Delhi",
        zipCode: "110001",
        notes: "The circuit breaker keeps tripping.",
        createdAt: new Date(),
        service: {
          id: "service2",
          title: "Expert Electrical Repairs",
          description: "Licensed electricians providing high-quality electrical services.",
          price: "₹350-600/hr",
          image: "/placeholder.svg?height=300&width=400",
        },
        provider: {
          id: "provider2",
          businessName: "Patel Electrical Services",
          city: "Mumbai",
          verified: true,
        },
      },
    ]

    return NextResponse.json({ bookings: mockBookings })
  } catch (error) {
    console.error("Error fetching user bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}


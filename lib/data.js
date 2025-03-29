"use server"

import { collection, query, where, orderBy, getDocs, getDoc, doc } from "firebase/firestore"
import { db } from "./firebase"

// Get services
export async function getServices({ category, city, limit = 10, page = 1, featured = false }) {
  try {
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
      {
        id: "service3",
        title: "Premium House Cleaning Services",
        description: "Professional cleaning services for homes and apartments.",
        price: "₹250-400/hr",
        duration: "2-4 hours",
        image: "/placeholder.svg?height=300&width=400",
        category: "Cleaning",
        createdAt: new Date(),
        provider: {
          id: "provider3",
          businessName: "Swachh Home Cleaners",
          city: "Bangalore",
          verified: true,
          user: {
            name: "Priya Singh",
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

    // Filter by featured if provided
    if (featured) {
      // For mock data, just return all services as featured
    }

    return {
      services: filteredServices,
      pagination: {
        total: filteredServices.length,
        pages: Math.ceil(filteredServices.length / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching services:", error)
    throw new Error("Failed to fetch services")
  }
}

// Get providers
export async function getProviders({ category, city, limit = 10, page = 1, featured = false }) {
  try {
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

    return {
      providers: filteredProviders,
      pagination: {
        total: filteredProviders.length,
        pages: Math.ceil(filteredProviders.length / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching providers:", error)
    throw new Error("Failed to fetch providers")
  }
}

// Get provider by ID
export async function getProviderById(id) {
  try {
    const providerRef = doc(db, "providers", id)
    const providerDoc = await getDoc(providerRef)

    if (!providerDoc.exists()) {
      throw new Error("Provider not found")
    }

    const providerData = providerDoc.data()

    // Get user data
    const usersRef = collection(db, "users")
    const userQuery = query(usersRef, where("uid", "==", providerData.userId))
    const userSnapshot = await getDocs(userQuery)
    const userData = !userSnapshot.empty ? userSnapshot.docs[0].data() : null

    // Get services
    const servicesRef = collection(db, "services")
    const servicesQuery = query(servicesRef, where("providerId", "==", id))
    const servicesSnapshot = await getDocs(servicesQuery)
    const services = servicesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Get reviews
    const reviewsRef = collection(db, "reviews")
    const reviewsQuery = query(reviewsRef, where("providerId", "==", id))
    const reviewsSnapshot = await getDocs(reviewsQuery)

    const reviews = await Promise.all(
      reviewsSnapshot.docs.map(async (doc) => {
        const reviewData = doc.data()

        // Get user data for reviewer
        const userQuery = query(usersRef, where("uid", "==", reviewData.userId))
        const userSnapshot = await getDocs(userQuery)
        const reviewerData = !userSnapshot.empty ? userSnapshot.docs[0].data() : null

        return {
          id: doc.id,
          ...reviewData,
          user: reviewerData
            ? {
                name: reviewerData.name,
                image: reviewerData.image || "/placeholder.svg?height=50&width=50",
              }
            : {
                name: "Anonymous User",
                image: "/placeholder.svg?height=50&width=50",
              },
        }
      }),
    )

    // Calculate rating stats
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

    // Calculate rating distribution
    const ratingDistribution = [0, 0, 0, 0, 0] // 1-5 stars
    reviews.forEach((review) => {
      ratingDistribution[review.rating - 1]++
    })

    const ratingStats = {
      average: averageRating,
      total: reviews.length,
      distribution: [
        {
          stars: 1,
          count: ratingDistribution[0],
          percentage: reviews.length > 0 ? (ratingDistribution[0] / reviews.length) * 100 : 0,
        },
        {
          stars: 2,
          count: ratingDistribution[1],
          percentage: reviews.length > 0 ? (ratingDistribution[1] / reviews.length) * 100 : 0,
        },
        {
          stars: 3,
          count: ratingDistribution[2],
          percentage: reviews.length > 0 ? (ratingDistribution[2] / reviews.length) * 100 : 0,
        },
        {
          stars: 4,
          count: ratingDistribution[3],
          percentage: reviews.length > 0 ? (ratingDistribution[3] / reviews.length) * 100 : 0,
        },
        {
          stars: 5,
          count: ratingDistribution[4],
          percentage: reviews.length > 0 ? (ratingDistribution[4] / reviews.length) * 100 : 0,
        },
      ],
    }

    // Get bookings count
    const bookingsRef = collection(db, "bookings")
    const bookingsQuery = query(bookingsRef, where("providerId", "==", id))
    const bookingsSnapshot = await getDocs(bookingsQuery)

    return {
      provider: {
        id: providerDoc.id,
        ...providerData,
        user: userData
          ? {
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              image: userData.image || "/placeholder.svg?height=100&width=100",
            }
          : null,
        services,
        _count: {
          services: services.length,
          bookings: bookingsSnapshot.docs.length,
        },
      },
      reviews,
      ratingStats,
    }
  } catch (error) {
    console.error("Error fetching provider:", error)
    throw new Error("Failed to fetch provider")
  }
}

// Get service by ID
export async function getServiceById(id) {
  try {
    const serviceRef = doc(db, "services", id)
    const serviceDoc = await getDoc(serviceRef)

    if (!serviceDoc.exists()) {
      throw new Error("Service not found")
    }

    const serviceData = serviceDoc.data()

    // Get provider data
    const providerRef = doc(db, "providers", serviceData.providerId)
    const providerDoc = await getDoc(providerRef)

    if (!providerDoc.exists()) {
      throw new Error("Provider not found")
    }

    const providerData = providerDoc.data()

    // Get user data for provider
    const usersRef = collection(db, "users")
    const userQuery = query(usersRef, where("uid", "==", providerData.userId))
    const userSnapshot = await getDocs(userQuery)
    const userData = !userSnapshot.empty ? userSnapshot.docs[0].data() : null

    return {
      id: serviceDoc.id,
      ...serviceData,
      provider: {
        id: providerDoc.id,
        ...providerData,
        user: userData
          ? {
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              image: userData.image || "/placeholder.svg?height=100&width=100",
            }
          : null,
      },
    }
  } catch (error) {
    console.error("Error fetching service:", error)
    throw new Error("Failed to fetch service")
  }
}

// Get user bookings
export async function getUserBookings(userId) {
  try {
    const bookingsRef = collection(db, "bookings")
    const q = query(bookingsRef, where("userId", "==", userId), orderBy("date", "desc"))
    const snapshot = await getDocs(q)

    const bookings = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const bookingData = doc.data()

        // Get service data
        const serviceRef = doc(db, "services", bookingData.serviceId)
        const serviceDoc = await getDoc(serviceRef)
        const serviceData = serviceDoc.exists() ? serviceDoc.data() : null

        // Get provider data
        const providerRef = doc(db, "providers", bookingData.providerId)
        const providerDoc = await getDoc(providerRef)
        const providerData = providerDoc.exists() ? providerDoc.data() : null

        // Get user data for provider
        const usersRef = collection(db, "users")
        const userQuery = query(usersRef, where("uid", "==", providerData?.userId))
        const userSnapshot = await getDocs(userQuery)
        const userData = !userSnapshot.empty ? userSnapshot.docs[0].data() : null

        return {
          id: doc.id,
          ...bookingData,
          date: bookingData.date.toDate(), // Convert Firestore timestamp to JS Date
          service: serviceData ? { id: serviceDoc.id, ...serviceData } : null,
          provider: providerData
            ? {
                id: providerDoc.id,
                ...providerData,
                user: userData
                  ? {
                      name: userData.name,
                      image: userData.image || "/placeholder.svg?height=100&width=100",
                    }
                  : null,
              }
            : null,
        }
      }),
    )

    return bookings
  } catch (error) {
    console.error("Error fetching user bookings:", error)
    throw new Error("Failed to fetch bookings")
  }
}

// Get provider bookings
export async function getProviderBookings(providerId) {
  try {
    const bookingsRef = collection(db, "bookings")
    const q = query(bookingsRef, where("providerId", "==", providerId), orderBy("date", "desc"))
    const snapshot = await getDocs(q)

    const bookings = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const bookingData = doc.data()

        // Get service data
        const serviceRef = doc(db, "services", bookingData.serviceId)
        const serviceDoc = await getDoc(serviceRef)
        const serviceData = serviceDoc.exists() ? serviceDoc.data() : null

        // Get user data
        const usersRef = collection(db, "users")
        const userQuery = query(usersRef, where("uid", "==", bookingData.userId))
        const userSnapshot = await getDocs(userQuery)
        const userData = !userSnapshot.empty ? userSnapshot.docs[0].data() : null

        return {
          id: doc.id,
          ...bookingData,
          date: bookingData.date.toDate(), // Convert Firestore timestamp to JS Date
          service: serviceData ? { id: serviceDoc.id, ...serviceData } : null,
          user: userData
            ? {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                image: userData.image || "/placeholder.svg?height=100&width=100",
              }
            : null,
        }
      }),
    )

    return bookings
  } catch (error) {
    console.error("Error fetching provider bookings:", error)
    throw new Error("Failed to fetch bookings")
  }
}


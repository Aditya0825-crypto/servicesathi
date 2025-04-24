"use server"

import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"
import { services as mockServices, providers as mockProviders } from "./mock-data"

// Get all services with optional filtering
export async function getServices(filters = {}) {
  try {
    // Get services from Firebase
    const servicesRef = collection(db, "services")
    const servicesSnap = await getDocs(servicesRef)
    
    let filteredServices = []
    
    servicesSnap.forEach((doc) => {
      const data = doc.data()
      filteredServices.push({
        id: doc.id,
        ...data,
        // Ensure these fields exist with defaults
        title: data.title,
        provider: data.provider || "Service Provider",
        price: data.price || "Contact for price",
        description: data.description || "",
        city: data.city || "Available in all cities",
        category: data.category || "general",
        rating: data.rating || 4.5,
        reviews: data.reviews || 0,
      })
    })

    // Apply category filter if provided
    if (filters.category) {
      filteredServices = filteredServices.filter((service) => service.category === filters.category)
    }

    // Apply price filter if provided
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      filteredServices = filteredServices.filter((service) => {
        // Extract numeric price from string like "500-1000"
        const priceRange = service.price.replace(/[^\d-]/g, "").split("-")
        const minServicePrice = Number.parseInt(priceRange[0])
        return minServicePrice >= filters.minPrice && minServicePrice <= filters.maxPrice
      })
    }

    // Apply rating filter if provided
    if (filters.rating) {
      filteredServices = filteredServices.filter((service) => service.rating >= filters.rating)
    }

    // If no services found in Firebase, fallback to mock data
    if (filteredServices.length === 0) {
      console.log("No services in Firebase, using mock data")
      return {
        services: mockServices,
        total: mockServices.length,
      }
    }

    return {
      services: filteredServices,
      total: filteredServices.length,
    }
  } catch (error) {
    console.error("Error fetching services:", error)
    // Fallback to mock data on error
    return { 
      services: mockServices,
      total: mockServices.length 
    }
  }
}

// Get all providers with optional filtering
export async function getProviders(filters = {}) {
  try {
    let filteredProviders = [...mockProviders]

    // Apply category filter if provided
    if (filters.category) {
      filteredProviders = filteredProviders.filter((provider) => provider.category === filters.category)
    }

    // Apply rating filter if provided
    if (filters.rating) {
      filteredProviders = filteredProviders.filter((provider) => provider.rating >= filters.rating)
    }

    return {
      providers: filteredProviders,
      total: filteredProviders.length,
    }
  } catch (error) {
    console.error("Error fetching providers:", error)
    return { providers: [], total: 0 }
  }
}

// Get a specific provider by ID
export async function getProviderById(id) {
  try {
    const provider = mockProviders.find((provider) => provider.id === id)
    return provider || null
  } catch (error) {
    console.error("Error fetching provider:", error)
    return null
  }
}

// Get a specific service by ID
export async function getServiceById(id) {
  try {
    // First try to get from Firebase
    const serviceRef = doc(db, "services", id)
    const serviceSnap = await getDoc(serviceRef)

    if (serviceSnap.exists()) {
      const data = serviceSnap.data()
      return {
        id: serviceSnap.id,
        ...data,
        // Ensure these fields exist with defaults
        title: data.title,
        provider: data.provider || "Service Provider",
        price: data.price || "Contact for price",
        description: data.description || "",
        city: data.city || "Available in all cities",
        category: data.category || "general",
        rating: data.rating || 4.5,
        reviews: data.reviews || 0,
      }
    }

    // If not found in Firebase, fallback to mock data
    const mockService = mockServices.find((service) => service.id === id)
    if (mockService) {
      return mockService
    }

    return null
  } catch (error) {
    console.error("Error fetching service:", error)
    // Fallback to mock data on error
    const mockService = mockServices.find((service) => service.id === id)
    return mockService || null
  }
}

// Get services by provider ID
export async function getServicesByProvider(providerId) {
  try {
    const providerServices = mockServices.filter((service) => service.providerId === providerId)
    return providerServices
  } catch (error) {
    console.error("Error fetching provider services:", error)
    return []
  }
}

// Get services by category
export async function getServicesByCategory(category) {
  try {
    const categoryServices = mockServices.filter((service) => service.category === category)
    return categoryServices
  } catch (error) {
    console.error("Error fetching services by category:", error)
    return []
  }
}


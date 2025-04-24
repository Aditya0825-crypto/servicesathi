import { addDoc, collection, doc, getDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

// Create a new service
export const createService = async (serviceData) => {
  try {
    const serviceRef = await addDoc(collection(db, "services"), {
      ...serviceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return { success: true, serviceId: serviceRef.id }
  } catch (error) {
    console.error("Error creating service:", error)
    return { success: false, error: error.message }
  }
}

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    if (!bookingData.serviceId) {
      throw new Error("Service ID is required")
    }

    // First get the service details
    const serviceRef = doc(db, "services", bookingData.serviceId)
    const serviceDoc = await getDoc(serviceRef)
    
    if (!serviceDoc.exists()) {
      throw new Error(`Service with ID ${bookingData.serviceId} not found`)
    }

    const serviceData = serviceDoc.data()
    
    // Get provider details if providerId exists
    let providerData = null
    if (serviceData.providerId) {
      const providerDoc = await getDoc(doc(db, "users", serviceData.providerId))
      providerData = providerDoc.exists() ? providerDoc.data() : null
    }

    // Create the booking with complete information
    const bookingRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      serviceDetails: {
        title: serviceData.title || "Unknown Service",
        price: serviceData.price || "Not specified",
        provider: providerData ? providerData.businessName || providerData.name : serviceData.provider || "Unknown Provider",
        providerId: serviceData.providerId,
      },
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return { success: true, bookingId: bookingRef.id }
  } catch (error) {
    console.error("❌ Error creating booking:", error)
    return { 
      success: false, 
      error: error.message || "Failed to create booking"
    }
  }
}

// Get services by provider
export const getProviderServices = async (providerId) => {
  try {
    const q = query(collection(db, "services"), where("providerId", "==", providerId))
    const querySnapshot = await getDocs(q)
    const services = []
    querySnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, services }
  } catch (error) {
    console.error("Error getting provider services:", error)
    return { success: false, error: error.message }
  }
}

// Get all services
export const getAllServices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "services"))
    const services = []
    querySnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, services }
  } catch (error) {
    console.error("Error getting services:", error)
    return { success: false, error: error.message }
  }
}

// Get user's bookings
export const getUserBookings = async (userId) => {
  try {
    const q = query(collection(db, "bookings"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    const bookings = []
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, bookings }
  } catch (error) {
    console.error("Error getting user bookings:", error)
    return { success: false, error: error.message }
  }
} 
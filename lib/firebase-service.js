"use client"

import { collection, doc, getDoc, getDocs, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore"
import { db, auth, storage } from "./firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

// Authentication services
export const signUp = async ({ name, email, password, phone }) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with name
    await updateProfile(user, { displayName: name })

    // Create user document in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      phone,
      role: "USER",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        role: "USER",
      },
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, error: error.message }
  }
}

export const signIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Get user data from Firestore
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("uid", "==", user.uid))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error("User data not found")
    }

    const userData = querySnapshot.docs[0].data()

    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        role: userData.role,
      },
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, error: error.message }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error) {
    console.error("Sign out error:", error)
    return { success: false, error: error.message }
  }
}

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    console.error("Reset password error:", error)
    return { success: false, error: error.message }
  }
}

// User services
export const getUserByUid = async (uid) => {
  try {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("uid", "==", uid))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const userData = querySnapshot.docs[0].data()
    return {
      id: querySnapshot.docs[0].id,
      ...userData,
    }
  } catch (error) {
    console.error("Get user error:", error)
    throw error
  }
}

// Service provider services
export const getProviders = async ({ category, city, limit = 10, page = 1, featured = false }) => {
  try {
    const providersRef = collection(db, "providers")
    let q = query(providersRef)

    if (category) {
      q = query(q, where("category", "==", category))
    }

    if (city) {
      q = query(q, where("city", "==", city))
    }

    if (featured) {
      q = query(q, where("featured", "==", true))
    }

    q = query(q, orderBy("createdAt", "desc"))

    // For pagination
    const snapshot = await getDocs(q)
    const total = snapshot.docs.length

    // Get paginated results
    const pageSize = limit
    const startIndex = (page - 1) * pageSize
    const paginatedDocs = snapshot.docs.slice(startIndex, startIndex + pageSize)

    // Get provider data with user info
    const providers = await Promise.all(
      paginatedDocs.map(async (doc) => {
        const providerData = doc.data()

        // Get user data
        const userDoc = await getUserByUid(providerData.userId)

        // Get reviews
        const reviewsRef = collection(db, "reviews")
        const reviewsQuery = query(reviewsRef, where("providerId", "==", doc.id))
        const reviewsSnapshot = await getDocs(reviewsQuery)
        const reviews = reviewsSnapshot.docs.map((reviewDoc) => reviewDoc.data())

        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

        // Get services count
        const servicesRef = collection(db, "services")
        const servicesQuery = query(servicesRef, where("providerId", "==", doc.id))
        const servicesSnapshot = await getDocs(servicesQuery)

        return {
          id: doc.id,
          ...providerData,
          user: userDoc,
          averageRating,
          reviewCount: reviews.length,
          _count: {
            services: servicesSnapshot.docs.length,
            reviews: reviews.length,
          },
        }
      }),
    )

    return {
      providers,
      pagination: {
        total,
        pages: Math.ceil(total / pageSize),
        page,
        limit: pageSize,
      },
    }
  } catch (error) {
    console.error("Get providers error:", error)
    throw error
  }
}

export const getProviderById = async (id) => {
  try {
    const providerRef = doc(db, "providers", id)
    const providerDoc = await getDoc(providerRef)

    if (!providerDoc.exists()) {
      throw new Error("Provider not found")
    }

    const providerData = providerDoc.data()

    // Get user data
    const userDoc = await getUserByUid(providerData.userId)

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
        const userDoc = await getUserByUid(reviewData.userId)

        return {
          id: doc.id,
          ...reviewData,
          user: userDoc,
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
        user: userDoc,
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
    console.error("Get provider by ID error:", error)
    throw error
  }
}

// Service services
export const getServices = async ({ category, city, limit = 10, page = 1, featured = false }) => {
  try {
    const servicesRef = collection(db, "services")
    let q = query(servicesRef)

    if (category) {
      q = query(q, where("category", "==", category))
    }

    q = query(q, orderBy("createdAt", "desc"))

    const snapshot = await getDocs(q)

    // Filter by city and featured (need to do this manually since we need provider data)
    let filteredDocs = snapshot.docs

    if (city || featured) {
      filteredDocs = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const serviceData = doc.data()
          const providerRef = doc(db, "providers", serviceData.providerId)
          const providerDoc = await getDoc(providerRef)

          if (!providerDoc.exists()) {
            return null
          }

          const providerData = providerDoc.data()

          if (city && !providerData.city.toLowerCase().includes(city.toLowerCase())) {
            return null
          }

          if (featured && !providerData.featured) {
            return null
          }

          return doc
        }),
      )

      filteredDocs = filteredDocs.filter((doc) => doc !== null)
    }

    const total = filteredDocs.length

    // Get paginated results
    const pageSize = limit
    const startIndex = (page - 1) * pageSize
    const paginatedDocs = filteredDocs.slice(startIndex, startIndex + pageSize)

    // Get service data with provider info
    const services = await Promise.all(
      paginatedDocs.map(async (doc) => {
        const serviceData = doc.data()

        // Get provider data
        const providerRef = doc(db, "providers", serviceData.providerId)
        const providerDoc = await getDoc(providerRef)
        const providerData = providerDoc.data()

        // Get user data for provider
        const userDoc = await getUserByUid(providerData.userId)

        return {
          id: doc.id,
          ...serviceData,
          provider: {
            id: providerDoc.id,
            businessName: providerData.businessName,
            city: providerData.city,
            verified: providerData.verified,
            user: userDoc,
          },
        }
      }),
    )

    return {
      services,
      pagination: {
        total,
        pages: Math.ceil(total / pageSize),
        page,
        limit: pageSize,
      },
    }
  } catch (error) {
    console.error("Get services error:", error)
    throw error
  }
}

export const getServiceById = async (id) => {
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
    const userDoc = await getUserByUid(providerData.userId)

    return {
      id: serviceDoc.id,
      ...serviceData,
      provider: {
        id: providerDoc.id,
        ...providerData,
        user: userDoc,
      },
    }
  } catch (error) {
    console.error("Get service by ID error:", error)
    throw error
  }
}

// Booking services
export const createBooking = async (bookingData) => {
  try {
    const { userId, serviceId, providerId, date, time, address, city, zipCode, notes } = bookingData

    const newBooking = {
      userId,
      serviceId,
      providerId,
      date: new Date(date),
      time,
      status: "PENDING",
      address,
      city,
      zipCode,
      notes,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "bookings"), newBooking)

    return { success: true, bookingId: docRef.id }
  } catch (error) {
    console.error("Create booking error:", error)
    return { success: false, error: error.message }
  }
}

export const getUserBookings = async (userId) => {
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
        const userDoc = providerData ? await getUserByUid(providerData.userId) : null

        return {
          id: doc.id,
          ...bookingData,
          date: bookingData.date.toDate(), // Convert Firestore timestamp to JS Date
          service: serviceData ? { id: serviceDoc.id, ...serviceData } : null,
          provider: providerData
            ? {
                id: providerDoc.id,
                ...providerData,
                user: userDoc,
              }
            : null,
        }
      }),
    )

    return bookings
  } catch (error) {
    console.error("Get user bookings error:", error)
    throw error
  }
}

// Review services
export const submitReview = async (reviewData) => {
  try {
    const { userId, providerId, rating, comment } = reviewData

    const newReview = {
      userId,
      providerId,
      rating,
      comment,
      helpful: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "reviews"), newReview)

    // Calculate new average rating
    const reviewsRef = collection(db, "reviews")
    const q = query(reviewsRef, where("providerId", "==", providerId))
    const snapshot = await getDocs(q)

    const reviews = snapshot.docs.map((doc) => doc.data())
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

    return { success: true, reviewId: docRef.id, averageRating }
  } catch (error) {
    console.error("Submit review error:", error)
    return { success: false, error: error.message }
  }
}

// Contact form
export const submitContactForm = async (formData) => {
  try {
    const { name, email, phone, subject, message } = formData

    const newContact = {
      name,
      email,
      phone,
      subject,
      message,
      status: "UNREAD",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "contacts"), newContact)

    return { success: true, contactId: docRef.id }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, error: error.message }
  }
}

// Newsletter subscription
export const subscribeToNewsletter = async (email) => {
  try {
    // Check if already subscribed
    const subscribersRef = collection(db, "newsletter_subscribers")
    const q = query(subscribersRef, where("email", "==", email))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      return { success: true, message: "Already subscribed" }
    }

    // Add new subscriber
    await addDoc(subscribersRef, {
      email,
      subscribedAt: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, error: error.message }
  }
}

// File upload
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return { success: true, url: downloadURL }
  } catch (error) {
    console.error("File upload error:", error)
    return { success: false, error: error.message }
  }
}


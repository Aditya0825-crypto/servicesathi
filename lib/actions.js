"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

// Update the server actions to work without Prisma
// Simplify for preview

// Replace the signIn function with a simpler version:
export async function signIn(formData) {
  try {
    const { email, password } = formData

    // For preview, just return success
    cookies().set("auth-token", "preview-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: "preview-user-id",
        name: "Rahul Sharma",
        email: email,
        role: "USER",
      },
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, error: error.message }
  }
}

// Replace the signUp function with a simpler version:
export async function signUp(formData) {
  try {
    const { name, email, password, phone } = formData

    // For preview, just return success
    cookies().set("auth-token", "preview-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: "preview-user-id",
        name: name,
        email: email,
        role: "USER",
      },
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, error: error.message }
  }
}

export async function signOut() {
  try {
    cookies().delete("auth-token")
    return { success: true }
  } catch (error) {
    console.error("Sign out error:", error)
    return { success: false, error: error.message }
  }
}

// Replace the getSession function with a simpler version:
export async function getSession() {
  try {
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return null
    }

    // For preview, return a mock user
    return {
      id: "preview-user-id",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "USER",
      image: "/placeholder.svg?height=100&width=100",
    }
  } catch (error) {
    console.error("Get session error:", error)
    return null
  }
}

// Replace the submitContactForm function with a simpler version:
export async function submitContactForm(formData) {
  try {
    // For preview, just return success
    return { success: true }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, error: "Failed to submit contact form" }
  }
}

// Booking actions
export async function createBooking(formData) {
  try {
    const { userId, serviceId, providerId, date, time, address, city, zipCode, notes } = formData

    const bookingsRef = collection(db, "bookings")
    const docRef = await addDoc(bookingsRef, {
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
    })

    revalidatePath("/bookings")
    revalidatePath(`/bookings/${docRef.id}`)

    return { success: true, bookingId: docRef.id }
  } catch (error) {
    console.error("Create booking error:", error)
    return { success: false, error: "Failed to create booking" }
  }
}

// Review actions
export async function submitReview(formData) {
  try {
    const { userId, providerId, rating, comment } = formData

    const reviewsRef = collection(db, "reviews")
    const docRef = await addDoc(reviewsRef, {
      userId,
      providerId,
      rating,
      comment,
      helpful: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    // Calculate new average rating
    const q = query(reviewsRef, where("providerId", "==", providerId))
    const querySnapshot = await getDocs(q)

    const reviews = querySnapshot.docs.map((doc) => doc.data())
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

    revalidatePath(`/providers/${providerId}`)

    return { success: true, reviewId: docRef.id, averageRating }
  } catch (error) {
    console.error("Submit review error:", error)
    return { success: false, error: "Failed to submit review" }
  }
}

// Replace the subscribeToNewsletter function with a simpler version:
export async function subscribeToNewsletter(email) {
  try {
    // For preview, just return success
    return { success: true }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, error: "Failed to subscribe to newsletter" }
  }
}


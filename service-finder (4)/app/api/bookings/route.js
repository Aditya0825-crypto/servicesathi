import { db } from "@/lib/firebase"
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy
} from "firebase/firestore"
import { NextResponse } from "next/server"
import { sendBookingNotifications } from "@/lib/notification-utils"

// POST: Create a booking
export async function POST(req) {
  try {
    const body = await req.json()

    // Validate required fields
    const requiredFields = ['serviceId', 'date', 'time', 'address', 'name', 'email', 'phone']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 })
    }

    // Validate service details
    if (!body.serviceDetails?.title || !body.serviceDetails?.provider) {
      return NextResponse.json({
        error: 'Service details are missing or invalid'
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 })
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json({ 
        error: 'Invalid phone number format' 
      }, { status: 400 })
    }

    const booking = {
      ...body,
      createdAt: serverTimestamp(),
      status: 'pending',
      serviceDetails: {
        title: body.serviceDetails.title,
        provider: body.serviceDetails.provider,
        price: body.serviceDetails.price || 'Not specified',
      }
    }

    const docRef = await addDoc(collection(db, "bookings"), booking)
    booking.id = docRef.id // Add the ID to the booking object for notifications

    // Send notifications (email, SMS, and in-app)
    await sendBookingNotifications(booking)

    return NextResponse.json({ 
      success: true, 
      message: "Booking saved successfully",
      bookingId: docRef.id
    })

  } catch (err) {
    console.error("❌ API Error (POST):", err)
    const errorMessage = err.code === 'permission-denied' 
      ? 'You do not have permission to create bookings'
      : 'Failed to submit booking'
    
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 })
  }
}

// GET: Fetch all bookings
export async function GET() {
  try {
    const snap = await getDocs(query(collection(db, "bookings"), orderBy("createdAt", "desc")))
    const bookings = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return NextResponse.json({ bookings })
  } catch (err) {
    console.error("❌ API Error (GET):", err)
    return NextResponse.json({ error: "Could not fetch bookings" }, { status: 500 })
  }
}

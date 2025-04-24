import { db } from "@/lib/firebase"
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
  Timestamp
} from "firebase/firestore"
import { NextResponse } from "next/server"

// Helper function to convert Firestore timestamp to ISO string
function convertTimestamp(timestamp) {
  if (!timestamp) return null;
  if (timestamp instanceof Date) return timestamp.toISOString();
  if (timestamp.toDate instanceof Function) return timestamp.toDate().toISOString();
  if (typeof timestamp === 'string') return timestamp;
  return null;
}

// Helper function to serialize document data
function serializeDocument(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
    rating: data.rating || 0,
    totalRatings: data.totalRatings || 0,
    reviews: data.reviews || []
  };
}

// POST: Create a service
export async function POST(req) {
  try {
    const body = await req.json()

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'price', 'provider', 'city', 'phone', 'email']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 })
    }

    // Validate phone format
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json({ 
        error: 'Invalid phone number format' 
      }, { status: 400 })
    }

    const now = Timestamp.now();
    const service = {
      ...body,
      createdAt: now,
      updatedAt: now,
      status: 'active',
      rating: 0,
      totalRatings: 0,
      reviews: [],
      availability: body.availability || 'all'
    }

    const docRef = await addDoc(collection(db, "services"), service)
    const docSnap = await getDoc(docRef)
    
    // Serialize the response data
    const createdService = serializeDocument(docSnap)

    return NextResponse.json({ 
      success: true, 
      message: "Service added successfully",
      service: createdService
    })

  } catch (err) {
    console.error("❌ API Error (POST):", err)
    return NextResponse.json({ 
      error: "Failed to add service",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 })
  }
}

// GET: Fetch services
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const providerId = searchParams.get('providerId')
    const category = searchParams.get('category')
    const city = searchParams.get('city')

    let q = query(collection(db, "services"), orderBy("createdAt", "desc"))

    if (providerId) {
      q = query(q, where("providerId", "==", providerId))
    }

    if (category) {
      q = query(q, where("category", "==", category))
    }

    if (city) {
      q = query(q, where("city", "==", city))
    }

    const snap = await getDocs(q)
    const services = snap.docs.map(serializeDocument)

    return NextResponse.json({ services })
  } catch (err) {
    console.error("❌ API Error (GET):", err)
    return NextResponse.json({ error: "Could not fetch services" }, { status: 500 })
  }
}

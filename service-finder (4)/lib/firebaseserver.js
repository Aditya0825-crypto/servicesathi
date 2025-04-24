import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

export const getServiceById = async (id) => {
  if (!id) {
    console.error("❌ No service ID provided")
    throw new Error("Service ID is required")
  }

  console.log("📦 Firestore → looking for ID:", id)

  try {
    const ref = doc(db, "services", id)
    const snap = await getDoc(ref)

    if (!snap.exists()) {
      console.log("❌ No document found for ID:", id)
      throw new Error("Service not found")
    }

    const data = snap.data()
    console.log("📄 Raw service data:", data) // Debug log

    // Create a service object with defaults for all fields
    const service = {
      id: snap.id,
      title: data.title || "Pipe Repair & Installation",
      provider: data.provider || "Sharma Plumbing Solutions",
      price: data.price || "500-1000",
      description: data.description || "",
      city: data.city || "Pune",
      category: data.category || "plumbing",
      rating: data.rating || 4.5,
      reviews: data.reviews || 0
    }

    console.log("✅ Processed service data:", service) // Debug log
    return service

  } catch (error) {
    console.error("❌ Error fetching service:", error)
    throw error
  }
}

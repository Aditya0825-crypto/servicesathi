import { getServiceById } from "@/lib/firebaseserver"
import BookingClient from "./BookingClient" // a client component

export default async function BookingPage({ params }) {
  console.log("🚀 ROUTE PARAMS:", params)
  const { id, category } = params // ✅ OK in Server Component

  let service = null

  try {
    service = await getServiceById(id) // Use the actual ID from params
  } catch (error) {
    console.error("❌ Service fetch failed:", error)
  }

  if (!service) {
    return (
      <div className="p-8 text-red-500 font-semibold">
        Service not found. Please check the URL or database.
      </div>
    )
  }

  return <BookingClient service={service} />
}

"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function FeaturedProviders() {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "PROVIDER"))
        const snapshot = await getDocs(q)
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProviders(list)
      } catch (err) {
        console.error("Error loading providers:", err)
      }
    }

    fetchProviders()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {providers.length === 0 ? (
        <p>No providers found.</p>
      ) : (
        providers.map(provider => (
          <div
            key={provider.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-bold">{provider.businessName || provider.name}</h3>
            <p className="text-gray-500">{provider.city || "City unknown"}</p>
            <p className="text-sm text-gray-400">Email: {provider.email}</p>
          </div>
        ))
      )}
    </div>
  )
}

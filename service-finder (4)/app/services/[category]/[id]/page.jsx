"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ServiceDetails from "@/components/ServiceDetails"
import ServiceReviews from "@/components/ServiceReviews"
import RelatedServices from "@/components/RelatedServices"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getServiceById } from "@/lib/data"

export default function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchService() {
      setLoading(true)
      try {
        const data = await getServiceById(params.id)
        setService(data)
      } catch (error) {
        console.error("Error fetching service:", error)
        setService(null)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchService()
    }
  }, [params.id])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : service ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <ServiceDetails service={service} />
              <ServiceReviews serviceId={service.id} />
            </div>
            <div className="lg:w-1/3">
              <RelatedServices category={service.category} currentServiceId={service.id} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Service Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              The service you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}


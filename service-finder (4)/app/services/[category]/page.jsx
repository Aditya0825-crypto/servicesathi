"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ServiceCard from "@/components/ServiceCard"
import ServiceFilters from "@/components/ServiceFilters"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getServices } from "@/lib/data"

export default function CategoryServicesPage() {
  const params = useParams()
  const category = params.category
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    rating: 0,
    availability: "any",
  })

  useEffect(() => {
    async function fetchServices() {
      setLoading(true)
      try {
        const data = await getServices({ category })
        setServices(data.services || [])
      } catch (error) {
        console.error("Error fetching services:", error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [category])

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  // Apply filters
  const filteredServices = services.filter((service) => {
    // Price filter - extract min price from range
    const priceRange = service.price.replace(/[^\d-]/g, "").split("-")
    const minServicePrice = Number.parseInt(priceRange[0])

    if (minServicePrice < filters.priceRange[0] || minServicePrice > filters.priceRange[1]) {
      return false
    }

    // Rating filter
    if (filters.rating > 0 && service.rating < filters.rating) {
      return false
    }

    return true
  })

  const categoryTitles = {
    plumbing: "Plumbing Services",
    electrical: "Electrical Services",
    carpentry: "Carpentry Services",
    cleaning: "House Cleaning Services",
  }

  const categoryDescriptions = {
    plumbing: "Find expert plumbers for all your plumbing needs, from repairs to installations.",
    electrical: "Connect with skilled electricians for safe and reliable electrical services.",
    carpentry: "Discover professional carpenters for custom woodworking and furniture solutions.",
    cleaning: "Book professional house cleaning services for a spotless home.",
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {categoryTitles[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} Services`}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {categoryDescriptions[category] || "Find the perfect service provider for your needs in Pune."}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <ServiceFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : filteredServices.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600 dark:text-gray-300">Showing {filteredServices.length} services in Pune</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No services found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or check back later for new services.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


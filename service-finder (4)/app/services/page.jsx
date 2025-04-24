"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ServiceCard from "@/components/ServiceCard"
import ServiceFilters from "@/components/ServiceFilters"
import ServiceFilterTabs from "@/components/ServiceFilterTabs"
import { getServices } from "@/lib/data"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    rating: 0,
    availability: "any",
  })

  useEffect(() => {
    async function fetchServices() {
      setLoading(true)
      try {
        const data = await getServices({
          category: activeTab !== "all" ? activeTab : null,
        })
        setServices(data.services || [])
      } catch (error) {
        console.error("Error fetching services:", error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [activeTab])

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // Filter services based on filters
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">Services in Pune</h1>
            <p className="text-white/90 mt-2">Find trusted professionals for all your home service needs</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <ServiceFilterTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="flex flex-col md:flex-row gap-6 mt-6">
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
                    <p className="text-gray-600 dark:text-gray-300">
                      Showing {filteredServices.length} services in Pune
                    </p>
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
      </main>
      <Footer />
    </div>
  )
}


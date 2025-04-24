"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import ProviderCard from "./ProviderCard"
import { getProviders } from "@/lib/data"

export default function ProvidersList() {
  const [providers, setProviders] = useState([])
  const [filteredProviders, setFilteredProviders] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "plumbing", name: "Plumbing" },
    { id: "electrical", name: "Electrical" },
    { id: "cleaning", name: "House Cleaning" },
    { id: "carpentry", name: "Carpentry" },
  ]

  // Load providers on mount
  useEffect(() => {
    const loadProviders = async () => {
      setIsLoading(true)
      try {
        const { providers: allProviders } = await getProviders()
        setProviders(allProviders)
        setFilteredProviders(allProviders)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading providers:", error)
        setIsLoading(false)
      }
    }

    loadProviders()
  }, [])

  // Update filtered providers when providers, category, search term, or sort method changes
  useEffect(() => {
    let result = [...providers]

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter((provider) => provider.category === selectedCategory)
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (provider) =>
          provider.businessName?.toLowerCase().includes(term) ||
          provider.description?.toLowerCase().includes(term) ||
          provider.category?.toLowerCase().includes(term) ||
          provider.city?.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating
      } else if (sortBy === "reviews") {
        return b.reviews - a.reviews
      } else if (sortBy === "newest") {
        return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now())
      }
      return 0
    })

    setFilteredProviders(result)
  }, [providers, selectedCategory, searchTerm, sortBy])

  // Get featured providers (verified or high rating)
  const featuredProviders = filteredProviders.filter((provider) => provider.rating >= 4.8).slice(0, 4)

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search providers by name, service, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-3 py-2 border border-gray-300 rounded-md flex items-center text-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>

            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Filter options */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {featuredProviders.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Service Providers</h2>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="w-20 h-20 rounded-full bg-gray-200 mr-4"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {featuredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </>
      )}

      <h2 className="text-2xl font-bold mb-6">All Service Providers</h2>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProviders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No service providers found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("all")
              setSearchTerm("")
            }}
            className="mt-4 px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {filteredProviders.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">Next</button>
          </nav>
        </div>
      )}
    </div>
  )
}


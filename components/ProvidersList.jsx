"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, MapPin, CheckCircle, ExternalLink, Search, Filter, ChevronDown } from "lucide-react"
import { useProvidersContext } from "@/lib/auth-context"

export default function ProvidersList() {
  const { providers, getProvidersByCategory } = useProvidersContext()
  const [filteredProviders, setFilteredProviders] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "plumbing", name: "Plumbing" },
    { id: "electrical", name: "Electrical" },
    { id: "cleaning", name: "House Cleaning" },
    { id: "carpentry", name: "Carpentry" },
  ]

  // Update filtered providers when providers, category, search term, or sort method changes
  useEffect(() => {
    let result = getProvidersByCategory(selectedCategory)

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (provider) =>
          provider.businessName.toLowerCase().includes(term) ||
          provider.description?.toLowerCase().includes(term) ||
          provider.category.toLowerCase().includes(term) ||
          provider.city.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating
      } else if (sortBy === "reviews") {
        return b.reviews - a.reviews
      } else if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0
    })

    setFilteredProviders(result)
  }, [providers, selectedCategory, searchTerm, sortBy, getProvidersByCategory])

  // Get featured providers
  const featuredProviders = filteredProviders.filter((provider) => provider.verified)

  // Get the first letter of the provider name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "P"
  }

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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Service Providers</h2>
      </div>

      {featuredProviders.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featuredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className="flex items-start">
                  {provider.image ? (
                    <img
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.businessName}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold mr-4">
                      {getInitial(provider.businessName)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{provider.businessName}</h3>
                        <p className="text-gray-600 text-sm capitalize">{provider.category}</p>
                      </div>
                      {provider.verified && (
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>

                    <div className="flex items-center mt-2 mb-3">
                      <div className="flex items-center text-yellow-500 mr-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
                      <div className="flex items-center ml-4 text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {provider.city}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4">{provider.description}</p>

                    <Link
                      href={`/providers/${provider.id}`}
                      className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm"
                    >
                      View Profile
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-12 text-center">
          <p className="text-gray-500">No featured providers found.</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">All Service Providers</h2>

      {filteredProviders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  {provider.image ? (
                    <img
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.businessName}
                      className="w-16 h-16 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold mr-3">
                      {getInitial(provider.businessName)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold">{provider.businessName}</h3>
                    <p className="text-gray-600 text-sm capitalize">{provider.category}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {provider.city}
                </div>

                <Link
                  href={`/providers/${provider.id}`}
                  className="w-full py-2 mt-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors flex justify-center items-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
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


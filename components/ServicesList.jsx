"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, MapPin, Clock, Search } from "lucide-react"
import { useProvidersContext } from "@/lib/auth-context"
import ServiceIcon, { getServiceIcon } from "@/components/ServiceIcons"

export default function ServicesList() {
  const { providers } = useProvidersContext()
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [services, setServices] = useState([])

  // Categories with icons
  const categories = [
    { id: "all", name: "All Services" },
    { id: "plumbing", name: "Plumbing" },
    { id: "electrical", name: "Electrical" },
    { id: "cleaning", name: "Cleaning" },
    { id: "carpentry", name: "Carpentry" },
  ]

  // Generate services from providers
  useEffect(() => {
    // Create services based on providers
    const generatedServices = providers.flatMap((provider) => {
      // Each provider can offer multiple services
      const serviceCount = Math.floor(Math.random() * 3) + 1 // 1-3 services per provider

      return Array(serviceCount)
        .fill()
        .map((_, index) => {
          const serviceId = `${provider.id}-service-${index + 1}`
          const serviceNames = {
            plumbing: ["Plumbing Repair", "Pipe Installation", "Drain Cleaning"],
            electrical: ["Electrical Repair", "Wiring Installation", "Circuit Fixing"],
            cleaning: ["House Cleaning", "Deep Cleaning", "Move-in/out Cleaning"],
            carpentry: ["Furniture Repair", "Custom Woodwork", "Cabinet Installation"],
            "ac-repair": ["AC Repair", "AC Installation", "AC Maintenance"],
            painting: ["Interior Painting", "Exterior Painting", "Wall Texturing"],
            "pest-control": ["Pest Control", "Termite Treatment", "Rodent Control"],
          }

          const defaultNames = ["Professional Service", "Expert Service", "Quality Service"]
          const categoryServices = serviceNames[provider.category] || defaultNames
          const serviceName = categoryServices[index % categoryServices.length]

          return {
            id: serviceId,
            category: provider.category,
            title: `${serviceName}`,
            provider: provider.businessName,
            rating: provider.rating,
            reviews: Math.floor(provider.reviews / (index + 1)),
            image: "/placeholder.svg?height=300&width=400",
            price: `₹${300 + index * 100}-${500 + index * 150}/hr`,
            location: `${provider.city}`,
            availability: index === 0 ? "Available today" : index === 1 ? "Available tomorrow" : "Available in 2 days",
            href: `/services/${provider.category}/${serviceId}`,
            providerId: provider.id,
          }
        })
    })

    setServices(generatedServices)
  }, [providers])

  // Filter services based on active category and search term
  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Search and Sort Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search services, providers, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm">
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 font-medium text-sm transition-colors ${
                  activeCategory === category.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredServices.length}{" "}
          {activeCategory !== "all" ? categories.find((c) => c.id === activeCategory)?.name : ""} services in Pune
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredServices.map((service) => (
          <Link key={service.id} href={service.href} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              <div className="relative h-48">
                {/* Use service icon as background */}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${getServiceIcon(service.category).bgColor}`}
                >
                  <ServiceIcon category={service.category} size="xl" />
                </div>
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-primary">
                  {service.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{service.provider}</p>

                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                </div>

                <div className="flex flex-col text-sm text-gray-500 space-y-1">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{service.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{service.availability}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {filteredServices.length > 0 && (
        <div className="flex justify-center mt-8">
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

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">No services found matching your criteria.</p>
          <button
            onClick={() => {
              setActiveCategory("all")
              setSearchTerm("")
            }}
            className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Custom CSS for hiding scrollbar but allowing scroll */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  )
}


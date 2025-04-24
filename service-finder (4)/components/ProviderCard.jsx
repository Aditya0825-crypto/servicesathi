import Link from "next/link"
import { Star, MapPin, CheckCircle } from "lucide-react"
import ServiceIcon from "@/components/ServiceIcons"

export default function ProviderCard({ provider }) {
  // Get the first letter of the provider name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "P"
  }

  // Determine if provider is verified (for this demo, providers with rating >= 4.8 are verified)
  const isVerified = provider.rating >= 4.8

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="p-6">
        <div className="flex items-start">
          {provider.image ? (
            <img
              src={provider.image || "/placeholder.svg?height=100&width=100"}
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
                <div className="flex items-center">
                  <p className="text-gray-600 text-sm capitalize mr-2">{provider.category}</p>
                  <ServiceIcon category={provider.category} size="sm" />
                </div>
              </div>
              {isVerified && (
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
                {provider.location || provider.city}
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{provider.description}</p>

            <Link
              href={`/providers/${provider.id}`}
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm"
            >
              View Profile
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


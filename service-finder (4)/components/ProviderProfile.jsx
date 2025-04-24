import { Star, MapPin, CheckCircle, Award, Clock, Calendar } from "lucide-react"
import ServiceIcon from "@/components/ServiceIcons"

export default function ProviderProfile({ provider }) {
  // Get the first letter of the provider name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "P"
  }

  // Determine if provider is verified (for this demo, providers with rating >= 4.8 are verified)
  const isVerified = provider.rating >= 4.8

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-shrink-0">
            {provider.image ? (
              <img
                src={provider.image || "/placeholder.svg?height=150&width=150"}
                alt={provider.businessName}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-semibold">
                {getInitial(provider.businessName)}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{provider.businessName}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-gray-600 text-sm capitalize mr-3">
                    <ServiceIcon category={provider.category} size="sm" className="mr-1" />
                    {provider.category}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.location}
                  </div>
                </div>
              </div>

              {isVerified && (
                <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-full">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="font-medium">Verified Provider</span>
                </div>
              )}
            </div>

            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-500 mr-3">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-medium">{provider.rating}</span>
              </div>
              <span className="text-gray-600">({provider.reviews} reviews)</span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center text-gray-700">
                <Award className="h-5 w-5 mr-2 text-primary" />
                <span>{provider.experience} experience</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>Fast Response Time</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>Available for booking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700">{provider.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Services Offered</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {provider.services &&
              provider.services.map((service, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  {service}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


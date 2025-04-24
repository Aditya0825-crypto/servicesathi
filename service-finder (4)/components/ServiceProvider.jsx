import { Star, Shield, Clock, Calendar, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function ServiceProvider({ id }) {
  // This would normally come from an API or database
  const provider = {
    id: 1,
    name: "Sharma Plumbing Solutions",
    image: null, // Set to null to test the avatar letter
    rating: 4.8,
    reviews: 127,
    verified: true,
    responseTime: "Usually responds within 1 hour",
    memberSince: "January 2020",
    completedJobs: 1240,
    location: "Delhi NCR",
    about:
      "We are a team of licensed plumbers with over 15 years of experience. We pride ourselves on providing high-quality service at affordable prices.",
  }

  // Get the first letter of the provider name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "S"
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
      <div className="p-6">
        <div className="flex items-center mb-4">
          {provider.image ? (
            <img
              src={provider.image || "/placeholder.svg"}
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold mr-4">
              {getInitial(provider.name)}
            </div>
          )}
          <div>
            <h2 className="font-bold text-lg">{provider.name}</h2>
            <div className="flex items-center">
              <div className="flex items-center text-yellow-500 mr-2">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-sm font-medium">{provider.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {provider.verified && (
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm mb-4 w-fit">
            <Shield className="h-4 w-4 mr-1" />
            Verified Provider
          </div>
        )}

        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <span className="text-gray-700 text-sm">{provider.responseTime}</span>
          </div>
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <span className="text-gray-700 text-sm">Member since {provider.memberSince}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <span className="text-gray-700 text-sm">{provider.location}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-2">About</h3>
          <p className="text-gray-700 text-sm">{provider.about}</p>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{provider.completedJobs}+</div>
            <div className="text-gray-600 text-sm">Jobs Completed</div>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href={`/services/${id}/book`}
            className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors flex justify-center items-center"
          >
            Book Now
          </Link>
          <button className="w-full py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex justify-center items-center">
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </button>
          <button className="w-full py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex justify-center items-center">
            <Mail className="h-4 w-4 mr-2" />
            Message
          </button>
        </div>
      </div>
    </div>
  )
}


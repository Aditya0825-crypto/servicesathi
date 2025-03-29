import { Star, Shield, MapPin, Calendar, CheckCircle } from "lucide-react"

export default function ProviderProfile({ id }) {
  // This would normally come from an API or database
  const provider = {
    id: id,
    name: "Sharma Plumbing Solutions",
    category: "Plumbing",
    image: null, // Set to null to test the avatar letter
    coverImage: "/placeholder.svg?height=400&width=1200",
    rating: 4.8,
    reviews: 127,
    verified: true,
    featured: true,
    memberSince: "January 2020",
    completedJobs: 1240,
    location: "Delhi NCR",
    about:
      "We are a team of licensed plumbers with over 15 years of experience. We pride ourselves on providing high-quality service at affordable prices. Our team is dedicated to solving your plumbing issues quickly and efficiently.",
    services: [
      "Leak detection and repair",
      "Drain cleaning and unclogging",
      "Water heater installation and repair",
      "Pipe replacement and repair",
      "Fixture installation and repair",
      "Sewer line services",
    ],
    certifications: ["Licensed Plumbing Contractor", "Certified by Indian Plumbing Association", "Insured and Bonded"],
  }

  // Get the first letter of the provider name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "S"
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="h-48 md:h-64 bg-gray-200 relative">
        <img
          src={provider.coverImage || "/placeholder.svg"}
          alt={`${provider.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent h-1/2"></div>
      </div>

      <div className="p-6 relative">
        <div className="flex flex-col md:flex-row md:items-end">
          <div className="absolute -top-16 left-6 md:relative md:top-auto md:left-auto md:-mt-20 mr-6">
            {provider.image ? (
              <img
                src={provider.image || "/placeholder.svg"}
                alt={provider.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-3xl font-semibold">
                {getInitial(provider.name)}
              </div>
            )}
          </div>

          <div className="mt-10 md:mt-0 flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-2xl font-bold">{provider.name}</h1>
                <p className="text-gray-600">{provider.category} Specialist</p>
              </div>

              {provider.verified && (
                <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm mt-2 md:mt-0 w-fit">
                  <Shield className="h-4 w-4 mr-1" />
                  Verified Provider
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center">
                <div className="flex items-center text-yellow-500 mr-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
              </div>

              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {provider.location}
              </div>

              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                Member since {provider.memberSince}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <p className="text-gray-700 mb-6">{provider.about}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Services Offered</h3>
              <ul className="space-y-2">
                {provider.services.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Certifications</h3>
              <ul className="space-y-2">
                {provider.certifications.map((certification, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{certification}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-center bg-gray-50 p-4 rounded-md">
                <div className="text-2xl font-bold text-gray-900">{provider.completedJobs}+</div>
                <div className="text-gray-600 text-sm">Jobs Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import Link from "next/link"
import { Star } from "lucide-react"

export default function ProviderServices({ id }) {
  // This would normally come from an API or database
  const services = [
    {
      id: 1,
      title: "Basic Plumbing Service",
      description: "Includes inspection, minor repairs, and maintenance of basic plumbing systems.",
      price: "₹500-800",
      duration: "1-2 hours",
      rating: 4.8,
      reviews: 56,
      image: "/placeholder.svg?height=200&width=300",
      href: `/services/plumbing/1`,
    },
    {
      id: 2,
      title: "Drain Cleaning & Unclogging",
      description: "Professional drain cleaning service to remove blockages and ensure proper water flow.",
      price: "₹600-1000",
      duration: "1-3 hours",
      rating: 4.7,
      reviews: 42,
      image: "/placeholder.svg?height=200&width=300",
      href: `/services/plumbing/2`,
    },
    {
      id: 3,
      title: "Pipe Repair & Replacement",
      description: "Complete pipe repair or replacement service for damaged or leaking pipes.",
      price: "₹1000-2500",
      duration: "2-4 hours",
      rating: 4.9,
      reviews: 38,
      image: "/placeholder.svg?height=200&width=300",
      href: `/services/plumbing/3`,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Services Offered</h2>

        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="md:flex">
                <div className="md:w-1/4 h-40 md:h-auto mb-4 md:mb-0">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-yellow-500 mr-2">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm font-medium">{service.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{service.price}</div>
                      <div className="text-gray-500 text-sm">{service.duration}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{service.description}</p>

                  <div className="flex space-x-3">
                    <Link
                      href={service.href}
                      className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`${service.href}/book`}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href={`/providers/${id}/services`}
            className="inline-block px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  )
}


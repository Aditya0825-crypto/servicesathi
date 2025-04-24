import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"

export default function ProviderServices({ services }) {
  if (!services || services.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Services</h3>
        <p className="text-gray-600">This provider has no listed services at the moment.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Services Offered</h3>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{service.title}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary">{service.price}</div>
                <div className="text-sm text-green-600">{service.availability}</div>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-2 line-clamp-2">{service.description}</p>
            <div className="mt-3">
              <Link
                href={service.href}
                className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm"
              >
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


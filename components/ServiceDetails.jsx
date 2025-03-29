import { Clock, CheckCircle, AlertCircle, MapPin } from "lucide-react"
import Link from "next/link"
import ServiceIcon from "@/components/ServiceIcons"

export default function ServiceDetails({ id, category }) {
  // This would normally come from an API or database
  const service = {
    id: id,
    category: category,
    title: "Professional Plumbing Services",
    provider: "Sharma Plumbing Solutions",
    rating: 4.8,
    reviews: 127,
    price: "₹300-500/hr",
    location: "Delhi NCR",
    distance: "2.5 km away",
    availability: "Available today",
    description:
      "Expert plumbing services for residential and commercial properties. We specialize in repairs, installations, and maintenance of all plumbing systems. Our team of licensed plumbers has over 15 years of experience in the industry.",
    features: [
      "Licensed and insured professionals",
      "Emergency services available 24/7",
      "Free estimates for all jobs",
      "Guaranteed work with warranty",
      "Transparent pricing with no hidden fees",
      "Clean and respectful of your property",
    ],
    services: [
      "Leak detection and repair",
      "Drain cleaning and unclogging",
      "Water heater installation and repair",
      "Pipe replacement and repair",
      "Fixture installation and repair",
      "Sewer line services",
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      {/* Service Header with Icon instead of images */}
      <div className="p-6 pb-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div className="flex items-center">
            <div className="mr-4">
              <ServiceIcon category={service.category} size="lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
              <p className="text-gray-600 mb-2">{service.provider}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {service.distance}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.availability}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-xl font-bold text-gray-900 mb-2">{service.price}</div>
            <Link
              href={`/services/${service.category}/${service.id}/book`}
              className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold mb-4">About This Service</h2>
          <p className="text-gray-700 mb-6">{service.description}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-bold mb-3">Features</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Services Offered</h3>
              <ul className="space-y-2">
                {service.services.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-yellow-800">Important Information</h4>
              <p className="text-yellow-700 text-sm">
                Please ensure someone over 18 years of age is present during the service appointment. Cancellations must
                be made at least 24 hours in advance to avoid cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


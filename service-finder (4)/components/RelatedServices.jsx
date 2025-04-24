import Link from "next/link"
import { Star } from "lucide-react"
import ServiceIcon from "@/components/ServiceIcons"

export default function RelatedServices({ category, currentId }) {
  // This would normally come from an API or database
  const services = [
    {
      id: 101,
      title: "Emergency Plumbing Services",
      provider: "Gupta Emergency Plumbers",
      rating: 4.7,
      reviews: 89,
      category: "plumbing",
      price: "₹400-600/hr",
      href: `/services/${category}/101`,
    },
    {
      id: 102,
      title: "Bathroom Plumbing Specialist",
      provider: "Verma Bathroom Solutions",
      rating: 4.8,
      reviews: 112,
      category: "plumbing",
      price: "₹350-550/hr",
      href: `/services/${category}/102`,
    },
    {
      id: 103,
      title: "Affordable Plumbing Solutions",
      provider: "Budget Plumbers India",
      rating: 4.5,
      reviews: 76,
      category: "plumbing",
      price: "₹250-400/hr",
      href: `/services/${category}/103`,
    },
  ]

  // Filter out the current service
  const filteredServices = services.filter((service) => service.id.toString() !== currentId)

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Similar Services</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Link key={service.id} href={service.href} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow card-hover">
              <div className="p-4 flex flex-col items-center">
                <ServiceIcon category={service.category || category} size="md" />
                <h3 className="font-bold text-lg mb-1 mt-3 group-hover:text-primary transition-colors text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 text-center">{service.provider}</p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-500 mr-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">{service.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


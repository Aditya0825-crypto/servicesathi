import Link from "next/link"
import { Star, MapPin } from "lucide-react"

import ServiceIcon from "@/components/ServiceIcon"


export default function FeaturedServices() {
  const services = [
    {
      id: 1,
      title: "Professional Plumbing Services",
      provider: "Sharma Plumbing Solutions",
      rating: 4.8,
      reviews: 127,
      category: "plumbing",
      price: "₹300-500/hr",
      location: "Kothrud, Pune",
      href: "/services/plumbing/1",
    },
    {
      id: 2,
      title: "Expert Electrical Repairs & Installation",
      provider: "Patel Electrical Services",
      rating: 4.7,
      reviews: 94,
      category: "electrical",
      price: "₹350-600/hr",
      location: "Baner, Pune",
      href: "/services/electrical/2",
    },
    {
      id: 3,
      title: "Premium House Cleaning Services",
      provider: "Swachh Home Cleaners",
      rating: 4.9,
      reviews: 156,
      category: "cleaning",
      price: "₹250-400/hr",
      location: "Viman Nagar, Pune",
      href: "/services/cleaning/3",
    },
    {
      id: 4,
      title: "Custom Carpentry & Woodworking",
      provider: "Singh Furniture Works",
      rating: 4.8,
      reviews: 83,
      category: "carpentry",
      price: "₹400-700/hr",
      location: "Hinjewadi, Pune",
      href: "/services/carpentry/4",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Service Providers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated professionals with proven track records of excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={service.href} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow card-hover h-full">
                <div className="relative h-48 flex items-center justify-center bg-gray-50">
                  {/* Replace image with service icon */}
                  <ServiceIcon category={service.category} size="xl" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{service.provider}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-500 mr-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{service.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">{service.price}</span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  )
}


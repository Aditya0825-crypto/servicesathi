import Link from "next/link"
import { Star, MapPin, Clock } from "lucide-react"
import ServiceIcon from "./ServiceIcons"

export default function ServiceCard({ service }) {
  if (!service) return null

  return (
    <Link href={service.href || `/services/${service.category}/${service.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full transform hover:-translate-y-1">
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <ServiceIcon category={service.category} size="lg" />
          </div>

          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-center line-clamp-2 dark:text-white">
            {service.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 text-center">{service.provider}</p>

          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center text-yellow-500 mr-2">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm font-medium">{service.rating}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">({service.reviews || 0} reviews)</span>
          </div>

          <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-4">
            <div className="flex items-center justify-center">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{service.location || "Pune, Maharashtra"}</span>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{service.availability || "Available today"}</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-md">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 text-center font-medium text-gray-900 dark:text-white">
              {service.price}
            </div>
            <div className="absolute inset-0 bg-primary text-white flex items-center justify-center font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              Book Now
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


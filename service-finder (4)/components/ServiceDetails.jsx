"use client"

import { useState } from "react"
import { Star, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import ContactForm from "./ContactForm"
import MessageForm from "./MessageForm"
import ServiceIcon from "./ServiceIcons"

export default function ServiceDetails({ service }) {
  const [showContactForm, setShowContactForm] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const router = useRouter()

  if (!service) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  const handleBookNow = () => {
    router.push(`/services/${service.category}/${service.id}/book`)
  }

  // Features and services offered are hardcoded for now
  // In a real app, these would come from the service data
  const features = [
    "Licensed and insured professionals",
    "Emergency services available 24/7",
    "Free estimates for all jobs",
    "Guaranteed work with warranty",
    "Transparent pricing with no hidden fees",
    "Clean and respectful of your property",
  ]

  const servicesOffered = [
    "Leak detection and repair",
    "Drain cleaning and unclogging",
    "Water heater installation and repair",
    "Pipe replacement and repair",
    "Fixture installation and repair",
    "Sewer line services",
  ]

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        {/* Service Header */}
        <div className="p-6 pb-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div className="flex items-center">
              <div className="mr-4">
                <ServiceIcon category={service.category} size="lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{service.provider}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {service.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.availability}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.price}</div>
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-500 mr-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{service.rating}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">({service.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">About This Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Features</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Services Offered</h3>
                <ul className="space-y-2">
                  {servicesOffered.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 dark:text-yellow-500">Important Information</h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Please ensure someone over 18 years of age is present during the service appointment. Cancellations
                  must be made at least 24 hours in advance to avoid cancellation fees. We serve all areas of Pune.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleBookNow}
                className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Contact Provider
              </button>
              <button
                onClick={() => setShowMessageForm(true)}
                className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Message Provider
              </button>
            </div>
          </div>
        </div>
      </div>

      {showContactForm && <ContactForm provider={service.provider} onClose={() => setShowContactForm(false)} />}

      {showMessageForm && <MessageForm provider={service.provider} onClose={() => setShowMessageForm(false)} />}
    </>
  )
}


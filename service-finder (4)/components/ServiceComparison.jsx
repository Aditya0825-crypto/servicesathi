"use client"

import { useState, useEffect } from "react"
import { X, Check, AlertCircle, Star } from "lucide-react"
import ServiceIcon from "./ServiceIcons"

export default function ServiceComparison() {
  const [selectedServices, setSelectedServices] = useState([])
  const [availableServices, setAvailableServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAvailableServices([
        {
          id: "service-1",
          title: "Premium Plumbing Service",
          provider: "Sharma Plumbing Solutions",
          category: "plumbing",
          rating: 4.8,
          reviews: 127,
          price: "₹400/hr",
          response_time: "Under 30 mins",
          warranty: "90 days",
          features: ["Emergency service", "Licensed professionals", "Parts included"],
        },
        {
          id: "service-2",
          title: "Standard Plumbing Service",
          provider: "City Plumbers",
          category: "plumbing",
          rating: 4.5,
          reviews: 89,
          price: "₹300/hr",
          response_time: "Same day",
          warranty: "30 days",
          features: ["Licensed professionals", "Transparent pricing"],
        },
        {
          id: "service-3",
          title: "Budget Plumbing Solutions",
          provider: "Quick Fix Plumbing",
          category: "plumbing",
          rating: 4.2,
          reviews: 56,
          price: "₹250/hr",
          response_time: "Next day",
          warranty: "15 days",
          features: ["Affordable rates", "Free estimates"],
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const addToComparison = (service) => {
    if (selectedServices.length < 3) {
      setSelectedServices([...selectedServices, service])
    }
  }

  const removeFromComparison = (serviceId) => {
    setSelectedServices(selectedServices.filter((service) => service.id !== serviceId))
  }

  const isInComparison = (serviceId) => {
    return selectedServices.some((service) => service.id === serviceId)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Compare Services</h2>
        <p className="text-gray-600 text-sm">Select up to 3 services to compare side by side</p>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      ) : (
        <>
          {/* Available services to compare */}
          <div className="p-4 border-b">
            <h3 className="font-medium mb-3">Available Services</h3>
            <div className="space-y-3">
              {availableServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <ServiceIcon category={service.category} size="sm" />
                    <div className="ml-3">
                      <div className="font-medium">{service.title}</div>
                      <div className="text-sm text-gray-600">{service.provider}</div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      isInComparison(service.id) ? removeFromComparison(service.id) : addToComparison(service)
                    }
                    className={`px-3 py-1 rounded-md text-sm ${
                      isInComparison(service.id)
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                    disabled={selectedServices.length >= 3 && !isInComparison(service.id)}
                  >
                    {isInComparison(service.id) ? "Remove" : "Compare"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          {selectedServices.length > 0 ? (
            <div className="p-4 overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left font-medium text-gray-600">Feature</th>
                    {selectedServices.map((service) => (
                      <th key={service.id} className="p-2 text-left min-w-[200px]">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{service.title}</span>
                          <button
                            onClick={() => removeFromComparison(service.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Provider</td>
                    {selectedServices.map((service) => (
                      <td key={service.id} className="p-2">
                        {service.provider}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Price</td>
                    {selectedServices.map((service) => (
                      <td key={service.id} className="p-2 font-bold">
                        {service.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Rating</td>
                    {selectedServices.map((service) => (
                      <td key={service.id} className="p-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1">{service.rating}</span>
                          <span className="ml-1 text-gray-500 text-sm">({service.reviews})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Response Time</td>
                    {selectedServices.map((service) => (
                      <td key={service.id} className="p-2">
                        {service.response_time}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Warranty</td>
                    {selectedServices.map((service) => (
                      <td key={service.id} className="p-2">
                        {service.warranty}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Features</td>
                    {selectedServices.map((service) => (
                      <td key={service.id} className="p-2">
                        <ul className="space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Select services to compare them side by side</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}


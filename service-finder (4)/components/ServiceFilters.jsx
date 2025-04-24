"use client"

import { useState } from "react"
import { Star, ChevronDown, ChevronUp } from "lucide-react"

export default function ServiceFilters({ filters, onFilterChange }) {
  const [expanded, setExpanded] = useState({
    price: true,
    rating: true,
    availability: true,
  })

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handlePriceChange = (value) => {
    onFilterChange({ priceRange: value })
  }

  const handleRatingChange = (value) => {
    onFilterChange({ rating: value })
  }

  const handleAvailabilityChange = (value) => {
    onFilterChange({ availability: value })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Filters</h2>

      {/* Price Range Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between cursor-pointer mb-2" onClick={() => toggleSection("price")}>
          <h3 className="font-medium text-gray-900 dark:text-white">Price Range</h3>
          {expanded.price ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        {expanded.price && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange([filters.priceRange[0], Number.parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => handlePriceChange([0, 1000])}
                className={`px-2 py-1 text-xs rounded-md border ${
                  filters.priceRange[1] === 1000
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                Under ₹1000
              </button>
              <button
                onClick={() => handlePriceChange([0, 2000])}
                className={`px-2 py-1 text-xs rounded-md border ${
                  filters.priceRange[1] === 2000
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                Under ₹2000
              </button>
              <button
                onClick={() => handlePriceChange([0, 3000])}
                className={`px-2 py-1 text-xs rounded-md border ${
                  filters.priceRange[1] === 3000
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                Under ₹3000
              </button>
              <button
                onClick={() => handlePriceChange([0, 5000])}
                className={`px-2 py-1 text-xs rounded-md border ${
                  filters.priceRange[1] === 5000
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                All Prices
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between cursor-pointer mb-2" onClick={() => toggleSection("rating")}>
          <h3 className="font-medium text-gray-900 dark:text-white">Rating</h3>
          {expanded.rating ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        {expanded.rating && (
          <div className="space-y-2">
            {[4, 3, 0].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  filters.rating === rating
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {rating > 0 ? (
                  <>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <span className="ml-2">{rating}+ stars</span>
                  </>
                ) : (
                  <span>All Ratings</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => toggleSection("availability")}
        >
          <h3 className="font-medium text-gray-900 dark:text-white">Availability</h3>
          {expanded.availability ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        {expanded.availability && (
          <div className="space-y-2">
            {["any", "today", "tomorrow", "this_week"].map((availability) => (
              <button
                key={availability}
                onClick={() => handleAvailabilityChange(availability)}
                className={`w-full px-3 py-2 text-left rounded-md ${
                  filters.availability === availability
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {availability === "any" && "Any time"}
                {availability === "today" && "Available today"}
                {availability === "tomorrow" && "Available tomorrow"}
                {availability === "this_week" && "Available this week"}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          onFilterChange({
            priceRange: [0, 5000],
            rating: 0,
            availability: "any",
          })
        }}
        className="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        Reset Filters
      </button>
    </div>
  )
}


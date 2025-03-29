"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"

export default function ServiceFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [rating, setRating] = useState(0)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    location: true,
    availability: true,
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const [categories, setCategories] = useState({
    plumbing: false,
    electrical: false,
    carpentry: false,
    cleaning: false,
    painting: false,
    ac_repair: false,
    pest_control: false,
  })

  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category],
    })
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const resetFilters = () => {
    setCategories({
      plumbing: false,
      electrical: false,
      carpentry: false,
      cleaning: false,
      painting: false,
      ac_repair: false,
      pest_control: false,
    })
    setPriceRange([0, 2000])
    setRating(0)
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h2>
        <button onClick={resetFilters} className="text-sm text-primary hover:text-primary/80 font-medium">
          Reset All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          <span>Categories</span>
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-2">
            {Object.keys(categories).map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  checked={categories[category]}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={category} className="ml-2 text-gray-700 capitalize">
                  {category.replace("_", " ")}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          <span>Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.price && (
          <>
            <Slider
              defaultValue={[0, 2000]}
              max={2000}
              step={100}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}+</span>
            </div>
          </>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          <span>Minimum Rating</span>
          {expandedSections.rating ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`h-8 w-8 flex items-center justify-center rounded-full ${
                  rating >= star ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("location")}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          <span>Location in Pune</span>
          {expandedSections.location ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.location && (
          <div className="space-y-2">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm">
              <option value="">All Areas</option>
              <option value="kothrud">Kothrud</option>
              <option value="baner">Baner</option>
              <option value="hinjewadi">Hinjewadi</option>
              <option value="viman-nagar">Viman Nagar</option>
              <option value="kharadi">Kharadi</option>
              <option value="hadapsar">Hadapsar</option>
              <option value="aundh">Aundh</option>
              <option value="shivaji-nagar">Shivaji Nagar</option>
            </select>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("availability")}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          <span>Availability</span>
          {expandedSections.availability ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.availability && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available-today"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="available-today" className="ml-2 text-gray-700">
                Available Today
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available-weekend"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="available-weekend" className="ml-2 text-gray-700">
                Available on Weekends
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available-24-7"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="available-24-7" className="ml-2 text-gray-700">
                24/7 Emergency Service
              </label>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  )
}


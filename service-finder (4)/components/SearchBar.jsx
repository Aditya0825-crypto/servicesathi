"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef(null)

  // Mock suggestions - in a real app, these would come from an API
  const mockSuggestions = [
    { id: 1, text: "Plumbing repair", category: "plumbing" },
    { id: 2, text: "Electrical wiring", category: "electrical" },
    { id: 3, text: "Furniture assembly", category: "carpentry" },
    { id: 4, text: "Deep house cleaning", category: "cleaning" },
    { id: 5, text: "Pipe leakage repair", category: "plumbing" },
    { id: 6, text: "Light fixture installation", category: "electrical" },
  ]

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true)

      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter((item) => item.text.toLowerCase().includes(query.toLowerCase()))
        setSuggestions(filtered)
        setIsLoading(false)
        setIsOpen(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/services?search=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    router.push(`/services/${suggestion.category}?search=${encodeURIComponent(suggestion.text)}`)
    setQuery(suggestion.text)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for services..."
            className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-gray-900 bg-white"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-800">{suggestion.text}</span>
                  </div>
                  <div className="ml-6 text-xs text-gray-500 mt-1">
                    in <span className="font-medium capitalize">{suggestion.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}

          <div className="p-2 border-t border-gray-100 bg-gray-50">
            <button onClick={handleSearch} className="w-full py-2 text-sm text-center text-primary hover:underline">
              Search for "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


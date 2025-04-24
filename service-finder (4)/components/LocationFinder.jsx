"use client"

import { useState } from "react"
import { MapPin, Loader2 } from "lucide-react"

export default function LocationFinder({ onLocationSelect }) {
  const [isLocating, setIsLocating] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [popularLocations, setPopularLocations] = useState([
    { name: "Kothrud", lat: 18.5074, lng: 73.8077 },
    { name: "Hinjewadi", lat: 18.5912, lng: 73.738 },
    { name: "Baner", lat: 18.5642, lng: 73.7769 },
    { name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
  ])

  const detectLocation = () => {
    setIsLocating(true)
    setErrorMessage("")

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords

            // Reverse geocoding to get address from coordinates
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            )

            if (response.ok) {
              const data = await response.json()
              const location = {
                address: data.display_name,
                city: data.address.city || data.address.town || data.address.village || "Unknown",
                lat: latitude,
                lng: longitude,
              }

              setCurrentLocation(location)
              if (onLocationSelect) onLocationSelect(location)
            } else {
              setErrorMessage("Could not determine your address. Please select a location manually.")
            }
          } catch (error) {
            setErrorMessage("Error detecting location. Please try again.")
            console.error("Geolocation error:", error)
          } finally {
            setIsLocating(false)
          }
        },
        (error) => {
          setIsLocating(false)
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Location permission denied. Please enable location services.")
              break
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Location information unavailable.")
              break
            case error.TIMEOUT:
              setErrorMessage("Location request timed out.")
              break
            default:
              setErrorMessage("An unknown error occurred.")
          }
        },
      )
    } else {
      setIsLocating(false)
      setErrorMessage("Geolocation is not supported by your browser.")
    }
  }

  const selectPopularLocation = (location) => {
    setCurrentLocation({
      address: location.name + ", Pune",
      city: "Pune",
      lat: location.lat,
      lng: location.lng,
    })

    if (onLocationSelect) {
      onLocationSelect({
        address: location.name + ", Pune",
        city: "Pune",
        lat: location.lat,
        lng: location.lng,
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-3">Find Services Near You</h3>

      <button
        onClick={detectLocation}
        disabled={isLocating}
        className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors mb-4"
      >
        {isLocating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Detecting location...
          </>
        ) : (
          <>
            <MapPin className="w-4 h-4 mr-2" />
            Use my current location
          </>
        )}
      </button>

      {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

      {currentLocation && (
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <div className="font-medium">Your location:</div>
          <div className="text-gray-600 text-sm">{currentLocation.address}</div>
        </div>
      )}

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-600 mb-2">Popular locations in Pune:</div>
        <div className="flex flex-wrap gap-2">
          {popularLocations.map((location) => (
            <button
              key={location.name}
              onClick={() => selectPopularLocation(location)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


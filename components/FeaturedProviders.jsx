"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useProvidersContext } from "@/lib/auth-context"
import ProviderCard from "@/components/ProviderCard"

export default function FeaturedProviders() {
  const { providers } = useProvidersContext()
  const [featuredProviders, setFeaturedProviders] = useState([])

  useEffect(() => {
    // Get featured providers (verified ones)
    const featured = providers.filter((provider) => provider.verified).slice(0, 2) // Only show 2 featured providers

    setFeaturedProviders(featured)
  }, [providers])

  if (featuredProviders.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Service Providers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated professionals for quality service
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/providers"
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            View All Providers
          </Link>
        </div>
      </div>
    </section>
  )
}


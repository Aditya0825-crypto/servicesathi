import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProvidersList from "@/components/ProvidersList"

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">Our Service Providers</h1>
            <p className="text-white/90 mt-2">Connect with top-rated professionals in your area</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <ProvidersList />
        </div>
      </main>
      <Footer />
    </div>
  )
}


import { getProviderById, getServicesByProvider } from "@/lib/data"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProviderProfile from "@/components/ProviderProfile"
import ProviderServices from "@/components/ProviderServices"
import ProviderReviews from "@/components/ProviderReviews"

export default async function ProviderDetailPage({ params }) {
  const provider = await getProviderById(params.id)
  const services = await getServicesByProvider(params.id)

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Provider Not Found</h1>
            <p className="text-gray-600">The provider you are looking for does not exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">{provider.businessName}</h1>
            <p className="text-white/90 mt-2">
              {provider.category} Services in {provider.city}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProviderProfile provider={provider} />

              {services && services.length > 0 && (
                <div className="mt-8">
                  <ProviderServices services={services} />
                </div>
              )}

              <div className="mt-8">
                <ProviderReviews providerId={provider.id} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Address</p>
                    <p className="font-medium">{provider.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-medium">{provider.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium">{provider.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Working Hours</p>
                    <p className="font-medium">{provider.workingHours}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
                    Contact Provider
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


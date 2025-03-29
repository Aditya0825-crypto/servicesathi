import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ServicesList from "@/components/ServicesList"
import ServiceFilters from "@/components/ServiceFilters"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">Services in Pune</h1>
            <p className="text-white/90 mt-2">Find trusted professionals for all your home service needs</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <ServiceFilters />
            </div>
            <div className="md:w-3/4">
              <ServicesList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


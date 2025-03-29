import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ServiceDetails from "@/components/ServiceDetails"
import ServiceProvider from "@/components/ServiceProvider"
import ServiceReviews from "@/components/ServiceReviews"
import RelatedServices from "@/components/RelatedServices"

export default function ServiceDetailPage({ params }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <ServiceDetails id={params.id} category={params.category} />
              <ServiceReviews id={params.id} />
            </div>
            <div className="lg:w-1/3">
              <ServiceProvider id={params.id} />
            </div>
          </div>
          <RelatedServices category={params.category} currentId={params.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}


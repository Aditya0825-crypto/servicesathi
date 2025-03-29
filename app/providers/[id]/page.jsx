import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProviderProfile from "@/components/ProviderProfile"
import ProviderServices from "@/components/ProviderServices"
import ProviderReviews from "@/components/ProviderReviews"

export default function ProviderDetailPage({ params }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <ProviderProfile id={params.id} />
              <ProviderServices id={params.id} />
              <ProviderReviews id={params.id} />
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium">contact@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Address</p>
                    <p className="font-medium">123 Service Street, Delhi, 110001</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Working Hours</p>
                    <p className="font-medium">Mon-Sat: 9:00 AM - 8:00 PM</p>
                    <p className="font-medium">Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
                    Contact Provider
                  </button>
                  <button className="w-full py-2 mt-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                    Book Service
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


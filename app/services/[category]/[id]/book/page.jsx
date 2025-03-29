import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BookingForm from "@/components/BookingForm"

export default function BookingPage({ params }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">Book a Service</h1>
            <p className="text-white/90 mt-2">Complete the form below to schedule your appointment</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <BookingForm id={params.id} category={params.category} />
        </div>
      </main>
      <Footer />
    </div>
  )
}


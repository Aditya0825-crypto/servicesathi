"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

// FAQ item component with toggle functionality
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex w-full justify-between items-center text-left font-medium text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && <div className="mt-3 text-gray-600">{answer}</div>}
    </div>
  )
}

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "To book a service, navigate to the service page, select your preferred provider, and click the 'Book Now' button. You'll be guided through selecting a date, time, and providing your address details. You can also choose your preferred payment method during this process.",
    },
    {
      question: "What areas in Pune do you serve?",
      answer:
        "We currently serve all areas in Pune including Kothrud, Baner, Hinjewadi, Viman Nagar, Kharadi, Hadapsar, Aundh, Shivaji Nagar, and other localities. You can filter services by your specific area on our services page.",
    },
    {
      question: "How are service providers verified?",
      answer:
        "All our service providers undergo a thorough verification process that includes identity verification, background checks, skill assessment, and reference checks. We also continuously monitor provider ratings and reviews to ensure quality service.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel or reschedule a booking from your dashboard. Go to 'My Bookings' and select the booking you wish to modify. Cancellations made at least 24 hours in advance are free of charge. Late cancellations may incur a fee of up to 50% of the service cost.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and cash on service completion. You can select your preferred payment method during the booking process.",
    },
    {
      question: "Do you offer any guarantees on services?",
      answer:
        "Yes, we offer a satisfaction guarantee on all services. If you're not satisfied with a service, please contact our customer support within 24 hours of service completion to report any issues. We'll work to resolve the issue or provide a refund as appropriate.",
    },
    {
      question: "How are service prices determined?",
      answer:
        "Service prices are set by individual providers based on their expertise, materials required, and market rates. We ensure all prices are competitive and transparent. You can see the price range for each service on its listing page, and you'll receive a final quote before confirming your booking.",
    },
    {
      question: "Can I request a specific service provider?",
      answer:
        "Yes, you can browse provider profiles and select a specific provider for your service. You can view their ratings, reviews, and specialties to make an informed choice. If you've worked with a provider before, you can also book them directly from your booking history.",
    },
    {
      question: "What if the service takes longer than expected?",
      answer:
        "If a service takes longer than the estimated time, additional charges may apply based on the provider's hourly rate. The provider will inform you before continuing beyond the estimated time, and you'll have the option to approve the additional time or reschedule the remaining work.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team at +91 98345 15256 or email us at adityachaubey216@gmail.com. Our support hours are Monday to Saturday, 9:00 AM to 8:00 PM, and Sunday, 10:00 AM to 4:00 PM.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">Frequently Asked Questions</h1>
            <p className="text-white/90 mt-2">Find answers to common questions about our services</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="mb-8">
              <p className="text-gray-600">
                Can't find what you're looking for? Feel free to{" "}
                <Link href="/contact" className="text-primary font-medium hover:underline">
                  contact us
                </Link>{" "}
                or use our chat assistant for immediate help.
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


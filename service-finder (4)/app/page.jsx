import Header from "@/components/Header"
import AnimatedHero from "@/components/AnimatedHero"
import ServiceCategories from "@/components/ServiceCategories"
import FeaturedServices from "@/components/FeaturedServices"
import FeaturedProviders from "@/components/FeaturedProviders"
import HowItWorks from "@/components/HowItWorks"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"
import RegisterSW from "./register-sw"
import NotificationBadge from "@/components/NotificationBadge"
import ChatBot from "@/components/ChatBot"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <AnimatedHero />
        <ServiceCategories />
        <FeaturedServices />
        <FeaturedProviders />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
      <RegisterSW />
      <NotificationBadge />
      <ChatBot />
    </div>
  )
}


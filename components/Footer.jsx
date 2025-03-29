"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    try {
      // Mock successful subscription for preview
      setTimeout(() => {
        setSubscriptionStatus("success")
        setEmail("")
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      setSubscriptionStatus("error")
      setIsSubmitting(false)
    }

    // Clear status after 5 seconds
    setTimeout(() => {
      setSubscriptionStatus(null)
    }, 5000)
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-6">Stay updated with the latest services and exclusive offers</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 shadow-sm"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {subscriptionStatus === "success" && (
              <p className="mt-3 text-green-400 text-sm">Thank you for subscribing to our newsletter!</p>
            )}
            {subscriptionStatus === "error" && (
              <p className="mt-3 text-red-400 text-sm">Failed to subscribe. Please try again later.</p>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-primary p-1.5 rounded-md">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <span className="text-xl font-bold font-heading">
                  Service<span className="text-gray-400">Sarthi</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted companion for finding local service professionals in Pune.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/providers"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Providers
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/plumbing"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Plumbing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/electrical"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Electrical
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/carpentry"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Carpentry
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/cleaning"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    House Cleaning
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View All
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    Dhankawadi, Pune
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <a href="tel:+919834515256" className="text-gray-400 hover:text-white">
                    +91 98345 15256
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <a href="mailto:adityachaubey216@gmail.com" className="text-gray-400 hover:text-white">
                    adityachaubey216@gmail.com
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <h5 className="font-medium mb-2">Business Hours</h5>
                <p className="text-gray-400 text-sm">
                  Monday - Saturday: 9:00 AM - 8:00 PM
                  <br />
                  Sunday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {currentYear} ServiceSarthi. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


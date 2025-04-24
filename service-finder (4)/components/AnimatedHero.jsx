"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import SearchBar from "./SearchBar"

export default function AnimatedHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const popularServices = [
    { name: "Plumbing", href: "/services/plumbing" },
    { name: "Electrician", href: "/services/electrical" },
    { name: "Carpentry", href: "/services/carpentry" },
    { name: "House Cleaning", href: "/services/cleaning" },
  ]

  const popularAreas = [
    { name: "Kothrud", href: "/services?city=kothrud" },
    { name: "Hinjewadi", href: "/services?city=hinjewadi" },
    { name: "Baner", href: "/services?city=baner" },
    { name: "Viman Nagar", href: "/services?city=viman-nagar" },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const floatingShapeVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        y: { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" },
        opacity: { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" },
      },
    },
  }

  return (
    <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"
        variants={floatingShapeVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
        variants={floatingShapeVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl"
        variants={floatingShapeVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight"
            variants={itemVariants}
          >
            ServiceSarthi: Your Guide to <br className="hidden md:block" />
            Local Services in Pune
          </motion.h1>

          <motion.p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto" variants={itemVariants}>
            Connect with verified professionals for plumbing, electrical work, carpentry, house cleaning and more at
            affordable prices in Pune.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8">
            <SearchBar />
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-3 mt-6" variants={itemVariants}>
            {popularServices.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors shadow-sm"
              >
                {service.name}
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-300 shadow-sm"
                  >
                    <img
                      src={`/placeholder.svg?height=50&width=50`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-2 text-sm text-white/90">
                <span className="font-bold">5,000+</span> Verified Professionals in Pune
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center text-yellow-300 mr-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div className="text-sm text-white/90">
                <span className="font-bold">4.8/5</span> Customer Rating
              </div>
            </div>
          </motion.div>

          <motion.div className="mt-8" variants={itemVariants}>
            <p className="text-white/80 mb-2">Popular areas in Pune</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularAreas.map((area) => (
                <Link
                  key={area.name}
                  href={area.href}
                  className="text-white/90 hover:text-white hover:underline text-sm"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div className="mt-12" variants={itemVariants}>
            <Link
              href="/how-it-works"
              className="inline-flex items-center text-sm font-medium text-white hover:underline"
            >
              Learn how it works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


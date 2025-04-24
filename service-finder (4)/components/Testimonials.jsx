"use client"

import { useRef, useEffect } from "react"
import { Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import ServiceIcon from "@/components/ServiceIcons"

export default function Testimonials() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      service: "House Cleaning",
      category: "cleaning",
      rating: 5,
      comment:
        "The cleaning service was exceptional! The team was thorough, professional, and left my home spotless. Will definitely book again.",
      image: null, // Set to null to use first letter avatar
    },
    {
      id: 2,
      name: "Rajesh Patel",
      service: "Plumbing",
      category: "plumbing",
      rating: 5,
      comment:
        "Fixed my leaky faucet quickly and efficiently. Very knowledgeable and explained everything clearly. Fair pricing too!",
      image: null,
    },
    {
      id: 3,
      name: "Ananya Gupta",
      service: "Electrical",
      category: "electrical",
      rating: 4,
      comment:
        "Great service! The electrician was punctual, professional, and solved our wiring issues. Would recommend to anyone.",
      image: null,
    },
  ]

  // Get the first letter of the name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U"
  }

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read testimonials from satisfied customers who found reliable service providers through our platform
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center mb-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold mr-4">
                    {getInitial(testimonial.name)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <p className="text-gray-600 text-sm mr-2">{testimonial.service}</p>
                    <div className="w-5 h-5">
                      <ServiceIcon category={testimonial.category} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.comment}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


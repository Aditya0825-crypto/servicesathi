"use client"

import { useEffect, useRef } from "react"
import { Search, Calendar, CheckCircle } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function HowItWorks() {
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
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  const steps = [
    {
      id: 1,
      title: "Search for a Service",
      description: "Browse through our categories or search for the specific service you need.",
      icon: <Search className="h-10 w-10" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Book an Appointment",
      description: "Select a service provider and book a time that works for your schedule.",
      icon: <Calendar className="h-10 w-10" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Get the Job Done",
      description: "The professional will arrive at your location and complete the service.",
      icon: <CheckCircle className="h-10 w-10" />,
      color: "bg-purple-100 text-purple-600",
    },
  ]

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Finding and booking local services has never been easier</p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="text-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


"use client"

import { useState, useEffect } from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

export default function AnimatedCounter({ value, duration = 2, className = "" }) {
  const [isInView, setIsInView] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayValue = useSpring(rounded, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`counter-${value}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [value])

  useEffect(() => {
    if (isInView) {
      count.set(value)
    }
  }, [count, isInView, value])

  return (
    <motion.span id={`counter-${value}`} className={className}>
      {displayValue}
    </motion.span>
  )
}


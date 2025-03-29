"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import ServiceIcon from "./ServiceIcons"

export default function ServiceFilterTabs({ onCategoryChange }) {
  const [activeTab, setActiveTab] = useState("all")
  const [indicatorWidth, setIndicatorWidth] = useState(0)
  const [indicatorLeft, setIndicatorLeft] = useState(0)
  const tabsRef = useRef([])

  const categories = [
    { id: "all", name: "All Services" },
    { id: "plumbing", name: "Plumbing" },
    { id: "electrical", name: "Electrical" },
    { id: "cleaning", name: "Cleaning" },
    { id: "carpentry", name: "Carpentry" },
  ]

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeTabIndex = categories.findIndex((category) => category.id === activeTab)
    if (activeTabIndex !== -1 && tabsRef.current[activeTabIndex]) {
      const tabElement = tabsRef.current[activeTabIndex]
      setIndicatorWidth(tabElement.offsetWidth)
      setIndicatorLeft(tabElement.offsetLeft)
    }
  }, [activeTab, categories])

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId)
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }
  }

  return (
    <div className="mb-8">
      <div className="relative border-b border-gray-200">
        <div className="flex overflow-x-auto hide-scrollbar">
          {categories.map((category, index) => (
            <button
              key={category.id}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleTabClick(category.id)}
              className={`whitespace-nowrap px-4 py-3 font-medium text-sm transition-colors flex items-center ${
                activeTab === category.id ? "text-primary" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {category.id !== "all" && (
                <span className="mr-2">
                  <ServiceIcon category={category.id} size="sm" />
                </span>
              )}
              {category.name}
            </button>
          ))}
        </div>

        {/* Animated indicator */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-primary"
          initial={false}
          animate={{
            width: indicatorWidth,
            left: indicatorLeft,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Custom CSS for hiding scrollbar but allowing scroll */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  )
}


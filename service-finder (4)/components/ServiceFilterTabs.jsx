"use client"

import { Wrench, Zap, Paintbrush, Trash2 } from "lucide-react"

export default function ServiceFilterTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "all", label: "All Services", icon: null },
    { id: "plumbing", label: "Plumbing", icon: <Wrench className="h-4 w-4 mr-2" /> },
    { id: "electrical", label: "Electrical", icon: <Zap className="h-4 w-4 mr-2" /> },
    { id: "carpentry", label: "Carpentry", icon: <Paintbrush className="h-4 w-4 mr-2" /> },
    { id: "cleaning", label: "Cleaning", icon: <Trash2 className="h-4 w-4 mr-2" /> },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 mb-6">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}


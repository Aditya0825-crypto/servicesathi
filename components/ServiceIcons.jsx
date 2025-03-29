import { Wrench, Zap, Hammer, SprayCanIcon as Spray, Shovel, Sofa, Settings } from "lucide-react"

// Service category icons with colors
export const serviceIcons = {
  plumbing: {
    icon: <Wrench className="h-full w-full" />,
    color: "bg-blue-100 text-blue-600",
    bgColor: "bg-blue-50",
  },
  electrical: {
    icon: <Zap className="h-full w-full" />,
    color: "bg-yellow-100 text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  carpentry: {
    icon: <Hammer className="h-full w-full" />,
    color: "bg-amber-100 text-amber-600",
    bgColor: "bg-amber-50",
  },
  cleaning: {
    icon: <Spray className="h-full w-full" />,
    color: "bg-green-100 text-green-600",
    bgColor: "bg-green-50",
  },
  "house cleaning": {
    icon: <Spray className="h-full w-full" />,
    color: "bg-green-100 text-green-600",
    bgColor: "bg-green-50",
  },
  gardening: {
    icon: <Shovel className="h-full w-full" />,
    color: "bg-emerald-100 text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  "interior design": {
    icon: <Sofa className="h-full w-full" />,
    color: "bg-indigo-100 text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  default: {
    icon: <Settings className="h-full w-full" />,
    color: "bg-gray-100 text-gray-600",
    bgColor: "bg-gray-50",
  },
}

// Get icon for a specific category
export function getServiceIcon(category) {
  const normalizedCategory = category?.toLowerCase() || "default"
  return serviceIcons[normalizedCategory] || serviceIcons.default
}

// Service icon component
export default function ServiceIcon({ category, size = "md" }) {
  const { icon, color } = getServiceIcon(category)

  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-12 h-12 p-2.5",
    lg: "w-16 h-16 p-3",
    xl: "w-24 h-24 p-4",
  }

  return <div className={`${color} ${sizeClasses[size]} rounded-full flex items-center justify-center`}>{icon}</div>
}


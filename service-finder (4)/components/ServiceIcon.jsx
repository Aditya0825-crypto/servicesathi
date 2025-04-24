import { Wrench, Zap, Home, Hammer, Construction, Paintbrush } from "lucide-react"

export default function ServiceIcon({ category, size = "md" }) {
  const iconSize = size === "md" ? 24 : 16

  const icons = {
    plumbing: <Wrench size={iconSize} />,
    electrical: <Zap size={iconSize} />,
    cleaning: <Home size={iconSize} />,
    carpentry: <Hammer size={iconSize} />,
    painting: <Paintbrush size={iconSize} />,
    construction: <Construction size={iconSize} />,
  }

  return icons[category?.toLowerCase()] || <Wrench size={iconSize} />
}

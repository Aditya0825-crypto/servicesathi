import Link from "next/link"
import { Wrench, Zap, Hammer, SprayCanIcon as Spray } from "lucide-react"

export default function ServiceCategories() {
  const categories = [
    {
      id: "plumbing",
      name: "Plumbing",
      icon: <Wrench className="h-8 w-8" />,
      color: "bg-gray-100 text-gray-700",
      href: "/services/plumbing",
      description: "Expert plumbing services for repairs, installations, and maintenance",
    },
    {
      id: "electrical",
      name: "Electrician",
      icon: <Zap className="h-8 w-8" />,
      color: "bg-gray-100 text-gray-700",
      href: "/services/electrical",
      description: "Professional electrical services for your home and business",
    },
    {
      id: "carpentry",
      name: "Carpentry",
      icon: <Hammer className="h-8 w-8" />,
      color: "bg-gray-100 text-gray-700",
      href: "/services/carpentry",
      description: "Custom carpentry and woodworking for all your needs",
    },
    {
      id: "cleaning",
      name: "House Cleaning",
      icon: <Spray className="h-8 w-8" />,
      color: "bg-gray-100 text-gray-700",
      href: "/services/cleaning",
      description: "Professional cleaning services for homes and offices",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Main Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect professional for any job around your home from our specialized services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <div className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-gray-800 hover:shadow-md transition-all h-full card-hover">
                <div className={`${category.color} p-4 rounded-full mb-4`}>{category.icon}</div>
                <h3 className="font-medium text-lg text-gray-900 group-hover:text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-center text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="inline-flex items-center text-gray-800 hover:text-black font-medium">
            View All Services
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}


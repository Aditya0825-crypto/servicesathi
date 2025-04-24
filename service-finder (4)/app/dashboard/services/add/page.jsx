import AddServiceForm from "@/components/AddServiceForm"

export const metadata = {
  title: "Add Service - ServiceSarthi",
  description: "Add a new service to ServiceSarthi"
}

export default function AddServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AddServiceForm />
    </div>
  )
} 
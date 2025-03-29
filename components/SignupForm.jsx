"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  MapPin,
  Tag,
  CheckCircle,
  AlertTriangle,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { checkPasswordStrength } from "@/lib/password-utils"

export default function SignupForm() {
  const router = useRouter()
  const { signup } = useAuth()
  const [accountType, setAccountType] = useState("user")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    // Provider specific fields
    businessName: "",
    category: "",
    address: "",
    city: "Pune",
    description: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    color: "gray",
    label: "",
  })

  // Check password strength whenever password changes
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password))
  }, [formData.password])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields")
      return
    }

    // Validate provider specific fields if account type is provider
    if (accountType === "provider") {
      if (!formData.businessName || !formData.category || !formData.address || !formData.city) {
        setError("Please fill in all required business information")
        return
      }
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    if (passwordStrength.score < 3) {
      setError("Please use a stronger password: " + passwordStrength.feedback)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await signup({
        ...formData,
        accountType,
      })

      if (result.success) {
        // Show success message
        setSuccess(true)

        // Redirect after a short delay
        setTimeout(() => {
          // Redirect based on account type
          if (accountType === "provider") {
            router.push("/dashboard/provider")
          } else {
            router.push("/dashboard")
          }
        }, 1500)
      } else {
        setError(result.error || "Failed to create account")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const serviceCategories = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "House Cleaning",
    "AC Repair",
    "Painting",
    "Pest Control",
    "Appliance Repair",
    "Gardening",
    "Interior Design",
    "Other",
  ]

  if (success) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Account Created Successfully!</h2>
        <p className="text-gray-600 mb-6">
          {accountType === "provider"
            ? "Your service provider account has been created and is now listed on our platform."
            : "Your account has been created successfully."}
        </p>
        <p className="text-gray-600 mb-6">Redirecting you to your dashboard...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Account Type Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Account Type</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setAccountType("user")}
            className={`p-4 border rounded-lg text-center flex flex-col items-center justify-center transition-colors ${
              accountType === "user"
                ? "border-primary bg-primary/5 text-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <User className="h-6 w-6 mb-2" />
            <span className="font-medium">User</span>
            <span className="text-xs text-gray-500 mt-1">Looking for services</span>
          </button>
          <button
            type="button"
            onClick={() => setAccountType("provider")}
            className={`p-4 border rounded-lg text-center flex flex-col items-center justify-center transition-colors ${
              accountType === "provider"
                ? "border-primary bg-primary/5 text-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Briefcase className="h-6 w-6 mb-2" />
            <span className="font-medium">Service Provider</span>
            <span className="text-xs text-gray-500 mt-1">Offering services</span>
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Rahul"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Sharma"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label htmlFor="phone" className="block text-sm font-medium text-foreground">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
      </div>

      {/* Provider Information (conditional) */}
      {accountType === "provider" && (
        <div>
          <h3 className="text-lg font-medium mb-4">Business Information</h3>

          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-sm font-medium text-foreground">
              Business Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Sharma Plumbing Solutions"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <label htmlFor="category" className="block text-sm font-medium text-foreground">
              Service Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-muted-foreground" />
              </div>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="input-field pl-10"
              >
                <option value="">Select a category</option>
                {serviceCategories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-foreground">
              Business Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="123 Service Street, Kothrud"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <label htmlFor="city" className="block text-sm font-medium text-foreground">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <select
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="input-field pl-10"
              >
                <option value="Pune">Pune</option>
                <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
                <option value="Kothrud">Kothrud</option>
                <option value="Hinjewadi">Hinjewadi</option>
                <option value="Baner">Baner</option>
                <option value="Viman Nagar">Viman Nagar</option>
                <option value="Kharadi">Kharadi</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Business Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              placeholder="Describe your services, experience, and expertise..."
            ></textarea>
          </div>
        </div>
      )}

      {/* Password Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Security</h3>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input-field pl-10 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Password strength indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-5 rounded-full ${
                        index <= passwordStrength.score ? `bg-${passwordStrength.color}-500` : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <span className={`text-xs font-medium text-${passwordStrength.color}-500`}>
                  {passwordStrength.label}
                </span>
              </div>
              <p className="text-xs text-gray-500">{passwordStrength.feedback}</p>
            </div>
          )}
        </div>

        <div className="space-y-2 mt-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field pl-10 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Password match indicator */}
          {formData.password && formData.confirmPassword && (
            <div className="mt-1 flex items-center">
              {formData.password === formData.confirmPassword ? (
                <>
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">Passwords match</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-xs text-red-500">Passwords don't match</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="agreeTerms"
          name="agreeTerms"
          type="checkbox"
          required
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-700"
        />
        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
          I agree to the{" "}
          <Link href="/terms" className="text-gray-900 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-gray-900 hover:underline">
            Privacy Policy
          </Link>{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-2.5 flex justify-center items-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  )
}


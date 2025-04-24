"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { FaGoogle } from "react-icons/fa"
import { checkPasswordStrength } from "@/lib/password-utils"



export default function SignupForm() {
  
  const { register } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    accountType: "user",
    // Service provider specific fields
    businessName: "",
    category: "plumbing",
    description: "",
    address: "",
    city: "Pune",
    services: [],
    experience: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "", feedback: "" })
  const router = useRouter()

  // Service categories and options
  const serviceCategories = {
    plumbing: ["Leak Repair", "Pipe Installation", "Drain Cleaning", "Fixture Installation", "Water Heater Services"],
    electrical: [
      "Wiring Installation",
      "Lighting Installation",
      "Circuit Breaker Repair",
      "Electrical Troubleshooting",
      "Fan Installation",
    ],
    cleaning: ["Deep Cleaning", "Regular Cleaning", "Move-in/Move-out Cleaning", "Window Cleaning", "Carpet Cleaning"],
    carpentry: ["Furniture Assembly", "Custom Furniture", "Door Repair", "Cabinet Installation", "Woodwork Repair"],
  }

  // Reset services when category changes
  useEffect(() => {
    if (formData.accountType === "provider") {
      setFormData((prev) => ({
        ...prev,
        services: [],
      }))
    }
  }, [formData.category])

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setFormData({
      ...formData,
      password: newPassword,
    })
    setPasswordStrength(checkPasswordStrength(newPassword))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        services: [...formData.services, value],
      })
    } else {
      setFormData({
        ...formData,
        services: formData.services.filter((service) => service !== value),
      })
    }
  }

  const nextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (passwordStrength.score < 2) {
        setError("Password is too weak. Please use a stronger password.")
        return
      }
    }

    if (step === 2 && formData.accountType === "provider") {
      if (!formData.businessName || !formData.category || !formData.description) {
        setError("Please fill in all required fields")
        return
      }

      // Move services validation to step 3
    }

    setError("")
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Final validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (passwordStrength.score < 2) {
      setError("Password is too weak. Please use a stronger password.")
      return
    }

    if (formData.accountType === "provider") {
      if (!formData.businessName || !formData.category || !formData.description) {
        setError("Please fill in all required provider information")
        return
      }

      if (formData.services.length === 0) {
        setError("Please select at least one service you offer")
        return
      }
    }

    setIsLoading(true)

    try {
      // Prepare user data
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        accountType: formData.accountType,
        ...(formData.accountType === "provider" && {
          businessName: formData.businessName,
          category: formData.category,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          services: formData.services,
          experience: formData.experience,
        }),
      }

      const result = await register(userData)
      
      if (result.success) {
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(result.error || "Failed to create account. Please try again.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError("")
    setGoogleLoading(true)

    try {
      const result = await loginWithGoogle()
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Failed to sign up with Google. Please try again.")
      }
    } catch (error) {
      console.error("Google signup error:", error)
      setError(error.message || "Failed to sign up with Google. Please try again.")
    } finally {
      setGoogleLoading(false)
    }
  }

  const getPasswordStrengthClass = () => {
    if (!passwordStrength.score) return "bg-gray-200"
    if (passwordStrength.label === "Weak") return "bg-red-500"
    if (passwordStrength.label === "Medium") return "bg-yellow-500"
    if (passwordStrength.label === "Strong") return "bg-green-500"
    return "bg-gray-200"
  }

  const getPasswordStrengthText = () => {
    return passwordStrength.label || ""
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

      {/* Step indicator */}
      {formData.accountType === "provider" && (
        <div className="flex mb-6">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}
            >
              1
            </div>
            <div className="text-xs mt-1">Account</div>
          </div>
          <div className={`flex-1 h-0.5 self-center ${step >= 2 ? "bg-black" : "bg-gray-200"}`}></div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </div>
            <div className="text-xs mt-1">Business</div>
          </div>
          <div className={`flex-1 h-0.5 self-center ${step >= 3 ? "bg-black" : "bg-gray-200"}`}></div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}
            >
              3
            </div>
            <div className="text-xs mt-1">Services</div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        {/* Account Type Selection - Only show on first step */}
        {step === 1 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <div className="flex gap-4">
              <div
                className={`flex-1 p-3 border rounded-md cursor-pointer transition-colors ${
                  formData.accountType === "user"
                    ? "border-black bg-black/5 text-black"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setFormData({ ...formData, accountType: "user" })}
              >
                <div className="font-medium mb-1">Customer</div>
                <div className="text-sm">Find and book services</div>
              </div>
              <div
                className={`flex-1 p-3 border rounded-md cursor-pointer transition-colors ${
                  formData.accountType === "provider"
                    ? "border-black bg-black/5 text-black"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setFormData({ ...formData, accountType: "provider" })}
              >
                <div className="font-medium mb-1">Service Provider</div>
                <div className="text-sm">Offer your services</div>
              </div>
            </div>
          </div>
        )}

        {/* Google Sign Up - Only show on first step */}
        {step === 1 && (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <FaGoogle className="text-red-500" />
                {googleLoading ? "Signing up..." : "Sign up with Google"}
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="mx-4 text-sm text-gray-500">or</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
          </>
        )}

        {/* Step 1: Basic Account Information */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Rajesh"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Sharma"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="••••••••"
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="h-2 flex-grow rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthClass()}`}
                        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">{getPasswordStrengthText()}</span>
                  </div>
                  {passwordStrength.feedback && passwordStrength.feedback !== "Strong password" && (
                    <p className="text-xs text-gray-600 mt-1">{passwordStrength.feedback}</p>
                  )}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="••••••••"
              />
            </div>
          </>
        )}

        {/* Step 2: Provider Business Information */}
        {step === 2 && formData.accountType === "provider" && (
          <>
            <div className="mb-4">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="Sharma Plumbing Solutions"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Service Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">House Cleaning</option>
                <option value="carpentry">Carpentry</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="">Select Experience</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Business Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="Describe your business and services..."
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Business Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="123 Business Street"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
          </>
        )}

        {/* Step 3: Provider Services */}
        {step === 3 && formData.accountType === "provider" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Services Offered</label>
              <p className="text-sm text-gray-500 mb-3">Select all services that you provide:</p>

              <div className="space-y-3">
                {serviceCategories[formData.category] &&
                  serviceCategories[formData.category].map((service, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        checked={formData.services.includes(service)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{service}</span>
                    </label>
                  ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
              <p className="text-sm text-gray-500">
                As a service provider, you'll be listed in our directory and customers will be able to book your
                services through our platform.
              </p>
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}

          {step < 3 || (step === 1 && formData.accountType === "user") ? (
            <button
              type="button"
              onClick={nextStep}
              className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors ${step > 1 ? "ml-auto" : ""}`}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 ml-auto"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-black hover:text-gray-800 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}


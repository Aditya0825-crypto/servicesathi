"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DashboardSidebar from "@/components/DashboardSidebar"
import { useAuth } from "@/lib/auth-context"
import { User, Mail, Phone, MapPin, Camera, Save, AlertCircle, CheckCircle } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "Pune",
    zipCode: user?.zipCode || "",
    bio: user?.bio || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: "", text: "" })

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update the user profile in the database
      setMessage({ type: "success", text: "Profile updated successfully!" })
      setIsLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <DashboardSidebar />
          </div>
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">My Profile</h1>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </div>

              {message.text && (
                <div
                  className={`p-4 ${
                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  } flex items-center`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  {message.text}
                </div>
              )}

              <div className="p-6">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="md:w-1/3 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-3 relative">
                          <img
                            src={user?.image || "/placeholder.svg?height=128&width=128"}
                            alt={user?.name || "User"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Click to change profile picture</p>
                      </div>

                      <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Rajesh Sharma"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="+91 98765 43210"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                              Address
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="123 Main Street"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <select
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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

                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Pin Code
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="400001"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows="3"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Tell us a bit about yourself..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-3">
                        <img
                          src={user?.image || "/placeholder.svg?height=128&width=128"}
                          alt={user?.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p className="mt-1 text-lg">{user?.name || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                          <p className="mt-1 text-lg">{user?.email || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                          <p className="mt-1 text-lg">{user?.phone || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Location</h3>
                          <p className="mt-1 text-lg">{user?.city || "Pune"}</p>
                        </div>

                        <div className="md:col-span-2">
                          <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                          <p className="mt-1">
                            {user?.bio || "No bio provided. Edit your profile to add information about yourself."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Account Settings</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Change Password</h3>
                    <p className="text-gray-600 mb-4">
                      It's a good idea to use a strong password that you're not using elsewhere
                    </p>
                    <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
                      Change Password
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-2">Notifications</h3>
                    <p className="text-gray-600 mb-4">Manage your email notification preferences</p>
                    <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
                      Notification Settings
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-red-600 mb-2">Delete Account</h3>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


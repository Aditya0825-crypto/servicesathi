"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth, db, collection, addDoc, query, where, getDocs, serverTimestamp, usingMocks } from "./firebase"

// Create a context for service providers
const ProvidersContext = createContext({
  providers: [],
  addProvider: () => {},
  getProvidersByCategory: () => [],
})

// Create auth context
const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updateUserBookings: () => {},
  deleteBooking: async () => {},
})

// Providers provider component
export function ProvidersProvider({ children }) {
  // Initialize with some mock providers
  const [providers, setProviders] = useState([
    {
      id: "provider1",
      businessName: "Sharma Plumbing Solutions",
      category: "plumbing",
      description: "Professional plumbing services with over 15 years of experience.",
      address: "123 Service Street",
      city: "Pune",
      verified: true,
      rating: 4.8,
      reviews: 127,
      image: "/placeholder.svg?height=150&width=150",
      createdAt: new Date("2023-01-15"),
      userId: "user2",
      user: {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+91 98765 43210",
      },
    },
    {
      id: "provider2",
      businessName: "Patel Electrical Services",
      category: "electrical",
      description: "Licensed electricians providing high-quality electrical services.",
      address: "456 Service Avenue",
      city: "Pune",
      verified: true,
      rating: 4.7,
      reviews: 94,
      image: "/placeholder.svg?height=150&width=150",
      createdAt: new Date("2023-02-20"),
      userId: "user3",
      user: {
        name: "Amit Patel",
        email: "amit@example.com",
        phone: "+91 98765 43211",
      },
    },
    {
      id: "provider3",
      businessName: "Swachh Home Cleaners",
      category: "cleaning",
      description: "Professional cleaning services for homes and apartments.",
      address: "789 Clean Street",
      city: "Pune",
      verified: true,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=150&width=150",
      createdAt: new Date("2023-03-10"),
      userId: "user4",
      user: {
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "+91 98765 43212",
      },
    },
    {
      id: "provider4",
      businessName: "Singh Furniture Works",
      category: "carpentry",
      description: "Custom carpentry and woodworking services.",
      address: "321 Wood Lane",
      city: "Pune",
      verified: true,
      rating: 4.8,
      reviews: 83,
      image: "/placeholder.svg?height=150&width=150",
      createdAt: new Date("2023-04-05"),
      userId: "user5",
      user: {
        name: "Gurpreet Singh",
        email: "gurpreet@example.com",
        phone: "+91 98765 43213",
      },
    },
  ])

  // Load providers from localStorage on mount
  useEffect(() => {
    const storedProviders = localStorage.getItem("service-providers")
    if (storedProviders) {
      try {
        const parsedProviders = JSON.parse(storedProviders)
        setProviders(parsedProviders)
      } catch (error) {
        console.error("Error parsing providers from localStorage:", error)
      }
    }
  }, [])

  // Save providers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("service-providers", JSON.stringify(providers))
  }, [providers])

  // Add a new provider
  const addProvider = (newProvider) => {
    // Generate a unique ID
    const providerId = `provider${Date.now()}`

    // Create the provider object with default values
    const providerWithDefaults = {
      id: providerId,
      verified: false,
      rating: 0,
      reviews: 0,
      image: "/placeholder.svg?height=150&width=150",
      createdAt: new Date(),
      ...newProvider,
    }

    // Add to providers list
    setProviders((prevProviders) => [...prevProviders, providerWithDefaults])

    return providerId
  }

  // Get providers by category
  const getProvidersByCategory = (category) => {
    if (!category || category === "all") {
      return providers
    }
    return providers.filter((provider) => provider.category === category)
  }

  return (
    <ProvidersContext.Provider value={{ providers, addProvider, getProvidersByCategory }}>
      {children}
    </ProvidersContext.Provider>
  )
}

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { addProvider } = useProvidersContext()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for auth token in localStorage for preview environment
        const token = localStorage.getItem("auth-token")
        const userData = localStorage.getItem("user-data")

        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData)
            // Add empty bookings array if not present
            if (!parsedUser.bookings) {
              parsedUser.bookings = []
            }
            setUser(parsedUser)
          } catch (parseError) {
            console.error("Error parsing user data from localStorage:", parseError)
            localStorage.removeItem("user-data")
          }
        }

        // Try to set up Firebase auth listener
        try {
          // Import auth functions directly to avoid issues with the imported auth object
          import("firebase/auth")
            .then(({ onAuthStateChanged }) => {
              if (auth && typeof onAuthStateChanged === "function") {
                const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                  if (firebaseUser) {
                    try {
                      // Get user data from Firestore or create a basic user object if Firestore is not available
                      let userWithBookings = {
                        id: firebaseUser.uid,
                        name: firebaseUser.displayName || "User",
                        email: firebaseUser.email,
                        phone: "",
                        role: "USER",
                        image: "/placeholder.svg?height=100&width=100",
                        bookings: [],
                      }

                      // Try to get user data from Firestore if not using mocks
                      if (!usingMocks) {
                        try {
                          const usersRef = collection(db, "users")
                          const q = query(usersRef, where("uid", "==", firebaseUser.uid))
                          const querySnapshot = await getDocs(q)

                          if (!querySnapshot.empty) {
                            const userData = querySnapshot.docs[0].data()
                            userWithBookings = {
                              ...userWithBookings,
                              name: firebaseUser.displayName || userData.name,
                              phone: userData.phone || "",
                              role: userData.role || "USER",
                              bookings: userData.bookings || [],
                              accountType: userData.accountType || "user",
                            }
                          }
                        } catch (firestoreError) {
                          console.warn("Error fetching user data from Firestore:", firestoreError)
                        }
                      }

                      setUser(userWithBookings)

                      // Store in localStorage for preview environment
                      try {
                        const token = await firebaseUser.getIdToken()
                        localStorage.setItem("auth-token", token)
                        localStorage.setItem("user-data", JSON.stringify(userWithBookings))
                      } catch (tokenError) {
                        console.warn("Error getting ID token:", tokenError)
                      }
                    } catch (error) {
                      console.error("Error processing Firebase user:", error)
                    }
                  } else {
                    // Only clear user if we don't have localStorage data
                    if (!localStorage.getItem("auth-token")) {
                      setUser(null)
                    }
                  }
                  setLoading(false)
                })

                return () => {
                  if (typeof unsubscribe === "function") {
                    unsubscribe()
                  }
                }
              } else {
                setLoading(false)
              }
            })
            .catch((error) => {
              console.warn("Error importing Firebase auth:", error)
              setLoading(false)
            })
        } catch (firebaseError) {
          console.warn("Firebase auth listener setup failed:", firebaseError)
          setLoading(false)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password, accountType = "user") => {
    try {
      // Try Firebase login if available
      if (!usingMocks) {
        try {
          // Import auth functions directly
          const { signInWithEmailAndPassword } = await import("firebase/auth")

          if (auth && typeof signInWithEmailAndPassword === "function") {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const firebaseUser = userCredential.user

            // User will be set by the auth state listener
            return { success: true }
          }
        } catch (firebaseError) {
          console.warn("Firebase login failed, using mock data:", firebaseError)
        }
      }

      // Fallback to mock data for preview
      const mockUser = {
        id: "user1",
        name: accountType === "provider" ? "Sharma Plumbing Solutions" : "Rahul Sharma",
        email: email,
        role: accountType === "provider" ? "PROVIDER" : "USER",
        accountType: accountType,
        image: "/placeholder.svg?height=100&width=100",
        bookings: [],
      }

      // Store auth data in localStorage
      localStorage.setItem("auth-token", "preview-token")
      localStorage.setItem("user-data", JSON.stringify(mockUser))

      // Update state
      setUser(mockUser)

      return { success: true, user: mockUser }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message || "Login failed" }
    }
  }

  // Signup function
  const signup = async (userData) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        accountType,
        businessName,
        category,
        address,
        city,
        description,
      } = userData

      // Try Firebase signup if available
      if (!usingMocks) {
        try {
          // Import auth functions directly
          const { createUserWithEmailAndPassword } = await import("firebase/auth")

          if (auth && typeof createUserWithEmailAndPassword === "function") {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const firebaseUser = userCredential.user

            // Try to create user document in Firestore
            try {
              const fullName = accountType === "provider" ? businessName : `${firstName} ${lastName}`
              await addDoc(collection(db, "users"), {
                uid: firebaseUser.uid,
                name: fullName,
                email,
                phone,
                role: accountType === "provider" ? "PROVIDER" : "USER",
                accountType: accountType,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                bookings: [],
                location: city || "Pune",
                ...(accountType === "provider" && {
                  businessName,
                  category,
                  address,
                  description,
                }),
              })
            } catch (firestoreError) {
              console.warn("Error creating user document in Firestore:", firestoreError)
            }

            // User will be set by the auth state listener
            return { success: true }
          }
        } catch (firebaseError) {
          console.warn("Firebase signup failed, using mock data:", firebaseError)
        }
      }

      // Fallback to mock data for preview
      const mockUser = {
        id: `user${Date.now()}`,
        name: accountType === "provider" ? businessName : `${firstName} ${lastName}`,
        email,
        phone,
        role: accountType === "provider" ? "PROVIDER" : "USER",
        accountType: accountType,
        image: "/placeholder.svg?height=100&width=100",
        bookings: [],
        ...(accountType === "provider" && {
          businessName,
          category,
          address,
          city,
          description,
        }),
      }

      // Store auth data in localStorage
      localStorage.setItem("auth-token", "preview-token")
      localStorage.setItem("user-data", JSON.stringify(mockUser))

      // Update state
      setUser(mockUser)

      // If this is a provider signup, add to providers list
      if (accountType === "provider") {
        // Add the new provider to the providers list
        addProvider({
          businessName,
          category,
          description,
          address,
          city,
          userId: mockUser.id,
          user: {
            name: businessName,
            email,
            phone,
          },
        })
      }

      return { success: true, user: mockUser }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: error.message || "Signup failed" }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      // Try Firebase signout if available
      if (!usingMocks) {
        try {
          // Import auth functions directly
          const { signOut } = await import("firebase/auth")

          if (auth && typeof signOut === "function") {
            await signOut(auth)
          }
        } catch (firebaseError) {
          console.warn("Firebase signout failed:", firebaseError)
        }
      }

      // Clear auth data from localStorage
      localStorage.removeItem("auth-token")
      localStorage.removeItem("user-data")

      // Update state
      setUser(null)

      // Redirect to home page
      router.push("/")

      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      return { success: false, error: error.message || "Logout failed" }
    }
  }

  // Update user bookings
  const updateUserBookings = (newBooking) => {
    if (!user) return

    const updatedUser = {
      ...user,
      bookings: [...(user.bookings || []), newBooking],
    }

    setUser(updatedUser)
    localStorage.setItem("user-data", JSON.stringify(updatedUser))

    // In a real app, we would also update Firestore here
  }

  // Delete booking
  const deleteBooking = async (bookingId) => {
    if (!user) return { success: false, error: "User not logged in" }

    try {
      // Filter out the booking to delete
      const updatedBookings = (user.bookings || []).filter((booking) => booking.id !== bookingId)

      const updatedUser = {
        ...user,
        bookings: updatedBookings,
      }

      setUser(updatedUser)
      localStorage.setItem("user-data", JSON.stringify(updatedUser))

      // In a real app, we would also update Firestore here

      return { success: true }
    } catch (error) {
      console.error("Delete booking error:", error)
      return { success: false, error: error.message || "Failed to delete booking" }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateUserBookings,
        deleteBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext)
}

// Custom hook to use providers context
export function useProvidersContext() {
  return useContext(ProvidersContext)
}


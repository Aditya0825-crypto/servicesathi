// Import necessary Firebase modules
/*const auth = {
  onAuthStateChanged: (callback) => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        callback({
          uid: user.id,
          email: user.email,
          displayName: user.name,
          photoURL: user.image,
          getIdToken: async () => token,
        })
      } catch (error) {
        console.error("Error parsing user data:", error)
        callback(null)
      }
    } else {
      callback(null)
    }

    // Return unsubscribe function
    return () => {}
  },

  // Update the signInWithEmailAndPassword function to set a proper name
  signInWithEmailAndPassword: async (email, password) => {
    // Mock implementation
    console.log("Mock signInWithEmailAndPassword:", email)

    // Create mock user with a proper name
    const mockUser = {
      uid: "user1",
      email: email,
      displayName: "Rahul Sharma", // Set a proper name
      photoURL: "/placeholder.svg?height=100&width=100",
    }

    // Store in localStorage with proper name
    localStorage.setItem("auth-token", "mock-token")
    localStorage.setItem(
      "user-data",
      JSON.stringify({
        id: mockUser.uid,
        email: mockUser.email,
        name: mockUser.displayName,
        image: mockUser.photoURL,
        role: "USER",
        accountType: "user",
        bookings: [],
      }),
    )

    return { user: mockUser }
  },

  // Update the createUserWithEmailAndPassword function to set a proper name
  createUserWithEmailAndPassword: async (email, password) => {
    // Mock implementation
    console.log("Mock createUserWithEmailAndPassword:", email)

    // Create mock user with a proper name
    const mockUser = {
      uid: `user${Date.now()}`,
      email: email,
      displayName: "New User", // Set a proper name
      photoURL: "/placeholder.svg?height=100&width=100",
    }

    // Store in localStorage with proper name
    localStorage.setItem("auth-token", "mock-token")
    localStorage.setItem(
      "user-data",
      JSON.stringify({
        id: mockUser.uid,
        email: mockUser.email,
        name: mockUser.displayName,
        image: mockUser.photoURL,
        role: "USER",
        accountType: "user",
        bookings: [],
      }),
    )

    return { user: mockUser }
  },

  signOut: async () => {
    // Mock implementation
    console.log("Mock signOut")

    // Clear localStorage
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")

    return true
  },
}

// Mock GoogleAuthProvider
class MockGoogleAuthProvider {
  constructor() {
    this.scopes = []
    this.customParameters = {}
  }

  addScope(scope) {
    this.scopes.push(scope)
    return this
  }

  setCustomParameters(params) {
    this.customParameters = params
    return this
  }

  static credential(idToken, accessToken) {
    return { idToken, accessToken }
  }
}

// Update the signInWithPopup function to set a proper name
const signInWithPopup = async (auth, provider) => {
  // Mock implementation
  console.log("Mock signInWithPopup")

  // Create mock user with a proper name
  const mockUser = {
    uid: `google-user-${Date.now()}`,
    email: "google-user@example.com",
    displayName: "Google User", // Set a proper name
    photoURL: "https://lh3.googleusercontent.com/a/default-user",
  }

  // Store in localStorage with proper name
  localStorage.setItem("auth-token", "google-mock-token")
  localStorage.setItem(
    "user-data",
    JSON.stringify({
      id: mockUser.uid,
      email: mockUser.email,
      name: mockUser.displayName,
      image: mockUser.photoURL,
      role: "USER",
      accountType: "user",
      bookings: [],
    }),
  )

  return {
    user: mockUser,
    credential: {
      idToken: "mock-id-token",
      accessToken: "mock-access-token",
    },
  }
}

// Mock Firestore
const db = {}
const collection = () => ({})
const doc = () => ({})
const setDoc = async () => {}
const getDoc = async () => ({ data: () => ({}) })
const getDocs = async () => ({ docs: [] })
const query = () => ({})
const where = () => ({})
const onSnapshot = (query, callback) => {
  callback({ docs: [] })
  return () => {}
}
const serverTimestamp = () => new Date()
const addDoc = async () => ({ id: `doc-${Date.now()}` })

// Mock Storage
const storage = {}

// Flag to indicate if we're using mocks
let usingMocks = true

// Try to initialize Firebase if available
try {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // Check if we should use mocks
    usingMocks = window.localStorage.getItem("NEXT_PUBLIC_USE_MOCKS") === "true"

    console.log("Using mocks:", usingMocks)

    // If not using mocks, try to initialize Firebase
    if (!usingMocks) {
      console.log("Attempting to initialize Firebase...")
      // Firebase initialization would go here in a real app
    }
  }
} catch (error) {
  console.error("Error initializing Firebase:", error)
  usingMocks = true
}

// Export Firebase modules
const GoogleAuthProvider = MockGoogleAuthProvider

export {
  auth,
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  addDoc,
  GoogleAuthProvider,
  signInWithPopup,
  usingMocks,
  storage,
}*/
// firebase.js
// lib/firebase.js

// lib/firebase.js

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDevR5cnfIeXarRwZCA5_9jJAlDk9Gujp8",
  authDomain: "servicesarthi-5f25a.firebaseapp.com",
  projectId: "servicesarthi-5f25a",
  storageBucket: "servicesarthi-5f25a.firebasestorage.app",
  messagingSenderId: "111133419595",
  appId: "1:111133419595:web:9eee414f47a162177645ce",
  measurementId: "G-RRM9NJKPM0"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }

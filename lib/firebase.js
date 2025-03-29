"use client"

// Create comprehensive mock implementations for preview environment
const createMockFirebase = () => {
  // Create a more robust mock implementation
  const mockCollection = (path) => {
    return {
      path,
      doc: mockDoc,
      where: () => mockQuery(),
      orderBy: () => mockQuery(),
      limit: () => mockQuery(),
    }
  }

  const mockDoc = (path) => {
    return {
      path,
      collection: mockCollection,
      get: async () => ({
        exists: false,
        data: () => ({}),
        id: "mock-doc-id",
      }),
      set: async () => ({}),
      update: async () => ({}),
      delete: async () => ({}),
    }
  }

  const mockQuery = () => {
    return {
      where: () => mockQuery(),
      orderBy: () => mockQuery(),
      limit: () => mockQuery(),
      get: async () => ({
        docs: [],
        empty: true,
        size: 0,
        forEach: () => {},
      }),
    }
  }

  const mockGetDocs = async () => ({
    docs: [],
    empty: true,
    size: 0,
    forEach: () => {},
  })

  const mockGetDoc = async () => ({
    exists: () => false,
    data: () => ({}),
    id: "mock-doc-id",
  })

  const mockAddDoc = async () => ({ id: "mock-id" })
  const mockServerTimestamp = () => new Date()

  return {
    app: {},
    db: {
      collection: mockCollection,
    },
    auth: {
      currentUser: null,
      onAuthStateChanged: (callback) => {
        // Call with null to simulate no user
        callback(null)
        // Return a function to simulate unsubscribe
        return () => {}
      },
      signInWithEmailAndPassword: async () => ({
        user: {
          uid: "mock-uid",
          email: "mock@example.com",
          displayName: "Mock User",
          getIdToken: async () => "mock-token",
        },
      }),
      createUserWithEmailAndPassword: async () => ({
        user: {
          uid: "mock-uid",
          email: "mock@example.com",
          displayName: "Mock User",
          getIdToken: async () => "mock-token",
        },
      }),
      signOut: async () => {},
    },
    storage: {
      ref: () => ({
        put: async () => ({}),
        getDownloadURL: async () => "/placeholder.svg",
      }),
    },
    collection: mockCollection,
    doc: mockDoc,
    query: mockQuery,
    where: () => ({}),
    orderBy: () => ({}),
    getDocs: mockGetDocs,
    getDoc: mockGetDoc,
    addDoc: mockAddDoc,
    serverTimestamp: mockServerTimestamp,
  }
}

// Initialize with mock implementations by default
let app = {}
let db = {}
let auth = {}
let storage = {}
let collection = () => ({})
let doc = () => ({})
let query = () => ({})
let where = () => ({})
let orderBy = () => ({})
let getDocs = async () => ({ docs: [] })
let getDoc = async () => ({ exists: () => false, data: () => ({}) })
let addDoc = async () => ({ id: "mock-id" })
let serverTimestamp = () => new Date()

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Flag to track if we're using mock implementations
let usingMocks = true

// Initialize Firebase only in browser environment
if (isBrowser) {
  // Set up mock implementations first so they're available immediately
  const mocks = createMockFirebase()
  collection = mocks.collection
  doc = mocks.doc
  query = mocks.query
  where = mocks.where
  orderBy = mocks.orderBy
  getDocs = mocks.getDocs
  getDoc = mocks.getDoc
  addDoc = mocks.addDoc
  serverTimestamp = mocks.serverTimestamp
  auth = mocks.auth
  db = mocks.db
  storage = mocks.storage

  // Try to initialize Firebase in the background
  const initializeFirebase = async () => {
    try {
      // Import Firebase modules
      const { initializeApp, getApps } = await import("firebase/app")

      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyBIZirY89IavRryyxh08XEzKKEKGdAFzf0",
        authDomain: "local-service-finder-34fc2.firebaseapp.com",
        projectId: "local-service-finder-34fc2",
        storageBucket: "local-service-finder-34fc2.firebasestorage.app",
        messagingSenderId: "324697637934",
        appId: "1:324697637934:web:6618302a30513ac54e0bbf",
        measurementId: "G-6V5B57WXMN",
      }

      // Initialize Firebase app
      const apps = getApps()
      app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0]

      // Try to initialize Firestore
      try {
        const {
          getFirestore,
          collection: firestoreCollection,
          doc: firestoreDoc,
          query: firestoreQuery,
          where: firestoreWhere,
          orderBy: firestoreOrderBy,
          getDocs: firestoreGetDocs,
          getDoc: firestoreGetDoc,
          addDoc: firestoreAddDoc,
          serverTimestamp: firestoreServerTimestamp,
        } = await import("firebase/firestore")

        db = getFirestore(app)
        collection = firestoreCollection
        doc = firestoreDoc
        query = firestoreQuery
        where = firestoreWhere
        orderBy = firestoreOrderBy
        getDocs = firestoreGetDocs
        getDoc = firestoreGetDoc
        addDoc = firestoreAddDoc
        serverTimestamp = firestoreServerTimestamp
      } catch (firestoreError) {
        console.warn("Firestore initialization failed, using mocks:", firestoreError)
        // Keep using mock implementations for Firestore
      }

      // Try to initialize Auth
      try {
        const { getAuth } = await import("firebase/auth")
        auth = getAuth(app)
      } catch (authError) {
        console.warn("Auth initialization failed, using mocks:", authError)
        // Keep using mock implementations for Auth
      }

      // Try to initialize Storage
      try {
        const { getStorage } = await import("firebase/storage")
        storage = getStorage(app)
      } catch (storageError) {
        console.warn("Storage initialization failed, using mocks:", storageError)
        // Keep using mock implementations for Storage
      }

      usingMocks = false
      console.log("Firebase initialized successfully")
    } catch (error) {
      console.error("Firebase initialization error:", error)
      // Already using mock implementations, so no need to set them again
    }
  }

  // Initialize Firebase in the background
  initializeFirebase().catch((err) => {
    console.error("Background Firebase initialization failed:", err)
  })
}

// Export the Firebase modules and functions
// These will initially be mocks and may be replaced with real implementations if Firebase initializes successfully
export {
  app,
  db,
  auth,
  storage,
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
  serverTimestamp,
  usingMocks,
}


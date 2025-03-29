// Create mock implementations for preview environment
const createMockFirebaseAdmin = () => {
  return {
    adminApp: {},
    adminDb: {
      collection: () => ({
        doc: () => ({
          set: async () => ({}),
          get: async () => ({
            exists: false,
            data: () => ({}),
          }),
        }),
      }),
    },
    adminAuth: {
      createUser: async () => ({ uid: "mock-uid", displayName: "Mock User" }),
      createCustomToken: async () => "mock-token",
      verifyIdToken: async () => ({ uid: "mock-uid" }),
      getUserByEmail: async () => ({ uid: "mock-uid", displayName: "Mock User" }),
    },
    adminStorage: {
      bucket: () => ({
        file: () => ({
          save: async () => ({}),
          getSignedUrl: async () => ["/placeholder.svg"],
        }),
      }),
    },
  }
}

// Check if we're in a server environment with Firebase Admin SDK available
let adminApp, adminDb, adminAuth, adminStorage

try {
  // Try to import Firebase Admin SDK
  const admin = require("firebase-admin/app")
  const { initializeApp, getApps, cert } = admin
  const { getFirestore } = require("firebase-admin/firestore")
  const { getAuth } = require("firebase-admin/auth")
  const { getStorage } = require("firebase-admin/storage")

  // Your service account key JSON
  const serviceAccount = {
    type: "service_account",
    project_id: "local-service-finder-34fc2",
    // Note: In a real app, you would store these in environment variables
    // and not commit them to your repository
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "mock-key-id",
    private_key: (process.env.FIREBASE_PRIVATE_KEY || "mock-key").replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL || "mock@example.com",
    client_id: process.env.FIREBASE_CLIENT_ID || "mock-client-id",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL || "https://example.com/cert",
  }

  // Initialize Firebase Admin
  const apps = getApps()
  adminApp =
    apps.length === 0
      ? initializeApp({
          credential: cert(serviceAccount),
          storageBucket: "local-service-finder-34fc2.firebasestorage.app",
        })
      : apps[0]

  adminDb = getFirestore(adminApp)
  adminAuth = getAuth(adminApp)
  adminStorage = getStorage(adminApp)
} catch (error) {
  console.error("Firebase Admin initialization error:", error)
  // If Firebase Admin fails to initialize, use mock implementations
  const mockAdmin = createMockFirebaseAdmin()
  adminApp = mockAdmin.adminApp
  adminDb = mockAdmin.adminDb
  adminAuth = mockAdmin.adminAuth
  adminStorage = mockAdmin.adminStorage
}

export { adminApp, adminDb, adminAuth, adminStorage }


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { createService } from "./service-utils"

// SIGN UP a new user
export const signUp = async ({ name, email, password, phone, accountType = "user", ...additionalData }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Set display name
    await updateProfile(user, { displayName: name })

    // Save user info to Firestore
    const userData = {
      uid: user.uid,
      name,
      email,
      phone,
      role: accountType === "provider" ? "PROVIDER" : "USER",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    if (accountType === "provider") {
      userData.businessName = additionalData.businessName
      userData.category = additionalData.category
      userData.description = additionalData.description
      userData.address = additionalData.address
      userData.city = additionalData.city
      userData.experience = additionalData.experience

      // Create services for the provider
      for (const service of additionalData.services) {
        await createService({
          title: service,
          providerId: user.uid,
          provider: additionalData.businessName,
          category: additionalData.category,
          price: "500-1000", // You might want to make this dynamic
          description: `Professional ${service} service by ${additionalData.businessName}`,
          city: additionalData.city,
        })
      }
    }

    await addDoc(collection(db, "users"), userData)

    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        role: accountType === "provider" ? "PROVIDER" : "USER",
        ...(accountType === "provider" && {
          businessName: additionalData.businessName,
        }),
      },
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, error: error.message }
  }
}

// SIGN IN an existing user
export const signIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Pull additional user data from Firestore
    const userSnap = await getDoc(doc(db, "users", user.uid))
    const userData = userSnap.exists() ? userSnap.data() : {}

    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName || userData.name || "User",
        email: user.email,
        role: userData.role || "USER",
        ...(userData.role === "PROVIDER" && {
          businessName: userData.businessName,
        }),
      },
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, error: error.message }
  }
}

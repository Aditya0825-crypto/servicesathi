"use client";

import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (user?.id) {
        const userRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFormData({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || user.email || "",
          });
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });

      // Update Firebase Auth display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });
      }

      setStatus("success");
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus("error");
    }
  };

  if (loading) return <p className="text-center py-6">Loading profile...</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {status === "success" && (
        <div className="flex items-center text-green-600 mb-4">
          <CheckCircle className="w-5 h-5 mr-2" /> Profile updated successfully
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="w-5 h-5 mr-2" /> Error updating profile
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

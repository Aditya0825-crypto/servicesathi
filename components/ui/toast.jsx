"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

// Create context
const ToastContext = createContext({
  showToast: () => {},
  hideToast: () => {},
})

// Toast types with their respective icons and styles
const TOAST_TYPES = {
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    style: "bg-green-50 text-green-800 border-green-200",
    iconStyle: "text-green-500",
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    style: "bg-red-50 text-red-800 border-red-200",
    iconStyle: "text-red-500",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    style: "bg-yellow-50 text-yellow-800 border-yellow-200",
    iconStyle: "text-yellow-500",
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    style: "bg-blue-50 text-blue-800 border-blue-200",
    iconStyle: "text-blue-500",
  },
}

// Toast component
function Toast({ id, message, type = "info", onClose, duration = 5000 }) {
  const { icon, style, iconStyle } = TOAST_TYPES[type] || TOAST_TYPES.info

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  return (
    <div
      className={`flex items-center p-4 mb-3 rounded-lg border shadow-sm ${style} animate-in slide-in-from-right`}
      role="alert"
    >
      <div className={`flex-shrink-0 mr-3 ${iconStyle}`}>{icon}</div>
      <div className="flex-1 mr-2">{message}</div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 ml-auto text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

// Toast provider component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = "info", duration = 5000) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, message, type, duration }])
    return id
  }

  const hideToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 w-80 max-w-full">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={hideToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Hook to use the toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}


"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"

export default function MessageForm({ provider, onClose }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "provider",
      text: `Hello! I'm from ${provider || "ServiceSarthi"}. How can I help you today?`,
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate provider typing
    setIsTyping(true)

    // Simulate provider response after delay
    setTimeout(() => {
      setIsTyping(false)
      const providerMessage = {
        id: messages.length + 2,
        sender: "provider",
        text: getRandomResponse(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, providerMessage])
    }, 1500)
  }

  const getRandomResponse = () => {
    const responses = [
      "Thank you for your message. I'll check my schedule and get back to you shortly.",
      "I understand your requirements. Would you like to book a service appointment?",
      "I'm available for this service. When would be a convenient time for you?",
      "I can help with that. Could you provide more details about your specific needs?",
      "That's something I specialize in. I can offer you a competitive rate for this service.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
              {provider ? provider.charAt(0) : "S"}
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">{provider || "Service Provider"}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Usually responds within 1 hour</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-gray-800">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


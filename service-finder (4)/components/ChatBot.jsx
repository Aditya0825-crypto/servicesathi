"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { generateChatResponse } from "@/lib/openai-actions"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi there! I'm ServiceSarthi's assistant. How can I help you find local services in Pune today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Suggested questions for the user
  const suggestedQuestions = [
    "What services do you offer?",
    "How do I book a service?",
    "Are your service providers verified?",
    "What areas in Pune do you serve?",
    "How can I contact customer support?",
  ]

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSuggestedQuestion = (question) => {
    // Set the input value to the suggested question
    setInputValue(question)

    // Submit the form programmatically
    handleSubmit(new Event("submit", { cancelable: true }), question)
  }

  const handleSubmit = async (e, suggestedQuestion = null) => {
    e.preventDefault()
    const questionText = suggestedQuestion || inputValue

    if (!questionText.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: questionText,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    try {
      // Call for response (will use mock data or API)
      const response = await generateChatResponse(questionText)

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: response,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Error getting response:", error)

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: "I'm having trouble right now. Please try asking about our services, booking process, or service areas in Pune.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all z-[1000]"
        aria-label="Chat with us"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-[1000] flex flex-col max-h-[70vh] border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* Chat header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h3 className="font-bold">ServiceSarthi Assistant</h3>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.type === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.type === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</div>
              </div>
            ))}

            {/* Show suggested questions after bot's first message */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">You can ask me about:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isTyping && (
              <div className="mb-4">
                <div className="inline-block p-3 rounded-lg max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-white">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce mr-1"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce mr-1"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your question..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
              disabled={isTyping || !inputValue.trim()}
            >
              {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>

          {/* FAQ link */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
            <Link
              href="/faq"
              className="text-primary hover:underline flex items-center justify-center text-sm"
              onClick={() => setIsOpen(false)}
            >
              View Frequently Asked Questions
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}


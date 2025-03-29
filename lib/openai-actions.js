"use server"

import { findMockResponse } from "./mock-responses"

// Helper function to wait for a specified time
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function generateChatResponse(userMessage) {
  // First, try to find a mock response
  const mockResponse = findMockResponse(userMessage)
  if (mockResponse) {
    // Add a small delay to simulate API call
    await wait(500)
    return mockResponse
  }

  // If no mock response, try OpenAI API with retries
  // Maximum number of retries
  const MAX_RETRIES = 2
  let retries = 0
  let lastError = null

  while (retries < MAX_RETRIES) {
    try {
      // Add a small delay before retrying (exponential backoff)
      if (retries > 0) {
        await wait(Math.pow(2, retries) * 1000)
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for ServiceSarthi, a platform that connects users with local service providers in Pune, India. Your name is ServiceSarthi Assistant. Provide concise, accurate information about our services including plumbing, electrical work, carpentry, and house cleaning. Keep responses under 150 words and be friendly. If you don't know something specific about ServiceSarthi, provide general information about that type of service.",
            },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      })

      if (!response.ok) {
        // If API fails, fall back to mock response system
        console.warn(`API request failed with status ${response.status}, using fallback response`)
        return (
          findMockResponse(userMessage) ||
          "I'm sorry, I couldn't understand your question. Could you please rephrase it or ask about our services in Pune?"
        )
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error("Error calling OpenAI API:", error)
      lastError = error
      retries++

      // Continue to next retry
      continue
    }
  }

  // If all API attempts fail, use mock response as fallback
  console.error("Error after retries:", lastError)
  return (
    findMockResponse(userMessage) ||
    "I'm having trouble connecting to my knowledge base right now. Please try asking about our services, booking process, or service areas in Pune."
  )
}


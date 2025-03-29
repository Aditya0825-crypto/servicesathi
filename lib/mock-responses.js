// Mock responses for common questions
const mockResponses = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response:
      "Hello! I'm ServiceSarthi's virtual assistant. How can I help you today with finding local services in Pune?",
  },
  {
    keywords: ["services", "offer", "provide", "available"],
    response:
      "We offer a variety of services in Pune including plumbing, electrical work, carpentry, house cleaning, AC repair, painting, and pest control. You can browse all services on our website or ask me about specific ones!",
  },
  {
    keywords: ["plumbing", "plumber", "pipe", "leak", "tap", "water"],
    response:
      "Our plumbing services in Pune include pipe repairs, leak detection, tap installation, drainage issues, and water heater services. All our plumbers are verified professionals with years of experience.",
  },
  {
    keywords: ["electrical", "electrician", "wiring", "circuit", "power"],
    response:
      "Our electrical services include wiring installation, circuit repairs, switchboard fixes, fan/light installation, and emergency electrical repairs. Our electricians in Pune are licensed and follow all safety protocols.",
  },
  {
    keywords: ["cleaning", "cleaner", "housekeeping", "maid"],
    response:
      "Our house cleaning services in Pune include regular cleaning, deep cleaning, move-in/move-out cleaning, and specialized cleaning. All our cleaning staff are trained, background-verified, and use quality cleaning products.",
  },
  {
    keywords: ["carpenter", "carpentry", "furniture", "wood", "repair"],
    response:
      "Our carpentry services include furniture repair, custom furniture making, door/window fixes, and wooden fixture installation. Our carpenters in Pune are skilled craftsmen with expertise in various woodworking techniques.",
  },
  {
    keywords: ["book", "booking", "schedule", "appointment"],
    response:
      "Booking a service is easy! Just select the service you need, choose a service provider, select your preferred date and time, provide your address details, and confirm your booking. You can book through our website or mobile app.",
  },
  {
    keywords: ["cancel", "cancellation", "reschedule"],
    response:
      "You can cancel or reschedule a booking from your dashboard. Go to 'My Bookings' and select the booking you wish to modify. Cancellations made at least 24 hours in advance are free of charge.",
  },
  {
    keywords: ["payment", "pay", "cost", "price", "fee"],
    response:
      "We accept various payment methods including credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and cash on service completion. Prices vary by service and provider, and are clearly shown before booking.",
  },
  {
    keywords: ["provider", "professional", "verified", "background"],
    response:
      "All our service providers undergo thorough verification including identity verification, background checks, skill assessment, and reference checks. We continuously monitor provider ratings and reviews to ensure quality service.",
  },
  {
    keywords: ["areas", "locations", "serve", "coverage", "pune"],
    response:
      "We currently serve all areas in Pune including Kothrud, Baner, Hinjewadi, Viman Nagar, Kharadi, Hadapsar, Aundh, Shivaji Nagar, and other localities. You can filter services by your specific area on our services page.",
  },
  {
    keywords: ["contact", "support", "help", "reach"],
    response:
      "You can reach our customer support team at +91 98345 15256 or email us at adityachaubey216@gmail.com. Our support hours are Monday to Saturday, 9:00 AM to 8:00 PM, and Sunday, 10:00 AM to 4:00 PM.",
  },
  {
    keywords: ["guarantee", "quality", "satisfaction", "refund"],
    response:
      "We offer a satisfaction guarantee on all services. If you're not satisfied, please contact our customer support within 24 hours of service completion to report any issues. We'll work to resolve the issue or provide a refund as appropriate.",
  },
  {
    keywords: ["account", "profile", "sign up", "register", "login"],
    response:
      "You can create an account by clicking on 'Sign Up' on our website. This allows you to save your address, track bookings, and get personalized service recommendations. Existing users can simply log in to access their account.",
  },
  {
    keywords: ["rating", "review", "feedback"],
    response:
      "After each service completion, you can rate your experience and leave a review for the service provider. Your feedback helps us maintain high service standards and helps other users make informed choices.",
  },
]

// Function to find a matching response
export function findMockResponse(userMessage) {
  if (!userMessage) return null

  const message = userMessage.toLowerCase()

  // Find the first response where any keyword matches
  for (const item of mockResponses) {
    if (item.keywords.some((keyword) => message.includes(keyword))) {
      return item.response
    }
  }

  // Default response if no match is found
  return "I'm here to help with questions about ServiceSarthi's local services in Pune. You can ask about our services, booking process, service providers, or anything else related to home services!"
}


import { db } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import twilio from "twilio"
import { twilioConfig } from "./twilio-config"

// Initialize Twilio client
const twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken)

// Format phone number to E.164 format
const formatPhoneNumber = (phone) => {
  try {
    // Remove any non-digit characters
    const cleaned = phone.toString().replace(/\D/g, '')
    
    // Add India country code if not present
    if (!cleaned.startsWith('91')) {
      return `+91${cleaned}`
    }
    
    // Add + if not present
    if (!cleaned.startsWith('+')) {
      return `+${cleaned}`
    }
    
    return cleaned
  } catch (error) {
    console.error('Error formatting phone number:', error)
    return null
  }
}

// Validate Twilio configuration
const validateTwilioConfig = () => {
  const required = ['accountSid', 'authToken', 'phoneNumber', 'adminPhone']
  const missing = required.filter(key => !twilioConfig[key])
  
  if (missing.length > 0) {
    console.error('Missing Twilio configuration:', missing)
    return false
  }
  
  return true
}

// Send SMS using Twilio
const sendSMS = async (to, message, isCustomer = false) => {
  try {
    if (!validateTwilioConfig()) {
      console.error('Invalid Twilio configuration')
      return null
    }

    if (!to) {
      console.error('No phone number provided')
      return null
    }

    const formattedNumber = formatPhoneNumber(to)
    if (!formattedNumber) {
      console.error('Invalid phone number format:', to)
      return null
    }

    console.log(`Attempting to send SMS to ${isCustomer ? 'customer' : 'admin'}...`)
    console.log("From:", twilioConfig.phoneNumber)
    console.log("To:", formattedNumber)
    console.log("Message:", message)
    
    const response = await twilioClient.messages.create({
      body: message.trim(),
      from: twilioConfig.phoneNumber,
      to: formattedNumber
    })
    
    console.log(`SMS sent successfully to ${isCustomer ? 'customer' : 'admin'}:`, response.sid)
    return response
  } catch (error) {
    console.error(`Error sending SMS to ${isCustomer ? 'customer' : 'admin'}:`, error.message)
    console.error("Error code:", error.code)
    console.error("More info:", error.moreInfo)
    return null
  }
}

export const sendBookingNotifications = async (bookingData) => {
  try {
    console.log('Starting booking notifications process...')
    console.log('Booking data:', bookingData)

    // Send SMS notification to admin
    const adminSMSMessage = `New Booking Alert!
Service: ${bookingData.serviceDetails.title}
Date: ${bookingData.date}
Time: ${bookingData.time}
Customer: ${bookingData.name}
Phone: ${bookingData.phone}
Address: ${bookingData.address}, ${bookingData.city}`

    const adminResult = await sendSMS(twilioConfig.adminPhone, adminSMSMessage, false)
    if (!adminResult) {
      console.error('Failed to send admin notification')
    }

    // Send SMS notification to customer
    if (bookingData.phone) {
      console.log('Attempting to send customer notification to:', bookingData.phone)
      
      const customerSMSMessage = `Your booking is confirmed!
Service: ${bookingData.serviceDetails.title}
Date: ${bookingData.date}
Time: ${bookingData.time}
Provider: ${bookingData.serviceDetails.provider}
Thank you for choosing our service!`

      const customerResult = await sendSMS(bookingData.phone, customerSMSMessage, true)
      if (!customerResult) {
        console.error('Failed to send customer notification')
      }
    } else {
      console.error('No customer phone number provided in booking data')
    }

    // Create notification in Firestore
    const notification = {
      userId: bookingData.userId,
      type: "booking",
      title: "Booking Confirmed",
      message: `Your ${bookingData.serviceDetails.title} service has been booked for ${bookingData.date} at ${bookingData.time}.`,
      read: false,
      link: `/dashboard/bookings/${bookingData.id}`,
      createdAt: serverTimestamp(),
    }

    await addDoc(collection(db, "notifications"), notification)
    console.log('Booking notifications process completed')

    return { success: true }
  } catch (error) {
    console.error("Error in sendBookingNotifications:", error)
    // Don't fail the booking if notifications fail
    return { success: true }
  }
} 
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, Calendar, Check } from "lucide-react"

export default function ServiceCalendar({ onTimeSelect, serviceId }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [availableSlots, setAvailableSlots] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    if (!selectedDate) return

    setIsLoading(true)

    // Simulate API call to get available time slots for the selected date
    setTimeout(() => {
      // Generate random available slots for demo purposes
      const slots = {}
      const date = new Date(selectedDate)
      const dateStr = date.toISOString().split("T")[0]

      // Generate 5-10 random time slots between 9 AM and 6 PM
      const numSlots = 5 + Math.floor(Math.random() * 6)
      const slotTimes = []

      for (let i = 0; i < numSlots; i++) {
        // Random hour between 9 and 17 (9 AM to 5 PM)
        const hour = 9 + Math.floor(Math.random() * 9)
        // Random minute (0, 15, 30, 45)
        const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)]

        const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        if (!slotTimes.includes(timeStr)) {
          slotTimes.push(timeStr)
        }
      }

      // Sort time slots
      slotTimes.sort()

      slots[dateStr] = slotTimes.map((time) => ({
        time,
        available: true,
      }))

      setAvailableSlots(slots)
      setIsLoading(false)
    }, 500)
  }, [selectedDate, serviceId])

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = new Date(prev)
      prevMonth.setMonth(prev.getMonth() - 1)
      return prevMonth
    })
  }

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev)
      nextMonth.setMonth(prev.getMonth() + 1)
      return nextMonth
    })
  }

  const handleDateSelect = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(selected)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)

    if (onTimeSelect && selectedDate) {
      const dateTime = new Date(selectedDate)
      const [hours, minutes] = time.split(":").map(Number)
      dateTime.setHours(hours, minutes)

      onTimeSelect(dateTime)
    }
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const today = new Date()
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateStr = date.toISOString().split("T")[0]

      const isToday = isCurrentMonth && today.getDate() === day
      const isPast = date < new Date(today.setHours(0, 0, 0, 0))
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year

      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateSelect(day)}
          disabled={isPast}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${
            isSelected
              ? "bg-primary text-white"
              : isToday
                ? "bg-primary/10 text-primary font-medium"
                : isPast
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const renderTimeSlots = () => {
    if (!selectedDate) return null

    const dateStr = selectedDate.toISOString().split("T")[0]
    const slots = availableSlots[dateStr] || []

    if (isLoading) {
      return (
        <div className="py-8 text-center">
          <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading available times...</p>
        </div>
      )
    }

    if (slots.length === 0) {
      return (
        <div className="py-8 text-center">
          <p className="text-gray-500">No available slots for this date</p>
          <p className="text-sm text-gray-400 mt-1">Please select another date</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-3 gap-2 mt-4">
        {slots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleTimeSelect(slot.time)}
            disabled={!slot.available}
            className={`p-2 rounded-md text-center text-sm ${
              selectedTime === slot.time
                ? "bg-primary text-white"
                : slot.available
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg">Schedule Service</h3>
        <p className="text-gray-600 text-sm">Select a date and time for your service</p>
      </div>

      <div className="p-4">
        {/* Calendar header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h4 className="font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>

          <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar days of week */}
        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 mb-6">{renderCalendar()}</div>

        {/* Selected date */}
        {selectedDate && (
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center text-gray-700 mb-3">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              <span className="font-medium">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center text-gray-700 mb-4">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              <span className="font-medium">Available Time Slots</span>
            </div>

            {renderTimeSlots()}
          </div>
        )}

        {/* Selected date and time confirmation */}
        {selectedDate && selectedTime && (
          <div className="mt-6 p-3 bg-green-50 rounded-md border border-green-100">
            <div className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Appointment Selected</p>
                <p className="text-green-700 text-sm">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {selectedTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


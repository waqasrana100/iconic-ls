"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"


const BookingForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData)

      // Send data to the server
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit booking")
      }

      toast({
        title: "Booking submitted successfully!",
        description: "Your booking request has been received and we will get back to you shortly.",
      })
    } catch (error: any) {
      toast({
        title: "Error submitting booking",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-luxury-gold">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              required
              className="bg-luxury-gray-800 border-luxury-gray-700 text-white placeholder-luxury-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-luxury-gold">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              required
              className="bg-luxury-gray-800 border-luxury-gray-700 text-white placeholder-luxury-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-luxury-gold">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="bg-luxury-gray-800 border-luxury-gray-700 text-white placeholder-luxury-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-luxury-gold">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
              className="bg-luxury-gray-800 border-luxury-gray-700 text-white placeholder-luxury-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-luxury-gold">
              Service Type
            </Label>
            <Select name="serviceType">
              <SelectTrigger className="bg-luxury-gray-800 border-luxury-gray-700 text-white">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent className="bg-luxury-gray-800 border-luxury-gray-700">
                <SelectItem value="corporate" className="text-white">
                  Corporate Service
                </SelectItem>
                <SelectItem value="party" className="text-white">
                  Party Bus
                </SelectItem>
                <SelectItem value="event" className="text-white">
                  Special Event
                </SelectItem>
                <SelectItem value="tour" className="text-white">
                  City Tour
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-luxury-gold">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              className="bg-luxury-gray-800 border-luxury-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time" className="text-luxury-gold">
              Time
            </Label>
            <Input
              id="time"
              name="time"
              type="time"
              required
              className="bg-luxury-gray-800 border-luxury-gray-700 text-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-luxury-gold">
            Special Requirements
          </Label>
          <Textarea
            id="message"
            name="message"
            className="w-full min-h-[100px] bg-luxury-gray-800 border-luxury-gray-700 text-white placeholder-luxury-gray-400"
            placeholder="Any special requests or requirements..."
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-luxury-gold text-black hover:bg-luxury-gold/90 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Booking Request"}
        </Button>
      </form>
    </div>

  )
}

export default BookingForm


'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, User, Building, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Formspree
    console.log('Form submitted:', formData)
    alert('Thank you! Our expert team will be in touch soon.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-secondary/40 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold !text-liberty-background mb-4">
            Still Got <span className="text-liberty-accent">Questions?</span>
          </h2>
          <p className="text-xl sm:text-2xl !text-liberty-background/70 max-w-3xl mx-auto">
            Speak to our expert team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="bg-liberty-base/95 backdrop-blur-sm border-liberty-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-liberty-background">
                  <div className="w-12 h-12 bg-liberty-accent/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-liberty-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-reckless font-bold">Get in Touch</h3>
                    <p className="text-liberty-background/60 font-normal">
                      We're here to help with your property questions
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-liberty-background mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-liberty-background/40 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-liberty-secondary/30 rounded-lg focus:ring-2 focus:ring-liberty-accent focus:border-liberty-accent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-liberty-background mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-liberty-background/40 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-liberty-secondary/30 rounded-lg focus:ring-2 focus:ring-liberty-accent focus:border-liberty-accent transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-liberty-background mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-liberty-background/40 w-5 h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-liberty-secondary/30 rounded-lg focus:ring-2 focus:ring-liberty-accent focus:border-liberty-accent transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Address Field */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-liberty-background mb-2">
                      Property Address
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-liberty-background/40 w-5 h-5" />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-liberty-secondary/30 rounded-lg focus:ring-2 focus:ring-liberty-accent focus:border-liberty-accent transition-colors"
                        placeholder="Enter your property address"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-liberty-background mb-2">
                      Your Question or Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-liberty-secondary/30 rounded-lg focus:ring-2 focus:ring-liberty-accent focus:border-liberty-accent transition-colors resize-none"
                      placeholder="Tell us about your situation or ask your question..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="xl"
                    className="w-full bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background"
                  >
                    <span className="flex items-center gap-3 group">
                      Send Message
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>

                  {/* Privacy Notice */}
                  <p className="text-xs text-liberty-background/60 text-center">
                    By submitting this form, you agree to receive helpful information about your property rights. 
                    We never share your data and you can unsubscribe at any time.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <Card className="bg-liberty-base/95 backdrop-blur-sm border-liberty-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-liberty-background">
                  <div className="w-12 h-12 bg-liberty-accent/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-liberty-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-reckless font-bold">Contact Information</h3>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-liberty-accent" />
                    <a 
                      href="mailto:lbpm@libertybell.co.uk" 
                      className="text-liberty-background/70 hover:text-liberty-accent transition-colors"
                    >
                      lbpm@libertybell.co.uk
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-liberty-accent" />
                    <a 
                      href="tel:+447894309321" 
                      className="text-liberty-background/70 hover:text-liberty-accent transition-colors"
                    >
                      +44 (0) 7894 309 321
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-liberty-accent" />
                    <span className="text-liberty-background/70">Serving leaseholders across England & Wales</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="bg-liberty-base/95 backdrop-blur-sm border-liberty-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-liberty-background">
                  <div className="w-12 h-12 bg-liberty-accent/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-liberty-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-reckless font-bold">Why Choose Liberty Bell?</h3>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-liberty-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-liberty-background/70 text-sm">
                      <strong className="text-liberty-background">Property Institute accredited</strong> professionals
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-liberty-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-liberty-background/70 text-sm">
                      <strong className="text-liberty-background">Fixed-fee pricing</strong> with no hidden costs
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-liberty-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-liberty-background/70 text-sm">
                      <strong className="text-liberty-background">We're leaseholders too</strong> - we understand your frustration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
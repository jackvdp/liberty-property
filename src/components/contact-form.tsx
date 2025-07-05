'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, Phone, MapPin, User, Building, ArrowRight } from 'lucide-react'
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
    alert('Thank you! We\'ll send you the free guide and be in touch soon.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-secondary relative overflow-hidden">

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
            Join the Property <span className="text-liberty-accent">Freedom Movement</span>
          </h2>
          <p className="text-xl sm:text-2xl !text-liberty-background/70 max-w-3xl mx-auto">
            Get your free guide to commonhold and take the first step toward true property ownership
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
                    <Download className="w-6 h-6 text-liberty-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-reckless font-bold">Get Your Free Guide</h3>
                    <p className="text-liberty-background/60 font-normal">
                      "How to Turn Your Leasehold into Commonhold"
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      Tell us about your situation (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-liberty-secondary/30 rounded-lg focus:ring-2 focus:ring-liberty-accent focus:border-liberty-accent transition-colors resize-none"
                      placeholder="What challenges are you facing with your leasehold property?"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="xl" 
                    className="w-full bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background"
                  >
                    <span className="flex items-center gap-3 group">
                      Get My Free Guide & Join the Movement
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>

                  {/* Privacy Notice */}
                  <p className="text-xs text-liberty-background/60 text-center">
                    By submitting this form, you agree to receive helpful information about commonhold and property rights. 
                    We never share your data and you can unsubscribe at any time.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* What You'll Get */}
            <Card className="bg-liberty-base/10 backdrop-blur-sm border-liberty-secondary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-reckless font-bold !text-liberty-background mb-6">
                  What You'll Receive
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-liberty-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Download className="w-5 h-5 text-liberty-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold !text-liberty-background mb-1">Free Commonhold Guide</h4>
                      <p className="text-liberty-background/70 text-sm">
                        Complete step-by-step guide to understanding and achieving commonhold ownership
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-liberty-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-liberty-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold !text-liberty-background mb-1">Weekly Property Freedom Tips</h4>
                      <p className="text-liberty-background/70 text-sm">
                        Practical advice, success stories, and legal updates delivered to your inbox
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-liberty-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-liberty-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold !text-liberty-background mb-1">Free Initial Consultation</h4>
                      <p className="text-liberty-background/70 text-sm">
                        15-minute call to discuss your specific situation and next steps
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-liberty-base/10 backdrop-blur-sm border-liberty-secondary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-reckless font-bold !text-liberty-background mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-liberty-accent" />
                    <span className="text-liberty-background/70">lbpm@libertybell.co.uk</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-liberty-accent" />
                    <span className="text-liberty-background/70">+44 (0) 7894 309 321</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-liberty-accent" />
                    <span className="text-liberty-background/70">Serving leaseholders across England & Wales</span>
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
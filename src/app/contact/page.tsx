'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { contactInfo } from '@/data/contact-info'
import Image from 'next/image'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
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
    alert('Thank you for your message. We\'ll get back to you soon!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      {/* Hero Section with Image */}
      <section className="relative py-20 lg:py-32 bg-liberty-secondary/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl lg:text-6xl font-reckless font-bold !text-liberty-background mb-6">
                Get In <span className="text-liberty-accent">Touch</span>
              </h1>
              <p className="text-xl !text-liberty-background/60 mb-8">
                Ready to take control of your building? We're here to help you navigate your journey to property empowerment.
              </p>

              {/* Contact Details */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 bg-liberty-accent/10 rounded-full">
                    <Mail className="w-5 h-5 text-liberty-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-liberty-background">Email</p>
                    <a 
                      href={contactInfo.email.href}
                      className="text-liberty-background/60 hover:text-liberty-accent transition-colors"
                    >
                      {contactInfo.email.address}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 bg-liberty-accent/10 rounded-full">
                    <Phone className="w-5 h-5 text-liberty-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-liberty-background">Phone</p>
                    <a 
                      href={contactInfo.phone.href}
                      className="text-liberty-background/60 hover:text-liberty-accent transition-colors"
                    >
                      {contactInfo.phone.display}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 bg-liberty-accent/10 rounded-full">
                    <MapPin className="w-5 h-5 text-liberty-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-liberty-background">Coverage</p>
                    <p className="text-liberty-background/60">{contactInfo.location.display}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/london.png"
                alt="London skyline"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="bg-liberty-base shadow-lg border-liberty-secondary/20">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-reckless font-bold text-liberty-background mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-liberty-background/60">
                    Tell us about your situation and we'll get back to you with tailored advice.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg"
                        placeholder="Phone Number"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg"
                        placeholder="Property Address"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors resize-none bg-transparent placeholder:text-liberty-background/40 text-lg"
                      placeholder="Tell us about your situation..."
                    />
                  </div>

                  <div className="pt-8 text-center">
                    <Button
                      size="xl"
                      type="submit"
                      className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background px-12 py-4 rounded-full font-medium group"
                    >
                      Send Message
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  <p className="text-sm text-liberty-background/50 text-center pt-4">
                    We respect your privacy and will never share your information with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
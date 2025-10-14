'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { contactInfo } from '@/data/contact-info'
import Image from 'next/image'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactFormFields from '@/components/ui/contact-form-fields'

export default function ContactPage() {

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-liberty-secondary/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl font-reckless font-bold !text-liberty-background mb-6">
              Get In <span className="text-liberty-accent">Touch</span>
            </h1>
            <p className="text-xl !text-liberty-background/60">
              Want to discuss your situation? Get in touch and we'll book in a free consultation call.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <a 
              href={contactInfo.email.href}
              className="group flex items-center gap-3 border border-liberty-primary p-8 hover:border-liberty-accent transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-liberty-primary group-hover:text-liberty-accent transition-colors" />
              <span className="text-liberty-primary group-hover:text-liberty-accent transition-colors">
                {contactInfo.email.address}
              </span>
            </a>
            
            <div className="flex items-center gap-3 border border-liberty-primary p-8">
              <MapPin className="w-5 h-5 text-liberty-primary" />
              <span className="text-liberty-primary">{contactInfo.location.display}</span>
            </div>
          </motion.div>

          {/* Scroll to Form Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <Button
              onClick={scrollToForm}
              variant="outline"
              size="xl"
              className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-secondary transition-colors rounded-full px-8 py-3"
            >
              Send us a message
              <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* London Image Section */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <Image
            src="/london.png"
            alt="London skyline"
            width={1500}
            height={600}
            className="w-full h-[400px] lg:h-[600px] object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-liberty-secondary/40">
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
                  <h2 className="text-3xl lg:text-4xl font-reckless font-bold text-liberty-background mb-4">
                    Let's <span className="text-liberty-accent">Talk</span>
                  </h2>
                  <p className="text-xl text-liberty-background/60">
                    Tell us about your situation and we'll schedule a consultation to discuss your options
                  </p>
                </div>

                <ContactFormFields
                  submitButtonText="Let's Talk"
                  successMessage="Thank you! We'll get back to you soon."
                  privacyText="We respect your privacy and will never share your information with third parties."
                  namePlaceholder="Your Name"
                  emailPlaceholder="Email Address"
                  phonePlaceholder="Phone Number"
                  addressPlaceholder="Property Address"
                  messagePlaceholder="Tell us about your situation and what you'd like to discuss..."
                  buttonVariant="primary"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
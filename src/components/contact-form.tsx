'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const contactContent = {
  header: {
    title: "Still Got Questions?",
    subtitle: "Whether you've got more questions or are ready to take the first step to control your building, talk to our expert team."
  },
  form: {
    fields: {
      name: "Your name *",
      email: "Your email *",
      phone: "Phone number",
      address: "Property address",
      message: "Your message"
    },
    submitButton: "Let's Talk",
    privacyText: "We respect your privacy and will never share your information.",
    successMessage: "Thank you! Our expert team will be in touch soon.",
    action: "https://formspree.io/f/YOUR_FORM_ID"
  }
}

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
    alert(contactContent.form.successMessage)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-20 bg-liberty-secondary/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-reckless font-bold !text-liberty-background mb-4">
            {contactContent.header.title.split(' ').slice(0, 2).join(' ')} <span className="text-liberty-accent">{contactContent.header.title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="text-xl !text-liberty-background/60 max-w-2xl mx-auto">
            {contactContent.header.subtitle}
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Contact Form - Full Width Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="bg-liberty-base shadow-lg border-liberty-secondary/20">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6" action={contactContent.form.action} method="POST">
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
                        placeholder={contactContent.form.fields.name}
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
                        placeholder={contactContent.form.fields.email}
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
                        placeholder={contactContent.form.fields.phone}
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
                        placeholder={contactContent.form.fields.address}
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
                      placeholder={contactContent.form.fields.message}
                    />
                  </div>

                  <div className="pt-8 text-center">
                    <Button
                        size={"xl"}
                      type="submit"
                      className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background px-12 py-4 rounded-full font-medium group"
                    >
                      {contactContent.form.submitButton}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  <p className="text-sm text-liberty-background/50 text-center pt-4">
                    {contactContent.form.privacyText}
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
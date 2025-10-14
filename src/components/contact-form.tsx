'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/data/home/content'
import ContactFormFields from '@/components/ui/contact-form-fields'

export default function ContactForm() {
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
            {content.contact.header.title.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="text-liberty-accent">
              {content.contact.header.title.split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="text-xl !text-liberty-background/60 max-w-2xl mx-auto">
            {content.contact.header.subtitle}
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
                <div className="max-w-4xl mx-auto">
                  <ContactFormFields
                    submitButtonText={content.contact.form.submitButton}
                    successMessage={content.contact.form.successMessage}
                    privacyText={content.contact.form.privacyText}
                    namePlaceholder={content.contact.form.fields.name}
                    emailPlaceholder={content.contact.form.fields.email}
                    phonePlaceholder={content.contact.form.fields.phone}
                    addressPlaceholder={content.contact.form.fields.address}
                    messagePlaceholder={content.contact.form.fields.message}
                    buttonVariant="accent"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

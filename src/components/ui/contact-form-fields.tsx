'use client'

import { useState, FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContactFormFieldsProps {
  /** Button text for submit button */
  submitButtonText?: string
  /** Success message shown after submission */
  successMessage?: string
  /** Privacy text shown below form */
  privacyText?: string
  /** Custom placeholder for name field */
  namePlaceholder?: string
  /** Custom placeholder for email field */
  emailPlaceholder?: string
  /** Custom placeholder for phone field */
  phonePlaceholder?: string
  /** Custom placeholder for address field */
  addressPlaceholder?: string
  /** Custom placeholder for message field */
  messagePlaceholder?: string
  /** Button color variant - 'primary' uses liberty-primary, 'accent' uses liberty-accent */
  buttonVariant?: 'primary' | 'accent'
  /** Callback function called after successful submission */
  onSubmitSuccess?: () => void
}

export default function ContactFormFields({
  submitButtonText = "Submit",
  successMessage = "Thank you! We'll get back to you soon.",
  privacyText = "We respect your privacy and will never share your information.",
  namePlaceholder = "Your name *",
  emailPlaceholder = "Your email *",
  phonePlaceholder = "Phone number",
  addressPlaceholder = "Property address",
  messagePlaceholder = "Your message",
  buttonVariant = 'accent',
  onSubmitSuccess
}: ContactFormFieldsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/mkgqpaqn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: ''
        })
        
        // Call success callback if provided
        onSubmitSuccess?.()
        
        // Show success message
        alert(successMessage)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Sorry, there was an error submitting your message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const buttonClasses = buttonVariant === 'primary'
    ? "bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-secondary"
    : "bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background"

  return (
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
            disabled={isSubmitting}
            className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg disabled:opacity-50"
            placeholder={namePlaceholder}
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
            disabled={isSubmitting}
            className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg disabled:opacity-50"
            placeholder={emailPlaceholder}
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
            disabled={isSubmitting}
            className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg disabled:opacity-50"
            placeholder={phonePlaceholder}
          />
        </div>

        <div>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg disabled:opacity-50"
            placeholder={addressPlaceholder}
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
          disabled={isSubmitting}
          className="w-full px-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors resize-none bg-transparent placeholder:text-liberty-background/40 text-lg disabled:opacity-50"
          placeholder={messagePlaceholder}
        />
      </div>

      <div className="pt-8 text-center">
        <Button
          size="xl"
          type="submit"
          disabled={isSubmitting}
          className={`${buttonClasses} px-12 py-4 rounded-full font-medium group disabled:opacity-50`}
        >
          {isSubmitting ? 'Sending...' : submitButtonText}
          {!isSubmitting && (
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform ml-2" />
          )}
        </Button>
      </div>

      <p className="text-sm text-liberty-background/50 text-center pt-4">
        {privacyText}
      </p>
    </form>
  )
}

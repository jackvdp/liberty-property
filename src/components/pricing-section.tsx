'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  PoundSterling, 
  Shield, 
  TrendingDown, 
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Calculator,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  {
    icon: TrendingDown,
    title: "Save at least 20%",
    description: "We estimate we can save you at least 20% on your service charges"
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "Always upfront about costs - you'll know what you're paying for and what you're getting"
  },
  {
    icon: PoundSterling,
    title: "Flexible Payment Options",
    description: "Range of payment options including no upfront payment but a share of future savings"
  },
  {
    icon: CheckCircle,
    title: "Long-term Partnership",
    description: "We want a lasting relationship with leaseholders, not just a one-off transaction"
  }
]

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
            Pricing and <span className="text-liberty-primary">Working With Us</span>
          </h2>
          <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto">
            We understand that people can be put off from fighting their freeholder and management agent by expensive legal bills.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-base rounded-xl p-6 shadow-sm border border-liberty-secondary/30 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-liberty-primary/10 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-liberty-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-liberty-background mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-liberty-background/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Our Commitments */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-liberty-base rounded-xl p-8 border border-liberty-secondary/30">
              <h3 className="text-2xl font-reckless font-bold text-liberty-background mb-6">
                Our Commitments to You
              </h3>
              
              <div className="space-y-4 text-liberty-background/80 leading-relaxed">
                <p>
                  <strong>We know that people want to know in advance what they might have to pay.</strong>
                </p>
                <p>
                  We are committed to making working with us as affordable as possible.
                </p>
                <p>
                  We will always be upfront and transparent about our costs and charges. You will always know what you are paying for and what you are getting for your money.
                </p>
                <p>
                  We want to have a long term relationship with leaseholders and offer a range of payment options based on your circumstances. This can include no upfront payment but a share of future savings.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Pricing Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Standard Pricing */}
            <div className="bg-liberty-primary/5 rounded-xl p-8 border border-liberty-primary/20">
              <h3 className="text-2xl font-reckless font-bold text-liberty-background mb-6">
                Right to Manage Pricing
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-liberty-base rounded-lg border border-liberty-secondary/30">
                  <Calculator className="w-6 h-6 text-liberty-primary" />
                  <div>
                    <p className="font-semibold text-liberty-background">Standard Fee</p>
                    <p className="text-liberty-background/70 text-sm">£2,000 + VAT to secure Right to Manage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-liberty-accent/5 rounded-xl p-8 border border-liberty-accent/30 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-liberty-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                Limited Time
              </div>
              
              <h3 className="text-2xl font-reckless font-bold text-liberty-background mb-4">
                Special Launch Offer
              </h3>
              
              <div className="space-y-4 text-liberty-background/80 leading-relaxed">
                <p>
                  <strong className="text-liberty-accent">Because we are new</strong>, and we want to build up our knowledge base of service charges, we are currently offering a <strong>'pay what you feel is reasonable'</strong> for securing Right To Manage.
                </p>
                <p>
                  In return, you provide free use of your service charge information to help us build a national knowledge base that benefits all leaseholders.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <Users className="w-5 h-5 text-liberty-accent" />
                  <Link href="/about" className="text-liberty-accent hover:text-liberty-accent/80 font-medium underline">
                    Learn more about who we are
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-r from-liberty-primary/10 to-liberty-accent/10 rounded-xl p-8 border border-liberty-primary/20">
            <h3 className="text-2xl font-reckless font-bold text-liberty-background mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-liberty-background/70 text-lg mb-6 max-w-2xl mx-auto">
              Contact us today for a discussion about how we can help and a personalized quotation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                <Link href="mailto:hello@libertybell.co.uk" className="flex items-center gap-3">
                  <MessageCircle size={20} />
                  Get Your Quote Today
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
                <Link href="/cost-calculator" className="flex items-center gap-3">
                  <Calculator size={20} />
                  Calculate Your Savings
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Happy Couple Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative h-[300px] lg:h-[500px]">
            <Image
              src="/couple-happy.jpeg"
              alt="Happy couple celebrating their property ownership success"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-liberty-primary/80 via-liberty-primary/60 to-transparent" />
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-8 lg:px-16">
                <h3 className="text-3xl lg:text-4xl font-reckless font-bold !text-white mb-4 leading-tight">
                  Join Thousands of Happy Property Owners
                </h3>
                <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-6">
                  Take control of your building management and start saving on service charges today.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
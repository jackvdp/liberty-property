'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  PoundSterling, 
  CheckCircle,
  Calculator,
  Building,
  Users,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const pricingItems = [
  {
    icon: Building,
    title: "RTM Process",
    price: "£2,000 + VAT",
    description: "Complete Right to Manage process to take control of your building"
  },
  {
    icon: PoundSterling,
    title: "Enfranchisement",
    price: "£500-£2,000 per flat",
    description: "Collective purchase of your freehold - varies by building complexity"
  },
  {
    icon: Users,
    title: "Aftercare",
    price: "Optional monthly pricing",
    description: "Want to live hassle free? Leave it with our professional building management and release your savings"
  }
]

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold !text-liberty-base mb-6">
            No Surprises, <span className="text-liberty-accent">No Hidden Costs</span>
          </h2>
          <p className="text-xl text-liberty-base/70 max-w-3xl mx-auto">
            Transparent, fixed-fee pricing with our savings-based model
          </p>
        </motion.div>

        {/* Savings Model - Moved above cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto space-y-4 text-liberty-base/80 text-lg">
            <p>
              <strong className="!text-liberty-base">You pay the upfront fee to help you get control. We take a cut of the savings.</strong>
              {' '}
              The upfront fee covers all the legal work and processes. Our revenue comes from the savings we create for you through better management.
            </p>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-liberty-accent/5 border-liberty-accent/20 hover:border-liberty-accent/40 transition-colors duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-liberty-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-liberty-accent" />
                  </div>
                  <h3 className="text-xl font-reckless font-bold !text-liberty-base mb-3">
                    {item.title}
                  </h3>
                  <div className="text-2xl font-bold text-liberty-accent mb-4">
                    {item.price}
                  </div>
                  <p className="!text-liberty-base/70 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              asChild 
              className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background"
            >
              <Link href="/get-quote" className="flex items-center gap-3 group">
                Get A Quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              asChild 
              className="border-liberty-base text-liberty-base hover:bg-liberty-base hover:text-liberty-background"
            >
              <Link href="/register-building">
                Register Your Building
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
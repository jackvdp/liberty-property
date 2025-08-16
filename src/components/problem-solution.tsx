'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  MessageCircleX, 
  CreditCard, 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  ExternalLink,
  PoundSterling,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const howItWorks = [
  {
    step: "1",
    title: "Check Your Eligibility",
    description: "Quick online assessment to see if you qualify for RTM or freehold purchase. We determine what legal rights and options are open to you.",
    time: "60 seconds",
    detail: "Quick online assessment determines if you qualify for RTM or freehold purchase"
  },
  {
    step: "2", 
    title: "We Do The Legal Work",
    description: "Professional handling of all statutory notices, negotiations and paperwork. As Property Institute members, we provide expert guidance you can trust.",
    time: "Fixed fee",
    detail: "Expert guidance through statutory notices, negotiations, and paperwork - not amateur advice"
  },
  {
    step: "3",
    title: "Choose Your Management",
    description: "Self-manage for maximum savings, or hands-free professional management. We advise what's best for your building and circumstances, with ongoing support.",
    time: "Your choice",
    detail: "We advise what's best for your building and circumstances, with ongoing support"
  }
]

const painPoints = [
  {
    icon: CreditCard,
    title: "Overpaying by 20% or More",
    description: "Average service charges of £2,300/year - many buildings overpay by £460+ per flat annually"
  },
  {
    icon: MessageCircleX,
    title: "Trapped with Poor Service",
    description: "No way to switch providers even when you're unhappy with the quality of management"
  },
  {
    icon: Wrench,
    title: "Paying for Nothing",
    description: "High charges for building maintenance that isn't done properly or at all"
  },
  {
    icon: AlertTriangle,
    title: "Stuck Paying Whatever They Charge",
    description: "Even when service is poor, you have no choice but to pay whatever they demand"
  }
]

export default function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* How It Works Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
              We Make It <span className="text-liberty-accent">Simple</span>
            </h2>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto mb-6">
              Three simple steps to take back control of your building and start saving money. 
              As qualified Property Institute members, we provide expert guidance you can trust.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" size="sm" asChild className="border-liberty-accent text-liberty-accent hover:bg-liberty-accent hover:text-liberty-base">
                <Link href="https://www.tpi.org.uk" target="_blank" className="flex items-center gap-2">
                  Verified Property Institute Members
                  <ExternalLink size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/family-home.jpeg"
                  alt="Happy family enjoying control of their property after successful enfranchisement"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-liberty-accent/20 to-transparent" />

                {/* Success overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-liberty-base/95 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-liberty-accent w-6 h-6" />
                    <div>
                      <p className="font-semibold text-liberty-background text-sm">
                        Success Story
                      </p>
                      <p className="text-liberty-background/70 text-xs">
                        "We now control our building and saved £3,000 annually"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Steps */}
            <div className="space-y-6">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg hover:bg-liberty-accent/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-liberty-primary text-liberty-base rounded-full flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-liberty-background">
                        {step.title}
                      </h3>
                      <div className="inline-flex items-center gap-1 text-sm text-liberty-accent font-medium bg-liberty-accent/10 px-2 py-1 rounded">
                        <Clock size={14} />
                        {step.time}
                      </div>
                    </div>
                    <p className="text-liberty-background/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Savings callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-liberty-accent/10 to-liberty-primary/10 border border-liberty-accent/20 rounded-lg p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <PoundSterling className="text-liberty-accent w-6 h-6" />
              <h3 className="text-xl font-semibold text-liberty-background">Your Savings</h3>
            </div>
            <p className="text-liberty-background/80 mb-2">
              <strong>We save you money by redesigning your management.</strong>
            </p>
            <p className="text-sm text-liberty-background/70">
              You keep 50% of the savings initially. After 3 years, 100% of the savings are yours forever.
            </p>
          </motion.div>
        </div>

        {/* Problems Section - Now contextualizing why this matters */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Problems */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
                  Why This<br/> <span className="text-red-600">Matters Now</span>
                </h2>
                <p className="text-xl text-liberty-background/70">
                  The current system is broken and expensive. Here's what leaseholders face every day:
                </p>
              </motion.div>

              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <point.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-1">
                        {point.title}
                      </h3>
                      <p className="text-liberty-background/70 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/couple-pain.jpeg"
                  alt="Frustrated couple dealing with leasehold problems in their home"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Government Recognition Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-liberty-secondary/30 border border-liberty-secondary/50 rounded-lg p-6 text-center mb-12"
        >
          <p className="text-liberty-background/80 mb-4">
            <strong>Even the Government recognises the system needs to change. </strong>
            The time to act is now - take control before new regulations make the process more complex.
          </p>
          <Button variant="outline" size="sm" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
            <Link href="https://commonslibrary.parliament.uk/leasehold-reform-in-england-and-wales/" target="_blank" className="flex items-center gap-2">
              Read Government Plans
              <ExternalLink size={16} />
            </Link>
          </Button>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            size="xl" 
            asChild 
            className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
          >
            <Link href="/eligibility-check" className="flex items-center gap-3 group">
              Check Your Eligibility Now
              <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
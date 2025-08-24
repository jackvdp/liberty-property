'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  MessageCircleX,
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  PoundSterling,
  Shield,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const problems = [
  {
    icon: PoundSterling,
    title: "Average service charge: £2,300/year per flat",
    description: "Expensive fees with no control over how your money is spent"
  },
  {
    icon: AlertTriangle,
    title: "Many buildings overpay by 20% or more",
    description: "That's £460+ per flat annually going straight to waste"
  },
  {
    icon: MessageCircleX,
    title: "Trapped with poor service",
    description: "No way to switch providers even when management fails you"
  },
  {
    icon: Wrench,
    title: "Expensive lawyer-led processes",
    description: "Legal costs that drain your savings with outdated manual processes"
  }
]

const benefits = [
  {
    icon: Shield,
    title: "Select Your Path to Control",
    description: "We'll help you choose the right approach for your building and situation:",
    links: [
      {
        text: "Right to Manage (RTM)",
        href: "/what-is-rtm"
      },
      {
        text: "Collective Enfranchisement", 
        href: "/collective-enfranchisement"
      },
      {
        text: "Commonhold Conversion",
        href: "/commonhold"
      }
    ]
  },
  {
    icon: PoundSterling,
    title: "Eliminate Ground Rent & Increase Property Value",
    description: "Stop paying for nothing, keep that money in your pocket, and watch your property appreciate as commonhold properties outperform leasehold"
  },
  {
    icon: Users,
    title: "Choose Your Management", 
    description: "Pick managing agents who work for you, not against you, and join a community of empowered property owners"
  }
]

export default function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Problems Section */}
        <div className="mb-20">
          {/* Title and intro - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
              The Leasehold System<br/> <span className="text-red-600">is Broken</span>
            </h2>
            <p className="text-lg text-liberty-background/70 max-w-4xl mx-auto">
              Millions of leaseholders across England & Wales are facing the same frustrating issues you're experiencing every day. From escalating service charges to poor management and feeling powerless in your own home, the current system is fundamentally unfair.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Problems */}
            <div>

              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <problem.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-1 text-sm">
                        {problem.title}
                      </h3>
                      <p className="text-liberty-background/70 text-sm leading-relaxed">
                        {problem.description}
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
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/couple-pain.jpeg"
                  alt="Frustrated couple dealing with leasehold problems in their home"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Quote overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-liberty-base/95 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-red-600 w-6 h-6" />
                    <div>
                      <p className="text-liberty-background italic text-sm font-medium">
                        "Even when you're unhappy, you're stuck paying whatever they charge."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-20">
          {/* Title and intro - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
              We Have the <span className="text-liberty-accent">Solution</span>
            </h2>
            <p className="text-lg text-liberty-background/70 max-w-4xl mx-auto">
              Drawing from our own experience as leaseholders, we provide the solution. As a Property Institute Accredited organisation, we support you on your path to control whether that is Right to Manage or Collective Enfranchisement.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
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

            {/* Right: Benefits */}
            <div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg hover:bg-liberty-accent/10 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-liberty-accent/10 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-liberty-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-1 text-sm">
                        {benefit.title}
                      </h3>
                      <div className="text-liberty-background/70 text-sm leading-relaxed">
                        {benefit.description && (
                          <p className="mb-3">{benefit.description}</p>
                        )}
                        {benefit.links && (
                          <div className="space-y-1">
                            {benefit.links.map((link, linkIndex) => (
                              <Link 
                                key={linkIndex}
                                href={link.href}
                                className="block text-liberty-primary hover:text-liberty-primary/80 text-sm font-medium underline"
                              >
                                {link.text}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
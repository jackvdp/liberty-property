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

const content = {
  problems: {
    title: "The Leasehold System",
    titleHighlight: "is Broken",
    subtitle: "Millions of leaseholders across England & Wales are facing the same frustrating issues you're experiencing every day. From escalating service charges to poor management and feeling powerless in your own home, the current system is fundamentally unfair.",
    items: [
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
    ],
    image: {
      src: "/couple-pain.jpeg",
      alt: "Frustrated couple dealing with leasehold problems in their home"
    },
    quote: "Even when you're unhappy, you're stuck paying whatever they charge."
  },
  solution: {
    title: "We Have the",
    titleHighlight: "Solution",
    subtitle: "Drawing from our own experience as leaseholders, we provide the solution. As a Property Institute Accredited organisation, we support you on your path to control whether that is Right to Manage or Collective Enfranchisement.",
    items: [
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
    ],
    image: {
      src: "/family-home.jpeg",
      alt: "Happy family enjoying control of their property after successful enfranchisement"
    },
    successStory: {
      title: "Success Story",
      description: "We now control our building and saved £3,000 annually"
    }
  },
  cta: {
    text: "Check Your Eligibility Now",
    href: "/eligibility-check"
  }
}

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
              {content.problems.title}<br/> <span className="text-red-600">{content.problems.titleHighlight}</span>
            </h2>
            <p className="text-lg text-liberty-background/70 max-w-4xl mx-auto">
              {content.problems.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Problems */}
            <div>
              <div className="space-y-4">
                {content.problems.items.map((problem, index) => (
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
                  src={content.problems.image.src}
                  alt={content.problems.image.alt}
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
                        "{content.problems.quote}"
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
              {content.solution.title} <span className="text-liberty-accent">{content.solution.titleHighlight}</span>
            </h2>
            <p className="text-lg text-liberty-background/70 max-w-4xl mx-auto">
              {content.solution.subtitle}
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
                  src={content.solution.image.src}
                  alt={content.solution.image.alt}
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
                        {content.solution.successStory.title}
                      </p>
                      <p className="text-liberty-background/70 text-xs">
                        "{content.solution.successStory.description}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Benefits */}
            <div>
              <div className="space-y-4">
                {content.solution.items.map((benefit, index) => (
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
            <Link href={content.cta.href} className="flex items-center gap-3 group">
              {content.cta.text}
              <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
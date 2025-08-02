'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  MessageCircleX, 
  CreditCard, 
  Wrench, 
  AlertTriangle, 
  Users, 
  CheckCircle, 
  UserCheck, 
  Handshake,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const painPoints = [
  {
    icon: MessageCircleX,
    title: "Feeling Ignored",
    description: "Not having your concerns taken seriously by managing agents or freeholders"
  },
  {
    icon: CreditCard,
    title: "Unexpected Bills",
    description: "Receiving surprise charges and fees you weren't expecting or consulted about"
  },
  {
    icon: Wrench,
    title: "Poor Services",
    description: "Paying high service charges for building maintenance that isn't done properly"
  },
  {
    icon: AlertTriangle,
    title: "Losing Value",
    description: "Poor building management and short leases causing your home’s value to drop"
  }
]

const solutionSteps = [
  {
    icon: UserCheck,
    title: "We Assess Your Rights",
    description: "Whether you're a freeholder or leaseholder, we determine what legal rights and options are open to you"
  },
  {
    icon: CheckCircle,
    title: "We Find Your Best Option",
    description: "We agree which path is right for your circumstances - RTM, RMC, or Collective Enfranchisement"
  },
  {
    icon: Handshake,
    title: "We Support Every Step",
    description: "Complete guidance through the entire process until you take back control of your building"
  },
  {
    icon: Users,
    title: "We Help You Afterwards",
    description: "Ongoing support as you start achieving savings from lower service charges and better services"
  }
]

export default function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Problem Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
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
                  The Problems <span className="text-red-600">Leaseholders Face</span>
                </h2>
                <p className="text-xl text-liberty-background/70">
                  Sound familiar? You're not alone - millions of leaseholders experience these frustrations daily.
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

          {/* Government Recognition Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-secondary/30 border border-liberty-secondary/50 rounded-lg p-6 text-center"
          >
            <p className="text-liberty-background/80 mb-4">
              <strong>Even the Government recognises the system needs to change.</strong> 
              The time to act is now - take control before new regulations make the process more complex.
            </p>
            <Button variant="outline" size="sm" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
              <Link href="https://commonslibrary.parliament.uk/leasehold-reform-in-england-and-wales/" target="_blank" className="flex items-center gap-2">
                Read Government Plans
                <ExternalLink size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Solution Section */}
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left: How We Help */}
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

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
                  How We Help<span className="text-liberty-accent"> You Take Control</span>
                </h2>
                <p className="text-xl text-liberty-background/70 mb-6">
                  We work with you every step of the way. As qualified members of The Property Institute, 
                  we provide expert guidance you can trust.
                </p>
                <div className="flex justify-start">
                  <Button variant="outline" size="sm" asChild className="border-liberty-accent text-liberty-accent hover:bg-liberty-accent hover:text-liberty-base">
                    <Link href="https://www.tpi.org.uk" target="_blank" className="flex items-center gap-2">
                      Verified Property Institute Members
                      <ExternalLink size={16} />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                {solutionSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg hover:bg-liberty-accent/10 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-liberty-accent text-liberty-base rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-1">
                        {step.title}
                      </h3>
                      <p className="text-liberty-background/70 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Solution Image */}

          </div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center bg-liberty-secondary/20 rounded-lg p-6 mb-8"
          >
            <p className="text-liberty-background/80 mb-4">
              Want to know more about the law and your options?
            </p>
            <Button variant="outline" size="sm" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
              <Link href="/legal-options" className="flex items-center gap-2">
                View Legal Options Guide
                <ArrowRight size={16} />
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
      </div>
    </section>
  )
}
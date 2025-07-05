'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingDown, Banknote, Scale, Building, PoundSterling, ArrowRight } from 'lucide-react'
import { CheckCircle, Shield, TrendingUp, UserCheck, Home, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const problems = [
  {
    icon: Banknote,
    text: "Rising ground rents that benefit no one but freeholders"
  },
  {
    icon: PoundSterling,
    text: "Expensive lawyer-led processes that drain your savings"
  },
  {
    icon: Scale,
    text: "Zero control over your own property decisions"
  },
  {
    icon: TrendingDown,
    text: "Declining property values as leases get shorter"
  },
  {
    icon: Building,
    text: "Managing agents who work for freeholders, not you"
  }
]

const solutions = [
  {
    icon: CheckCircle,
    title: "Cut Legal Costs by 70%",
    description: "AI-powered automation eliminates expensive lawyer fees"
  },
  {
    icon: Home,
    title: "Gain Complete Control",
    description: "Own your property forever, not just lease it"
  },
  {
    icon: Shield,
    title: "Eliminate Ground Rent",
    description: "Stop paying for nothing and keep that money in your pocket"
  },
  {
    icon: TrendingUp,
    title: "Increase Property Value",
    description: "Commonhold properties appreciate, leasehold properties depreciate"
  },
  {
    icon: UserCheck,
    title: "Choose Your Management",
    description: "Pick managing agents who work for you, not against you"
  },
  {
    icon: Heart,
    title: "Join a Community",
    description: "Connect with other empowered property owners"
  }
]

export default function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
              The Leasehold System is <span className="text-red-600">Broken</span>
            </h2>
            <p className="text-xl sm:text-2xl text-liberty-background/70 max-w-3xl mx-auto">
              The Problems You Face:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 bg-red-50 border border-red-200 rounded-xl"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <problem.icon className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-liberty-background/80 leading-relaxed">
                  {problem.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
              We Built the <span className="text-liberty-accent">Solution</span> You Need
            </h2>
            <p className="text-xl sm:text-2xl text-liberty-background/70 max-w-3xl mx-auto">
              Our Service Benefits:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex flex-col items-start gap-4 p-6 bg-liberty-accent/5 border border-liberty-accent/20 rounded-xl hover:bg-liberty-accent/10 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-liberty-accent/10 rounded-full flex items-center justify-center">
                  <solution.icon className="w-6 h-6 text-liberty-accent" />
                </div>
                <div>
                  <h3 className="font-reckless font-bold text-liberty-background text-lg mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-liberty-background/70 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empathy Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-xl sm:text-2xl font-reckless font-light text-liberty-standard italic xl:py-6">
              "We've been there. We know exactly how you feel."
            </p>
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
              <Link href="/get-started" className="flex items-center gap-3 group">
                Join the Solution Now
                <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
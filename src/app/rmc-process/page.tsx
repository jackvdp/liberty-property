'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users,
  PoundSterling,
  ArrowRight,
  Info,
  Shield,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const benefits = [
  {
    icon: Shield,
    title: "Immediate Control & Influence",
    description: "As a director, you have direct say in budget setting, contractor selection, and all management decisions"
  },
  {
    icon: PoundSterling,
    title: "No Additional Legal Costs",
    description: "Unlike RTM or enfranchisement, taking control of an RMC requires minimal legal process and expense"
  },
  {
    icon: Users,
    title: "Work Within Existing Structure",
    description: "Use the RMC framework that's already in place - no need to create new companies or serve complex notices"
  },
  {
    icon: TrendingUp,
    title: "Faster Results",
    description: "Start making improvements immediately once you're appointed as directors - no waiting periods"
  }
]

const process = [
  {
    step: "1",
    title: "Review RMC Documents",
    description: "We examine your RMC's Articles of Association and current director structure to understand your rights"
  },
  {
    step: "2",
    title: "Build Leaseholder Support",
    description: "Unite with fellow leaseholders to form a majority voting bloc for change"
  },
  {
    step: "3",
    title: "Request an EGM or AGM",
    description: "Call a meeting to propose new directors or vote out ineffective ones"
  },
  {
    step: "4",
    title: "Become Directors",
    description: "Take control as new directors and implement positive changes for all residents"
  }
]

const rmcAdvantages = [
  {
    title: "Budget Control",
    description: "Set and approve service charge budgets that reflect actual needs, not inflated profits"
  },
  {
    title: "Contractor Choice",
    description: "Choose contractors based on quality and value, not kickbacks or relationships"
  },
  {
    title: "Transparency",
    description: "Full visibility of all accounts, contracts, and management decisions"
  },
  {
    title: "Resident Focus",
    description: "Make decisions that benefit residents, not external management companies"
  },
  {
    title: "Reserve Fund Management",
    description: "Ensure reserve funds are properly maintained and used for intended purposes"
  },
  {
    title: "Quality Standards",
    description: "Set and enforce service standards that meet residents' expectations"
  }
]

export default function RMCProcess() {
  return (
    <div className="min-h-screen bg-liberty-base">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-background mb-6">
              Take Control of Your <span className="text-liberty-accent">RMC</span>
            </h1>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto">
              If your building already has a Residents' Management Company (RMC), you're one step ahead. 
              We help you become directors and secure real power over budgets and management decisions.
            </p>
          </motion.div>

          {/* Key Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6 mb-12"
          >
            <div className="flex items-start gap-4">
              <Info className="text-liberty-accent w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Great News If You Have an RMC!</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed">
                  Having an existing RMC means you can <strong>avoid the complexities of RTM</strong>. 
                  You already have the legal structure in place - now you just need to take control of it. 
                  This is often the fastest and most cost-effective route to better building management.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-liberty-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              Why Take Control of Your RMC?
            </h2>
            <p className="text-xl text-liberty-background/70">
              Unlock the power that's already yours - without complex legal processes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-liberty-accent/10 text-liberty-accent rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6" />
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
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              How We Help You Take Control
            </h2>
            <p className="text-xl text-liberty-background/70">
              A straightforward process to become RMC directors
            </p>
          </motion.div>

          <div className="space-y-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex items-start gap-6 p-6 bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-liberty-primary text-liberty-base rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-liberty-background mb-2">
                    {step.title}
                  </h3>
                  <p className="text-liberty-background/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Powers Section */}
      <section className="py-16 bg-liberty-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              Powers You'll Gain as RMC Directors
            </h2>
            <p className="text-xl text-liberty-background/70">
              Real control over every aspect of building management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rmcAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"
              >
                <h3 className="font-semibold text-liberty-background mb-2">
                  {advantage.title}
                </h3>
                <p className="text-liberty-background/70 text-sm">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RMC vs RTM Comparison */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              RMC Takeover vs Right to Manage
            </h2>
            <p className="text-xl text-liberty-background/70">
              Why RMC control might be your best option
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">RMC Takeover</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• Work within existing structure</li>
                <li>• No complex legal notices required</li>
                <li>• Faster to implement</li>
                <li>• Lower costs (minimal legal fees)</li>
                <li>• Immediate budget control</li>
                <li>• No qualifying criteria to meet</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Right to Manage</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• Need to create new RTM company</li>
                <li>• Complex statutory notices required</li>
                <li>• 4-6 month process typically</li>
                <li>• Higher legal and setup costs</li>
                <li>• Must meet qualifying criteria</li>
                <li>• Risk of freeholder challenges</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg p-6 mt-8"
          >
            <p className="text-liberty-background/80 text-center">
              <strong className="text-liberty-background">The Bottom Line:</strong> If you have an RMC, 
              taking control of it is almost always simpler, faster, and cheaper than pursuing RTM. 
              We can help you make it happen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Common Challenges Section */}
      <section className="py-16 bg-liberty-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              Common RMC Challenges We Solve
            </h2>
            <p className="text-xl text-liberty-background/70">
              We've seen it all and know how to fix it
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"
            >
              <h3 className="font-semibold text-liberty-background mb-3">
                "The current directors won't step down"
              </h3>
              <p className="text-liberty-background/70 text-sm">
                We help you use the proper legal channels to call meetings and vote in new directors. 
                The Articles of Association provide the framework - we show you how to use it effectively.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"
            >
              <h3 className="font-semibold text-liberty-background mb-3">
                "The managing agent controls everything"
              </h3>
              <p className="text-liberty-background/70 text-sm">
                As directors, you have the power to replace the managing agent or bring services in-house. 
                We guide you through reviewing contracts and making the transition smooth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"
            >
              <h3 className="font-semibold text-liberty-background mb-3">
                "We don't know how to run an RMC"
              </h3>
              <p className="text-liberty-background/70 text-sm">
                That's where we come in. We provide training, templates, and ongoing support to ensure 
                you're confident in your new role. Plus, you can always appoint professional help where needed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-8 text-center"
          >
            <h2 className="text-3xl font-reckless font-bold text-liberty-background mb-4">
              Ready to Take Control of Your RMC?
            </h2>
            <p className="text-xl text-liberty-background/70 mb-8">
              If your building has an RMC, you're already halfway there. 
              Let us help you complete the journey to better building management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                asChild 
                className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
              >
                <Link href="/eligibility-check" className="flex items-center gap-3 group">
                  Check Your Options
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="xl" 
                variant="outline"
                asChild 
                className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
              >
                <Link href="/contact">
                  Get Expert Advice
                </Link>
              </Button>
            </div>

            <p className="text-sm text-liberty-background/60 mt-6">
              Our eligibility checker will identify if you have an RMC and show you the best path forward
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, 
  Users, 
  Building,
  Crown,
  PoundSterling,
  ArrowRight,
  Info,
  Home,
  Shield,
  TrendingDown,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const benefits = [
  {
    icon: Crown,
    title: "Full Ownership of Your Building",
    description: "Own the freehold completely - you become the freeholder and control everything about your building"
  },
  {
    icon: PoundSterling,
    title: "Eliminate Ground Rent Forever",
    description: "No more annual ground rent payments. Keep that money in your pocket and increase your property value"
  },
  {
    icon: Calendar,
    title: "Extend Leases to 999 Years",
    description: "Give yourself and neighbours 999-year leases at no extra premium - just legal costs"
  },
  {
    icon: Building,
    title: "Complete Management Control",
    description: "Choose your managing agent, set budgets, approve major works, and manage the building exactly how you want"
  },
  {
    icon: Home,
    title: "Add Significant Property Value",
    description: "Properties with share of freehold typically sell for more and are more attractive to buyers and mortgage lenders"
  },
  {
    icon: Shield,
    title: "Long-term Security",
    description: "Never worry about lease length again. Protect your investment for generations to come"
  }
]

const process = [
  {
    step: "1",
    title: "Check Eligibility & Build Support",
    description: "Confirm your building qualifies and get at least 50% of leaseholders on board to start the process"
  },
  {
    step: "2",
    title: "Form Nominee Purchaser Company",
    description: "Create a company to buy and hold the freehold on behalf of all participating leaseholders"
  },
  {
    step: "3",
    title: "Serve Section 13 Notice",
    description: "Formally notify the freeholder of your intention to buy the freehold and start negotiations"
  },
  {
    step: "4",
    title: "Negotiate or Tribunal",
    description: "Agree on price with freeholder or go to First-tier Tribunal if you can't reach agreement"
  },
  {
    step: "5",
    title: "Complete Purchase",
    description: "Transfer the freehold to your company and grant new 999-year leases to all participants"
  }
]

export default function CollectiveEnfranchisement() {
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
              What is <span className="text-liberty-accent">Collective Enfranchisement</span>?
            </h1>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto">
              Collective Enfranchisement is your legal right as leaseholders to buy the freehold of your building together, 
              giving you complete ownership and control forever.
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
                <h3 className="font-semibold text-liberty-background mb-2">The Ultimate Solution</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed">
                  Unlike Right to Manage (which only gives you management control), Collective Enfranchisement means 
                  <strong> you own the building outright</strong>. You become the freeholder, can eliminate ground rents, 
                  extend leases to 999 years, and have complete control over your property forever.
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
              Benefits of Collective Enfranchisement
            </h2>
            <p className="text-xl text-liberty-background/70">
              Own your building, control your future, and save money for life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              The Collective Enfranchisement Process
            </h2>
            <p className="text-xl text-liberty-background/70">
              Five key steps to buy your freehold and gain complete ownership
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

      {/* Eligibility Section */}
      <section className="py-16 bg-liberty-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              Do You Qualify for Collective Enfranchisement?
            </h2>
            <p className="text-xl text-liberty-background/70 mb-8">
              Most leaseholders in England and Wales can buy their freehold together. 
              Key requirements include:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">Building contains 2+ flats</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">At least 2/3 of flats held on long leases</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">No more than 25% commercial space</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">At least 50% of leaseholders must participate</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">You must be a qualifying leaseholder</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">Building not owned by charitable housing trust</span>
                </div>
              </div>
            </div>
          </motion.div>

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
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Cost Information Section */}
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
              What Does Collective Enfranchisement Cost?
            </h2>
            <p className="text-xl text-liberty-background/70">
              Understanding the investment that will save you money for years to come
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Premium to Freeholder</h3>
              <p className="text-liberty-background/80 text-sm leading-relaxed">
                The main cost - varies by building value, lease lengths, and ground rents. 
                Typically £500-£2,000 per flat, but can be higher for valuable properties or short leases.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Your Professional Fees</h3>
              <p className="text-liberty-background/80 text-sm leading-relaxed">
                Surveyor, solicitor, and other costs. Usually £1,500-£3,000 per flat depending on complexity. 
                We help minimize these through our efficient process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-secondary/30 border border-liberty-secondary/50 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Freeholder's Costs</h3>
              <p className="text-liberty-background/80 text-sm leading-relaxed">
                You pay the freeholder's reasonable professional fees. Usually £500-£1,500 per flat. 
                These are capped by law to prevent abuse.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6"
          >
            <div className="flex items-start gap-4">
              <TrendingDown className="text-liberty-accent w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Remember: This is an Investment</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed">
                  While the upfront cost may seem significant, you'll typically save money within 3-5 years through 
                  eliminated ground rent, reduced service charges, and increased property value. 
                  Plus, you gain 999-year leases worth tens of thousands per flat.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CE vs RTM Comparison */}
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
              Collective Enfranchisement vs Right to Manage
            </h2>
            <p className="text-xl text-liberty-background/70">
              Understanding the difference between management control and full ownership
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Collective Enfranchisement</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• <strong>Own the freehold completely</strong></li>
                <li>• Eliminate ground rent forever</li>
                <li>• 999-year leases at no extra premium</li>
                <li>• Complete control over everything</li>
                <li>• Significant increase in property value</li>
                <li>• Higher upfront cost but maximum benefits</li>
                <li>• Protection for generations</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Right to Manage</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• Management control only</li>
                <li>• Freeholder still owns the building</li>
                <li>• Still pay ground rent (if applicable)</li>
                <li>• Leases still diminish over time</li>
                <li>• Lower upfront cost</li>
                <li>• Good stepping stone to enfranchisement</li>
                <li>• Limited long-term protection</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <div className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6 mb-6">
              <p className="text-liberty-background/70 font-semibold">
                Our Recommendation: If you can afford it, Collective Enfranchisement gives you the most 
                benefits and long-term security. RTM can be a good first step if you need to build support gradually.
              </p>
            </div>
            <Button variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
              <Link href="/contact">
                Get Personalised Advice on Your Options
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              Ready to Own Your Building?
            </h2>
            <p className="text-xl text-liberty-background/70 mb-8">
              Take the first step towards complete ownership and control of your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-standard">
                <Link href="/eligibility-check" className="flex items-center gap-3 group">
                  Check Your Eligibility
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white">
                <Link href="/contact">
                  Get Expert Advice
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

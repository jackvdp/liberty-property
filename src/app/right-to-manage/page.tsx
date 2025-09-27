'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, 
  Users, 
  Building,
  ClipboardList,
  PoundSterling,
  ArrowRight,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const benefits = [
  {
    icon: Users,
    title: "No Need for Landlord Approval",
    description: "Make management decisions directly without going through your freeholder or management company"
  },
  {
    icon: Building,
    title: "Complete Control Over Building",
    description: "Manage communal areas, maintenance, and improvements exactly how you want them done"
  },
  {
    icon: ClipboardList,
    title: "Choose Your Own Managing Agent",
    description: "Appoint a professional managing agent you trust, or manage the building yourselves"
  },
  {
    icon: PoundSterling,
    title: "Potential Cost Savings",
    description: "Reduce service charges by choosing more efficient contractors and suppliers"
  }
]

const process = [
  {
    step: "1",
    title: "Check Eligibility",
    description: "Your building must qualify - we can check this for you in 60 seconds"
  },
  {
    step: "2",
    title: "Form RTM Company",
    description: "Create a Right to Manage company with other qualifying leaseholders"
  },
  {
    step: "3",
    title: "Serve Legal Notices",
    description: "Formally notify the freeholder of your intention to take management control"
  },
  {
    step: "4",
    title: "Take Control",
    description: "Assume responsibility for managing the building and its common areas"
  }
]

export default function WhatIsRTM() {
  return (
    <div className="min-h-screen bg-liberty-base overflow-hidden">
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
              What is <span className="text-liberty-accent">Right to Manage</span>?
            </h1>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto">
              Right to Manage (RTM) is your legal right as a leaseholder to take control of your building's management - 
              even if your freeholder doesn't want to give it up.
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
                <h3 className="font-semibold text-liberty-background mb-2">Important to Know</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed">
                  RTM gives you management control but <strong>you don't own the building</strong>. 
                  The freeholder still owns the freehold. For full ownership, you'd need to pursue 
                  Collective Enfranchisement (buying the freehold).
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
              Benefits of Right to Manage
            </h2>
            <p className="text-xl text-liberty-background/70">
              Take control and improve how your building is managed
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
              The RTM Process
            </h2>
            <p className="text-xl text-liberty-background/70">
              Four simple steps to take management control of your building
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
              Do You Qualify for RTM?
            </h2>
            <p className="text-xl text-liberty-background/70 mb-8">
              Most leaseholders in England and Wales have the right to manage their buildings. 
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
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">No more than 25% commercial space</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-liberty-accent w-5 h-5" />
                  <span className="text-liberty-background">You must be a qualifying leaseholder</span>
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

      {/* RTM vs Freehold Comparison */}
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
              RTM vs Buying the Freehold
            </h2>
            <p className="text-xl text-liberty-background/70">
              Understanding your options for taking control
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
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Right to Manage</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• Management control only</li>
                <li>• Freeholder still owns the building</li>
                <li>• Easier and cheaper to achieve</li>
                <li>• Still pay ground rent (if applicable)</li>
                <li>• Good starting point for many buildings</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Freehold Purchase</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• Full ownership of the building</li>
                <li>• Complete control over everything</li>
                <li>• Can eliminate ground rent</li>
                <li>• More expensive and complex process</li>
                <li>• Maximum long-term benefits</li>
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
            <p className="text-liberty-background/70 mb-6">
              Not sure which option is right for you? We can help you decide.
            </p>
            <Button variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
              <Link href="/contact">
                Get Personalised Advice
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

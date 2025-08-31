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
  TrendingUp,
  Calendar,
  Star,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const benefits = [
  {
    icon: Crown,
    title: "Perpetual Ownership",
    description: "Own your flat forever - no expiring leases, no diminishing property rights, complete security for generations"
  },
  {
    icon: PoundSterling,
    title: "No Ground Rent Ever",
    description: "Eliminate ground rent completely and permanently - no annual payments to a freeholder for no service"
  },
  {
    icon: Shield,
    title: "Standard Rules for Everyone",
    description: "Replace complex individual leases with one fair Commonhold Community Statement that applies equally to all"
  },
  {
    icon: Users,
    title: "True Democratic Control",
    description: "Every owner has an equal say in the Commonhold Association - no landlord approval needed for anything"
  },
  {
    icon: Home,
    title: "Complete Property Freedom",
    description: "Sell, refurbish, or modify your home without needing permission from a freeholder or management company"
  },
  {
    icon: TrendingUp,
    title: "Future-Proof Investment",
    description: "Commonhold will be the default for all new builds - get ahead of the curve and increase your property value"
  }
]

const process = [
  {
    step: "1",
    title: "Complete Collective Enfranchisement",
    description: "First, all leaseholders must buy the freehold together (100% participation required for commonhold conversion)"
  },
  {
    step: "2",
    title: "Unanimous Agreement to Convert",
    description: "Every single leaseholder must agree to replace their lease with commonhold ownership - no exceptions"
  },
  {
    step: "3",
    title: "Create Commonhold Community Statement",
    description: "Draft the governing document that replaces all leases with fair, standardized rules for everyone"
  },
  {
    step: "4",
    title: "Form Commonhold Association",
    description: "Establish the legal entity owned by all unit holders to manage common areas and building operations"
  },
  {
    step: "5",
    title: "Register with Land Registry",
    description: "Officially convert to commonhold tenure and register each unit as freehold property at Land Registry"
  }
]

const considerations = [
  {
    icon: AlertTriangle,
    title: "100% Participation Required",
    description: "Unlike freehold purchase (50%+) or RTM (simple majority), commonhold conversion requires unanimous agreement from all leaseholders"
  },
  {
    icon: Star,
    title: "Limited Precedent in UK",
    description: "Only around 20 properties in the UK currently use commonhold - you'd be pioneers, but with less established legal precedent"
  },
  {
    icon: Building,
    title: "Government Reform Coming",
    description: "New legislation will make commonhold the default for new builds and easier for existing buildings, but details still being finalized"
  }
]

export default function CommonholdConversion() {
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
              What is <span className="text-liberty-accent">Commonhold</span>?
            </h1>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto">
              Commonhold is the future of property ownership - you own your flat forever as freehold, 
              while a Commonhold Association manages shared areas democratically.
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
                <h3 className="font-semibold text-liberty-background mb-2">The Ultimate Property Ownership</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed">
                  Commonhold combines the best of both worlds: <strong>you own your flat as freehold forever</strong> 
                  (no expiring lease), while the <strong>Commonhold Association</strong> - owned entirely by flat owners - 
                  manages communal areas. No freeholder, no ground rent, no lease extensions needed, ever.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Status Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6 mb-12"
          >
            <div className="flex items-start gap-4">
              <Star className="text-liberty-primary w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Be a Pioneer</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed">
                  The government is making commonhold the default tenure for all new properties. 
                  Converting now puts you ahead of the curve, but currently requires 100% agreement 
                  from all leaseholders in your building.
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
              Benefits of Commonhold Ownership
            </h2>
            <p className="text-xl text-liberty-background/70">
              The most advanced form of property ownership - designed for the future
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
              The Commonhold Conversion Process
            </h2>
            <p className="text-xl text-liberty-background/70">
              A step-by-step journey to the ultimate property ownership
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

      {/* Considerations Section */}
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
              Important Considerations
            </h2>
            <p className="text-xl text-liberty-background/70">
              What you need to know about commonhold conversion
            </p>
          </motion.div>

          <div className="space-y-6">
            {considerations.map((consideration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-liberty-primary/10 text-liberty-primary rounded-lg flex items-center justify-center">
                    <consideration.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-liberty-background mb-2">
                      {consideration.title}
                    </h3>
                    <p className="text-liberty-background/70 text-sm leading-relaxed">
                      {consideration.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              Commonhold vs Other Options
            </h2>
            <p className="text-xl text-liberty-background/70">
              Understanding how commonhold compares to your alternatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Commonhold</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• <strong>Own your flat as freehold forever</strong></li>
                <li>• <strong>Never pay ground rent</strong></li>
                <li>• Democratic control via Association</li>
                <li>• Standard rules for everyone</li>
                <li>• No freeholder exists</li>
                <li>• Future-proof ownership model</li>
                <li>• Requires 100% agreement</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Share of Freehold</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• Own building jointly via company</li>
                <li>• Can eliminate ground rent</li>
                <li>• 999-year lease extensions</li>
                <li>• Still have individual leases</li>
                <li>• Multiple different lease terms</li>
                <li>• Non-participants still leaseholders</li>
                <li>• Requires 50%+ agreement</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-liberty-secondary/30 border border-liberty-secondary/50 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-liberty-background mb-4">Right to Manage</h3>
              <ul className="space-y-2 text-liberty-background/80 text-sm">
                <li>• Management control only</li>
                <li>• Freeholder still owns building</li>
                <li>• Still pay ground rent</li>
                <li>• Leases still diminish over time</li>
                <li>• Lower cost option</li>
                <li>• Good stepping stone</li>
                <li>• Simple majority needed</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
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
              Our Commonhold Conversion Service
            </h2>
            <p className="text-xl text-liberty-background/70">
              Expert guidance through uncharted territory
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-liberty-accent/20 text-liberty-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-liberty-background mb-2">Inception Phase</h3>
              <p className="text-liberty-background/70 text-sm">
                Build consensus among all leaseholders and explain the benefits, costs, 
                and process of commonhold conversion
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-liberty-primary/20 text-liberty-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-liberty-background mb-2">Freehold Acquisition</h3>
              <p className="text-liberty-background/70 text-sm">
                Complete collective enfranchisement first - all leaseholders must 
                own the freehold before commonhold conversion is possible
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-liberty-accent/20 text-liberty-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-liberty-background mb-2">Commonhold Conversion</h3>
              <p className="text-liberty-background/70 text-sm">
                Create the Community Statement, form the Association, and register 
                the new commonhold tenure with Land Registry
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"
          >
            <div className="flex items-start gap-4">
              <Info className="text-liberty-primary w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Why Choose Liberty Bell for Commonhold?</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed mb-4">
                  We're at the forefront of property ownership reform. While commonhold is still rare in the UK, 
                  we have the expertise to guide you through this pioneering process and position you for the future.
                </p>
                <ul className="space-y-1 text-liberty-background/70 text-sm">
                  <li>• Deep understanding of commonhold law and procedure</li>
                  <li>• Experience with complex freehold acquisitions</li>
                  <li>• Expertise in building leaseholder consensus</li>
                  <li>• Preparation for upcoming government reforms</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">
              Ready to Pioneer the Future?
            </h2>
            <p className="text-xl text-liberty-background/70 mb-8">
              Commonhold conversion is complex but delivers the ultimate property ownership. 
              Let's explore if it's right for your building.
            </p>
            
            <div className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6 mb-8">
              <p className="text-liberty-background/80 font-semibold mb-4">
                Important: Commonhold conversion requires 100% leaseholder agreement and completed freehold purchase.
              </p>
              <p className="text-liberty-background/70 text-sm">
                We recommend starting with our eligibility check to understand all your options, 
                including whether collective enfranchisement or RTM might be better first steps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-standard">
                <Link href="/eligibility-check" className="flex items-center gap-3 group">
                  Check Your Eligibility First
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white">
                <Link href="/contact">
                  Discuss Commonhold Options
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

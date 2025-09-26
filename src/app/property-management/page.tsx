'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users, 
  Building,
  Heart,
  PoundSterling,
  ArrowRight,
  Shield,
  TrendingDown,
  MessageCircle,
  Wrench,
  FileText,
  Calculator
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const advantages = [
  {
    icon: Heart,
    title: "By Leaseholders, For Leaseholders",
    description: "We've been where you are. We understand the frustration of poor service, hidden fees, and feeling powerless. We manage properties like we'd want our own managed."
  },
  {
    icon: PoundSterling,
    title: "Transparent, Fair Pricing",
    description: "No surprise charges, no inflated contractor costs, no kickbacks from suppliers. Every penny is accounted for and spent in your best interests."
  },
  {
    icon: Users,
    title: "Trusted Network of Suppliers",
    description: "We've built relationships with honest contractors and suppliers who do quality work at fair prices - tested by leaseholders, for leaseholders."
  },
  {
    icon: Shield,
    title: "Complete Financial Transparency",
    description: "Full access to all invoices, quotes, and financial records. Regular reporting and open-book accounting - you'll know exactly where every pound goes."
  },
  {
    icon: TrendingDown,
    title: "Focus on Genuine Savings",
    description: "We find real efficiencies and cost savings, not just the cheapest options. Quality work that lasts, reducing long-term costs and headaches."
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "No hiding behind corporate barriers. Direct access to decision-makers who understand your concerns and respond promptly to your needs."
  }
]

const services = [
  {
    icon: Building,
    title: "Day-to-Day Management",
    description: "Handle routine building operations, maintenance coordination, and resident communications with care and efficiency"
  },
  {
    icon: Calculator,
    title: "Financial Management",
    description: "Transparent budgeting, service charge collection, and reserve fund management with full accountability"
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description: "Coordinate quality contractors from our trusted network, ensuring fair pricing and excellent workmanship"
  },
  {
    icon: FileText,
    title: "Compliance & Administration",
    description: "Handle health & safety compliance, insurance, legal requirements, and all necessary documentation"
  }
]

const differences = [
  {
    title: "Traditional Managing Agents",
    items: [
      "• Often prioritize freeholder interests",
      "• Hidden fees and inflated contractor costs",
      "• Limited transparency in financial dealings",
      "• Corporate structure - distant from residents",
      "• May receive kickbacks from suppliers",
      "• Focus on profit margins over service quality"
    ],
    color: "bg-red-50 border-red-200"
  },
  {
    title: "Liberty Bell Property Management",
    items: [
      "• Always prioritize leaseholder/commonholder interests",
      "• Transparent pricing with no hidden costs",
      "• Complete financial transparency and reporting",
      "• Led by leaseholders who understand your needs",
      "• Trusted supplier network with proven track record",
      "• Focus on long-term value and satisfaction"
    ],
    color: "bg-liberty-accent/10 border-liberty-accent/30"
  }
]

export default function PropertyManagement() {
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
              Property Management<br/> <span className="text-liberty-accent">That Works</span>
            </h1>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto">
              Finally, a managing agent that understands what leaseholders need - because we are leaseholders. 
              Transparent, honest, and working exclusively in your best interests.
            </p>
          </motion.div>

          {/* Key Message Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6 mb-12"
          >
            <div className="flex items-start gap-4">
              <Heart className="text-liberty-accent w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">The Difference? We've Been in Your Shoes</h3>
                <p className="text-liberty-background/80 text-sm leading-relaxed">
                  We started Liberty Bell because we were frustrated leaseholders who couldn't find a managing agent 
                  that worked for us, not against us. Now we provide the service we always wanted - 
                  <strong> by leaseholders, for leaseholders</strong>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Problem Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6 mb-12"
          >
            <div className="text-center">
              <h3 className="font-semibold text-liberty-background mb-4 text-lg">Tired of Managing Agents Who Don't Understand Your Needs?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-liberty-background/80">
                <div className="text-left">
                  <p>• Service charges that keep rising with no explanation</p>
                  <p>• Contractors who overcharge and under-deliver</p>
                  <p>• No transparency in financial management</p>
                </div>
                <div className="text-left">
                  <p>• Poor communication and slow responses</p>
                  <p>• Feeling like you're not heard or valued</p>
                  <p>• Suspicion that interests aren't aligned with yours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages Section */}
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
              Why Choose Liberty Bell Property Management?
            </h2>
            <p className="text-xl text-liberty-background/70">
              Experience the difference when your managing agent truly understands your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
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
                    <advantage.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-liberty-background mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-liberty-background/70 text-sm leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              Our Management Services
            </h2>
            <p className="text-xl text-liberty-background/70">
              Comprehensive property management with leaseholder interests at the heart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-liberty-primary/10 text-liberty-primary rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-liberty-background mb-2">
                      {service.title}
                    </h3>
                    <p className="text-liberty-background/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network & Experience Section */}
      {/*<section className="py-16 bg-liberty-secondary/20">*/}
      {/*  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">*/}
      {/*    <motion.div*/}
      {/*      initial={{ opacity: 0, y: 30 }}*/}
      {/*      whileInView={{ opacity: 1, y: 0 }}*/}
      {/*      transition={{ duration: 0.8, ease: "easeOut" }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*      className="text-center mb-12"*/}
      {/*    >*/}
      {/*      <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-6">*/}
      {/*        Our Network & Experience*/}
      {/*      </h2>*/}
      {/*      <p className="text-xl text-liberty-background/70">*/}
      {/*        Built through real-world experience fighting for leaseholder rights*/}
      {/*      </p>*/}
      {/*    </motion.div>*/}

      {/*    <div className="grid md:grid-cols-2 gap-8 mb-12">*/}
      {/*      <motion.div*/}
      {/*        initial={{ opacity: 0, x: -30 }}*/}
      {/*        whileInView={{ opacity: 1, x: 0 }}*/}
      {/*        transition={{ duration: 0.8, ease: "easeOut" }}*/}
      {/*        viewport={{ once: true }}*/}
      {/*        className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"*/}
      {/*      >*/}
      {/*        <h3 className="text-xl font-semibold text-liberty-background mb-4">Trusted Supplier Network</h3>*/}
      {/*        <ul className="space-y-2 text-liberty-background/80 text-sm">*/}
      {/*          <li>• <strong>Vetted contractors</strong> who deliver quality work at fair prices</li>*/}
      {/*          <li>• <strong>Established relationships</strong> built on trust and performance</li>*/}
      {/*          <li>• <strong>Competitive pricing</strong> with no hidden markups or kickbacks</li>*/}
      {/*          <li>• <strong>Proven track record</strong> with other leaseholder-controlled buildings</li>*/}
      {/*          <li>• <strong>Local expertise</strong> across England & Wales</li>*/}
      {/*        </ul>*/}
      {/*      </motion.div>*/}

      {/*      <motion.div*/}
      {/*        initial={{ opacity: 0, x: 30 }}*/}
      {/*        whileInView={{ opacity: 1, x: 0 }}*/}
      {/*        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}*/}
      {/*        viewport={{ once: true }}*/}
      {/*        className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6"*/}
      {/*      >*/}
      {/*        <h3 className="text-xl font-semibold text-liberty-background mb-4">Real-World Experience</h3>*/}
      {/*        <ul className="space-y-2 text-liberty-background/80 text-sm">*/}
      {/*          <li>• <strong>Battle-tested knowledge</strong> from managing our own enfranchised buildings</li>*/}
      {/*          <li>• <strong>Understanding of law</strong> and leaseholder rights from our legal work</li>*/}
      {/*          <li>• <strong>Financial expertise</strong> in service charge management and budgeting</li>*/}
      {/*          <li>• <strong>Compliance knowledge</strong> including health & safety requirements</li>*/}
      {/*          <li>• <strong>Community building</strong> skills to unite leaseholders</li>*/}
      {/*        </ul>*/}
      {/*      </motion.div>*/}
      {/*    </div>*/}

      {/*    <motion.div*/}
      {/*      initial={{ opacity: 0, y: 20 }}*/}
      {/*      whileInView={{ opacity: 1, y: 0 }}*/}
      {/*      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*      className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6"*/}
      {/*    >*/}
      {/*      <div className="flex items-start gap-4">*/}
      {/*        <Users className="text-liberty-accent w-6 h-6 mt-1 flex-shrink-0" />*/}
      {/*        <div>*/}
      {/*          <h3 className="font-semibold text-liberty-background mb-2">Join Our Community</h3>*/}
      {/*          <p className="text-liberty-background/80 text-sm leading-relaxed">*/}
      {/*            When you choose Liberty Bell for property management, you're not just getting a service - */}
      {/*            you're joining a community of empowered leaseholders sharing knowledge, costs, and experiences. */}
      {/*            Together, we're building a better way to manage and maintain our homes.*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </motion.div>*/}
      {/*  </div>*/}
      {/*</section>*/}

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
              The Liberty Bell Difference
            </h2>
            <p className="text-xl text-liberty-background/70">
              See how we compare to traditional managing agents
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {differences.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`${comparison.color} border rounded-lg p-6`}
              >
                <h3 className="text-xl font-semibold text-liberty-background mb-4 text-center">
                  {comparison.title}
                </h3>
                <ul className="space-y-2 text-liberty-background/80 text-sm">
                  {comparison.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Philosophy Section */}
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
              Our Pricing Philosophy
            </h2>
            <p className="text-xl text-liberty-background/70">
              Transparent, fair, and designed to save you money
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-base border border-liberty-secondary/50 rounded-lg p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-liberty-background mb-4">What You Can Expect:</h3>
                <ul className="space-y-2 text-liberty-background/80 text-sm">
                  <li>• <strong>Fixed monthly fees</strong> with no surprises</li>
                  <li>• <strong>No markup on contractors</strong> - you pay what they charge</li>
                  <li>• <strong>Bulk purchasing power</strong> to reduce insurance and utility costs</li>
                  <li>• <strong>Shared savings model</strong> - we benefit when you save money</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-liberty-background mb-4">What You'll Never See:</h3>
                <ul className="space-y-2 text-liberty-background/80 text-sm">
                  <li>• Hidden administration fees</li>
                  <li>• Inflated contractor quotations</li>
                  <li>• Kickbacks from suppliers</li>
                  <li>• Unnecessary "emergency" work</li>
                </ul>
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
            <div className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6">
              <PoundSterling className="w-12 h-12 text-liberty-accent mx-auto mb-4" />
              <p className="text-liberty-background/80 font-semibold">
                "We only succeed when you're saving money and getting better service. 
                Your interests are our interests - that's the Liberty Bell way."
              </p>
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
              Ready for Property Management That Works for You?
            </h2>
            <p className="text-xl text-liberty-background/70 mb-8">
              Whether you've recently gained control of your building or are looking to switch managing agents, 
              we're here to provide the service you deserve.
            </p>
            
            <div className="bg-liberty-primary/10 border border-liberty-primary/30 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-liberty-background mb-2">Perfect for:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-liberty-background/80">
                <div className="text-left">
                  <p>• Buildings that have completed RTM or CE</p>
                  <p>• RMCs looking to switch managing agents</p>
                </div>
                <div className="text-left">
                  <p>• Self-managing buildings needing professional support</p>
                  <p>• Any leaseholder-controlled property</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-standard">
                <Link href="/contact" className="flex items-center gap-3 group">
                  Get a Management Quote
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white">
                <Link href="/eligibility-check">
                  First Need Building Control?
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

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Users, 
  Shield, 
  TrendingDown, 
  ArrowRight,
  CheckCircle,
  Heart,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const communityBenefits = [
  {
    icon: TrendingDown,
    text: "See what others have paid and know if they are being ripped off"
  },
  {
    icon: Shield,
    text: "Find the honest suppliers who will do what they say for the price they quote"
  },
  {
    icon: CheckCircle,
    text: "Save money"
  }
]

export default function WhoWeAre() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-base relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/*<div className="absolute inset-0 bg-" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />*/}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
            What We <span className="text-liberty-accent">Stand For</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: James's Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >

              <div className="space-y-4 text-liberty-background/80 leading-relaxed">
                <p>
                  <strong><strong className="text-liberty-primary">Hello, I'm James – a leaseholder like you.</strong> I co-set up Liberty Bell Ethical Enfranchisement Ltd to help other leaseholders</strong> because the system is broken and I couldn't find anyone to help me except expensive lawyers.
                </p>
                <p>
                  I want to use the knowledge and experience I have gained battling my own management company and freeholder to help you.
                </p>
                <p>
                  Here at Liberty Bell our approach is <strong className="text-liberty-primary">'by leaseholders for leaseholders'</strong> and not only do we want to help people take back control of their building but we also want to create a community where we all help each other afterwards.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: James's Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/james_lewis.avif"
                alt="James speaking to MPs in Parliament about leasehold reform"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/20" />
              
              {/* Parliament Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="text-liberty-primary w-5 h-5" />
                  <div>
                    <p className="font-semibold text-slate-900 text-xs">
                      Speaking at Parliament
                    </p>
                    <p className="text-slate-700 text-xs">
                      "Fighting for leaseholder rights"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Community Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-liberty-secondary/20 rounded-2xl p-8 lg:p-12 border border-liberty-secondary/40">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-reckless font-bold text-liberty-background mb-4">
                Building a <span className="text-liberty-accent">Community Together</span>
              </h3>
              <p className="text-liberty-background/80 text-lg leading-relaxed max-w-4xl mx-auto">
                We want to help leaseholders and commonholders pool their information about costs and charges and build a knowledge base to:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {communityBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl border border-liberty-secondary/30 hover:border-liberty-accent/50 transition-colors duration-300 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-liberty-accent/20 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-liberty-accent" />
                  </div>
                  <p className="text-liberty-background/80 leading-relaxed">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-liberty-background/80 text-lg mb-6">
                <strong>We want to change the way the market works</strong> giving knowledge and power to us as buyers.
              </p>
              <p className="text-liberty-primary text-xl font-semibold mb-8">
                Join us because as a community together we are better and stronger!
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="bg-liberty-secondary/30 rounded-xl p-8 border border-liberty-accent/30">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="text-liberty-accent w-8 h-8" />
              <h3 className="text-2xl font-reckless font-bold text-liberty-background">
                Join Our Community
              </h3>
            </div>
            <p className="text-liberty-background/80 mb-6 text-lg">
              Contact us if you'd like to be part of the community and help other leaseholders take control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-white">
                <Link href="mailto:hello@libertybell.co.uk" className="flex items-center gap-3">
                  <MessageCircle size={20} />
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white">
                <Link href="/about" className="flex items-center gap-3">
                  Learn More About Us
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Big Eligibility CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-background mb-8 leading-tight">
            Check Your Eligibility &<br/> <span className="text-liberty-accent">Potential Savings</span>
          </h2>
          
          <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-standard px-12 py-6">
            <Link href="/eligibility-check" className="flex items-center gap-4 group">
              Check Your Eligibility
              <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

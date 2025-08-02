'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Users, 
  Shield, 
  TrendingDown, 
  ArrowRight,
  ExternalLink,
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
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-background relative overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold !text-white mb-6">
            Who We Are and What We <span className="text-liberty-accent">Stand For</span>
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

              <div className="space-y-4 text-white/90 leading-relaxed">
                <p>
                  <strong><strong className="text-liberty-accent">Hello, I'm James – a leaseholder like you.</strong> I co-set up Liberty Bell Ethical Enfranchisement Ltd to help other leaseholders</strong> because the system is broken and I couldn't find anyone to help me except expensive lawyers.
                </p>
                <p>
                  I want to use the knowledge and experience I have gained battling my own management company and freeholder to help you.
                </p>
                <p>
                  Here at Liberty Bell our approach is <strong className="text-liberty-accent">'by leaseholders for leaseholders'</strong> and not only do we want to help people take back control of their building but we also want to create a community where we all help each other afterwards.
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
            className="relative"
          >
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/james_lewis.avif"
                alt="James speaking to MPs in Parliament about leasehold reform"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              
              {/* Parliament Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="text-liberty-primary w-6 h-6" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      Speaking at Parliament
                    </p>
                    <p className="text-slate-700 text-xs">
                      "Fighting for leaseholder rights at the highest level"
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
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-reckless font-bold !text-white mb-4">
                Building a <span className="text-liberty-accent">Community Together</span>
              </h3>
              <p className="text-white/90 text-lg leading-relaxed max-w-4xl mx-auto">
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
                  className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-liberty-accent/20 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-liberty-accent" />
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-white/90 text-lg mb-6">
                <strong>We want to change the way the market works</strong> giving knowledge and power to us as buyers.
              </p>
              <p className="text-liberty-accent text-xl font-semibold mb-8">
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
          className="text-center"
        >
          <div className="bg-gradient-to-r from-liberty-accent/20 to-liberty-primary/20 rounded-xl p-8 border border-liberty-accent/30">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="text-liberty-accent w-8 h-8" />
              <h3 className="text-2xl font-reckless font-bold !text-white">
                Join Our Community
              </h3>
            </div>
            <p className="text-white/90 mb-6 text-lg">
              Contact us if you'd like to be part of the community and help other leaseholders take control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-white">
                <Link href="mailto:hello@libertybell.co.uk" className="flex items-center gap-3">
                  <MessageCircle size={20} />
                  Contact Us Today
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/40 text-white hover:bg-white/10">
                <Link href="/about" className="flex items-center gap-3">
                  Learn More About Us
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
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
    text: "Save money through collective bargaining and shared knowledge of fair pricing"
  }
]

export default function WhoWeAre() {
  return (
    <>
      {/* What We Stand For Section - Dark Background */}
      <section className="py-16 sm:py-24 lg:py-32 bg-liberty-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold !text-liberty-base mb-6">
              What We <span className="text-liberty-accent">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: James's Story */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-4 text-liberty-base/80 leading-relaxed text-lg">
                  <p>
                    <strong className="text-liberty-accent">Hello, I'm James – a leaseholder like you.</strong> I co-set up Liberty Bell Ethical Enfranchisement Ltd to help other leaseholders because the system is broken and I couldn't find anyone to help me except expensive lawyers.
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
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/james_lewis.avif"
                  alt="James speaking to MPs in Parliament about leasehold reform"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Parliament Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-liberty-base/95 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="text-liberty-primary w-5 h-5" />
                    <div>
                      <p className="font-semibold text-liberty-background text-sm">
                        Speaking at Parliament
                      </p>
                      <p className="text-liberty-background/70 text-xs">
                        "Fighting for leaseholder rights"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Vision Section - Light Background */}
      <section className="py-16 sm:py-24 lg:py-32 bg-liberty-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header - matching home page style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
              Building a <span className="text-liberty-accent">Community Together</span>
            </h2>
            <p className="text-lg text-liberty-background/70 max-w-4xl mx-auto">
              We want to help leaseholders and commonholders pool their information about costs and charges 
              and build a knowledge base to:
            </p>
          </motion.div>

          {/* Benefits Cards - matching home page card style */}
          <div className="space-y-4 max-w-4xl mx-auto mb-20">
            {communityBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg hover:bg-liberty-accent/10 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-liberty-accent/10 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-liberty-accent" />
                </div>
                <div>
                  <p className="text-liberty-background/70 text-sm leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Vision Statement - simpler, matching home page */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-liberty-standard/70 mb-6 max-w-3xl mx-auto">
              We want to change the way the market works, giving knowledge and power to us as buyers.
              <strong> Join our community - together we're stronger.</strong>
            </p>
          </motion.div>

          {/* CTA Section - matching home page button style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-reckless font-bold text-liberty-background mb-4">
                Join Our Community
              </h3>
              <p className="text-liberty-background/70 mb-8 text-lg">
                Contact us if you'd like to be part of the community and help other leaseholders take control.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="xl" 
                  asChild 
                  className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
                >
                  <Link href="/register" className="flex items-center gap-3 group">
                    <MessageCircle size={20} />
                    Register Now
                    <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="xl" 
                  asChild 
                  className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    Get in Touch
                    <ArrowRight size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Big Eligibility CTA Section - Dark Background */}
      <section className="py-16 sm:py-24 lg:py-32 bg-liberty-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold !text-liberty-base mb-8 leading-tight">
              Check Your Eligibility &<br/> <span className="text-liberty-accent">Potential Savings</span>
            </h2>
            
            <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background px-12 py-6">
              <Link href="/eligibility-check" className="flex items-center gap-4 group">
                Check Your Eligibility
                <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

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
import { Card, CardContent } from '@/components/ui/card'

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
          
          {/* Community Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-reckless font-bold text-liberty-background mb-6">
                Building a <span className="text-liberty-accent">Community Together</span>
              </h3>
              <p className="text-liberty-background/70 text-xl leading-relaxed max-w-4xl mx-auto">
                We want to help leaseholders and commonholders pool their information about costs and charges and build a knowledge base to:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {communityBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-liberty-accent/5 border-liberty-accent/20 hover:border-liberty-accent/40 transition-all duration-300">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-liberty-accent/20 rounded-full flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-liberty-accent" />
                      </div>
                      <p className="text-liberty-background/70 leading-relaxed pt-1">
                        {benefit.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-liberty-background/70 text-lg mb-6">
                <strong className="text-liberty-background">We want to change the way the market works</strong> giving knowledge and power to us as buyers.
              </p>
              <p className="text-liberty-primary text-2xl font-reckless font-bold">
                Join us because as a community together we are better and stronger!
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-liberty-primary/5 border-liberty-primary/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="text-liberty-accent w-8 h-8" />
                  <h3 className="text-2xl font-reckless font-bold text-liberty-background">
                    Join Our Community
                  </h3>
                </div>
                <p className="text-liberty-background/70 mb-6 text-lg">
                  Contact us if you'd like to be part of the community and help other leaseholders take control.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                    <Link href="/register" className="flex items-center gap-3">
                      <MessageCircle size={20} />
                      Register
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
                    <Link href="/contact" className="flex items-center gap-3">
                      Get in Touch
                      <ArrowRight size={20} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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

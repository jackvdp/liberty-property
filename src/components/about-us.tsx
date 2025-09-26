'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Shield,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// const credentials = [
//   {
//     icon: Award,
//     title: "Property Institute Accredited",
//     description: "Professional accreditation ensuring the highest standards of service",
//     link: "https://www.propertyinstitute.org"
//   },
//   {
//     icon: Building,
//     title: "Santander Buildings Scheme",
//     description: "Backed by Santander's support for NGOs in public policy campaigns",
//     link: null
//   },
//   {
//     icon: Shield,
//     title: "Government Partnership",
//     description: "Official partner with Ministry of Housing, Communities & Local Government helping deliver leaseholder reform",
//     link: null
//   }
// ]

export default function AboutUs() {
  return (
    <section className="py-16 sm:py-24 bg-liberty-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
            Who We <span className="text-liberty-accent">Are</span>
          </h2>
          <p className="text-xl text-liberty-background/70 max-w-4xl mx-auto leading-relaxed">
            Leaseholders who understand your challenges, working to make the legal process simpler and more affordable for everyone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-6 text-lg text-liberty-background/70 leading-relaxed">
                <p>
                  <strong className="text-liberty-primary">Liberty Bell Ethical Enfranchisement</strong> was founded by leaseholders who've been through the same struggles you're facing. We understand the frustration of unfair service charges, poor management, and feeling powerless in your own home.
                </p>
                <p>
                  We're building digital tools and streamlined processes to make Right to Manage and Collective Enfranchisement more accessible and affordable. While traditional legal firms charge thousands, we're working to democratise these legal rights through technology and clear guidance.
                </p>
                <p>
                  Our mission is simple: help leaseholders take control. We are committed to making the journey clearer, more transparent, and less expensive than the traditional routes.
                </p>
              </div>

              <div className="pt-4">
                <Button asChild size="xl" className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                  <Link href="/how-it-works" className="flex items-center gap-3 group">
                    How It Works
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right: Happy Couple Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/couple-happy.jpeg"
                alt="Happy couple who successfully gained control of their building"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Success Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-liberty-base/95 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="text-liberty-accent w-6 h-6" />
                  <div>
                    <p className="font-semibold text-liberty-background text-sm">
                      Success Story
                    </p>
                    <p className="text-liberty-background/70 text-xs">
                      "We saved £460 per year and finally got quality service"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Professional Credentials */}
        {/*<motion.div*/}
        {/*  initial={{ opacity: 0, y: 30 }}*/}
        {/*  whileInView={{ opacity: 1, y: 0 }}*/}
        {/*  transition={{ duration: 0.8, ease: "easeOut" }}*/}
        {/*  viewport={{ once: true }}*/}
        {/*>*/}
        {/*  <div className="text-center mb-12">*/}
        {/*    <h3 className="text-2xl lg:text-3xl font-reckless font-bold text-liberty-background mb-4">*/}
        {/*      Our <span className="text-liberty-primary">Credentials & Partners</span>*/}
        {/*    </h3>*/}
        {/*    <p className="text-lg text-liberty-background/70 max-w-3xl mx-auto">*/}
        {/*      Backed by leading institutions and recognized by government as a trusted partner in leasehold reform.*/}
        {/*    </p>*/}
        {/*  </div>*/}

        {/*  <div className="grid md:grid-cols-3 gap-8">*/}
        {/*    {credentials.map((credential, index) => (*/}
        {/*      <motion.div*/}
        {/*        key={index}*/}
        {/*        initial={{ opacity: 0, y: 20 }}*/}
        {/*        whileInView={{ opacity: 1, y: 0 }}*/}
        {/*        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}*/}
        {/*        viewport={{ once: true }}*/}
        {/*      >*/}
        {/*        <Card className="h-full bg-liberty-base border-liberty-secondary/30 hover:border-liberty-accent/50 transition-all duration-300 hover:shadow-lg">*/}
        {/*          <CardContent className="p-8 text-center flex flex-col h-full">*/}
        {/*            <div className="h-16 flex items-center justify-center mx-auto mb-6">*/}
        {/*              {index === 0 && (*/}
        {/*                <Image */}
        {/*                  src="/partners/property-institute.png" */}
        {/*                  alt="Property Institute" */}
        {/*                  width={120} */}
        {/*                  height={50} */}
        {/*                  className="object-contain"*/}
        {/*                />*/}
        {/*              )}*/}
        {/*              {index === 1 && (*/}
        {/*                <Image */}
        {/*                  src="/partners/santander.png" */}
        {/*                  alt="Santander Buildings" */}
        {/*                  width={140} */}
        {/*                  height={50} */}
        {/*                  className="object-contain"*/}
        {/*                />*/}
        {/*              )}*/}
        {/*              {index === 2 && (*/}
        {/*                <Image */}
        {/*                  src="/partners/mhlcg.png" */}
        {/*                  alt="Ministry of Housing, Communities & Local Government" */}
        {/*                  width={100} */}
        {/*                  height={50} */}
        {/*                  className="object-contain"*/}
        {/*                />*/}
        {/*              )}*/}
        {/*            </div>*/}
        {/*            <h4 className="text-xl font-reckless font-bold text-liberty-background mb-4">*/}
        {/*              {credential.title}*/}
        {/*            </h4>*/}
        {/*            <p className="text-liberty-background/70 leading-relaxed mb-4 flex-grow">*/}
        {/*              {credential.description}*/}
        {/*            </p>*/}
        {/*            {credential.link && (*/}
        {/*              <a*/}
        {/*                href={credential.link}*/}
        {/*                target="_blank"*/}
        {/*                rel="noopener noreferrer"*/}
        {/*                className="inline-flex items-center gap-2 text-liberty-primary hover:text-liberty-accent transition-colors text-sm font-medium"*/}
        {/*              >*/}
        {/*                Learn More*/}
        {/*                <ExternalLink size={14} />*/}
        {/*              </a>*/}
        {/*            )}*/}
        {/*          </CardContent>*/}
        {/*        </Card>*/}
        {/*      </motion.div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</motion.div>*/}
      </div>
    </section>
  )
}

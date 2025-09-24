'use client'

import { motion } from 'framer-motion'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AboutUs from "@/components/about-us";
import WhoWeAre from "@/components/who-we-are";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      
      {/* Hero Section - Clean solid background */}
      <section className="py-20 bg-liberty-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-reckless font-bold !text-liberty-base mb-6">
              About <span className="text-liberty-accent">Us</span>
            </h1>
            <p className="text-xl text-liberty-base/80 max-w-3xl mx-auto mb-8">
              We're leaseholders too, but with accredited expertise and institutional backing to deliver real change.
            </p>
            
            <p className="text-sm font-medium text-liberty-base/60 mb-6">
              Trusted by leading institutions and professional bodies
            </p>
            
            {/* Partner Logos */}
            {/*<motion.div*/}
            {/*  initial={{ opacity: 0, y: 10 }}*/}
            {/*  animate={{ opacity: 1, y: 0 }}*/}
            {/*  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}*/}
            {/*  className="flex flex-wrap justify-center items-center gap-8 lg:gap-12"*/}
            {/*>*/}
            {/*  <div className="h-12 flex items-center">*/}
            {/*    <Image */}
            {/*      src="/partners/property-institute.png" */}
            {/*      alt="Property Institute" */}
            {/*      width={100} */}
            {/*      height={40} */}
            {/*      className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  */}
            {/*  <div className="h-12 flex items-center">*/}
            {/*    <Image */}
            {/*      src="/partners/santander.png" */}
            {/*      alt="Santander Buildings" */}
            {/*      width={120} */}
            {/*      height={40} */}
            {/*      className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  */}
            {/*  <div className="h-12 flex items-center">*/}
            {/*    <Image */}
            {/*      src="/partners/mhlcg.png" */}
            {/*      alt="Ministry of Housing, Communities & Local Government" */}
            {/*      width={80} */}
            {/*      height={40} */}
            {/*      className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</motion.div>*/}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <AboutUs />

      {/* Who We Are Section */}
      <WhoWeAre />

      <Footer />
    </div>
  )
}

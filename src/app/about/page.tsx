'use client'

import { motion } from 'framer-motion'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhoWeAre from "@/components/who-we-are";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-liberty-secondary/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-reckless font-bold !text-liberty-background mb-6">
              About <span className="text-liberty-accent">Liberty Bell</span>
            </h1>
            <p className="text-xl !text-liberty-background/60 max-w-3xl mx-auto">
              We're leaseholders too. We know the struggle, and we've built the solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <WhoWeAre />

      <Footer />
    </div>
  )
}

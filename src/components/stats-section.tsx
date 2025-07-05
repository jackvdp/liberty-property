'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StatItemProps {
  value: number
  suffix: string
  label: string
  prefix?: string
  duration?: number
}

function StatItem({ value, suffix, label, prefix = '', duration = 2 }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentValue = easeOut * value
        
        // Handle decimal values properly
        if (value % 1 !== 0) {
          setCount(Math.round(currentValue * 10) / 10) // Round to 1 decimal place
        } else {
          setCount(Math.floor(currentValue))
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-base mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-lg sm:text-xl text-liberty-secondary">
        {label}
      </div>
    </motion.div>
  )
}

const stats = [
  {
    value: 2000,
    suffix: '',
    label: 'Average saved each year',
    prefix: '£',
    duration: 2
  },
  {
    value: 94,
    suffix: '%',
    label: 'Success Rate',
    duration: 1.8
  },
  {
    value: 1000,
    suffix: '+',
    label: 'Properties Already Freed',
    duration: 2
  },
  {
    value: 6,
    suffix: '',
    label: 'Average Months to Complete',
    duration: 1
  }
]

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-liberty-accent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-liberty-primary rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold !text-liberty-base mb-4">
            Real Results for Real People
          </h2>
          <p className="text-xl sm:text-2xl text-liberty-secondary max-w-3xl mx-auto">
            These aren't just promises – they're proven outcomes from leaseholders who took control
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              prefix={stat.prefix}
              duration={stat.duration}
            />
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg sm:text-xl text-liberty-secondary font-medium mb-6">
            Join us in making the switch to property freedom
          </p>
          <Button 
            size="xl" 
            asChild 
            className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background"
          >
            <Link href="#how-it-works" className="flex items-center gap-3 group">
              Find Out How
              <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroContent } from '@/content/heroes'
import HeroOverlay from '../hero-overlay'

interface HeroBaseProps {
  content: HeroContent
  variant?: 'original' | 'aggressive' | 'data-driven'
}

export default function HeroBase({ content, variant = 'original' }: HeroBaseProps) {
  
  // Track absolute scroll position from the top of the page
  const { scrollY } = useScroll()
  
  // Transform absolute scroll position to padding values - responsive
  const paddingXDesktop = useTransform(scrollY, [0, 800], [256, 0])
  const paddingXMobile = useTransform(scrollY, [0, 800], [36, 0])
  const borderRadius = useTransform(scrollY, [0, 800], [32, 0])
  
  // Text fade in animation - starts later and fades in quickly
  const textOpacity = useTransform(scrollY, [240, 400], [0, 1])
  const textY = useTransform(scrollY, [240, 400], [30, 0])
  
  // Dark overlay that increases as we scroll
  const overlayOpacity = useTransform(scrollY, [0, 600], [0, 0.4])

  // Get variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'aggressive':
        return {
          gradient: 'from-red-500/20 via-liberty-base to-liberty-base',
          titleColor: 'text-liberty-background',
          accentColor: 'text-red-500',
          primaryButton: 'bg-red-600 hover:bg-red-700 text-white',
          secondaryButton: 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
        }
      case 'data-driven':
        return {
          gradient: 'from-green-500/20 via-liberty-base to-liberty-base',
          titleColor: 'text-liberty-background',
          accentColor: 'text-green-500',
          primaryButton: 'bg-green-600 hover:bg-green-700 text-white',
          secondaryButton: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
        }
      default:
        return {
          gradient: 'from-liberty-secondary/20 via-liberty-base to-liberty-base',
          titleColor: 'text-liberty-background',
          accentColor: 'text-liberty-accent',
          primaryButton: 'bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base',
          secondaryButton: 'border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <section className="bg-liberty-base">
      {/* Hero Content */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient}`}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Main headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold ${styles.titleColor} mb-6`}
            >
              {content.title.split(content.subtitle)[0]}
              <span className={styles.accentColor}>{content.subtitle}</span>
              {content.title.split(content.subtitle)[1]}
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl sm:text-2xl text-liberty-background/70 mb-8 max-w-4xl mx-auto"
            >
              {content.description}
            </motion.p>
            
            {/* Additional content for specific variants */}
            {variant === 'original' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mb-12 text-center"
              >
                <p className="text-lg text-liberty-background/70 mb-8 max-w-3xl mx-auto">
                  Liberty Bell is dedicated to assisting leaseholders in all areas of leasehold enfranchisement, from acquiring the freehold of their building and Right to Manage to Commonhold conversion. Our technology-driven, end-to-end services provide comprehensive support throughout your property ownership journey.
                </p>
              </motion.div>
            )}
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="xl" asChild className={styles.primaryButton}>
                <Link href={content.primaryCTA.href} className="flex items-center gap-3 group">
                  {content.primaryCTA.text}
                  <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className={styles.secondaryButton}>
                <Link href={content.secondaryCTA.href}>
                  {content.secondaryCTA.text}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Hero Image with Scroll Effect */}
      <div className="pb-16">
        {/* Desktop - animated padding */}
        <motion.div
          style={{
            paddingLeft: paddingXDesktop,
            paddingRight: paddingXDesktop,
          }}
          className="relative hidden lg:block"
        >
          <motion.div
            style={{
              borderRadius: borderRadius,
            }}
            className="overflow-hidden shadow-xl relative h-[100vh] min-h-[300px]"
          >
            <Image
              src={content.backgroundImage}
              alt={content.backgroundImageAlt}
              width={1200}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
            {/* Dark Overlay */}
            <motion.div
              style={{
                opacity: overlayOpacity,
              }}
              className="absolute inset-0 bg-black"
            />
            {/* Overlay Text */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <HeroOverlay isMobile={false} />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Mobile/Tablet - smaller animated padding */}
        <motion.div
          style={{
            paddingLeft: paddingXMobile,
            paddingRight: paddingXMobile,
          }}
          className="relative lg:hidden px-4"
        >
          <motion.div
            style={{
              borderRadius: borderRadius,
            }}
            className="overflow-hidden shadow-xl relative h-[60vh]"
          >
            <Image
              src={content.backgroundImage}
              alt={content.backgroundImageAlt}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              priority
            />
            {/* Dark Overlay */}
            <motion.div
              style={{
                opacity: overlayOpacity,
              }}
              className="absolute inset-0 bg-black"
            />
            {/* Overlay Text - Mobile */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <HeroOverlay isMobile={true} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

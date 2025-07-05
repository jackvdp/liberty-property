import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroOverlayProps {
  isMobile?: boolean
}

export default function HeroOverlay({ isMobile = false }: HeroOverlayProps) {
  return (
    <div className="text-center px-4 lg:px-8">
      <h2 className={`font-black drop-shadow-2xl !text-white mb-3 lg:mb-4 ${
        isMobile 
          ? 'text-3xl sm:text-4xl' 
          : 'text-5xl sm:text-6xl lg:text-7xl'
      }`}>
        Your Property Freedom
      </h2>
      <p className={`drop-shadow-xl text-white ${
        isMobile 
          ? 'text-base sm:text-lg mb-4' 
          : 'text-xl sm:text-2xl lg:text-3xl max-w-2xl mx-auto mb-6'
      }`}>
          Join us and take control of your building, eliminating ground rent forever
      </p>
      <Button 
        size={isMobile ? "lg" : "xl"} 
        variant="outline" 
        asChild 
        className="border-2 border-white text-white hover:bg-white hover:text-liberty-background backdrop-blur-sm transition-all duration-300"
      >
        <Link href="/get-started" className="flex items-center gap-2 lg:gap-3 group">
          Start Your Journey
          <ArrowRight 
            size={isMobile ? 18 : 20} 
            className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" 
          />
        </Link>
      </Button>
    </div>
  )
}
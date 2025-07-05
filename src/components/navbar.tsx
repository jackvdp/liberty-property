'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-liberty-base/95 backdrop-blur-sm border-b border-liberty-secondary/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-reckless font-bold text-liberty-background">
              Liberty Property
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/about" 
                className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                href="/services" 
                className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Services
              </Link>
              <Link 
                href="/calculator" 
                className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Calculator
              </Link>
              <Link 
                href="/contact" 
                className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
              <Link href="/get-started">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-liberty-background hover:text-liberty-primary"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-liberty-base">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link 
                    href="/about" 
                    className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/services" 
                    className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                  <Link 
                    href="/calculator" 
                    className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Calculator
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <div className="pt-4">
                    <Button asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base w-full">
                      <Link href="/get-started" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
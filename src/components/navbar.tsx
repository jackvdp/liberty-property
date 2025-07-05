'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, ArrowRight, Calculator, FileText, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-liberty-base/95 backdrop-blur-sm border-b border-liberty-secondary/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Liberty Bell Property Management"
                width={48}
                height={48}
                className="h-12 w-12 rounded-lg"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>

                {/* Simple Links */}
                <NavigationMenuItem>
                  <Link href="/about" className="text-liberty-background/70 hover:text-liberty-primary px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-liberty-secondary/20">
                    About
                  </Link>
                </NavigationMenuItem>

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-liberty-background/70 hover:text-liberty-primary bg-transparent hover:bg-liberty-secondary/20">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-80 bg-liberty-base border border-liberty-secondary/30 rounded-lg shadow-lg">
                      <ListItem href="/right-to-manage" title="Right to Manage">
                        Take control of your building management
                      </ListItem>
                      <ListItem href="/collective-enfranchisement" title="Collective Enfranchisement">
                        Buy your freehold and own your property outright
                      </ListItem>
                      <ListItem href="/commonhold-conversion" title="Commonhold Conversion">
                        Convert to the future of property ownership
                      </ListItem>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-liberty-background/70 hover:text-liberty-primary bg-transparent hover:bg-liberty-secondary/20">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-72 bg-liberty-base border border-liberty-secondary/30 rounded-lg shadow-lg">
                      <ListItem href="/cost-calculator" title="Cost Calculator" icon={<Calculator className="h-4 w-4" />}>
                        Calculate your potential savings
                      </ListItem>
                      <ListItem href="/eligibility-checker" title="Eligibility Checker" icon={<FileText className="h-4 w-4" />}>
                        Check if you qualify for RTM or enfranchisement
                      </ListItem>
                      <ListItem href="/commonhold-guide" title="Free Commonhold Guide" icon={<FileText className="h-4 w-4" />}>
                        Your complete guide to property freedom
                      </ListItem>
                      <ListItem href="/case-studies" title="Case Studies" icon={<Users className="h-4 w-4" />}>
                        Real success stories from leaseholders
                      </ListItem>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/contact" className="text-liberty-background/70 hover:text-liberty-primary px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-liberty-secondary/20">
                    Contact
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Custom styles to override NavigationMenu viewport border */}
            <style jsx global>{`
              [data-slot="navigation-menu-viewport"] {
                border: none !important;
                box-shadow: none !important;
              }
            `}</style>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
              <Link href="/get-started" className="flex items-center gap-2">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
                  {/* Mobile Services Section */}
                  <div className="space-y-3">
                    <h3 className="font-reckless font-semibold text-liberty-background">Services</h3>
                    <Link 
                      href="/right-to-manage" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Right to Manage
                    </Link>
                    <Link 
                      href="/collective-enfranchisement" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Collective Enfranchisement
                    </Link>
                    <Link 
                      href="/commonhold-conversion" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Commonhold Conversion
                    </Link>
                  </div>

                  {/* Mobile Resources Section */}
                  <div className="space-y-3 pt-4 border-t border-liberty-secondary/30">
                    <h3 className="font-reckless font-semibold text-liberty-background">Resources</h3>
                    <Link 
                      href="/cost-calculator" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Cost Calculator
                    </Link>
                    <Link 
                      href="/commonhold-guide" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Free Guide
                    </Link>
                    <Link 
                      href="/case-studies" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-sm transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Case Studies
                    </Link>
                  </div>

                  {/* Mobile Simple Links */}
                  <div className="space-y-3 pt-4 border-t border-liberty-secondary/30">
                    <Link 
                      href="/about" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-base font-medium transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <Link 
                      href="/contact" 
                      className="text-liberty-background/70 hover:text-liberty-primary px-3 py-2 rounded-md text-base font-medium transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>

                  <div className="pt-6">
                    <Button asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base w-full">
                      <Link href="/get-started" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
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

const ListItem = ({ className, title, children, icon, ...props }: {
  className?: string
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
} & React.ComponentPropsWithoutRef<"a">) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-liberty-secondary/20 hover:text-liberty-primary focus:bg-liberty-secondary/20 focus:text-liberty-primary",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm font-medium leading-none text-liberty-background">
          {icon}
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-liberty-background/60">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, ArrowRight, FileText, Users, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
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
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo - Left side */}
          <div className="flex justify-start">
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

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>

                {/* Simple Links */}
                <NavigationMenuItem>
                  <Link href="/about" className="text-liberty-background/70 hover:text-liberty-primary px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-liberty-secondary/20">
                    About
                  </Link>
                </NavigationMenuItem>

                {/* How It Works - Simple Link */}
                <NavigationMenuItem>
                  <Link href="/how-it-works" className="text-liberty-background/70 hover:text-liberty-primary px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-liberty-secondary/20">
                    How It Works
                  </Link>
                </NavigationMenuItem>

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-liberty-background/70 hover:text-liberty-primary bg-transparent hover:bg-liberty-secondary/20">
                    Pathways
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-80 bg-liberty-base border border-liberty-secondary/30 rounded-lg shadow-lg">
                      <ListItem href="/right-to-manage" title="Right to Manage">
                        Take control of your building management
                      </ListItem>
                      <ListItem href="/collective-enfranchisement" title="Collective Enfranchisement">
                        Buy your freehold and own your property outright
                      </ListItem>
                      <ListItem href="/rmc-process" title="RMC Takeover">
                        Take control of your existing RMC structure
                      </ListItem>
                      <ListItem href="/commonhold-conversion" title="Commonhold Conversion">
                        Convert to the future of property ownership
                      </ListItem>
                      <ListItem href="/property-management" title="Property Management">
                        Professional building management services
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

          {/* Desktop CTA Button - Right side */}
          <div className="hidden lg:flex justify-end">
            <Button asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
              <Link href="/eligibility-check" className="flex items-center gap-2">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile menu button - Right side for mobile */}
          <div className="lg:hidden col-span-2 flex justify-end">
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
              <SheetContent side="right" className="bg-liberty-base w-full sm:w-full flex flex-col">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                
                {/* Logo and Brand - Fixed at top */}
                <div className="flex items-center gap-3 px-2 py-4 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Liberty Bell Property Management"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-lg"
                  />
                  <div>
                    <h2 className="font-reckless font-semibold text-liberty-background text-lg">Liberty Bell</h2>
                    <p className="text-liberty-background/60 text-sm">Ethical Enfranchisement</p>
                  </div>
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-2 space-y-6">
                  {/* Mobile Simple Links */}
                  <div className="space-y-4">
                    <h3 className="font-reckless font-semibold text-liberty-background text-lg border-b border-liberty-secondary/30 pb-2">Company</h3>
                    <div className="space-y-1">
                      <Link
                          href="/about"
                          className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium">About Us</span>
                      </Link>
                      <Link
                          href="/how-it-works"
                          className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium">How It Works</span>
                      </Link>
                      <Link
                          href="/contact"
                          className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium">Contact</span>
                      </Link>
                    </div>
                  </div>
                  {/* Mobile Services Section */}
                  <div className="space-y-4">
                    <h3 className="font-reckless font-semibold text-liberty-background text-lg border-b border-liberty-secondary/30 pb-2">Pathways</h3>
                    <div className="space-y-1">
                      <Link 
                        href="/right-to-manage" 
                        className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-liberty-primary/10 rounded-lg flex items-center justify-center group-hover:bg-liberty-primary/20 transition-colors">
                          <Users className="w-4 h-4 text-liberty-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Right to Manage</div>
                          <div className="text-sm text-liberty-background/50">Take control of your building</div>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/collective-enfranchisement" 
                        className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-liberty-primary/10 rounded-lg flex items-center justify-center group-hover:bg-liberty-primary/20 transition-colors">
                          <FileText className="w-4 h-4 text-liberty-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Collective Enfranchisement</div>
                          <div className="text-sm text-liberty-background/50">Buy your freehold</div>
                        </div>
                      </Link>

                      <Link 
                        href="/rmc-process" 
                        className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-liberty-primary/10 rounded-lg flex items-center justify-center group-hover:bg-liberty-primary/20 transition-colors">
                          <Users className="w-4 h-4 text-liberty-primary" />
                        </div>
                        <div>
                          <div className="font-medium">RMC Takeover</div>
                          <div className="text-sm text-liberty-background/50">Control your existing RMC</div>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/commonhold-conversion" 
                        className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-liberty-primary/10 rounded-lg flex items-center justify-center group-hover:bg-liberty-primary/20 transition-colors">
                          <ArrowRight className="w-4 h-4 text-liberty-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Commonhold Conversion</div>
                          <div className="text-sm text-liberty-background/50">Future of ownership</div>
                        </div>
                      </Link>

                      <Link 
                        href="/property-management" 
                        className="flex items-center gap-3 text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10 px-3 py-3 rounded-lg text-base transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-liberty-primary/10 rounded-lg flex items-center justify-center group-hover:bg-liberty-primary/20 transition-colors">
                          <Building className="w-4 h-4 text-liberty-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Property Management</div>
                          <div className="text-sm text-liberty-background/50">Professional services</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Fixed footer with CTA */}
                <SheetFooter className="flex-shrink-0 px-2 pb-4">
                  <Button asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base w-full h-12">
                    <Link href="/eligibility-check" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

const ListItem = ({ className, title, children, icon, href, ...props }: {
  className?: string
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  href: string
} & Omit<React.ComponentPropsWithoutRef<"a">, "href">) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
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
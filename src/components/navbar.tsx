'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, ArrowRight, FileText, Users, Building, Home, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { getCurrentUser, signOut, type CurrentUser } from '@/lib/actions/auth.actions'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Fetch current user on mount
  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setIsLoading(false)
    }
    loadUser()
  }, [])

  // Handle sign out
  async function handleSignOut() {
    const result = await signOut()
    if (result.success) {
      setCurrentUser(null)
      setIsUserMenuOpen(false)
      router.push('/')
      router.refresh()
    }
  }

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  // Helper function to get link classes
  const getLinkClasses = (path: string) => {
    const baseClasses = "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md"
    if (isActive(path)) {
      return `${baseClasses} text-liberty-accent bg-liberty-accent/10`
    }
    return `${baseClasses} text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/20`
  }

  // Helper function for mobile link classes
  const getMobileLinkClasses = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all duration-300"
    if (isActive(path)) {
      return `${baseClasses} text-liberty-accent bg-liberty-accent/10`
    }
    return `${baseClasses} text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/10`
  }

  // Get display name (first name or full name)
  const getDisplayName = () => {
    if (!currentUser?.fullName) return currentUser?.email?.split('@')[0] || 'User'
    const firstName = currentUser.fullName.split(' ')[0]
    return firstName
  }

  return (
    <nav className="bg-liberty-base/95 backdrop-blur-sm border-b border-liberty-secondary/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_2fr_1fr] items-center h-16">
          {/* Logo - Left side (1fr) */}
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

          {/* Desktop Navigation - Center (2fr) */}
          <div className="hidden lg:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>

                {/* Home Link */}
                <NavigationMenuItem>
                  <Link href="/" className={`${getLinkClasses('/')} flex items-center gap-2`}>
                    <Home className="w-4 h-4" />
                  </Link>
                </NavigationMenuItem>

                {/* Simple Links */}
                <NavigationMenuItem>
                  <Link href="/about" className={getLinkClasses('/about')}>
                    About
                  </Link>
                </NavigationMenuItem>

                {/* How It Works - Simple Link */}
                <NavigationMenuItem>
                  <Link href="/how-it-works" className={getLinkClasses('/how-it-works')}>
                    How It Works
                  </Link>
                </NavigationMenuItem>

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={
                    isActive('/right-to-manage') || 
                    isActive('/collective-enfranchisement') || 
                    isActive('/rmc-process') || 
                    isActive('/commonhold-conversion') || 
                    isActive('/property-management')
                      ? "text-liberty-accent bg-liberty-accent/10 hover:bg-liberty-accent/20"
                      : "text-liberty-background/70 hover:text-liberty-primary bg-transparent hover:bg-liberty-secondary/20"
                  }>
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
                  <Link href="/contact" className={getLinkClasses('/contact')}>
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

          {/* Desktop CTA Button / User Menu - Right side (1fr) */}
          <div className="hidden lg:flex justify-end items-center gap-3">
            {!isLoading && (
              <>
                {currentUser ? (
                  // User Menu Sheet
                  <Sheet open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="flex items-center gap-2 text-liberty-background hover:text-liberty-primary hover:bg-liberty-secondary/20"
                      >
                        <div className="w-8 h-8 bg-liberty-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-liberty-primary" />
                        </div>
                        <span className="font-medium">{getDisplayName()}</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] sm:w-[400px]">
                      <SheetHeader>
                        <SheetTitle>Account</SheetTitle>
                      </SheetHeader>
                      <div className="flex flex-col gap-6 py-6">
                        {/* User Info */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-liberty-secondary/20 rounded-lg">
                          <div className="w-12 h-12 bg-liberty-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-liberty-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-liberty-background truncate">
                              {currentUser.fullName || 'User'}
                            </p>
                            <p className="text-sm text-liberty-background/60 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                          <Link 
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-liberty-secondary/10 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Building className="w-5 h-5 text-liberty-primary" />
                            <span className="font-medium">Dashboard</span>
                          </Link>
                        </div>
                      </div>
                      
                      <SheetFooter className="flex-col sm:flex-col gap-2">
                        <Button
                          variant="outline"
                          onClick={handleSignOut}
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </Button>
                        <SheetClose asChild>
                          <Button variant="ghost" className="w-full">
                            Close
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                ) : (
                  // Logged out: Show Login + Get Started
                  <>
                    <Button 
                      asChild 
                      variant="ghost"
                      className="text-liberty-background/70 hover:text-liberty-primary hover:bg-liberty-secondary/20"
                    >
                      <Link href="/login">
                        Login
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
                    >
                      <Link href="/eligibility-check" className="flex items-center gap-2">
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
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
                    <h3 className="font-reckless font-semibold text-liberty-background text-lg border-b border-liberty-secondary/30 pb-2">Navigation</h3>
                    <div className="space-y-1">
                      <Link
                          href="/"
                          className={getMobileLinkClasses('/')}
                          onClick={() => setIsOpen(false)}
                      >
                        <Home className="w-5 h-5" />
                      </Link>
                      <Link
                          href="/about"
                          className={getMobileLinkClasses('/about')}
                          onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium">About Us</span>
                      </Link>
                      <Link
                          href="/how-it-works"
                          className={getMobileLinkClasses('/how-it-works')}
                          onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium">How It Works</span>
                      </Link>
                      <Link
                          href="/contact"
                          className={getMobileLinkClasses('/contact')}
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
                        className={`${getMobileLinkClasses('/right-to-manage')} group`}
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

                {/* Fixed footer with CTA or User Actions */}
                <SheetFooter className="flex-shrink-0 px-2 pb-4 space-y-2">
                  {!isLoading && (
                    <>
                      {currentUser ? (
                        // Logged in: Show user info and sign out
                        <>
                          <div className="flex items-center gap-3 px-4 py-3 bg-liberty-secondary/20 rounded-lg mb-2">
                            <div className="w-10 h-10 bg-liberty-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-liberty-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-liberty-background truncate text-sm">
                                {currentUser.fullName || 'User'}
                              </p>
                              <p className="text-xs text-liberty-background/60 truncate">
                                {currentUser.email}
                              </p>
                            </div>
                          </div>
                          <Button 
                            asChild 
                            className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base w-full h-12"
                          >
                            <Link 
                              href="/dashboard" 
                              onClick={() => setIsOpen(false)} 
                              className="flex items-center justify-center gap-2"
                            >
                              <Building className="h-4 w-4" />
                              Dashboard
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              handleSignOut()
                              setIsOpen(false)
                            }}
                            className="w-full flex items-center justify-center gap-2"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        // Logged out: Show Get Started + Login
                        <>
                          <Button 
                            asChild 
                            className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base w-full h-12"
                          >
                            <Link 
                              href="/eligibility-check" 
                              onClick={() => setIsOpen(false)} 
                              className="flex items-center justify-center gap-2"
                            >
                              Get Started
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full"
                          >
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                              Login
                            </Link>
                          </Button>
                        </>
                      )}
                    </>
                  )}
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
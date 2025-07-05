import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-liberty-background text-liberty-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image
                  src="/logo-wide.png"
                  alt="Liberty Bell Property Management"
                  width={320}
                  height={107}
                  className="h-24 w-auto"
                />
              </div>
              <p className="text-liberty-secondary text-sm leading-relaxed mb-6">
                A property management company working for leaseholders. We help frustrated leaseholders become empowered commonholders through technology, transparency, and legal empowerment.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-liberty-accent flex-shrink-0" />
                  <a 
                    href="mailto:lbpm@libertybell.co.uk" 
                    className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm"
                  >
                    lbpm@libertybell.co.uk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-liberty-accent flex-shrink-0" />
                  <a 
                    href="tel:+447894309321" 
                    className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm"
                  >
                    +44 (0) 7894 309 321
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-liberty-accent flex-shrink-0" />
                  <span className="text-liberty-secondary text-sm">
                    England & Wales
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-reckless font-bold text-liberty-base mb-4">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/right-to-manage" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Right to Manage
                  </Link>
                </li>
                <li>
                  <Link href="/collective-enfranchisement" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Collective Enfranchisement
                  </Link>
                </li>
                <li>
                  <Link href="/commonhold-conversion" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Commonhold Conversion
                  </Link>
                </li>
                <li>
                  <Link href="/lease-extensions" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Lease Extensions
                  </Link>
                </li>
                <li>
                  <Link href="/property-management" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Property Management
                  </Link>
                </li>
                <li>
                  <Link href="/ai-advisor" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    AI Legal Advisor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-reckless font-bold text-liberty-base mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/commonhold-guide" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Free Commonhold Guide
                  </Link>
                </li>
                <li>
                  <Link href="/cost-calculator" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Cost Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/eligibility-checker" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Eligibility Checker
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Blog & Updates
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-reckless font-bold text-liberty-base mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/partner-with-us" className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                    Partner With Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-liberty-secondary/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-liberty-secondary">
              <span>© 2025 Liberty Bell Property Management</span>
              <span className="hidden sm:inline">•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-liberty-secondary hover:text-liberty-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-liberty-secondary hover:text-liberty-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-liberty-secondary hover:text-liberty-accent transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="border-t border-liberty-secondary/20 py-8">
          <div className="text-center">
            <p className="text-liberty-secondary text-sm italic max-w-4xl mx-auto">
              "First and foremost, we are leaseholders just like you. We suffered seven years of despair at the hands of unscrupulous managing agents and found there was little help out there aimed at leaseholders. It felt like the whole leasehold system was stacked against us despite it being us that held most of the value and paid all of the costs. We knew we could offer a better service at a much better price. That was when Liberty Bell Property Management was born."
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { content } from '@/data/home/content'
import { contactInfo } from '@/data/contact-info'

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
                  src={content.footer.logo.src}
                  alt={content.footer.logo.alt}
                  width={content.footer.logo.width}
                  height={content.footer.logo.height}
                  className="h-24 w-auto"
                />
              </div>
              <p className="text-liberty-secondary text-sm leading-relaxed mb-6">
                {content.footer.companyDescription}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-liberty-accent flex-shrink-0" />
                  <a 
                    href={contactInfo.email.href}
                    className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm"
                  >
                    {contactInfo.email.address}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-liberty-accent flex-shrink-0" />
                  <a 
                    href={contactInfo.phone.href}
                    className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm"
                  >
                    {contactInfo.phone.display}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-liberty-accent flex-shrink-0" />
                  <span className="text-liberty-secondary text-sm">
                    {contactInfo.location.display}
                  </span>
                </div>
              </div>
            </div>

            {/* Empty div for spacing */}
            <div></div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-reckless font-bold !text-liberty-base mb-4">
                Pathways
              </h3>
              <ul className="space-y-3">
                {content.footer.services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.href} className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-reckless font-bold !text-liberty-base mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {content.footer.company.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-liberty-secondary hover:text-liberty-accent transition-colors text-sm">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-liberty-secondary/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-liberty-secondary">
              <span>{content.footer.copyright}</span>
              <span className="hidden sm:inline">•</span>
              <span>{content.footer.rightsReserved}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              {content.footer.legal.map((item, index) => (
                <Link key={index} href={item.href} className="text-liberty-secondary hover:text-liberty-accent transition-colors">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="border-t border-liberty-secondary/20 py-8">
          <div className="text-center">
            <p className="text-liberty-secondary text-sm italic max-w-4xl mx-auto">
              "{content.footer.missionStatement}"
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
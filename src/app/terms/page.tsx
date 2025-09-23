'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Scale, 
  Shield, 
  FileText, 
  Users, 
  AlertCircle,
  Clock,
  Mail,
  Building,
  Database,
  Lock,
  Briefcase,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useState } from 'react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const sections = [
  {
    id: 'definitions',
    icon: FileText,
    title: '1. Definitions & Interpretation',
    content: `
      <p><strong>"We", "Us", "Our"</strong> means Liberty Bell Ethical Enfranchisement Ltd, a company registered in England and Wales (Company Number: 16430826).</p>
      <p><strong>"You", "Your"</strong> means the individual or group of leaseholders entering into a contract with us.</p>
      <p><strong>"RTM"</strong> refers to the Right to Manage under the Commonhold and Leasehold Reform Act 2002.</p>
      <p><strong>"Services"</strong> means the consultancy services we provide including eligibility assessment, RTM/enfranchisement support, and property management advisory.</p>
      <p><strong>"Business Day"</strong> means a day other than a Saturday, Sunday, or public holiday in England when banks in London are open for business.</p>
    `
  },
  {
    id: 'services',
    icon: Briefcase,
    title: '2. Our Services',
    content: `
      <p>We provide consultancy services which may include:</p>
      <ul>
        <li>Eligibility assessment for Right to Manage and Collective Enfranchisement</li>
        <li>Assistance in setting up RTM companies</li>
        <li>Drafting and serving statutory notices</li>
        <li>Liaising with landlords and their representatives</li>
        <li>Advising on compliance with legal procedures</li>
        <li>Support in First-tier Tribunal proceedings if required</li>
        <li>General project guidance and management</li>
      </ul>
      <p class="mt-4"><strong>Important:</strong> We are not a law firm and do not provide legal representation. We may refer you to qualified solicitors where appropriate.</p>
    `
  },
  {
    id: 'obligations',
    icon: Users,
    title: '3. Your Obligations',
    content: `
      <p>When using our services, you agree to:</p>
      <ul>
        <li>Provide accurate and timely information as requested</li>
        <li>Grant necessary access to premises, systems, and data</li>
        <li>Have proper authority to act on behalf of your building or leaseholder group</li>
        <li>Prepare relevant premises and systems at your own cost</li>
        <li>Not engage other consultants for similar services during our engagement without prior written consent</li>
      </ul>
    `
  },
  {
    id: 'data',
    icon: Database,
    title: '4. Data Use & Commercial Application',
    content: `
      <p>We may collect, store, and process data provided during our services. We are entitled to anonymise and aggregate this data to:</p>
      <ul>
        <li>Develop and maintain a national database of leasehold information</li>
        <li>Conduct benchmarking and market analysis</li>
        <li>Create insights and research products</li>
        <li>Improve our services and develop new offerings</li>
      </ul>
      <p class="mt-4"><strong>Privacy Guarantee:</strong> All data will be fully anonymised - no individual property, client, or personal data will be identifiable. We comply with UK GDPR and the Data Protection Act 2018.</p>
    `
  },
  {
    id: 'payment',
    icon: Scale,
    title: '5. Charges & Payment',
    content: `
      <p>Payment terms for our services:</p>
      <ul>
        <li>Fixed prices exclude VAT and ancillary expenses unless specified</li>
        <li>Payment is due within 30 days of invoice</li>
        <li>We may charge interest on late payments under the Late Payment of Commercial Debts Act 1998</li>
        <li>We may suspend services until payment is received in full</li>
        <li>All payments must be made without deduction or set-off except as required by law</li>
      </ul>
    `
  },
  {
    id: 'liability',
    icon: AlertCircle,
    title: '6. Limitation of Liability',
    content: `
      <p><strong>We do not exclude liability for:</strong></p>
      <ul>
        <li>Death or personal injury caused by negligence</li>
        <li>Fraud or fraudulent misrepresentation</li>
      </ul>
      <p class="mt-4"><strong>We are not liable for:</strong></p>
      <ul>
        <li>Loss of profits, business, goodwill, or anticipated savings</li>
        <li>Indirect, consequential or economic losses</li>
        <li>Legal consequences of statutory deadline failures beyond our control</li>
        <li>Data loss or corruption</li>
      </ul>
      <p class="mt-4">Our total liability is limited to the price paid for the services. We do not guarantee successful outcomes as results may be affected by factors outside our control.</p>
    `
  },
  {
    id: 'intellectual',
    icon: Building,
    title: '7. Intellectual Property',
    content: `
      <p>All intellectual property rights in our deliverables remain our property. We grant you a non-exclusive, non-transferable licence to use deliverables as necessary for the services.</p>
      <p class="mt-4">Any feedback you provide may be used by us without obligation to you.</p>
    `
  },
  {
    id: 'confidentiality',
    icon: Lock,
    title: '8. Confidentiality',
    content: `
      <p>Both parties agree to keep confidential information secret and not disclose it except:</p>
      <ul>
        <li>For performing obligations under our agreement</li>
        <li>To representatives who need to know and are bound by confidentiality</li>
        <li>As required by law or regulatory authorities</li>
        <li>If information becomes public through no breach</li>
      </ul>
      <p class="mt-4">These obligations continue after our services end.</p>
    `
  },
  {
    id: 'rtm',
    icon: AlertTriangle,
    title: '9. RTM Process & Legal Proceedings',
    content: `
      <p>For Right to Manage services, please note:</p>
      <ul>
        <li>The RTM company (once formed) is the formal party to legal proceedings, not individual leaseholders</li>
        <li>We act as consultants and advisers only, not legal representatives</li>
        <li>You are responsible for forming the RTM company and ensuring compliance</li>
        <li>We are not liable for acts or omissions of the RTM company or its directors</li>
        <li>Tribunal support is administrative only unless separately agreed in writing</li>
      </ul>
    `
  },
  {
    id: 'termination',
    icon: Clock,
    title: '10. Termination',
    content: `
      <p>Either party may terminate our agreement if the other party:</p>
      <ul>
        <li>Fails to pay within 7 days of written notice</li>
        <li>Materially breaches terms and fails to remedy within 14 days of notice</li>
        <li>Becomes insolvent or enters administration</li>
        <li>Repeatedly breaches terms showing inability to comply</li>
      </ul>
      <p class="mt-4">Termination doesn't affect accrued rights or obligations.</p>
    `
  },
  {
    id: 'general',
    icon: Shield,
    title: '11. General Terms',
    content: `
      <p><strong>Force Majeure:</strong> Neither party is liable for delays due to circumstances beyond reasonable control. If delays exceed 3 months, either party may terminate with 14 days' notice.</p>
      <p class="mt-4"><strong>Governing Law:</strong> These terms are governed by the laws of England and Wales.</p>
      <p class="mt-4"><strong>Dispute Resolution:</strong> Disputes should be resolved informally first, then through mediation before legal proceedings.</p>
      <p class="mt-4"><strong>Third Parties:</strong> We may recommend third-party providers but accept no liability for their services.</p>
      <p class="mt-4"><strong>Insurance:</strong> We hold professional indemnity insurance (details available on request).</p>
    `
  }
]

export default function TermsAndConditions() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-liberty-secondary/20 to-liberty-base">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-liberty-primary/10 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-liberty-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-background mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto mb-4">
              Liberty Bell Ethical Enfranchisement Ltd
            </p>
            <p className="text-sm text-liberty-background/60">
              Company No: 16430826 | Effective: September 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-semibold text-liberty-background mb-4">Welcome</h2>
            <p className="text-liberty-background/80 leading-relaxed mb-4">
              These terms and conditions apply when you engage Liberty Bell Ethical Enfranchisement Ltd for 
              consultancy services. They form the basis of our agreement and prevail over any other terms.
            </p>
            <p className="text-liberty-background/80 leading-relaxed">
              By instructing us to proceed with our services, you confirm that you have read, understood, 
              and agreed to these terms. They constitute the entire agreement between us and supersede all 
              previous agreements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-12 bg-liberty-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-liberty-base border border-liberty-secondary/30 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-liberty-secondary/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-liberty-primary/10 text-liberty-primary rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-liberty-background text-left">
                      {section.title}
                    </h3>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-5 h-5 text-liberty-background/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-liberty-background/60" />
                  )}
                </button>
                
                {expandedSection === section.id && (
                  <div className="px-6 pb-6">
                    <div 
                      className="ml-14 text-liberty-background/70 leading-relaxed text-sm prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-liberty-background/60 mb-6">
              Have questions about our terms? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-liberty-primary hover:text-liberty-primary/80 font-medium transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Our Team
              </Link>
              <span className="text-liberty-background/40">|</span>
              <Link 
                href="/privacy" 
                className="inline-flex items-center gap-2 text-liberty-primary hover:text-liberty-primary/80 font-medium transition-colors"
              >
                <Lock className="w-5 h-5" />
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck,
  Cookie,
  Mail,
  Globe,
  AlertTriangle,
  Heart
} from 'lucide-react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: [
      "Personal Information: When you register or use our services, we collect information such as your name, email address, phone number, and property address.",
      "Property Information: Details about your building, including number of flats, management structure, and lease information to assess eligibility for RTM or enfranchisement.",
      "Usage Data: We automatically collect information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.",
      "Communications: Records of your correspondence with us, including emails, phone calls, and support tickets."
    ]
  },
  {
    icon: UserCheck,
    title: "2. How We Use Your Information",
    content: [
      "Service Delivery: To provide our RTM and enfranchisement advisory services, process eligibility checks, and manage your account.",
      "Communication: To send you important updates about your case, respond to inquiries, and provide customer support.",
      "Legal Compliance: To comply with legal obligations, respond to legal requests, and protect our rights and the rights of others.",
      "Improvement: To analyse usage patterns, improve our services, and develop new features that benefit leaseholders.",
      "Marketing: With your consent, to send you information about our services, legal updates, and educational content about leasehold reform."
    ]
  },
  {
    icon: Eye,
    title: "3. How We Share Your Information",
    content: [
      "Service Providers: We may share your information with trusted third parties who assist us in operating our website and delivering our services, subject to confidentiality agreements.",
      "Legal Requirements: We may disclose your information if required by law, court order, or governmental regulation.",
      "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the successor entity.",
      "With Your Consent: We will share your information with other parties only when you have given us explicit permission to do so.",
      "Aggregated Data: We may share anonymised, aggregated data that cannot identify you personally for research and statistical purposes."
    ]
  },
  {
    icon: Lock,
    title: "4. Data Security",
    content: [
      "We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.",
      "All data transmissions are encrypted using SSL/TLS technology to ensure your information remains secure during transfer.",
      "Access to personal data is restricted to authorised personnel who need the information to perform their duties.",
      "We regularly review and update our security practices to maintain the highest standards of data protection.",
      "Despite our efforts, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    ]
  },
  {
    icon: Globe,
    title: "5. Your Rights Under GDPR",
    content: [
      "Access: You have the right to request copies of your personal data we hold.",
      "Rectification: You can request that we correct any inaccurate or incomplete information.",
      "Erasure: You have the right to request deletion of your personal data under certain circumstances.",
      "Restriction: You can request that we restrict the processing of your personal data.",
      "Portability: You have the right to receive your data in a structured, commonly used format.",
      "Objection: You can object to our processing of your personal data for certain purposes.",
      "Automated Decision-Making: You have the right not to be subject to decisions based solely on automated processing."
    ]
  },
  {
    icon: Cookie,
    title: "6. Cookies and Tracking",
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our website.",
      "Essential Cookies: Required for the website to function properly and cannot be disabled.",
      "Analytics Cookies: Help us understand how visitors interact with our website to improve user experience.",
      "Preference Cookies: Remember your settings and preferences for future visits.",
      "You can control cookie settings through your browser preferences, though disabling certain cookies may affect website functionality."
    ]
  },
  {
    icon: Heart,
    title: "7. Children's Privacy",
    content: [
      "Our services are not intended for individuals under the age of 18.",
      "We do not knowingly collect personal information from children under 18.",
      "If we become aware that we have collected data from a child under 18, we will take steps to delete that information.",
      "Parents or guardians who believe we may have collected information from their child should contact us immediately."
    ]
  },
  {
    icon: AlertTriangle,
    title: "8. Data Retention",
    content: [
      "We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected.",
      "Account information is retained while your account is active and for a reasonable period thereafter.",
      "Legal records may be retained for longer periods as required by law or for legitimate business purposes.",
      "You can request deletion of your data at any time, subject to legal and contractual obligations.",
      "When data is no longer needed, it is securely deleted or anonymised."
    ]
  }
]

const dataController = {
  name: "Liberty Bell Limited",
  registration: "Company Registration Number: [To be provided]",
  ico: "ICO Registration Number: [To be provided]",
  address: "Registered Address: [To be provided]",
  email: "privacy@libertybell.co.uk",
  dpo: "Data Protection Officer: [Name to be provided]"
}

export default function PrivacyPolicy() {
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
                <Shield className="w-8 h-8 text-liberty-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-background mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-liberty-background/60">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-semibold text-liberty-background mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-liberty-background/80 leading-relaxed mb-4">
              Liberty Bell Ethical Enfranchisement ("Liberty Bell", "we", "us", or "our") is committed to protecting 
              your personal information and your right to privacy. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our website and services.
            </p>
            <p className="text-liberty-background/80 leading-relaxed">
              We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. 
              By using our services, you consent to the data practices described in this policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-12 bg-liberty-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-liberty-base border border-liberty-secondary/30 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-liberty-primary/10 text-liberty-primary rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-liberty-background flex-1">
                      {section.title}
                    </h3>
                  </div>
                  <div className="ml-14 space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-liberty-background/70 leading-relaxed text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Controller Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-primary/5 border border-liberty-primary/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-liberty-background mb-6">Data Controller Information</h2>
            
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-liberty-background/60 mb-1">Company Name</p>
                  <p className="font-medium text-liberty-background">{dataController.name}</p>
                </div>
                <div>
                  <p className="text-sm text-liberty-background/60 mb-1">Registration</p>
                  <p className="font-medium text-liberty-background">{dataController.registration}</p>
                </div>
                <div>
                  <p className="text-sm text-liberty-background/60 mb-1">ICO Registration</p>
                  <p className="font-medium text-liberty-background">{dataController.ico}</p>
                </div>
                <div>
                  <p className="text-sm text-liberty-background/60 mb-1">Data Protection Officer</p>
                  <p className="font-medium text-liberty-background">{dataController.dpo}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-liberty-primary/20">
                <p className="text-sm text-liberty-background/60 mb-1">Contact for Privacy Matters</p>
                <p className="font-medium text-liberty-background">{dataController.email}</p>
                <p className="text-sm text-liberty-background/70 mt-2">{dataController.address}</p>
              </div>
            </div>
          </motion.div>

          {/* Your Privacy Choices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-accent/10 border border-liberty-accent/30 rounded-lg p-8 mt-8"
          >
            <h2 className="text-2xl font-semibold text-liberty-background mb-6">Your Privacy Choices</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Exercising Your Rights</h3>
                <p className="text-liberty-background/70 text-sm leading-relaxed">
                  To exercise any of your data protection rights, please contact us at {dataController.email}. 
                  We will respond to your request within one month, as required by law.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Complaints</h3>
                <p className="text-liberty-background/70 text-sm leading-relaxed">
                  If you have concerns about how we handle your data, you have the right to lodge a complaint with 
                  the Information Commissioner's Office (ICO) at ico.org.uk or by calling 0303 123 1113.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Updates to This Policy</h3>
                <p className="text-liberty-background/70 text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-liberty-background/60 mb-6">
              Have questions about our privacy practices? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-liberty-primary text-liberty-base rounded-lg hover:bg-liberty-primary/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Privacy Team
              </Link>
              <Link 
                href="/terms" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-liberty-primary text-liberty-primary rounded-lg hover:bg-liberty-primary hover:text-liberty-base transition-colors"
              >
                View Terms & Conditions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

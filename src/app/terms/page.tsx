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
  Building
} from 'lucide-react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const sections = [
  {
    icon: FileText,
    title: "1. Services We Provide",
    content: [
      "Liberty Bell Ethical Enfranchisement provides advisory, consultation and project management services to leaseholders seeking to exercise their legal rights including Right to Manage (RTM) and Collective Enfranchisement.",
      "We offer eligibility assessments, legal process guidance, document preparation assistance, and ongoing support throughout your enfranchisement journey.",
      "Our services are subject to availability and may be modified, suspended, or discontinued at any time."
    ]
  },
  {
    icon: Users,
    title: "2. Your Responsibilities",
    content: [
      "You must provide accurate, complete, and current information when using our services.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
      "You agree to promptly notify us of any unauthorized use of your account or any security breach.",
      "You must have legal authority to act on behalf of your building or leaseholder group if claiming to represent them."
    ]
  },
  {
    icon: Scale,
    title: "3. Legal Disclaimer",
    content: [
      "Our services provide general information and guidance. We are not a law firm and do not provide legal advice.",
      "For specific legal matters, you should consult with qualified solicitors specialising in property law.",
      "We make no guarantees about the outcome of any RTM or enfranchisement process.",
      "Your use of our services does not create a solicitor-client relationship."
    ]
  },
  {
    icon: Shield,
    title: "4. Privacy & Data Protection",
    content: [
      "We process your personal data in accordance with our Privacy Policy and applicable data protection laws.",
      "By using our services, you consent to our collection and use of your information as described in our Privacy Policy.",
      "We implement appropriate technical and organisational measures to protect your personal data.",
      "You have rights regarding your personal data including access, rectification, and deletion as outlined in our Privacy Policy."
    ]
  },
  {
    icon: AlertCircle,
    title: "5. Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Liberty Bell shall not be liable for any indirect, incidental, special, or consequential damages.",
      "Our total liability for any claim arising from your use of our services shall not exceed the amount paid by you for those services.",
      "We are not responsible for delays or failures in performance resulting from causes beyond our reasonable control.",
      "These limitations apply regardless of the legal theory under which damages are sought."
    ]
  },
  {
    icon: Clock,
    title: "6. Termination",
    content: [
      "Either party may terminate the service agreement at any time with written notice.",
      "We reserve the right to suspend or terminate your access to our services for breach of these terms.",
      "Upon termination, your right to use our services will immediately cease.",
      "Provisions that by their nature should survive termination shall remain in effect."
    ]
  },
  {
    icon: Building,
    title: "7. Intellectual Property",
    content: [
      "All content, features, and functionality of our services are owned by Liberty Bell and protected by intellectual property laws.",
      "You may not copy, modify, distribute, or create derivative works based on our content without express written permission.",
      "Any feedback or suggestions you provide may be used by us without obligation to you.",
      "Your use of our services does not grant you any ownership rights to our intellectual property."
    ]
  },
  {
    icon: Mail,
    title: "8. Contact & Disputes",
    content: [
      "These terms are governed by the laws of England and Wales.",
      "Any disputes shall be resolved through good faith negotiation, and if necessary, through the courts of England and Wales.",
      "For questions about these terms, please contact us at legal@libertybell.co.uk.",
      "We may update these terms from time to time, and will notify you of material changes."
    ]
  }
]

export default function TermsAndConditions() {
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
              Please read these terms carefully before using Liberty Bell Ethical Enfranchisement services
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
            <h2 className="text-2xl font-semibold text-liberty-background mb-4">Welcome to Liberty Bell</h2>
            <p className="text-liberty-background/80 leading-relaxed mb-4">
              These Terms and Conditions ("Terms") govern your use of Liberty Bell Ethical Enfranchisement's 
              website, services, and platform (collectively, "Services"). By accessing or using our Services, 
              you agree to be bound by these Terms.
            </p>
            <p className="text-liberty-background/80 leading-relaxed">
              Liberty Bell Ethical Enfranchisement is operated by Liberty Bell Limited, a company registered 
              in England and Wales. Our mission is to empower leaseholders to take control of their buildings 
              through legal processes such as Right to Manage and Collective Enfranchisement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Additional Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-liberty-primary/5 border border-liberty-primary/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-liberty-background mb-6">Important Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Acceptance of Terms</h3>
                <p className="text-liberty-background/70 text-sm leading-relaxed">
                  By creating an account, submitting an eligibility check, or otherwise using our Services, 
                  you acknowledge that you have read, understood, and agree to be bound by these Terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Changes to Terms</h3>
                <p className="text-liberty-background/70 text-sm leading-relaxed">
                  We reserve the right to modify these Terms at any time. Material changes will be notified 
                  to registered users via email. Your continued use of our Services after such modifications 
                  constitutes acceptance of the updated Terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Severability</h3>
                <p className="text-liberty-background/70 text-sm leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision 
                  shall be limited or eliminated to the minimum extent necessary so that these Terms shall 
                  otherwise remain in full force and effect.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-liberty-background/60 mb-6">
              Have questions about our terms? We're here to help.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-liberty-primary hover:text-liberty-primary/80 font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Our Team
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

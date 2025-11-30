'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, PoundSterling, Clock, Building } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const faqCategories = [
  {
    id: 'general',
    title: 'General',
    icon: HelpCircle,
    color: 'text-liberty-accent',
    bgColor: 'bg-liberty-accent/10',
    borderColor: 'border-liberty-accent/30'
  },
  {
    id: 'costs',
    title: 'Costs & Fees',
    icon: PoundSterling,
    color: 'text-liberty-primary',
    bgColor: 'bg-liberty-primary/10',
    borderColor: 'border-liberty-primary/30'
  },
  {
    id: 'process',
    title: 'Process',
    icon: Clock,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'services',
    title: 'Services',
    icon: Building,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  }
]

const faqs = [
  // General
  {
    category: 'general',
    question: 'What makes Liberty Bell different from other managing agents?',
    answer: 'We\'re leaseholders ourselves who experienced years of poor management. We only manage buildings where leaseholders are in control, we don\'t take insurance commissions, and we genuinely put your interests first. If you\'re not happy after a year, we\'ll help you find another agent.'
  },
  {
    category: 'general',
    question: 'Do you only work with RTM or RMC buildings?',
    answer: 'We primarily work with buildings where leaseholders have a say—whether through a Right to Manage company, Resident Management Company, or a freeholder who genuinely involves leaseholders in decisions. We believe happy leaseholders make happy buildings.'
  },
  {
    category: 'general',
    question: 'What areas do you cover?',
    answer: 'We manage properties across England and Wales. Our team is equipped to handle buildings of various sizes, from small blocks to larger developments. Get in touch to discuss your specific location and requirements.'
  },
  // Costs & Fees
  {
    category: 'costs',
    question: 'How do your management fees work?',
    answer: 'Our fees are transparent and based on your building\'s actual needs. We assess each property individually and charge accordingly. Importantly, when issues are resolved and less management is needed, we reduce the fee—not increase it.'
  },
  {
    category: 'costs',
    question: 'Do you take commissions on insurance or contracts?',
    answer: 'No. Unlike many managing agents, we don\'t take commissions on building insurance or other contracts. Placing insurance is included in our management fee. This means we\'re incentivised to find you the best deal, not the one that pays us the most.'
  },
  {
    category: 'costs',
    question: 'How can you keep service charges lower?',
    answer: 'We bring 20 years of budgeting expertise and public sector procurement experience. We source services based on your priorities, provide detailed budgets before the financial year, and constantly review contracts to ensure value for money.'
  },
  // Process
  {
    category: 'process',
    question: 'How long does it take to switch managing agents?',
    answer: 'Typically, the transition takes 4-8 weeks depending on your current contract terms and the complexity of your building. We handle all the handover administration to make it as smooth as possible for you.'
  },
  {
    category: 'process',
    question: 'What happens during the transition?',
    answer: 'We\'ll review all existing contracts, obtain necessary documentation from your current agent, set up new systems, and introduce ourselves to residents. You\'ll have a dedicated building manager who\'ll be your main point of contact throughout.'
  },
  {
    category: 'process',
    question: 'Do we need to give notice to our current agent?',
    answer: 'Yes, you\'ll typically need to check your management agreement for notice periods—usually 1-3 months. We can help you review your contract and advise on the best approach to ensure a smooth transition.'
  },
  // Services
  {
    category: 'services',
    question: 'What does your building management service include?',
    answer: 'We cover all aspects: service charge budgeting, building maintenance, insurance placement, contractor management, health & safety compliance, and company secretarial services for RMCs/RTMs. We tailor our service to your building\'s specific needs.'
  },
  {
    category: 'services',
    question: 'How do you handle building maintenance and repairs?',
    answer: 'We maintain a network of trusted contractors and obtain competitive quotes for works. For larger projects, we follow proper procurement processes and keep leaseholders informed. Emergency repairs are handled promptly with 24/7 support available.'
  },
  {
    category: 'services',
    question: 'Can you help us set up an RTM company?',
    answer: 'While our sister company Liberty Bell Ethical Enfranchisement handles RTM formations, we work closely with them. Once your RTM is established, we can seamlessly take over the management. Contact us and we\'ll point you in the right direction.'
  }
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const categoryFaqs = faqs.filter(faq => faq.category === activeCategory)
  const activeColor = faqCategories.find(cat => cat.id === activeCategory)

  return (
    <section className="py-24 lg:py-32 bg-liberty-secondary/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-liberty-accent/10 text-liberty-accent px-4 py-2 rounded-full text-sm font-medium mb-6 border border-liberty-accent/20">
            <strong>FAQ</strong>
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-reckless font-bold !text-liberty-background mb-6">
            Frequently Asked{' '}
            <span className="!text-liberty-accent">Questions</span>
          </h2>
          <p className="text-lg lg:text-xl text-liberty-background/70 max-w-3xl mx-auto leading-relaxed">
            Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, get in touch.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {faqCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setExpandedQuestion(null)
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? `${category.bgColor} ${category.borderColor} ${category.color} border-2`
                  : 'bg-liberty-secondary/20 border-liberty-secondary/30 border-2 text-liberty-background/70 hover:bg-liberty-secondary/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-5 h-5" />
              <span className="font-medium">{category.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {categoryFaqs.map((faq, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ 
                    once: true,
                    margin: "-50px"
                  }}
                >
                  <Card className="border-liberty-secondary/30 hover:border-liberty-accent/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                        className="w-full text-left p-6 flex items-center justify-between"
                      >
                        <h3 className="font-reckless font-bold !text-liberty-background text-lg pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown 
                          className={`w-6 h-6 text-liberty-accent transition-transform duration-300 flex-shrink-0 ${
                            expandedQuestion === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedQuestion === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="border-t border-liberty-secondary/20 pt-6">
                                <p className="text-liberty-background/80 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

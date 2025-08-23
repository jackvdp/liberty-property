'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Clock, PoundSterling, Scale, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const faqCategories = [
  {
    id: 'basics',
    title: 'The Basics',
    icon: HelpCircle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'costs',
    title: 'Costs & Savings',
    icon: PoundSterling,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'process',
    title: 'The Process',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'legal',
    title: 'Legal & Requirements',
    icon: Scale,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
]

const faqs = [
  {
    category: 'basics',
    question: "What exactly is the difference between leasehold and commonhold?",
    answer: "With leasehold, you own your flat for a fixed period (the lease term) and pay ground rent to a freeholder. With commonhold, you own your flat forever (freehold) and collectively own the building with other flat owners. No ground rent, no reducing lease, no freeholder control.",
    educationalNote: "Think of leasehold as renting the right to own, while commonhold is true ownership."
  },
  {
    category: 'basics',
    question: "What is Right to Manage (RTM) and how is it different from buying the freehold?",
    answer: "RTM lets you take over building management without buying the freehold - you control repairs, maintenance, and service charges, but the freeholder still owns the building. Buying the freehold means you collectively own the building and can extend leases, eliminate ground rent, and have complete control.",
    educationalNote: "RTM is like being the building manager, while freehold ownership is like owning the entire building."
  },
  {
    category: 'basics',
    question: "Do I really need to get my neighbors involved?",
    answer: "Yes, for collective enfranchisement (buying the freehold) you need at least 50% of qualifying leaseholders to participate. For RTM, you also need 50%. For commonhold conversion, you need 100% agreement. This is a legal requirement, not our choice.",
    educationalNote: "The law requires collective action because you're dealing with shared ownership of common areas."
  },
  {
    category: 'costs',
    question: "How much does it actually cost to buy our freehold?",
    answer: "Costs vary significantly based on property values, lease lengths, and ground rents. Typically expect £3,000-£15,000 per flat for the freehold purchase price, plus professional fees. Our automated process reduces legal costs by 70% compared to traditional solicitors.",
    educationalNote: "The freeholder must be compensated for their loss of future ground rent and the building's value."
  },
  {
    category: 'costs',
    question: "What exactly am I saving by eliminating ground rent?",
    answer: "Ground rent often doubles every 10-25 years. A £300/year ground rent doubling every 15 years becomes £1,200 after 30 years, £4,800 after 45 years. Over 99 years, you could pay over £50,000 in ground rent alone - money that goes to the freeholder for nothing.",
    educationalNote: "Ground rent is profit for freeholders with no service provided - it's literally money for nothing."
  },
  {
    category: 'costs',
    question: "Will my property value actually increase?",
    answer: "Yes, properties with longer leases and no ground rent are worth more. Leases under 80 years face 'marriage value' costs for extensions. A flat with a 60-year lease might be worth 20-30% less than the same flat with a 999-year lease and no ground rent.",
    educationalNote: "Buyers pay more for properties they truly own rather than those with diminishing lease terms."
  },
  {
    category: 'process',
    question: "How long does the whole process take?",
    answer: "RTM typically takes 3-6 months, collective enfranchisement 6-12 months, and commonhold conversion 12-18 months. The timeline depends on freeholder cooperation, building complexity, and how quickly your group can organize and make decisions.",
    educationalNote: "Most time is spent on procedural requirements and waiting periods, not complex negotiations."
  },
  {
    category: 'process',
    question: "What if our freeholder refuses to cooperate?",
    answer: "They can't legally refuse if you meet the requirements. For RTM, they have limited grounds to object. For enfranchisement, they must sell at fair market value. If they're difficult, the First-tier Tribunal can determine fair terms and prices.",
    educationalNote: "These are legal rights, not requests - freeholders must comply with properly served notices."
  },
  {
    category: 'process',
    question: "What happens if some neighbors change their minds halfway through?",
    answer: "This is why we secure commitments early and use legally binding agreements. If you drop below 50% participation, you may need to restart. We help manage group dynamics and have strategies to maintain commitment throughout the process.",
    educationalNote: "Group organization is often the biggest challenge - more than the legal complexity."
  },
  {
    category: 'legal',
    question: "What buildings qualify for collective enfranchisement?",
    answer: "Buildings must contain at least 2 flats with long leases (over 21 years originally), and no more than 25% commercial space. At least 2/3 of flats must be held by qualifying tenants. Most residential buildings qualify, but mixed-use buildings might not.",
    educationalNote: "The law was designed to help residential leaseholders, not commercial property investors."
  },
  {
    category: 'legal',
    question: "Are there any risks involved in this process?",
    answer: "The main risks are financial (costs if the process fails) and group dynamics (neighbors dropping out). Legally, if you meet requirements and follow procedures correctly, success is virtually guaranteed. We provide legal protection and have a 94% success rate.",
    educationalNote: "Following proper procedures is crucial - this is why automation helps avoid costly mistakes."
  },
  {
    category: 'legal',
    question: "What ongoing responsibilities do we have after taking control?",
    answer: "You'll need to maintain the building, manage service charges, arrange insurance, and comply with safety regulations. You can hire managing agents or self-manage. The responsibilities are the same as any property owner - but now you control the costs and decisions.",
    educationalNote: "With control comes responsibility, but also the power to make decisions in your best interests."
  }
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('basics')
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const categoryFaqs = faqs.filter(faq => faq.category === activeCategory)
  const activeColor = faqCategories.find(cat => cat.id === activeCategory)

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-liberty-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-4">
            Your Questions <span className="text-liberty-accent">Answered</span>
          </h2>
          <p className="text-xl sm:text-2xl text-liberty-background/70 max-w-3xl mx-auto">
            Everything you need to know about transforming from leaseholder to commonholder
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
                        <h3 className="font-reckless font-bold text-liberty-background text-lg pr-4">
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
                                <p className="text-liberty-background/80 leading-relaxed mb-4">
                                  {faq.answer}
                                </p>
                                
                                {/* Educational Note */}
                                <div className={`${activeColor?.bgColor} ${activeColor?.borderColor} border-l-4 pl-4 py-3 rounded-r-lg`}>
                                  <div className="flex items-start gap-2">
                                    <AlertCircle className={`w-5 h-5 ${activeColor?.color} flex-shrink-0 mt-0.5`} />
                                    <div>
                                      <h4 className={`font-medium ${activeColor?.color} text-sm mb-1`}>
                                        Educational Insight
                                      </h4>
                                      <p className="text-liberty-background/70 text-sm">
                                        {faq.educationalNote}
                                      </p>
                                    </div>
                                  </div>
                                </div>
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
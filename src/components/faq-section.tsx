'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Clock, PoundSterling, Scale, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/data/home/content'

const faqCategories = [
  {
    id: 'basics',
    title: content.faq.categories[0].title,
    icon: HelpCircle,
    color: content.faq.categories[0].color,
    bgColor: content.faq.categories[0].bgColor,
    borderColor: content.faq.categories[0].borderColor
  },
  {
    id: 'costs',
    title: content.faq.categories[1].title,
    icon: PoundSterling,
    color: content.faq.categories[1].color,
    bgColor: content.faq.categories[1].bgColor,
    borderColor: content.faq.categories[1].borderColor
  },
  {
    id: 'process',
    title: content.faq.categories[2].title,
    icon: Clock,
    color: content.faq.categories[2].color,
    bgColor: content.faq.categories[2].bgColor,
    borderColor: content.faq.categories[2].borderColor
  },
  {
    id: 'legal',
    title: content.faq.categories[3].title,
    icon: Scale,
    color: content.faq.categories[3].color,
    bgColor: content.faq.categories[3].bgColor,
    borderColor: content.faq.categories[3].borderColor
  }
]

const faqs = content.faq.questions

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
            {content.faq.header.title.split(' ').slice(0, 2).join(' ')} <span className="text-liberty-accent">{content.faq.header.title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="text-xl text-liberty-background/70 max-w-3xl mx-auto">
            {content.faq.header.subtitle}
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
import Navbar from '@/components/navbar'
import { HeroMinimalCentered } from '@/components/heroes'
import ProblemSolution from '@/components/problem-solution'
import StatsSection from '@/components/stats-section'
import HowItWorks from '@/components/how-it-works'
import FAQSection from '@/components/faq-section'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'

export default function HeroMinimalCenteredPage() {
  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <HeroMinimalCentered />
      <ProblemSolution />
      <StatsSection />
      <HowItWorks />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  )
}

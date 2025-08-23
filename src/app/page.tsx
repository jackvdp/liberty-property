import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ProblemSolution from '@/components/problem-solution'
import PricingSection from '@/components/pricing-section'
import FAQSection from '@/components/faq-section'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <div className="min-h-screen bg-liberty-base">
        <Navbar />
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <PricingSection />
        <FAQSection />
        <ContactForm />
        <Footer />
    </div>
  )
}
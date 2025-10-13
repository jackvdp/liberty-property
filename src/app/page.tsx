import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ProblemSolution from '@/components/problem-solution'
import PricingSection from '@/components/pricing-section'
import FAQSection from '@/components/faq-section'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'
import HowItWorks from "@/components/how-it-works";
import WhyLibertyBell from "@/components/why-liberty-bell";
import ScrollEligibilityModal from '@/components/ui/scroll-eligibility-modal'
import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.home,
  canonicalUrl: '/',
});

export default function Home() {
  return (
    <div className="min-h-screen bg-liberty-base">
        <Navbar />
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <PricingSection />
        <WhyLibertyBell />
        <FAQSection />
        <ContactForm />
        <Footer />
        <ScrollEligibilityModal />
    </div>
  )
}
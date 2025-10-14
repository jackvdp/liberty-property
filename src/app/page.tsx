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
import { getCurrentUser } from '@/lib/actions/auth.actions'

export const metadata = generateSEOMetadata({
  ...seoConfig.home,
  canonicalUrl: '/',
});

export default async function Home() {
  // Check if user is logged in (server-side)
  const currentUser = await getCurrentUser();
  const isLoggedIn = !!currentUser;

  return (
    <div className="min-h-screen bg-liberty-base">
        <Navbar />
        <Hero isLoggedIn={isLoggedIn} />
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
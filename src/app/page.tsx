import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ProblemSolution from '@/components/problem-solution'
import StatsSection from '@/components/stats-section'
import HowItWorks from '@/components/how-it-works'

export default function Home() {
  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <StatsSection />
      <HowItWorks />
    </div>
  )
}
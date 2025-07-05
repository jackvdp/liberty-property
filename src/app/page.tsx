import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ProblemSolution from '@/components/problem-solution'

export default function Home() {
  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <Hero />
      <ProblemSolution />
    </div>
  )
}
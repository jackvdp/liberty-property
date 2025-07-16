import { siteConfig } from '@/config/site'
import { getHeroContent } from '@/content/heroes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Settings, Eye, Code } from 'lucide-react'

export default function HeroStatusPage() {
  const currentHero = getHeroContent(siteConfig.defaultHero)

  return (
    <div className="min-h-screen bg-liberty-base">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-liberty-background mb-4">
            Current Hero Configuration
          </h1>
          <p className="text-lg text-liberty-background/70">
            This is what's currently live on your homepage
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-liberty-background">
              Active Hero: {siteConfig.defaultHero}
            </h2>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <Link href="/hero-admin" className="flex items-center gap-2">
                  <Settings size={16} />
                  Manage
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Eye size={16} />
                  View Live
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Title</h3>
                <p className="text-liberty-background/80 bg-liberty-secondary/20 p-3 rounded">
                  {currentHero.title}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Description</h3>
                <p className="text-liberty-background/80 bg-liberty-secondary/20 p-3 rounded">
                  {currentHero.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Primary CTA</h3>
                <div className="bg-liberty-secondary/20 p-3 rounded">
                  <p className="font-medium">{currentHero.primaryCTA.text}</p>
                  <p className="text-sm text-liberty-background/60">{currentHero.primaryCTA.href}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-liberty-background mb-2">Secondary CTA</h3>
                <div className="bg-liberty-secondary/20 p-3 rounded">
                  <p className="font-medium">{currentHero.secondaryCTA.text}</p>
                  <p className="text-sm text-liberty-background/60">{currentHero.secondaryCTA.href}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-liberty-secondary/20 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-liberty-background mb-3 flex items-center gap-2">
            <Code size={16} />
            Configuration Code
          </h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{`// src/config/site.ts
export const siteConfig = {
  defaultHero: '${siteConfig.defaultHero}' as const,
  name: '${siteConfig.name}',
  description: '${siteConfig.description}',
  url: '${siteConfig.url}',
}`}</pre>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" asChild>
            <Link href="/hero-demo">
              View All Variants
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/hero-admin">
              Hero Management
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Back to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

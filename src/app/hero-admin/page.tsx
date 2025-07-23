'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { heroVariants } from '@/content/heroes'
import { Copy, CheckCircle, ExternalLink, Layout, Palette, Users } from 'lucide-react'

export default function HeroAdminPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyConfigCode = (heroId: string) => {
    const code = `// src/config/site.ts
export const siteConfig = {
  defaultHero: '${heroId}' as const,
  // ... other config
}`
    navigator.clipboard.writeText(code)
    setCopiedId(heroId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getVariantType = (id: string) => {
    const designFocused = ['split-screen', 'minimal-centered', 'video-background', 'card-overlay', 'diagonal-split']
    const leftAligned = ['left-aligned-happy', 'left-aligned-bold', 'left-aligned-soft']
    
    if (designFocused.includes(id)) return 'Design'
    if (leftAligned.includes(id)) return 'Left-Aligned'
    return 'Content'
  }

  const getVariantDescription = (id: string) => {
    const descriptions = {
      'original': 'Conservative, professional approach with scrolling image effects',
      'split-screen': 'Full-screen split with image right, text left, and creeping overlay',
      'minimal-centered': 'Centered design with full-screen background and elegant typography',
      'video-background': 'Video-style background with demo section and animated stats',
      'card-overlay': 'Card-based overlay design with feature highlights and testimonials',
      'diagonal-split': 'Diagonal split design with geometric shapes and modern layout',
      'left-aligned-happy': 'Left-aligned content with happy leaseholders image - success focused with green accents',
      'left-aligned-bold': 'High-impact dark theme with dramatic styling and uppercase text',
      'left-aligned-soft': 'Gentle, approachable design with soft gradients and rounded elements'
    }
    return descriptions[id as keyof typeof descriptions] || 'Custom hero variant'
  }

  return (
    <div className="min-h-screen bg-liberty-base">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-liberty-background mb-4">
            Hero Management Dashboard
          </h1>
          <p className="text-lg text-liberty-background/70">
            Preview and manage different hero variants for your website
          </p>
        </div>

        {/* Content vs Design Variants */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-liberty-secondary/20 px-4 py-2 rounded-full">
              <Palette className="text-liberty-accent" size={16} />
              <span className="text-sm font-medium text-liberty-background">Content Variants</span>
            </div>
            <div className="flex items-center gap-2 bg-liberty-accent/20 px-4 py-2 rounded-full">
              <Layout className="text-liberty-primary" size={16} />
              <span className="text-sm font-medium text-liberty-background">Design Variants</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <Users className="text-green-600" size={16} />
              <span className="text-sm font-medium text-green-700">Left-Aligned Variants</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {heroVariants.map((hero) => (
            <div key={hero.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-l-liberty-accent">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-liberty-background">
                        {hero.id.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')} Hero
                      </h2>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        getVariantType(hero.id) === 'Design' 
                          ? 'bg-liberty-accent/20 text-liberty-accent' 
                          : getVariantType(hero.id) === 'Left-Aligned'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-liberty-secondary/50 text-liberty-background'
                      }`}>
                        {getVariantType(hero.id)}
                      </span>
                    </div>
                    <p className="text-liberty-background/70 mb-4">
                      {getVariantDescription(hero.id)}
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Button
                        size="sm"
                        onClick={() => copyConfigCode(hero.id)}
                        className="flex items-center gap-2"
                      >
                        {copiedId === hero.id ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                        {copiedId === hero.id ? 'Copied!' : 'Copy Config'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a 
                          href={`/hero-${hero.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Preview
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-2">Title</h3>
                      <p className="text-liberty-background/80 bg-liberty-secondary/20 p-3 rounded">
                        {hero.title}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-2">Description</h3>
                      <p className="text-liberty-background/80 bg-liberty-secondary/20 p-3 rounded">
                        {hero.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-2">Primary CTA</h3>
                      <div className="bg-liberty-secondary/20 p-3 rounded">
                        <p className="font-medium">{hero.primaryCTA.text}</p>
                        <p className="text-sm text-liberty-background/60">{hero.primaryCTA.href}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-liberty-background mb-2">Secondary CTA</h3>
                      <div className="bg-liberty-secondary/20 p-3 rounded">
                        <p className="font-medium">{hero.secondaryCTA.text}</p>
                        <p className="text-sm text-liberty-background/60">{hero.secondaryCTA.href}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-liberty-background mb-2">Implementation Instructions</h3>
                  <ol className="text-sm text-liberty-background/80 space-y-1">
                    <li>1. Copy the config code above</li>
                    <li>2. Paste it into <code className="bg-gray-200 px-1 rounded">src/config/site.ts</code></li>
                    <li>3. Replace the existing <code className="bg-gray-200 px-1 rounded">defaultHero</code> value</li>
                    <li>4. Save the file - the homepage will automatically update</li>
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-liberty-secondary/20 rounded-lg">
          <h2 className="text-2xl font-bold text-liberty-background mb-4">
            Quick Links
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button variant="outline" asChild>
              <a href="/hero-demo" target="_blank" rel="noopener noreferrer">
                Interactive Demo
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-left-aligned-happy" target="_blank" rel="noopener noreferrer">
                Left Aligned Happy
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-left-aligned-bold" target="_blank" rel="noopener noreferrer">
                Left Aligned Bold
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-left-aligned-soft" target="_blank" rel="noopener noreferrer">
                Left Aligned Soft
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-split-screen" target="_blank" rel="noopener noreferrer">
                Split Screen
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-minimal-centered" target="_blank" rel="noopener noreferrer">
                Minimal Centered
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-video-background" target="_blank" rel="noopener noreferrer">
                Video Background
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-card-overlay" target="_blank" rel="noopener noreferrer">
                Card Overlay
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-diagonal-split" target="_blank" rel="noopener noreferrer">
                Diagonal Split
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/hero-original" target="_blank" rel="noopener noreferrer">
                Original
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

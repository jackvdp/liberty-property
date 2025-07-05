'use client'

import Link from 'next/link'
import { ArrowRight, Users, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Hero() {
  return (
    <section className="relative bg-liberty-base overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-liberty-secondary/30 via-liberty-base to-liberty-base"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 border-liberty-accent background-liberty-accent">
            End the Leasehold System
          </Badge>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-background mb-6">
            Turn Every Unhappy Leaseholder into a{' '}
            <span className="text-liberty-accent">Happy Commonholder</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-liberty-background/70 mb-8 max-w-3xl mx-auto">
            Through technology, transparency, and legal empowerment, we&#39;re building the future of property ownership.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
              <Link href="/get-started" className="flex items-center gap-2 group">
                Start Your Journey
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
              <Link href="/calculator">
                Calculate Your Savings
              </Link>
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-liberty-secondary/20 bg-liberty-base/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="bg-liberty-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-liberty-accent" size={32} />
                </div>
                <CardTitle className="text-2xl font-reckless font-bold text-liberty-background">
                  3.6M
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="text-liberty-background/70">
                  Unhappy Leaseholders
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-liberty-secondary/20 bg-liberty-base/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="bg-liberty-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="text-liberty-accent" size={32} />
                </div>
                <CardTitle className="text-2xl font-reckless font-bold text-liberty-background">
                  £1.2B
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="text-liberty-background/70">
                  Market Savings Potential
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-liberty-secondary/20 bg-liberty-base/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="bg-liberty-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="text-liberty-accent" size={32} />
                </div>
                <CardTitle className="text-2xl font-reckless font-bold text-liberty-background">
                  100%
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="text-liberty-background/70">
                  Legal Protection
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
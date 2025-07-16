export interface HeroContent {
  id: string
  title: string
  subtitle: string
  description: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
  backgroundImage: string
  backgroundImageAlt: string
}

export const heroVariants: HeroContent[] = [
  {
    id: "original",
    title: "Take Control of Your Property",
    subtitle: "Property",
    description: "We help frustrated leaseholders become empowered commonholders through technology, transparency, and real results.",
    primaryCTA: {
      text: "Find Out How",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "Get Your Commonhold Guide",
      href: "/commonhold-guide"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "aggressive",
    title: "End Leasehold Forever",
    subtitle: "Nightmare",
    description: "Skip the lawyers. Skip the paperwork. Skip the stress. Our AI-powered platform automates the entire journey from angry leaseholder to empowered commonholder.",
    primaryCTA: {
      text: "Start Your Revolution",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "Calculate Your Savings",
      href: "/calculator"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "data-driven",
    title: "Join 12,000+ Leaseholders Taking Control",
    subtitle: "Movement",
    description: "£2.3M saved for leaseholders this month. See real-time success stories and join the technology revolution ending leasehold forever.",
    primaryCTA: {
      text: "See Live Results",
      href: "/dashboard"
    },
    secondaryCTA: {
      text: "Join the Movement",
      href: "/get-started"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "split-screen",
    title: "Take Control of Your Property",
    subtitle: "Property",
    description: "We help frustrated leaseholders become empowered commonholders through technology, transparency, and real results.",
    primaryCTA: {
      text: "Find Out How",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "Get Your Guide",
      href: "/commonhold-guide"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "minimal-centered",
    title: "Your Property, Your Rules",
    subtitle: "Rules",
    description: "Simple technology that helps you take control.",
    primaryCTA: {
      text: "Get Started",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/how-it-works"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "video-background",
    title: "End Leasehold Forever",
    subtitle: "Forever",
    description: "Join the technology revolution that's freeing leaseholders across the UK.",
    primaryCTA: {
      text: "Start Your Journey",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "Watch Demo",
      href: "/demo"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "card-overlay",
    title: "Transform Your Property Experience",
    subtitle: "Experience",
    description: "Cutting-edge technology meets property law to give you complete control over your building.",
    primaryCTA: {
      text: "Get Started",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "See How",
      href: "/how-it-works"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "diagonal-split",
    title: "Break Free from Leasehold",
    subtitle: "Free",
    description: "Revolutionary technology that puts property control back in your hands.",
    primaryCTA: {
      text: "Join the Revolution",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/about"
    },
    backgroundImage: "/london.png",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  }
]

export const getHeroContent = (id: string): HeroContent => {
  const hero = heroVariants.find(h => h.id === id)
  if (!hero) {
    throw new Error(`Hero variant with id "${id}" not found`)
  }
  return hero
}

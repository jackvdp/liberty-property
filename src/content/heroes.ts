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
    backgroundImage: "/family.jpeg",
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
    backgroundImage: "/family.jpeg",
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
    backgroundImage: "/family.jpeg",
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
    backgroundImage: "/family.jpeg",
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
    backgroundImage: "/family.jpeg",
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
    backgroundImage: "/family.jpeg",
    backgroundImageAlt: "Modern apartment building representing property ownership freedom"
  },
  {
    id: "left-aligned-happy",
    title: "Finally, Take Control of Your Property",
    subtitle: "Property",
    description: "Join thousands of leaseholders who've broken free from ground rent and unfair charges. Our proven technology makes collective enfranchisement simple, fast, and affordable.",
    primaryCTA: {
      text: "Start Your Journey",
      href: "/get-started"
    },
    secondaryCTA: {
      text: "See Success Stories",
      href: "/success-stories"
    },
    backgroundImage: "/family.jpeg",
    backgroundImageAlt: "Happy leaseholders celebrating their property freedom"
  },
  {
    id: "left-aligned-bold",
    title: "Finally, Take Control of Your Property",
    subtitle: "Property",
    description: "Join thousands of leaseholders who've broken free from ground rent and unfair charges. Our proven technology makes collective enfranchisement simple, fast, and affordable.",
    primaryCTA: {
      text: "Start Your Journey", 
      href: "/get-started"
    },
    secondaryCTA: {
      text: "Watch Demo",
      href: "/demo"
    },
    backgroundImage: "/family.jpeg",
    backgroundImageAlt: "Happy leaseholders celebrating their property freedom"
  }
]

export const getHeroContent = (id: string): HeroContent => {
  const hero = heroVariants.find(h => h.id === id)
  if (!hero) {
    throw new Error(`Hero variant with id "${id}" not found`)
  }
  return hero
}

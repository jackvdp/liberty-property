// Site configuration
export const siteConfig = {
  // Change this to switch the hero on the main page
  // Options: 'original', 'aggressive', 'data-driven', 'simple', 'community', 
  //          'split-screen', 'minimal-centered', 'video-background', 'card-overlay', 'diagonal-split'
  defaultHero: 'original' as const,
  
  // Site metadata
  name: 'Liberty Property',
  description: 'Take control of your property',
  url: 'https://libertyproperty.com',
}

export type HeroVariant = 'original' | 'aggressive' | 'data-driven' | 'simple' | 'community' | 
                         'split-screen' | 'minimal-centered' | 'video-background' | 'card-overlay' | 'diagonal-split'

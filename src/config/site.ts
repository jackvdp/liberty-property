// Site configuration
export const siteConfig = {
  // Change this to switch the hero on the main page
  // Options: 'original', 'split-screen', 'minimal-centered', 'video-background', 
  //          'card-overlay', 'diagonal-split', 'left-aligned-happy', 'left-aligned-bold', 'left-aligned-soft'
  defaultHero: 'left-aligned-happy' as const,
  
  // Site metadata
  name: 'Liberty Property',
  description: 'Take control of your property',
  url: 'https://libertyproperty.com',
}

export type HeroVariant = 'original' | 'split-screen' | 'minimal-centered' | 'video-background' | 
                         'card-overlay' | 'diagonal-split' | 'left-aligned-happy' | 'left-aligned-bold' | 'left-aligned-soft'

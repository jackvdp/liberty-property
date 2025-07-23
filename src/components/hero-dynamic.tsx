import { siteConfig } from '@/config/site'
import { 
  HeroOriginal, 
  HeroSplitScreen,
  HeroMinimalCentered,
  HeroVideoBackground,
  HeroCardOverlay,
  HeroDiagonalSplit,
  HeroLeftAlignedHappy
} from '@/components/heroes'

const heroComponents = {
  'original': HeroOriginal,
  'split-screen': HeroSplitScreen,
  'minimal-centered': HeroMinimalCentered,
  'video-background': HeroVideoBackground,
  'card-overlay': HeroCardOverlay,
  'diagonal-split': HeroDiagonalSplit,
  'left-aligned-happy': HeroLeftAlignedHappy,
}

export default function HeroDynamic() {
  const HeroComponent = heroComponents[siteConfig.defaultHero]
  return <HeroComponent />
}

import { siteConfig } from '@/config/site'
import { 
  HeroOriginal, 
  HeroAggressive, 
  HeroDataDriven,
  HeroSplitScreen,
  HeroMinimalCentered,
  HeroVideoBackground,
  HeroCardOverlay,
  HeroDiagonalSplit
} from '@/components/heroes'

const heroComponents = {
  'original': HeroOriginal,
  'aggressive': HeroAggressive,
  'data-driven': HeroDataDriven,
  'split-screen': HeroSplitScreen,
  'minimal-centered': HeroMinimalCentered,
  'video-background': HeroVideoBackground,
  'card-overlay': HeroCardOverlay,
  'diagonal-split': HeroDiagonalSplit,
}

export default function HeroDynamic() {
  const HeroComponent = heroComponents[siteConfig.defaultHero]
  return <HeroComponent />
}

import { getHeroContent } from '@/content/heroes'
import HeroBase from './hero-base'

export default function HeroAggressive() {
  const content = getHeroContent('aggressive')
  return <HeroBase content={content} variant="aggressive" />
}

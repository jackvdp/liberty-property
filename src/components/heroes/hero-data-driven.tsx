import { getHeroContent } from '@/content/heroes'
import HeroBase from './hero-base'

export default function HeroDataDriven() {
  const content = getHeroContent('data-driven')
  return <HeroBase content={content} variant="data-driven" />
}

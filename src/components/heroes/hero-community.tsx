import { getHeroContent } from '@/content/heroes'
import HeroBase from './hero-base'

export default function HeroCommunity() {
  const content = getHeroContent('community')
  return <HeroBase content={content} variant="community" />
}

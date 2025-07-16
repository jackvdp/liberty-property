import { getHeroContent } from '@/content/heroes'
import HeroBase from './hero-base'

export default function HeroSimple() {
  const content = getHeroContent('simple')
  return <HeroBase content={content} variant="simple" />
}

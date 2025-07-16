import { getHeroContent } from '@/content/heroes'
import HeroBase from './hero-base'

export default function HeroOriginal() {
  const content = getHeroContent('original')
  return <HeroBase content={content} variant="original" />
}

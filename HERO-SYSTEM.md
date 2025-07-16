# Hero System Documentation

## Overview
The hero system allows you to easily switch between different hero designs and content without touching any code. All heroes use the same underlying components but with different styling and content.

## Quick Start

### 1. Change the Default Hero
Edit `src/config/site.ts` and change the `defaultHero` value:

```typescript
export const siteConfig = {
  defaultHero: 'split-screen', // Change this line
  // Options: 'original', 'aggressive', 'data-driven', 'simple', 'community',
  //          'split-screen', 'minimal-centered', 'video-background', 'card-overlay', 'diagonal-split'
}
```

### 2. Edit Hero Content
Edit `src/content/heroes.ts` to modify the text, CTAs, and other content:

```typescript
{
  id: "aggressive",
  title: "End Leasehold Forever", // Main headline
  subtitle: "Nightmare", // Highlighted word in title
  description: "Your description here...", // Subheadline
  primaryCTA: {
    text: "Start Your Revolution", // Primary button text
    href: "/get-started" // Primary button link
  },
  secondaryCTA: {
    text: "Calculate Your Savings", // Secondary button text
    href: "/calculator" // Secondary button link
  },
  backgroundImage: "/london.png", // Hero image
  backgroundImageAlt: "Alt text for image"
}
```

## Available Hero Variants

### Content-Focused Variants
These variants change messaging, colors, and tone while maintaining the same design structure:

### 1. Original (`original`)
- **Style**: Conservative, professional
- **Colors**: Liberty theme colors (blue/teal)
- **Message**: "Take Control of Your Property"
- **Tone**: Professional, trustworthy

### 2. Aggressive (`aggressive`)
- **Style**: Bold, confrontational
- **Colors**: Red theme
- **Message**: "End Leasehold Forever"
- **Tone**: Revolutionary, urgent

### 3. Data-Driven (`data-driven`)
- **Style**: Numbers-focused, social proof
- **Colors**: Green theme
- **Message**: "Join 12,000+ Leaseholders Taking Control"
- **Tone**: Evidence-based, community-focused

### 4. Simple (`simple`)
- **Style**: Clean, minimal
- **Colors**: Blue theme
- **Message**: "Your Property, Your Rules"
- **Tone**: Straightforward, easy

### 5. Community (`community`)
- **Style**: Supportive, inclusive
- **Colors**: Purple theme
- **Message**: "You're Not Alone in This Fight"
- **Tone**: Supportive, collaborative

### Design-Focused Variants
These variants change the visual layout and structure while maintaining professional messaging:

### 6. Split Screen (`split-screen`)
- **Layout**: Full-screen split with image right, text left
- **Features**: Text creeping over image, overlay card with benefits
- **Animation**: Smooth transitions and floating elements
- **Best For**: Modern, professional feel with strong visual impact

### 7. Minimal Centered (`minimal-centered`)
- **Layout**: Centered design with full-screen background
- **Features**: Elegant typography, scroll indicator, floating elements
- **Animation**: Subtle animations and smooth transitions
- **Best For**: Clean, sophisticated approach

### 8. Video Background (`video-background`)
- **Layout**: Two-column with animated background
- **Features**: Demo section, animated stats, video placeholder
- **Animation**: Scaling background, floating elements
- **Best For**: Technology-focused, dynamic presentation

### 9. Card Overlay (`card-overlay`)
- **Layout**: Main content with overlapping cards
- **Features**: Feature grid, testimonial cards, assessment card
- **Animation**: Staggered card animations
- **Best For**: Feature-rich presentation with social proof

### 10. Diagonal Split (`diagonal-split`)
- **Layout**: Diagonal split with geometric shapes
- **Features**: Benefits checklist, floating consultation card
- **Animation**: Geometric shapes, modern transitions
- **Best For**: Modern, cutting-edge design approach

## Testing Different Heroes

### Demo Page
Visit `/hero-demo` to see all hero variants side-by-side and switch between them interactively.

### Individual Pages
Each hero has its own page with the full homepage content:
- `/hero-original` - Original variant
- `/hero-aggressive` - Aggressive variant
- `/hero-data-driven` - Data-driven variant
- `/hero-simple` - Simple variant
- `/hero-community` - Community variant
- `/hero-split-screen` - Split screen variant
- `/hero-minimal-centered` - Minimal centered variant
- `/hero-video-background` - Video background variant
- `/hero-card-overlay` - Card overlay variant
- `/hero-diagonal-split` - Diagonal split variant

## File Structure

```
src/
├── components/
│   ├── heroes/
│   │   ├── hero-base.tsx          # Base hero component
│   │   ├── hero-original.tsx      # Original hero
│   │   ├── hero-aggressive.tsx    # Aggressive hero
│   │   ├── hero-data-driven.tsx   # Data-driven hero
│   │   ├── hero-simple.tsx        # Simple hero
│   │   ├── hero-community.tsx     # Community hero
│   │   └── index.ts               # Export all heroes
│   ├── hero-dynamic.tsx           # Dynamic hero using config
│   └── hero.tsx                   # Original hero (for backward compatibility)
├── content/
│   └── heroes.ts                  # Hero content configuration
├── config/
│   └── site.ts                    # Site configuration
└── app/
    ├── hero-demo/
    │   └── page.tsx               # Demo page
    ├── hero-aggressive/
    │   └── page.tsx               # Aggressive hero page
    ├── hero-data-driven/
    │   └── page.tsx               # Data-driven hero page
    ├── hero-simple/
    │   └── page.tsx               # Simple hero page
    ├── hero-community/
    │   └── page.tsx               # Community hero page
    └── page.tsx                   # Main homepage
```

## Adding New Hero Variants

### 1. Add Content
Add a new hero variant to `src/content/heroes.ts`:

```typescript
{
  id: "new-variant",
  title: "Your New Title",
  subtitle: "Highlight",
  description: "Your description...",
  primaryCTA: {
    text: "Button Text",
    href: "/link"
  },
  secondaryCTA: {
    text: "Secondary Button",
    href: "/link"
  },
  backgroundImage: "/your-image.jpg",
  backgroundImageAlt: "Alt text"
}
```

### 2. Add Styling
Add styling to `src/components/heroes/hero-base.tsx` in the `getVariantStyles()` function:

```typescript
case 'new-variant':
  return {
    gradient: 'from-orange-500/20 via-liberty-base to-liberty-base',
    titleColor: 'text-liberty-background',
    accentColor: 'text-orange-500',
    primaryButton: 'bg-orange-600 hover:bg-orange-700 text-white',
    secondaryButton: 'border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
  }
```

### 3. Create Component
Create `src/components/heroes/hero-new-variant.tsx`:

```typescript
import { getHeroContent } from '@/content/heroes'
import HeroBase from './hero-base'

export default function HeroNewVariant() {
  const content = getHeroContent('new-variant')
  return <HeroBase content={content} variant="new-variant" />
}
```

### 4. Update Exports
Add to `src/components/heroes/index.ts`:

```typescript
export { default as HeroNewVariant } from './hero-new-variant'
```

### 5. Update Config
Add the new variant to the type in `src/config/site.ts`:

```typescript
export type HeroVariant = 'original' | 'aggressive' | 'data-driven' | 'simple' | 'community' | 'new-variant'
```

## Best Practices

### Content Guidelines
1. Keep titles under 60 characters
2. Keep descriptions under 200 characters
3. Use action-oriented CTA text
4. Test all links work correctly

### Color Themes
Each variant uses a consistent color scheme:
- Primary color for buttons and accents
- Consistent with overall brand
- Good contrast for accessibility

### A/B Testing
Use the individual pages (`/hero-aggressive`, etc.) to:
- Test different variants with users
- Measure conversion rates
- Gather feedback on messaging

## Troubleshooting

### Hero Not Updating
1. Check `src/config/site.ts` has the correct `defaultHero` value
2. Restart the development server
3. Clear browser cache

### Content Not Showing
1. Verify the hero ID exists in `src/content/heroes.ts`
2. Check for typos in the ID
3. Ensure the content object is properly formatted

### Styling Issues
1. Check Tailwind classes are correct
2. Verify color variables are defined in `globals.css`
3. Test responsive behavior on different screen sizes

## Performance Notes
- All heroes share the same base component for consistency
- Images are optimized with Next.js Image component
- Animations use Framer Motion for smooth performance
- Content is statically generated for fast loading

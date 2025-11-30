# Liberty Bell Design System

Complete design system documentation for the Liberty Bell Ethical Enfranchisement platform.

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography](#2-typography)
3. [Card Styles](#3-card-styles)
4. [Button Styles](#4-button-styles)
5. [Form Elements](#5-form-elements)
6. [Badge Styles](#6-badge-styles)
7. [Alert Styles](#7-alert-styles)
8. [Animations](#8-animations)
9. [Spacing System](#9-spacing-system)
10. [Border & Shadow Styles](#10-border--shadow-styles)
11. [Focus & Interaction States](#11-focus--interaction-states)
12. [Responsive Breakpoints](#12-responsive-breakpoints)
13. [Component Dependencies](#13-component-dependencies)
14. [Quick Reference Patterns](#14-quick-reference-patterns)

---

## 1. Color Palette

### Brand Colors

| Name | Hex Value | CSS Variable | Usage |
|------|-----------|--------------|-------|
| **Primary** | `#456e9b` | `--color-liberty-primary` | Primary buttons, links, headers, icons |
| **Secondary** | `#dde4ed` | `--color-liberty-secondary` | Light backgrounds, borders, dividers |
| **Accent** | `#5ad2c7` | `--color-liberty-accent` | Highlights, badges, active states, CTAs |
| **Standard** | `#11151c` | `--color-liberty-standard` | Primary text color |
| **Background** | `#11151c` | `--color-liberty-background` | Dark backgrounds, main body text |
| **Base** | `#ffffff` | `--color-liberty-base` | White backgrounds, light surfaces |

### Usage Guidelines

```css
/* Primary actions and interactive elements */
bg-liberty-primary          /* Primary buttons */
text-liberty-primary        /* Primary text, links */
border-liberty-primary      /* Primary borders */
bg-liberty-primary/90       /* Hover state */
bg-liberty-primary/10       /* Subtle backgrounds */

/* Accent highlights */
text-liberty-accent         /* Highlighted text, badges */
bg-liberty-accent/10        /* Accent backgrounds */
border-liberty-accent/20    /* Accent borders */

/* Text hierarchy */
text-liberty-background     /* Primary body text */
text-liberty-background/70  /* Secondary text, descriptions */
text-liberty-background/60  /* Muted text, captions */

/* Surfaces */
bg-liberty-base             /* Primary background */
bg-liberty-base/95          /* Semi-transparent overlays */
border-liberty-secondary/30 /* Subtle dividers */
```

### Semantic Colors

```css
/* Success */
text-liberty-primary bg-liberty-primary/5 border-liberty-primary/20

/* Destructive/Error */
text-red-700 bg-red-50 border-red-200

/* Muted/Secondary text */
text-muted-foreground
```

---

## 2. Typography

### Font Families

| Font | Type | Usage |
|------|------|-------|
| **Inter** | Sans-serif | Body text, UI elements, descriptions |
| **Reckless** | Serif | Headings, display text, hero headlines |

### Font Imports

```css
/* Inter - Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

/* Reckless - Custom font files (located in /public/fonts/) */
/* Available weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) */
```

### CSS Variables

```css
--font-family-inter: 'Inter', sans-serif;
--font-family-reckless: 'Reckless', serif;
```

### Heading Styles

All headings use **Reckless serif** with weight 400:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Reckless', serif;
  font-weight: 400;
  color: #0f1115;
}
```

### Type Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 0.75rem | Extra small labels, fine print |
| `text-sm` | 0.875rem | Labels, descriptions, captions |
| `text-base` | 1rem | Default body text |
| `text-lg` | 1.125rem | Large body text |
| `text-xl` | 1.25rem | Section descriptions |
| `text-2xl` | 1.5rem | Card titles, subheadings |
| `text-3xl` | 1.875rem | Section headings |
| `text-4xl` | 2.25rem | Page titles (mobile) |
| `text-5xl` | 3rem | Hero text (tablet) |
| `text-6xl` | 3.75rem | Hero headlines (desktop) |

### Typography Patterns

```jsx
/* Hero headline - responsive sizing */
className="text-4xl lg:text-5xl xl:text-6xl font-reckless font-bold text-liberty-background"

/* Section description */
className="text-lg lg:text-xl text-liberty-background/70 leading-relaxed"

/* Card title */
className="text-2xl font-semibold"

/* Form labels */
className="text-sm font-medium leading-none"

/* Muted description */
className="text-muted-foreground text-sm"
```

---

## 3. Card Styles

### Base Card

```jsx
<Card>
  <CardHeader>
    <CardDescription>Label</CardDescription>
    <CardTitle>Title</CardTitle>
    <CardAction>
      <Badge>Action</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Footer */}
  </CardFooter>
</Card>
```

### Card Specifications

| Property | Value |
|----------|-------|
| Background | `bg-card` (white) |
| Border | Standard border |
| Border Radius | `rounded-xl` (0.75rem) |
| Shadow | `shadow-sm` |
| Vertical Padding | `py-6` |
| Internal Gap | `gap-6` |
| Horizontal Padding | `px-6` (header, content, footer) |

### Card Sub-components

```css
/* Card Container */
bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm

/* CardHeader */
grid auto-rows-min gap-1.5 px-6

/* CardTitle */
leading-none font-semibold

/* CardDescription */
text-muted-foreground text-sm

/* CardContent */
px-6

/* CardFooter */
flex items-center px-6

/* CardAction (positioned top-right) */
col-start-2 row-span-2 row-start-1 self-start justify-self-end
```

---

## 4. Button Styles

### Button Base

All buttons use `rounded-full` (pill shape).

```css
inline-flex items-center justify-center gap-2 whitespace-nowrap
rounded-full text-sm font-medium transition-all
disabled:pointer-events-none disabled:opacity-50
```

### Variants

| Variant | Styles |
|---------|--------|
| **default** | `bg-primary text-primary-foreground shadow-xs hover:bg-primary/90` |
| **destructive** | `bg-destructive text-white shadow-xs hover:bg-destructive/90` |
| **outline** | `border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground` |
| **secondary** | `bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80` |
| **ghost** | `hover:bg-accent hover:text-accent-foreground` |
| **link** | `text-primary underline-offset-4 hover:underline` |

### Sizes

| Size | Height | Padding |
|------|--------|---------|
| **sm** | `h-8` | `px-3 py-2` |
| **default** | `h-9` | `px-4 py-2` |
| **lg** | `h-10` | `px-6` |
| **xl** | `h-16` | `px-8 py-3` |
| **icon** | `size-9` | Square |

### Primary Button Example

```jsx
<Button
  size="xl"
  className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
>
  Get Started
</Button>
```

### Outline Button Example

```jsx
<Button
  size="xl"
  variant="outline"
  className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base"
>
  Learn More
</Button>
```

---

## 5. Form Elements

### Input Fields

```css
/* Base input */
border-input flex h-9 w-full rounded-md border bg-transparent
px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none

/* Focus state */
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]

/* Error state */
aria-invalid:ring-destructive/20 aria-invalid:border-destructive

/* Placeholder */
placeholder:text-muted-foreground
```

### Checkbox

```css
size-4 rounded-[4px] border shadow-xs transition-shadow outline-none
focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50
```

### Radio Button

```css
aspect-square size-4 rounded-full border shadow-xs
transition-[color,box-shadow] outline-none focus-visible:ring-[3px]
```

### Field Layout

```jsx
<FieldGroup> {/* flex flex-col gap-4 */}
  <Field> {/* flex flex-col gap-2 */}
    <Label>Label text</Label> {/* text-sm font-medium leading-none */}
    <Input />
    <FieldDescription>Help text</FieldDescription> {/* text-muted-foreground text-sm */}
    <FieldError>Error message</FieldError> {/* text-destructive text-sm font-medium */}
  </Field>
</FieldGroup>
```

---

## 6. Badge Styles

### Base Badge

```css
inline-flex items-center justify-center rounded-md border
px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap gap-1
```

### Variants

| Variant | Styles |
|---------|--------|
| **default** | `bg-primary text-primary-foreground` |
| **secondary** | `bg-secondary text-secondary-foreground` |
| **destructive** | `bg-destructive text-white` |
| **outline** | `text-foreground` (transparent bg) |

### Success Badge Pattern

```jsx
<span className="inline-flex items-center gap-2 bg-liberty-accent/10 text-liberty-accent px-4 py-2 rounded-full text-sm font-medium border border-liberty-accent/20">
  <CheckCircle size={16} />
  <strong>Success Message</strong>
</span>
```

---

## 7. Alert Styles

### Base Alert

```css
relative w-full rounded-lg border px-4 py-3 text-sm
```

### Variants

| Variant | Styles |
|---------|--------|
| **default** | `bg-card text-card-foreground` |
| **destructive** | `text-red-700 bg-red-50 border-red-200` |
| **success** | `text-liberty-primary bg-liberty-primary/5 border-liberty-primary/20` |
| **info** | `text-liberty-primary bg-liberty-primary/5 border-liberty-primary/20` |

### Usage Example

```jsx
<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your action was completed successfully.</AlertDescription>
</Alert>
```

---

## 8. Animations

### Framer Motion Patterns

#### Fade In + Slide Up (Staggered)

```jsx
// First element
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
/>

// Subsequent elements - add progressive delays
transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
```

#### Hero Image Animation

```jsx
<motion.div
  initial={{ opacity: 0, scale: 1.05 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
/>
```

#### Modal Animation (3D Spring)

```jsx
// Backdrop
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
/>

// Modal content
<motion.div
  initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
  animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
  exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
  transition={{ type: "spring", stiffness: 260, damping: 15 }}
/>
```

### Duration Guidelines

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 0.2s - 0.3s | Hover states, micro-interactions |
| Medium | 0.6s - 0.8s | Element entrances, transitions |
| Slow | 1.0s - 1.2s | Hero images, large elements |

### Delay Staggering

```
Element 1: 0s delay
Element 2: +0.1s
Element 3: +0.2s
Element 4: +0.3s
```

### CSS Transitions

```css
/* Standard hover transition */
transition-all duration-300

/* Color transitions */
transition-colors

/* Transform transitions */
transition-transform

/* Icon hover effects */
group-hover:translate-x-1 transition-transform
group-hover:scale-125 group-hover:rotate-3 transition duration-200
```

### Built-in Animations

```css
/* Spinner */
animate-spin

/* Skeleton loading */
animate-pulse
```

---

## 9. Spacing System

### Standard Gaps

| Class | Value | Usage |
|-------|-------|-------|
| `gap-1` | 0.25rem | Tight spacing |
| `gap-1.5` | 0.375rem | Compact elements |
| `gap-2` | 0.5rem | Default small gap |
| `gap-3` | 0.75rem | Medium gap |
| `gap-4` | 1rem | Standard gap |
| `gap-6` | 1.5rem | Section spacing |
| `gap-8` | 2rem | Large sections |

### Padding Patterns

```css
/* Form fields */
px-3 py-1

/* Cards */
px-6 py-6

/* Buttons */
px-4 py-2 (default)
px-8 py-3 (xl)

/* Modals */
p-8 md:p-10

/* Responsive container padding */
px-4 sm:px-6 lg:px-8
```

---

## 10. Border & Shadow Styles

### Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-md` | 0.375rem | Inputs, badges |
| `rounded-lg` | 0.5rem | Alerts, small cards |
| `rounded-xl` | 0.75rem | Cards |
| `rounded-2xl` | 1rem | Modals |
| `rounded-full` | 9999px | Buttons, avatars |

### Shadows

| Class | Usage |
|-------|-------|
| `shadow-xs` | Subtle depth (inputs, buttons) |
| `shadow-sm` | Cards |
| `shadow-2xl` | Modals, elevated elements |

### Backdrop Effects

```css
backdrop-blur-sm     /* Subtle blur */
backdrop-blur-10px   /* Modal overlays */
bg-black/50          /* Semi-transparent overlay */
```

---

## 11. Focus & Interaction States

### Focus Ring

```css
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]
```

### Disabled States

```css
disabled:pointer-events-none
disabled:opacity-50
disabled:cursor-not-allowed
```

### Error States

```css
aria-invalid:ring-destructive/20
aria-invalid:border-destructive
```

### Hover Patterns

```css
/* Buttons */
hover:bg-primary/90

/* Links */
hover:underline

/* Cards/surfaces */
hover:bg-accent hover:text-accent-foreground

/* Scale effect */
hover:scale-105
```

---

## 12. Responsive Breakpoints

### Tailwind Breakpoints

| Prefix | Min Width |
|--------|-----------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

### Container Queries

```css
@container/card    /* Card-aware responsive */
@xl/main           /* Named container queries */
```

### Responsive Typography Example

```jsx
className="text-4xl lg:text-5xl xl:text-6xl"
```

### Responsive Layout Example

```jsx
className="flex flex-col sm:flex-row gap-4"
className="w-full lg:w-1/2"
className="hidden lg:block lg:w-2/3"
```

---

## 13. Component Dependencies

### Libraries Used

| Library | Purpose |
|---------|---------|
| **shadcn/ui** | Headless UI components |
| **Radix UI** | Accessible primitives |
| **Framer Motion** | Animations |
| **Class Variance Authority (CVA)** | Variant management |
| **clsx + tailwind-merge** | Class utilities |
| **Lucide React** | Icons |
| **Tabler Icons** | Additional icons |

### Utility Function

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 14. Quick Reference Patterns

### Hero Section

```jsx
<section className="bg-liberty-base">
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-4xl lg:text-5xl xl:text-6xl font-reckless font-bold text-liberty-background"
  >
    Headline <span className="text-liberty-accent">Highlight</span>
  </motion.h1>
</section>
```

### Primary CTA Button

```jsx
<Button
  size="xl"
  className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
>
  <Link href="/action" className="flex items-center gap-3 group">
    Call to Action
    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
  </Link>
</Button>
```

### Success Badge

```jsx
<div className="inline-flex items-center gap-2 bg-liberty-accent/10 text-liberty-accent px-4 py-2 rounded-full text-sm font-medium border border-liberty-accent/20">
  <CheckCircle size={16} />
  <strong>Achievement</strong>
</div>
```

### Standard Card

```jsx
<Card>
  <CardHeader>
    <CardTitle className="text-2xl font-semibold">Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Animated Page Section

```jsx
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="px-4 sm:px-6 lg:px-8 py-16"
>
  {/* Section content */}
</motion.section>
```

### Form Field

```jsx
<Field>
  <Label>Email Address</Label>
  <Input
    type="email"
    placeholder="you@example.com"
  />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>
```

---

## File Locations

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Global styles, CSS variables, font imports |
| `tailwind.config.mjs` | Tailwind configuration |
| `src/components/ui/` | All UI component definitions |
| `src/lib/utils.ts` | `cn()` utility function |
| `public/fonts/` | Custom Reckless font files |

# Typography System Documentation

## Overview

The SabPaisa COB platform uses a comprehensive typography system built on design tokens from the SabPaisa Design System. This ensures consistency across all components and pages.

## Design Tokens

### Font Families

```css
--font-heading: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-body: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-mono: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace
```

**Tailwind Usage:**
- `font-heading` - For headings and titles
- `font-body` - For body text and paragraphs
- `font-mono` - For code blocks and monospace text

### Font Sizes

```css
--font-size-xs: 0.75rem    (12px)
--font-size-sm: 0.875rem   (14px)
--font-size-base: 1rem     (16px)
--font-size-lg: 1.125rem   (18px)
--font-size-xl: 1.25rem    (20px)
--font-size-2xl: 1.5rem    (24px)
--font-size-3xl: 1.875rem  (30px)
--font-size-4xl: 2.25rem   (36px)
--font-size-5xl: 3rem      (48px)
```

**Tailwind Usage:** `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`

### Font Weights

```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
--font-weight-extrabold: 800
```

**Tailwind Usage:** `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`

### Line Heights

```css
--line-height-none: 1
--line-height-tight: 1.25
--line-height-snug: 1.375
--line-height-normal: 1.5
--line-height-relaxed: 1.625
--line-height-loose: 2
```

**Tailwind Usage:** `leading-none`, `leading-tight`, `leading-snug`, `leading-normal`, `leading-relaxed`, `leading-loose`

### Letter Spacing

```css
--letter-spacing-tighter: -0.05em
--letter-spacing-tight: -0.025em
--letter-spacing-normal: 0em
--letter-spacing-wide: 0.025em
--letter-spacing-wider: 0.05em
--letter-spacing-widest: 0.1em
```

**Tailwind Usage:** `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-wider`, `tracking-widest`

## Typography Utility Classes

Pre-built utility classes for common text styles:

### Headings

```css
.heading-1  /* 3rem (48px), bold, tight line-height, tight tracking */
.heading-2  /* 2.25rem (36px), bold, tight line-height, tight tracking */
.heading-3  /* 1.875rem (30px), semibold, snug line-height */
.heading-4  /* 1.5rem (24px), semibold, snug line-height */
.heading-5  /* 1.25rem (20px), medium, normal line-height */
.heading-6  /* 1.125rem (18px), medium, normal line-height */
```

**HTML/JSX Example:**
```jsx
<h1 className="heading-1">Welcome to SabPaisa</h1>
<h2 className="heading-2">Merchant Onboarding</h2>
```

### Body Text

```css
.body-large  /* 1.125rem (18px), normal weight, relaxed line-height */
.body-base   /* 1rem (16px), normal weight, normal line-height */
.body-small  /* 0.875rem (14px), normal weight, normal line-height */
```

**HTML/JSX Example:**
```jsx
<p className="body-base">This is standard body text.</p>
<p className="body-large">This is larger body text for emphasis.</p>
<p className="body-small">This is smaller supporting text.</p>
```

### Labels & Captions

```css
.caption  /* 0.75rem (12px), normal weight, wide tracking */
.label    /* 0.875rem (14px), medium weight, wide tracking, uppercase */
```

**HTML/JSX Example:**
```jsx
<label className="label">Email Address</label>
<span className="caption">Required field</span>
```

### Code

```css
.code-inline  /* monospace, small, with background */
.code-block   /* monospace, small, with background and padding */
```

**HTML/JSX Example:**
```jsx
<code className="code-inline">npm install</code>

<pre className="code-block">
  const greeting = "Hello World";
  console.log(greeting);
</pre>
```

### Text Styling

```css
.text-emphasis  /* semibold weight */
.text-subtle    /* muted color (neutral-600/400) */
```

**HTML/JSX Example:**
```jsx
<p>This is <span className="text-emphasis">important</span> information.</p>
<p className="text-subtle">This is less important information.</p>
```

### Links

```css
.link         /* primary color, underlined, with hover effect */
.link-subtle  /* neutral color, no underline, primary on hover */
```

**HTML/JSX Example:**
```jsx
<a href="#" className="link">Primary Link</a>
<a href="#" className="link-subtle">Subtle Link</a>
```

## Typography Component

For React components, use the `Typography` component for type-safe, reusable typography:

### Import

```tsx
import Typography from '@/components/ui/Typography';
```

### Props

```typescript
interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' |
            'body-large' | 'body-base' | 'body-small' |
            'caption' | 'label';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  className?: string;
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'subtle' |
          'error' | 'success' | 'warning';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}
```

### Usage Examples

#### Basic Headings

```tsx
<Typography variant="h1">Main Page Title</Typography>
<Typography variant="h2">Section Heading</Typography>
<Typography variant="h3">Subsection Title</Typography>
```

#### Custom Element with Variant Style

```tsx
{/* Render as div but styled as h2 */}
<Typography variant="h2" as="div">
  Styled like H2 but semantic div
</Typography>
```

#### Colored Text

```tsx
<Typography variant="body-base" color="primary">
  Primary colored text
</Typography>

<Typography variant="body-base" color="error">
  Error message
</Typography>

<Typography variant="body-base" color="subtle">
  Subtle secondary text
</Typography>
```

#### Aligned Text

```tsx
<Typography variant="h3" align="center">
  Centered Heading
</Typography>

<Typography variant="body-base" align="justify">
  Justified paragraph text that will be evenly distributed.
</Typography>
```

#### Custom Weight

```tsx
<Typography variant="body-base" weight="bold">
  Bold body text
</Typography>

<Typography variant="h4" weight="normal">
  Normal weight heading
</Typography>
```

#### Combined Props

```tsx
<Typography
  variant="h2"
  color="primary"
  align="center"
  weight="extrabold"
  className="mb-8"
>
  Welcome to SabPaisa COB
</Typography>
```

## Best Practices

### 1. Use Semantic HTML

Always prefer semantic HTML elements:
```tsx
// Good
<Typography variant="h1" as="h1">Page Title</Typography>

// Avoid (unless necessary)
<Typography variant="h1" as="div">Page Title</Typography>
```

### 2. Maintain Hierarchy

Use heading levels in order (h1 → h2 → h3, etc.):
```tsx
<Typography variant="h1">Main Title</Typography>
  <Typography variant="h2">Section</Typography>
    <Typography variant="h3">Subsection</Typography>
```

### 3. Use Design Tokens

Prefer using Tailwind classes with design tokens:
```tsx
// Good
<p className="font-body text-base leading-normal">Text</p>

// Avoid arbitrary values
<p className="font-['Arial'] text-[15px] leading-[1.4]">Text</p>
```

### 4. Consistent Spacing

Use typography with consistent spacing:
```tsx
<Typography variant="h2" className="mb-4">Title</Typography>
<Typography variant="body-base" className="mb-6">Paragraph</Typography>
```

### 5. Accessibility

- Ensure proper color contrast (use `color="subtle"` for secondary text)
- Use appropriate font sizes (minimum 14px for body text)
- Maintain readable line lengths (45-75 characters per line)

## Color Variants

The Typography component supports these color variants:

- `default`: Standard text color (neutral-900/100)
- `primary`: Brand primary color (primary-600/400)
- `secondary`: Secondary brand color (secondary-600/400)
- `subtle`: Muted text color (neutral-600/400)
- `error`: Error state (red-600/400)
- `success`: Success state (green-600/400)
- `warning`: Warning state (orange-600/400)

All colors include dark mode support.

## Responsive Typography

Use Tailwind's responsive prefixes for adaptive typography:

```tsx
<Typography
  variant="h1"
  className="text-3xl md:text-4xl lg:text-5xl"
>
  Responsive Heading
</Typography>
```

## Examples in Context

### Form Labels

```tsx
<div className="mb-4">
  <Typography variant="label" as="label" htmlFor="email">
    Email Address
  </Typography>
  <input id="email" type="email" className="..." />
  <Typography variant="caption" color="subtle">
    We'll never share your email
  </Typography>
</div>
```

### Card Header

```tsx
<div className="card">
  <Typography variant="h3" className="mb-2">
    Transaction Summary
  </Typography>
  <Typography variant="body-small" color="subtle" className="mb-4">
    Last updated 5 minutes ago
  </Typography>
  {/* Card content */}
</div>
```

### Status Messages

```tsx
<Typography variant="body-base" color="success">
  ✓ Payment successful
</Typography>

<Typography variant="body-base" color="error">
  ✗ Transaction failed
</Typography>

<Typography variant="body-base" color="warning">
  ⚠ Verification pending
</Typography>
```

## CSS Variables Reference

All typography tokens are available as CSS variables:

```css
/* In your custom CSS */
.custom-class {
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
```

## Migration Guide

If you have existing typography, here's how to migrate:

### Before

```tsx
<h1 className="text-4xl font-bold">Title</h1>
<p className="text-base">Body text</p>
```

### After (Option 1: Utility Classes)

```tsx
<h1 className="heading-1">Title</h1>
<p className="body-base">Body text</p>
```

### After (Option 2: Component)

```tsx
<Typography variant="h1">Title</Typography>
<Typography variant="body-base">Body text</Typography>
```

## Support

For questions or issues with the typography system:
- Check the [SabPaisa Design System](../sabpaisa-design-system.json)
- Review component examples in `/src/components/ui/Typography.tsx`
- Consult the Tailwind config at `/tailwind.config.js`

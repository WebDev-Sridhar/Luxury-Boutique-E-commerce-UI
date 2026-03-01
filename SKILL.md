# Luxury Boutique E-Commerce Design System
Version 1.0

---

# 1. Brand Philosophy

This brand represents:

- Curated elegance
- Soft femininity
- Editorial luxury
- Minimal sophistication
- Timeless over trendy

The UI must feel:

- Spacious
- Intentional
- Balanced
- Calm
- Premium
- Refined

Avoid:
- Loud UI
- Bright colors
- Heavy gradients
- Thick borders
- Over-animations
- Crowded layouts

---

# 2. Color System

## Primary Palette (Light Neutral Luxury)

| Token | Color | Usage |
|-------|--------|--------|
| --ivory | #F8F6F2 | Main background |
| --warm-white | #F2EFEA | Section background |
| --taupe | #B8AFA6 | Subtle accents |
| --muted-blush | #E8D8D4 | Soft highlight backgrounds |
| --soft-beige | #D9CFC4 | Cards / UI layers |

## Typography Colors

| Token | Color |
|--------|--------|
| --text-primary | #2E2A27 |
| --text-secondary | #6B645E |
| --divider | #E5E1DC |

## Interaction Colors

| Token | Color |
|--------|--------|
| --hover-dark | #1F1C1A |
| --hover-light | #EFEAE5 |

Never use pure black (#000000).  
Use deep charcoal instead.

---

# 3. Typography System

## Font Pairing

### Headings (Serif – Editorial)
- Playfair Display
- Cormorant Garamond
- Canela-style serif

Used for:
- Hero titles
- Section headings
- Collection titles
- Testimonials
- Editorial quotes

### Body (Sans Serif – Clean & Modern)
- Inter
- Helvetica Neue
- Neue Haas Grotesk style

---

## Typography Scale

| Element | Size | Weight | Letter Spacing |
|----------|------|--------|----------------|
| Hero Title | 56–72px | 500 | -0.02em |
| Section Heading | 36–44px | 500 | -0.01em |
| Subheading | 20–24px | 400 | 0 |
| Body Large | 18px | 400 | 0 |
| Body Regular | 16px | 400 | 0 |
| Caption | 13–14px | 400 | 0.05em uppercase |

Line height: 1.6 – 1.8

---

# 4. Spacing System

Luxury equals space.

Base 8px scale:

8px  
16px  
24px  
32px  
48px  
64px  
96px  
128px  

Section Padding:
- Desktop: 96px–128px (top & bottom)
- Mobile: 64px

Product Grid Gap:
- 32px–48px

Never compress layout.

---

# 5. Global Layout Rules

- Max width: 1400px
- Centered container
- Large outer margins
- Strong vertical rhythm
- Generous whitespace
- No visual clutter

---

# 6. Component Styling

---

## Navigation Bar

- Height: 80px (desktop)
- Centered logo
- Minimal menu (Shop, Collections, About, Journal, Contact)
- Thin bottom divider
- Transparent over hero
- Sticky with subtle background fade

Hover:
- Soft fade
- Thin underline animation (1px)

---

## Hero Section

- Full-width high-quality fashion imagery
- Minimal overlay text
- Elegant serif heading
- No bulky buttons

CTA:
- Text link with underline
OR
- Thin bordered button (1px only)

---

## Product Cards

Structure:
- Image
- Product name
- Price
- Optional color swatch

Styling:
- No heavy borders
- Subtle shadow only
- Generous spacing

Hover:
- Image scale: 1.02
- Fade to secondary image
- Transition: 0.4s ease

Avoid:
- Bright hover colors
- Heavy shadows

---

## Product Grid

- 3–4 columns desktop
- 2 columns tablet
- 1 column mobile
- Large spacing
- No clutter

---

## Featured Collection Section

- Editorial layout
- 50/50 image and text
OR
- Large full-width image with minimal overlay

Typography:
- Serif
- Spacious

---

## Testimonials Section

- Centered magazine-style quote
- Serif italic
- Large quotation marks
- Minimal attribution
- No boxed layout

---

## About Page

- Editorial storytelling layout
- Large portrait imagery
- Soft taupe background sections
- Serif section headings
- Generous whitespace

Avoid corporate layout style.

---

## Shop Page

- Minimal filter sidebar
- Thin dividers
- Clean dropdowns
- Elegant category headers

---

## Collections Page

- Grid or editorial block layout
- Large banner per collection
- Minimal text
- Strong typography hierarchy

---

## Product Detail Page

Layout:
- 2-column desktop
- Large image gallery
- Spacious details panel

Add to Cart Button:
- Soft taupe background
- No bright color
- Subtle hover darken

Dividers:
- Thin only (1px)

---

## Cart Page

- Clean summary layout
- Minimal quantity controls
- Elegant typography
- Thin dividers
- No harsh boxed UI

---

## Sign In / Sign Up

- Centered minimal card
- Soft neutral background
- Serif heading
- Thin input borders
- Subtle focus states
- No heavy shadows

---

## Journal Page

- Editorial layout
- Large feature article
- Clean blog grid
- Serif headings
- Muted secondary text tones

---

## Footer

- 3–4 column layout
- Minimal social icons
- Simple newsletter input
- Soft ivory or taupe background
- Thin top divider
- No dark heavy footer

---

# 7. Interaction Rules

Transitions:
transition: all 0.3s ease;

Image Hover:
- Slight scale
- Fade secondary image

Links:
- Underline animation
- Soft darken on hover

Avoid:
- Bounce effects
- Fast animations
- Flashy UI behavior

---

# 8. Button System

Primary Button:
- Soft taupe background
- Charcoal text
- Border radius max 6px
- Generous padding

Secondary Button:
- Transparent
- 1px border
- Soft hover background

Text Button:
- Underlined text only

---

# 9. Shadows

Soft shadow only:
0 4px 20px rgba(0,0,0,0.04)

No dramatic elevation.

---

# 10. Borders

- Maximum 1px
- Color: var(--divider)
- No thick outlines

---

# 11. Responsiveness

Mobile:
- Maintain whitespace
- Scale typography proportionally
- Avoid cramped stacking
- Preserve elegance

---

# 12. Motion Philosophy

Motion must feel:

- Calm
- Smooth
- Slow
- Sophisticated

Duration:
300–400ms

Easing:
ease  
or  
cubic-bezier(0.4, 0, 0.2, 1)

---

# 13. Image Direction

Photography style:

- Soft natural lighting
- Beige/neutral tones
- Minimal backgrounds
- Editorial framing
- High resolution
- Calm atmosphere

Avoid:
- Harsh studio lighting
- Bright pop colors
- Cluttered scenes

---

# 14. Design Checklist Before Shipping

- Is there enough breathing room?
- Is typography elegant?
- Are interactions subtle?
- Does it feel curated?
- Is it visually balanced?
- Does it feel premium?

If yes → ready to ship.

---

End of Design System
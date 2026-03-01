# Luxury Boutique Animation System
Version 1.0

---

# 1. Motion Philosophy

Luxury motion is:

- Calm
- Slow
- Intentional
- Subtle
- Refined
- Almost invisible

If the animation is noticeable, it is too strong.

This is fashion luxury — not tech startup energy.

---

# 2. Global Motion Rules

## Duration

Short: 200ms  
Standard: 300ms  
Elevated transitions: 400–500ms  

Never exceed 600ms.

---

## Easing

Primary easing:
cubic-bezier(0.4, 0, 0.2, 1)

Alternative:
ease

Never use:
- bounce
- elastic
- overshoot
- springy playful effects

---

## Transition Base Rule

Use:

transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

Avoid multiple competing animations.

---

# 3. Navigation Animations

## Nav Background Fade (On Scroll)

Effect:
- Transparent → Soft ivory background
- Smooth fade
- No slide-down effect

Duration:
300ms

---

## Menu Hover

Effect:
- Underline appears from center outward
OR
- Soft opacity shift

Underline:
1px height
Color: text-primary

Duration:
250–300ms

---

# 4. Hero Section Animations

Hero content must feel cinematic, not dramatic.

## Fade In Sequence

1. Image loads
2. Slight fade in (opacity 0 → 1)
3. Heading fades + slight upward motion (10px)
4. CTA fades last

Timing:
- Stagger delay: 100ms between elements
- Total sequence: under 800ms

Avoid:
- Slide from left/right aggressively
- Large motion distances

Motion distance:
Max 20px

---

# 5. Product Card Animations

## Hover Effects

Primary Hover:
- Image scale: 1 → 1.02
- Secondary image fade in
- Very soft shadow increase

Duration:
350–400ms

Never:
- Scale beyond 1.05
- Add glow effects
- Add border flashes

---

## Quick Add Button (Optional)

If used:
- Fade in gently on hover
- Opacity 0 → 1
- No sliding pop animation

---

# 6. Page Transition System

Page transitions should feel editorial.

Recommended:

Fade + slight vertical movement

Initial:
opacity: 0
translateY: 12px

Final:
opacity: 1
translateY: 0

Duration:
400ms

If using React (Framer Motion):

Use easeOut style curves only.

Avoid:
- Swipe transitions
- Dramatic sliding panels

---

# 7. Button Interaction

## Hover

- Background slightly darkens
- OR subtle opacity shift

No:
- Color change to bold tone
- No jump effect

## Active (Click)

- Very slight scale: 0.98
- Duration: 100ms

Must feel soft and tactile.

---

# 8. Scroll Reveal System

Sections can fade in when entering viewport.

Rules:

- Fade + translateY 20px
- Duration 400ms
- Once only (no repeat on scroll)

Stagger children:
80–120ms delay

Do NOT animate every small element.
Only animate:
- Section blocks
- Featured images
- Editorial text blocks

---

# 9. Image Gallery Animations (Product Page)

## Thumbnail Click

- Main image cross-fade
- No zoom snap
- Duration 300ms

## Image Zoom (Optional)

If zoom enabled:
- Smooth scale
- No aggressive zoom
- No jarring transform origin jumps

---

# 10. Cart & Panel Animations

If cart drawer is used:

Animation:
- Fade + slide from right (20px max)
- Duration 350ms
- Backdrop fade softly

Avoid:
- Fast panel slide
- Bounce overshoot

---

# 11. Modal Animations (Sign In / Filters)

Effect:
- Backdrop fade
- Modal fade + slight upward motion (10px)

Duration:
300ms

No scaling pop animation.

---

# 12. Micro-Interaction Guidelines

Links:
- Underline expand animation
- Subtle color darken

Inputs:
- Border color soften on focus
- No glow
- No strong blue highlight

Checkbox:
- Smooth fade fill
- No bounce

---

# 13. Shadow Motion

Shadow may slightly increase on hover.

Example:
Normal: 0 4px 20px rgba(0,0,0,0.04)
Hover: 0 6px 25px rgba(0,0,0,0.06)

Difference must be subtle.

---

# 14. Performance Rules

All animations must:

- Use transform and opacity only
- Avoid animating height or width
- Avoid layout shifts
- Maintain 60fps

Luxury must feel smooth, not heavy.

---

# 15. What to Avoid (Critical)

Never use:

- Bounce
- Elastic easing
- Typewriter effects
- Parallax overload
- Rapid flashing transitions
- Neon hover glows
- Over-staggered elements
- Large rotation effects

This is timeless fashion, not playful tech UI.

---

# 16. Animation Checklist Before Shipping

- Is it subtle?
- Is it smooth?
- Is it calm?
- Does it feel intentional?
- Is it consistent across pages?
- Is it under 500ms?
- Is it transform/opacity based?

If yes → approved.

---

End of Animation System
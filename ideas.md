# AgriLink Sierra – Design Brainstorm

## Three Stylistic Approaches

### Approach A – "Verdant Earth" (Probability: 0.07)

Earthy, organic aesthetic drawing from the Sierra Leone landscape. Rich forest greens, warm terracotta, and golden amber tones. Hand-drawn illustration accents, organic shapes, and a warm editorial feel. Typography: Playfair Display + Source Sans Pro.

### Approach B – "Precision Agriculture" (Probability: 0.04)

Clean, data-forward design inspired by modern agri-tech dashboards. Cool greens with crisp white space, sharp grid layouts, and data visualization as hero elements. Typography: Space Grotesk + Inter.

### Approach C – "Tropical Modernism" ← CHOSEN (Probability: 0.06)

Bold, lush, and confident — the aesthetic of a premium African tech startup. Deep forest greens meet vibrant amber-gold accents, with glassmorphism panels floating over rich photographic farmland backgrounds. Asymmetric layouts, diagonal section breaks, and generous whitespace give it a magazine-editorial quality. Typography: Sora (display) + Nunito Sans (body).

---

## Chosen Approach: Tropical Modernism

### Design Movement

Afro-futurist editorial meets precision agri-tech — bold, lush, and purposeful.

### Core Principles

1. **Depth over flatness** — layered glassmorphism cards, soft shadows, and parallax-style section transitions
2. **Asymmetric vitality** — diagonal cuts, offset grids, and staggered card layouts that feel alive
3. **Data made beautiful** — charts, tables, and metrics presented with visual hierarchy and color coding
4. **Mobile-first richness** — every section degrades gracefully without losing its premium feel

### Color Philosophy

- Primary: `#2E7D32` — deep forest green, authority and growth
- Secondary: `#4CAF50` — vibrant mid-green, energy and life
- Accent: `#FFC107` — warm amber-gold, harvest, warmth, and call-to-action
- Background: `#F8FFF8` — barely-there green tint, clean and fresh
- Dark: `#1B4332` — rich forest shadow, used for headers and dark sections
- Glass: `rgba(255,255,255,0.15)` with `backdrop-filter: blur(20px)`

### Layout Paradigm

Diagonal section dividers (clip-path polygon) create visual momentum. Hero is full-viewport with offset text. Feature cards use a masonry-inspired stagger. Market prices and weather use dashboard-style panels. No center-only layouts — content flows left-to-right with intentional asymmetry.

### Signature Elements

1. Floating leaf particles (CSS animation) in hero and CTA sections
2. Diagonal green-to-dark section transitions with negative margin compensation
3. Glassmorphism cards with a subtle green-tinted border

### Interaction Philosophy

Hover states lift cards (translateY -4px + shadow increase). Scroll-triggered entrance animations (fade-up, 60ms stagger). Accordion FAQ with smooth height transitions. Form fields with green focus rings.

### Animation

- Entrance: `opacity: 0 → 1` + `translateY(24px → 0)`, 400ms ease-out, 60ms stagger
- Counter: animated number count-up on scroll into view
- Floating leaves: slow drift with CSS keyframes, 6–12s loops
- Card hover: `translateY(-4px)` + `box-shadow` increase, 200ms ease-out
- Hero headline: word-by-word stagger reveal

### Typography System

- Display: **Sora** (700, 800) — bold, modern, slightly geometric
- Body: **Nunito Sans** (400, 500, 600) — warm, readable, friendly
- Mono: system-ui for data/numbers
- Scale: 14/16/18/24/32/48/64/80px

### Brand Essence

AgriLink Sierra — the digital backbone of Sierra Leone's farming future. For farmers, buyers, and advisors who believe technology should work in the field, not just the office. **Bold. Grounded. Forward.**

### Brand Voice

Headlines are direct and empowering: "Your Farm, Smarter." CTAs are action-oriented: "Join 10,000 Farmers Today." No filler phrases. No passive voice.

- Example headline: "From Soil to Sale — We've Got You Covered"
- Example CTA: "Start Growing Smarter"

### Wordmark & Logo

A stylized leaf-sprout icon — a single bold upward stroke splitting into two leaves, suggesting growth and connectivity. Used as favicon and header mark. No text in the icon itself.

### Signature Brand Color

`#2E7D32` — deep forest green. Unmistakably AgriLink Sierra.

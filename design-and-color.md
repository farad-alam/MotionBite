# Design System Inspired by Design Monks

Orange: #dd550f


## 1. Visual Theme & Atmosphere

Design Monks presents a sophisticated, tech-forward aesthetic that blends creative innovation with professional credibility. The visual language emphasizes bold purple gradients against dark, minimal backgrounds, creating a sense of premium digital craftsmanship and AI-powered intelligence. The design conveys trust through clean typography, generous whitespace, and purposeful use of color to guide attention. The atmosphere is contemporary and aspirational—speaking to brands that want to transform their digital presence with cutting-edge UX/UI design. Dotted particle effects and gradient overlays add subtle depth, while the overall composition feels refined rather than playful, positioning Design Monks as a leading agency for high-impact digital products.

**Key Characteristics**
- Bold purple accent palette against near-black neutrals
- Minimalist layout with generous whitespace and breathing room
- High contrast for readability and visual hierarchy
- AI-forward, tech-inspired aesthetic with subtle animated elements
- Premium, confident tone—design agency authority
- Dark mode default with light accent highlights
- Gradient overlays and depth treatments for sophistication

## 2. Color Palette & Roles

### Primary
- **Purple Primary** (`#7D40FF`): Dominant brand color used for CTAs, highlights, gradients, and key UI elements; conveys innovation and premium positioning
- **Purple Dark** (`#712EFF`): Slightly darker variant for hover states and secondary accents
- **Purple Gradient** (`#9766FF`): Lighter purple for gradient transitions and softer emphasis areas

### Accent Colors
- **Purple Deep** (`#5F00E0`): Deep purple for strong visual emphasis and premium backgrounds
- **Purple Mid-tone** (`#592DB5`): Muted purple for secondary interactive elements
- **Green Accent** (`#12693D`): Used sparingly for status indicators or complementary accents

### Interactive
- **Button Primary** (`#712EFF`): CTA button backgrounds; high contrast against light text
- **Button Purple Light** (`#7D40FF`): Hover and alternative button states
- **Semi-Transparent Black** (`#0003`): Overlay for modals and depth layers

### Neutral Scale
- **Charcoal Text** (`#333333`): Primary text color for body copy and medium-emphasis content
- **Off-White Background** (`#FAFAFA`): Light backgrounds and card surfaces for contrast sections
- **Pure Black** (`#000000`): Deep text for maximum contrast headings
- **Dark Charcoal** (`#0A0A0A`): Near-black backgrounds for premium dark sections
- **Medium Gray** (`#737373`): Secondary text, disabled states, and tertiary information
- **White** (`#FFFFFF`): Primary light background and text on dark surfaces
- **Light Gray** (`#D4D4D4`): Subtle borders and dividers
- **Very Light Gray** (`#ECECEC`): Soft backgrounds and light borders

### Surface & Borders
- **Card Background Light** (`#C6CFFF`): Elevated light card backgrounds with purple tint
- **Border Dark** (`#525252`): Input borders and subtle dividers on dark backgrounds
- **Surface Overlay** (`rgba(0, 0, 0, 0.1)`): Semi-transparent overlays for depth

## 3. Typography Rules

### Font Family

**Primary Font:** Red Hat Display Variable (https://fonts.googleapis.com/)
Fallback stack: `'Red Hat Display', -apple-system, BlinkMacSystemFont, sans-serif`

**Secondary Font:** Playfair Display Variable (https://fonts.googleapis.com/)
Fallback stack: `'Playfair Display', Georgia, serif`

**Tertiary Font:** Outfit Variable (https://fonts.googleapis.com/)
Fallback stack: `'Outfit', system-ui, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Red Hat Display | 48px | 700 | 57.6px | 0px | Page hero headlines; maximum impact |
| Heading Level 1 | Red Hat Display | 32px | 700 | 38.4px | 0px | Section headings; primary emphasis |
| Heading Level 2 | Red Hat Display | 24px | 700 | 28.8px | 0px | Subsection headings; page structure |
| Heading Level 3 | Playfair Display | 20px | 700 | 24px | 0px | Card titles and medium emphasis |
| Heading Level 4 | Red Hat Display | 20px | 700 | 24px | 0px | Smaller section titles |
| Body Text | Outfit | 16px | 400 | 24px | 0px | Primary content; readable and accessible |
| Button Text | Outfit | 16px | 700 | 24px | 0px | Call-to-action labels; high contrast |
| Label Text | Outfit | 20px | 600 | 24px | 0px | Form labels and input descriptions |
| Small Text | Outfit | 14px | 400 | 20px | 0px | List items, captions, secondary info |
| Form Input | Outfit | 17px | 400 | 25.5px | 0px | Placeholder and input text |

### Principles

- **Hierarchy through weight and size:** Red Hat Display for primary headings creates visual distinction; Outfit for body ensures legibility at all scales
- **Serif accent:** Playfair Display reserved for premium, editorial-style headings to add sophistication
- **Line height generosity:** Minimum 1.5x line height for body text ensures comfortable reading on screens
- **Consistency in scale:** All font sizes follow a predictable progression for logical visual relationships
- **Dark mode optimization:** Higher contrast between text and background; lighter weights for longer body copy on dark backgrounds

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `#712EFF`
- Text color: `#FAFAFA`
- Font: Outfit, 16px, weight 700
- Padding: `12px 24px`
- Border radius: `8px`
- Border: `0px none`
- Box shadow: `rgba(255, 255, 255, 0.72) 0px 2px 3px 0px inset`
- Line height: `24px`
- Hover state: Background `#7D40FF`, shadow increases
- Active state: Background `#5F00E0`

**Secondary Button (Purple)**
- Background: `#7D40FF`
- Text color: `#FAFAFA`
- Font: Outfit, 16px, weight 700
- Padding: `12px 24px`
- Border radius: `8px`
- Border: `0px none`
- Box shadow: none
- Line height: `24px`
- Hover state: Background `#712EFF`

**Ghost / Text Button**
- Background: transparent
- Text color: `#333333`
- Font: Outfit, 14px, weight 400
- Padding: `8px 12px`
- Border radius: `0px`
- Border: `0px none`
- Box shadow: none
- Line height: `20px`
- Hover state: Text color `#7D40FF`, underline appears

### Cards & Containers

**Light Card (Elevated)**
- Background: `#C6CFFF`
- Text color: `#7D40FF`
- Font: Outfit, 14px, weight 400
- Padding: `20px 20px 20px 40px`
- Border radius: `16px`
- Border: `0px none`
- Box shadow: `rgba(15, 23, 42, 0.08) 0px 4px 16px -2px`
- Line height: `20px`

**Dark Card (Transparent)**
- Background: transparent
- Text color: `#7D40FF`
- Font: Outfit, 14px, weight 400
- Padding: `0px`
- Border radius: `0px`
- Border: `0px none`
- Box shadow: none
- Line height: `20px`

**Container with Border**
- Background: `rgba(255, 255, 255, 0.1)`
- Text color: `#333333`
- Padding: `20px 24px`
- Border radius: `16px`
- Border: `1px solid #D4D4D4`
- Box shadow: `rgba(15, 23, 42, 0.06) 0px 1px 4px 0px`

### Inputs & Forms

**Text Input (Dark Background)**
- Background: `rgba(255, 255, 255, 0.1)`
- Text color: `#FAFAFA`
- Font: Outfit, 17px, weight 400
- Padding: `12px 16px`
- Border radius: `8px`
- Border: `1px solid #525252`
- Box shadow: none
- Height: `50px`
- Line height: `25.5px`
- Placeholder color: `#737373`
- Focus state: Border `1px solid #7D40FF`, background `rgba(125, 64, 255, 0.08)`

**Text Input (Light Background)**
- Background: `rgba(255, 255, 255, 0.1)`
- Text color: `#FAFAFA`
- Font: Outfit, 17px, weight 400
- Padding: `12px 16px`
- Border radius: `8px`
- Border: `1px solid #525252`
- Height: `38px`
- Line height: `25.5px`
- Focus state: Border `1px solid #7D40FF`

**Form Label**
- Color: `#333333`
- Font: Outfit, 20px, weight 600
- Line height: `24px`
- Margin bottom: `8px`

### Navigation

**Main Navigation**
- Background: transparent
- Text color: `#333333`
- Font: Outfit, 14px, weight 400
- Padding: `8px 8px`
- Border radius: `16px`
- Border: `0px none`
- Box shadow: none
- Height: `72px`
- Line height: `20px`
- Active link color: `#7D40FF`
- Hover state: Background `rgba(125, 64, 255, 0.08)`

### Links

**Standard Link**
- Background: transparent
- Text color: `#FAFAFA`
- Font: Outfit, 16px, weight 400
- Padding: `5px`
- Border radius: `0px`
- Border: `0px none`
- Box shadow: none
- Line height: `24px`
- Hover state: Text color `#7D40FF`, underline appears
- Focus state: Outline `2px solid #7D40FF`

**Footer Link**
- Background: transparent
- Text color: `#FAFAFA`
- Font: Outfit, 16px, weight 400
- Padding: `5px`
- Border radius: `0px`
- Height: `72px`
- Line height: `24px`
- Hover state: Color transition to `#7D40FF`

### Badges

**Status Badge**
- Background: `#C6CFFF`
- Text color: `#7D40FF`
- Font: Outfit, 12px, weight 600
- Padding: `8px 16px`
- Border radius: `24px`
- Border: `0px none`
- Line height: `16px`

**Green Badge (Accent)**
- Background: `rgba(18, 105, 61, 0.1)`
- Text color: `#12693D`
- Font: Outfit, 12px, weight 600
- Padding: `8px 16px`
- Border radius: `24px`

## 5. Layout Principles

### Spacing System

**Base Unit:** 4px

**Scale:** 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 64px, 96px, 100px

**Usage Context:**
- 4–8px: Micro spacing, component internals
- 12–16px: Standard padding within components
- 20–24px: Medium spacing between sections
- 28–32px: Large spacing for section separation
- 40px: Extra large spacing for major content blocks
- 64px+: Hero sections, full-screen layouts
- 96–100px: Maximal spacing for breathing room between major sections

### Grid & Container

**Max Width:** 1400px for content containers

**Column Strategy:** 12-column grid on desktop; 6-column on tablet; 4-column on mobile

**Section Patterns:**
- Hero sections: Full viewport width with centered max-width content
- Card grids: Responsive multi-column layouts with consistent gap spacing
- Navigation: Sticky or fixed positioning with full-width background
- Footer: Full-width background with centered 1200px content container

### Whitespace Philosophy

Design Monks prioritizes generous whitespace to convey premium positioning and reduce cognitive load. Every component has breathing room; sections are visually separated through spacing rather than borders. Dark backgrounds are balanced with light accent text to create visual contrast and hierarchy. The layout avoids crowding—each element has dedicated space, supporting scannability and focus on key CTAs.

### Border Radius Scale

- `3px`: Minimal radius for refined, sharp-edged elements (rare)
- `8px`: Standard buttons and small interactive elements
- `16px`: Cards, containers, and medium-emphasis surfaces
- `20px`: Image treatments and visual features
- `24px`: Badges, pills, and high-emphasis rounded elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (No Shadow) | No box-shadow | Neutral backgrounds, body text, non-elevated content |
| Small (SM) | `rgba(15, 23, 42, 0.06) 0px 1px 4px 0px` | Modal overlays, subtle depth, light interactions |
| Medium (MD) | `rgba(15, 23, 42, 0.08) 0px 4px 16px -2px` | Dropdowns, card surfaces, standard elevation |
| Large (LG) | `rgba(0, 0, 0, 0.2) 1px 1px 4px 0px` | Deep dropdowns, emphasized overlays |
| Extra Large (XL) | `rgba(255, 255, 255, 0.72) 0px 2px 3px 0px inset` | Button inset highlights, premium interactive states |

**Shadow Philosophy:** Depth is subtle and refined, favoring soft, dark-based shadows for dark mode contexts. Shadows are used sparingly to avoid visual clutter—primarily on cards and interactive elements. Inset shadows on buttons create premium, tactile feedback. The overall approach prioritizes clarity over dramatic depth effects; shadows enhance hierarchy without dominating the visual space.

## 7. Do's and Don'ts

### Do

- **Use purple (`#7D40FF`, `#712EFF`) as the primary CTA color** across all interactive elements to maintain brand consistency
- **Maintain high contrast** between text and background; minimum WCAG AA compliance
- **Apply generous padding** (20px–32px) around content to support the premium aesthetic
- **Use Red Hat Display for headings** to establish visual hierarchy and design authority
- **Leverage dark backgrounds** to make purple accents pop and convey tech-forward positioning
- **Implement smooth hover states** with subtle color transitions on all interactive elements
- **Stack components vertically** with consistent 24–32px spacing between sections
- **Use cards and containers** with `16px` border radius to soften hard edges
- **Include whitespace liberally**—avoid dense layouts
- **Apply semi-transparent overlays** (`rgba(0, 0, 0, 0.1)`) for modal backgrounds and depth

### Don't

- **Avoid using pure `#000000` as background**—use `#0A0A0A` or dark charcoal for less harsh contrast
- **Don't mix multiple accent colors**—keep to purple variants and green as rare status accents only
- **Avoid thin, light-weight fonts** for body copy—maintain weight 400+ for accessibility
- **Don't use small shadows** (`0px 1px 2px`) on dark backgrounds—use medium or larger shadows only
- **Avoid padding smaller than 12px** within components—maintain comfortable spacing
- **Don't apply border radius larger than 24px** unless designing badges or pills
- **Avoid rounded buttons**—stick to 8px radius for consistency
- **Don't use more than two font families** in a single layout
- **Avoid hard borders**—favor subtle box-shadows for depth instead
- **Don't exceed line height of 1.8** for body text; keep it between 1.4–1.6 for compact readability

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–639px | Single column, 16px base padding, font sizes reduce 10–15%, full-width CTAs |
| Tablet | 640px–1023px | Two columns for cards, 20px base padding, nav becomes horizontal, moderate spacing |
| Desktop | 1024px–1399px | Multi-column grids, 24px base padding, all features visible, max-width containers active |
| Wide Desktop | 1400px+ | Content center-aligned with max-width 1400px, full feature set, generous margins |

### Touch Targets

- **Minimum touch target:** 48px × 48px (buttons, links)
- **Preferred touch target:** 56px × 56px
- **Minimum spacing between targets:** 8px
- **Form inputs:** Minimum 44px height on mobile, 50px on desktop

### Collapsing Strategy

- **Navigation:** Horizontal menu on desktop; hamburger menu icon (50px × 50px) on mobile / tablet
- **Cards:** Stack vertically on mobile (100% width); 2–3 columns on tablet; 3–4 columns on desktop
- **Padding:** Reduce from 32px (desktop) → 20px (tablet) → 16px (mobile)
- **Font sizes:** Reduce body from 16px → 15px → 14px across breakpoints
- **Hero sections:** Full viewport height on desktop; reduced to 70% viewport on mobile
- **Forms:** Full-width on mobile; side-by-side columns on desktop (using flex or grid)
- **Images:** Max-width 100% with aspect-ratio preservation; scale proportionally

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Purple Primary (`#7D40FF`)
- **Secondary CTA:** Purple Dark (`#712EFF`)
- **Body Text:** Charcoal Text (`#333333`)
- **Background (Light):** Off-White (`#FAFAFA`)
- **Background (Dark):** Dark Charcoal (`#0A0A0A`)
- **Heading Text:** Pure Black (`#000000`) or Charcoal (`#333333`)
- **Disabled/Secondary Text:** Medium Gray (`#737373`)
- **Input Border:** Dark Border (`#525252`)
- **Accent (Status):** Green Accent (`#12693D`)
- **Card Background (Light):** Light Purple (`#C6CFFF`)
- **Focus Outline:** Purple Primary (`#7D40FF`)

### Iteration Guide

1. **Start with typography**: Apply Red Hat Display (weight 700) for all headings; Outfit (weight 400) for body copy. Maintain line-height 1.5+ for accessibility.

2. **Establish color hierarchy**: Use `#7D40FF` for all primary CTAs and interactive focus states. Reserve `#712EFF` for hover/active states. Keep text as either `#333333` (dark mode) or `#FAFAFA` (light mode).

3. **Build spacing rhythm**: Base all padding and margins on 4px multiples. Use 16px between elements, 24–32px between sections, and 64px between major layout blocks.

4. **Apply shadow depth strategically**: Use medium shadow (`rgba(15, 23, 42, 0.08) 0px 4px 16px -2px`) on elevated cards only; reserve inset shadows for button premium feedback.

5. **Design for dark mode first**: Background `#0A0A0A` or transparent with light text (`#FAFAFA`). This is the primary theme; light mode is secondary.

6. **Create responsive breakpoints**: Design desktop at 1400px, tablet at 768px, mobile at 375px. Stack columns vertically on mobile; use grid/flex for multi-column on desktop.

7. **Ensure touch accessibility**: All interactive elements minimum 48px × 48px. Form inputs minimum 50px height. Maintain 8px gap between touch targets.

8. **Implement consistent border radius**: 8px for buttons, 16px for cards, 24px for badges. Never exceed 24px unless designing a full-round element.

9. **Test contrast ratios**: Verify all text meets WCAG AA (4.5:1 for normal text, 3:1 for large text). Purple text on light backgrounds must achieve minimum contrast.

10. **Polish with micro-interactions**: Add smooth 200ms transitions on hover states, subtle box-shadow increases on button press, and focus outlines (2px solid `#7D40FF`) for keyboard navigation.
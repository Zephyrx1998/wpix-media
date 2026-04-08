

## Plan: Embed Calendly Widget with Custom Theme

### Overview
Create a dedicated `/book` page with the Calendly inline widget embedded, and update all "Book a Call" / "Free Consultation" CTAs across the site to navigate there. The widget will be styled to blend with the existing dark glass-card theme.

### Changes

**1. New page: `src/pages/Book.tsx`**
- Load the Calendly external script (`assets.calendly.com/assets/external/widget.js`) via `useEffect`
- Render the `calendly-inline-widget` div with the provided data-url
- Wrap in a styled container matching the site's dark/glass theme (dark background, heading, glass-card wrapper around the widget)
- Set widget height to ~700px, responsive min-width 320px

**2. Add route in `src/components/AnimatedRoutes.tsx`**
- Lazy-load the new `Book` page
- Add route: `/book`

**3. Update CTAs to link to `/book`**
- **ContactSection.tsx**: Change "Call Now for Free Consultation" button to navigate to `/book`
- **vybe.tsx**: Change both "Book a Discovery Call" buttons to navigate to `/book`
- **HeroSection.tsx**: If there's a relevant CTA, update it too

**4. Add Calendly script to `index.html`**
- Add `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>` to the `<head>` for reliable loading across all pages

### Technical notes
- No database changes needed — Calendly handles scheduling externally
- The widget's `data-url` includes `hide_event_type_details=1&hide_gdpr_banner=1` as provided
- Custom CSS overrides will be applied to the widget container to match the dark theme (background color passed via Calendly URL params: `background_color=0a0a0a&text_color=ffffff&primary_color=<site-primary>`)


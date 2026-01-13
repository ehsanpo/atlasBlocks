<p align="center">
  <img src="/public/logo-text.png" alt="Atlas Blocks Logo" width="400" />
</p>

# Atlas Blocks - React Component Library

Production-ready React components for modern web applications. Copy-paste accessible components built with TypeScript and Tailwind CSS, no package bloat, just code you own.


## Preview
[https://ehsanpo.github.io/atlasBlocks/](https://ehsanpo.github.io/atlasBlocks/)


## Why This Exists

Most component libraries force you into their ecosystem. Atlas Blocks gives you the code directly—fork it, modify it, ship it. Built for developers who want full control without reinventing accessible patterns from scratch. Inspired by Shadcn UI's philosophy but focused on complete page sections and blocks, not just primitives.

## Installation

```bash
# Clone the repository
git clone https://github.com/ehsanpo/atlasBlocks.git
cd atlasBlocks

# Install dependencies
npm install

# Start development server
npm run dev
cd atlas-ui
npm install
```

### Development

Run the documentation site locally:

```bash
npm run dev
```


## Example Usage

```tsx
// Import and use any component directly
import { HeroPremium } from './components/HeroPremium'
import { ContactForm } from './components/ContactForm'
import { Testimonials } from './components/Testimonials'

function LandingPage() {
  return (
    <>
      <HeroPremium 
        title="Ship Faster"
        description="Production-ready components"
      />
      <Testimonials items={testimonialData} />
      <ContactForm onSubmit={handleSubmit} />
    </>
  )
}
```

All components are TypeScript-ready with full type safety and come with built-in accessibility patterns.

### Adding Components (Shadcn-style)

```bash
npx shadcn@latest add https://atlasblocks.dev/components/[component-name]
```

## Available Components

- **Article List**: Clean grid for blog posts and news.
- **Banner**: High-impact visual sections with overlays.
- **CTA (Call to Action)**: Conversion-optimized section with background images.
- **FAQ**: Interactive accordion for common questions.
- **Filter Posts**: Dynamic client-side filtering system.
- **Hero Slider**: Smooth carousel with auto-play.
- **Premium Hero**: High-end landing page sections with glassmorphism.
- **Links**: Versatile grid for icons/images and navigation.
- **Testimonials**: Clean cards for social proof.
- **Text + Image**: Side-by-side feature layout.
- **Gallery**: Beautiful grid and slider layouts for images.
- **Statistic**: Impactful data visualization cards.
- **Team**: Profile cards for showcasing your team.
- **Contact Form**: Modern, production-ready form components.
- **Minimal Header**: Clean, focused navigation for apps.
- **Header & Footer**: Comprehensive navigation and site mapping.
- **Parallax Carousel**: Premium swipeable carousel with deep parallax effects.
- **Product Feature**: Highlighted feature sections for SaaS and E-commerce.
- **Feature Block**: Flexible list-based feature layouts.
- **Home Page**: AI-focused landing page with context-aware sections.
- **Example Landing Page**: Full-featured demo showcasing multiple library components.
- **Code Block**: Syntax-highlighted code display with copy-to-clipboard.
- **API Reference**: Professional property documentation for components.


## Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS with OKLCH colors
- **Icons**: Lucide React
- **Code Highlighting**: Prism React Renderer
- **Build Tool**: Vite

## Inspiration

- [Shadcn UI](https://ui.shadcn.com/) – Component philosophy and ownership model
- [WordPress Blocks](https://github.com/ehsanpo/Blocks) – Content block patterns
- [Downkingo](https://github.com/down-kingo/web-site-downkingo) – Design inspiration


## Contributing

Issues and pull requests are welcome! Found a bug or want to add a component? Open an issue or submit a PR.

## License

MIT License – see [LICENSE](LICENSE) file for details.

## Screenshots

<p align="center">
  <img src="/demo/demo3.png" alt="Atlas Blocks Component Examples" width="800" />
</p>

<p align="center">
  <img src="/demo/demo4.png" alt="Atlas Blocks UI Components" width="800" />
</p>

---

Built with ❤️ for developers who value control and accessibility.
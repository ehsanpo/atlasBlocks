import { useEffect } from 'react'
import { Header } from '../Header'
import { HeroSlider } from '../HeroSlider'
import { Feature } from '../Feature'
import { Banner } from '../Banner'
import { Testimonials } from '../Testimonials'
import { FAQ } from '../FAQ'
import { Footer } from '../Footer'
import { CTA } from '../CTA'
import { Statistic } from '../Statistic'

const navLinks = [
  { label: "Home", url: "#" },
  { label: "Features", url: "#" },
  { label: "Pricing", url: "#" },
  { label: "Blog", url: "#" },
]

const sliderItems = [
  {
    id: 1,
    headline: "Revolutionize Your Workflow",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&h=800&fit=crop",
    link: "#"
  },
  {
    id: 2,
    headline: "Liquid Art Design Systems",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&h=800&fit=crop",
    link: "#"
  }
]

const features = [
  {
    id: 1,
    title: "High Performance",
    description: "Optimized for speed and accessibility, ensuring your users get the best experience possible.",
    iconName: "Zap" as any
  },
  {
    id: 2,
    title: "Modern Aesthetics",
    description: "Subtle gradients, micro-animations, and glassmorphism for a truly high-end feel.",
    iconName: "Palette" as any
  },
  {
    id: 3,
    title: "Fully Responsive",
    description: "Every component is meticulously crafted to look beautiful on phones, tablets, and desktops.",
    iconName: "Smartphone" as any
  }
]

const banners = [
  {
    id: 1,
    text: "Design with confidence",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop",
    link: "#"
  },
  {
    id: 2,
    text: "Build with speed",
    image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&h=600&fit=crop",
    link: "#"
  }
]

const testimonials = [
  {
    id: 1,
    testimonial: "Atlas UI has completely transformed how we build marketing sites. The components are gorgeous and incredibly easy to use.",
    name: "Sarah Johnson",
    role: "Lead Creative at PixelFlow",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    testimonial: "The liquid art integration is a game changer. Our clients are consistently blown away by the unique aesthetics.",
    name: "Michael Chen",
    role: "Senior Developer at TechWave",
    image: "https://i.pravatar.cc/150?u=michael"
  }
]

const faqs = [
  {
    id: 1,
    question: "Is Atlas UI compatible with Next.js?",
    answer: "Yes! All components are built with modern React standards and work perfectly with Next.js App Router and Server Components."
  },
  {
    id: 2,
    question: "Can I customize the colors?",
    answer: "Absolutely. We use OKLCH colors and CSS variables, making it easy to theme the entire library to match your brand."
  }
]

const stats = [
  { id: 1, label: "Active Users", value: "50k+" },
  { id: 2, label: "Components", value: "100+" },
  { id: 3, label: "Themes", value: "12" },
  { id: 4, label: "GitHub Stars", value: "2.5k" }
]

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", url: "#" },
      { label: "Integrations", url: "#" },
      { label: "Pricing", url: "#" },
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", url: "#" },
      { label: "Careers", url: "#" },
      { label: "Press", url: "#" },
    ]
  }
]

const ctaLinks = [
  { id: 1, text: "Get Started Free", url: "#" },
  { id: 2, text: "View Components", url: "#" }
]

export function LandingPagePreview({ onBack }: { onBack?: () => void }) {
  // Use a hack to hide the header of the app when this "page" is rendered
  // so it feels like a real full page.
  useEffect(() => {
    const appHeader = document.querySelector('header.sticky.top-0')
    if (appHeader) (appHeader as HTMLElement).style.display = 'none'
    
    return () => {
      if (appHeader) (appHeader as HTMLElement).style.display = 'flex'
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-y-auto z-[100] bg-background">
      <div className="fixed bottom-8 right-8 z-[200]">
        <button 
          onClick={onBack}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          Back to Components
        </button>
      </div>
      <Header 
        links={navLinks} 
        transparent={false} 
        sticky={true} 
      />
      
      <main>
        <HeroSlider slides={sliderItems} />
        
        <div className="py-24">
          <Feature 
            headline="Why Choose Atlas UI?"
            subheadline="Build faster and better with our comprehensive design system."
            features={features}
            columns={3}
            textAlign="center"
          />
        </div>
        
        <Banner 
          title="Engineered for Excellence"
          banners={banners}
          columns={2}
          align="wide"
        />

        <div className="py-24 bg-muted/30">
          <Statistic 
             headline="Helping thousands of teams build better"
             stats={stats}
          />
        </div>

        <div className="py-24">
          <Testimonials 
            headline="Trusted by Innovative Teams"
            testimonials={testimonials}
          />
        </div>

        <CTA 
          headline="Ready to build your next masterpiece?"
          subheadline="Join thousands of developers using Atlas UI to create stunning web experiences."
          links={ctaLinks}
          align="wide"
        />

        <div className="py-24">
          <FAQ 
            questions={faqs}
            align="default"
          />
        </div>
      </main>

      <Footer 
        sections={footerSections}
        description="High-performance UI components and design systems for the modern web."
        gradientBackground={true}
        align="wide"
      />
    </div>
  )
}

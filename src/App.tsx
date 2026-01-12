import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import type { ComponentItem } from './components/Sidebar'
import { ArticleListPreview } from './components/previews/ArticleListPreview'
import { BannerPreview } from './components/previews/BannerPreview'
import { CTAPreview } from './components/previews/CTAPreview'
import { FAQPreview } from './components/previews/FAQPreview'
import { TextImagePreview } from './components/previews/TextImagePreview'
import { FeatureBlockPreview } from './components/previews/FeatureBlockPreview'
import { TestimonialsPreview } from './components/previews/TestimonialsPreview'
import { LinksPreview } from './components/previews/LinksPreview'
import { HeroSliderPreview } from './components/previews/HeroSliderPreview'
import { FilterPostPreview } from './components/previews/FilterPostPreview'
import { ContactFormPreview } from './components/previews/ContactFormPreview'
import { FeaturePreview } from './components/previews/FeaturePreview'
import { FooterPreview } from './components/previews/FooterPreview'
import { HeaderPreview } from './components/previews/HeaderPreview'
import { GalleryPreview } from './components/previews/GalleryPreview'
import { StatisticPreview } from './components/previews/StatisticPreview'
import { TeamPreview } from './components/previews/TeamPreview'
import { HeroPremiumPreview } from './components/previews/HeroPremiumPreview'
import { HeaderMinimalPreview } from './components/previews/HeaderMinimalPreview'
import { LandingPagePreview } from './components/previews/LandingPagePreview'
import { ParallaxCarouselPreview } from './components/previews/ParallaxCarouselPreview'
import { HomePagePreview } from './components/previews/HomePagePreview'
import { Sun, Moon, ChevronDown, Menu } from 'lucide-react'
import { cn } from './lib/utils'

const PRIMARY_COLORS = {
  blue: {
    primary: "0.55 0.18 250",
    foreground: "0.985 0 0" // White
  },
  green: {
    primary: "0.6 0.2 145",
    foreground: "0.985 0 0" // White
  },
  violet: {
    primary: "0.6 0.18 290",
    foreground: "0.985 0 0" // White
  },
  yellow: {
    primary: "0.78 0.18 85",
    foreground: "0.14 0.01 85" // Dark Brown/Black for contrast
  }
}

export type PrimaryColor = keyof typeof PRIMARY_COLORS

// Component registry
const components: ComponentItem[] = [
  { id: 'article-list', name: 'Article List Block' },
  { id: 'banner', name: 'Banner Block' },
  { id: 'cta', name: 'Call to Action Block' },
  { id: 'faq', name: 'FAQ Block' },
  { id: 'filter-post', name: 'Filter Posts Block' },
  { id: 'hero-slider', name: 'Hero Slider Block' },
  { id: 'hero-premium', name: 'Premium Hero Block' },
  { id: 'links', name: 'Links Block' },
  { id: 'testimonials', name: 'Testimonials Block' },
  { id: 'text-image', name: 'Text + Image Block' },
  { id: 'product-feature', name: 'Product Feature Block' },
  { id: 'feature', name: 'Feature Block' },
  { id: 'gallery', name: 'Gallery Block' },
  { id: 'statistic', name: 'Statistic Block' },
  { id: 'team', name: 'Our Team Block' },
  { id: 'contact', name: 'Contact Form' },
  { id: 'header-minimal', name: 'Minimal Header' },
  { id: 'header', name: 'Header' },
  { id: 'footer', name: 'Footer' },
  { id: 'parallax-carousel', name: 'Parallax Carousel' },
  { id: 'landing-page', name: 'Example Landing Page' },
  { id: 'home-page', name: 'Home Page' },
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    }
    return 'dark'
  })

  const [activeComponent, setActiveComponent] = useState('home-page')
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>('yellow')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    root.style.setProperty('--primary', PRIMARY_COLORS[primaryColor].primary)
    root.style.setProperty('--primary-foreground', PRIMARY_COLORS[primaryColor].foreground)
    root.style.setProperty('--ring', PRIMARY_COLORS[primaryColor].primary)
  }, [primaryColor])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  // Render the active component preview
  const renderPreview = () => {
    switch (activeComponent) {
      case 'home-page':
        return (
          <HomePagePreview 
            onBack={() => {
              setIsSidebarCollapsed(false)
              setActiveComponent('article-list')
            }} 
            onDocsClick={() => {
              setIsSidebarCollapsed(false)
              setActiveComponent('article-list')
            }} 
          />
        )
      case 'landing-page':
        return <LandingPagePreview onBack={() => setActiveComponent('article-list')} />

      case 'article-list':
        return <ArticleListPreview />
      
      case 'banner':
        return <BannerPreview />
      
      case 'cta':
        return <CTAPreview />
      
      case 'faq':
        return <FAQPreview />
      
      case 'filter-post':
        return <FilterPostPreview />
      
      case 'hero-slider':
        return <HeroSliderPreview />
      
      case 'links':
        return <LinksPreview />
      
      case 'testimonials':
        return <TestimonialsPreview />
      
      case 'text-image':
        return <TextImagePreview />
      
      case 'product-feature':
        return <FeatureBlockPreview />
      
      case 'contact':
        return <ContactFormPreview />
      
      case 'feature':
        return <FeaturePreview />
      
      case 'footer':
        return <FooterPreview />
      
      case 'header':
        return <HeaderPreview />
      
      case 'header-minimal':
        return <HeaderMinimalPreview />
      
      case 'gallery':
        return <GalleryPreview />
      
      case 'statistic':
        return <StatisticPreview />
      
      case 'team':
        return <TeamPreview />
      
      case 'hero-premium':
        return <HeroPremiumPreview />
      
      case 'parallax-carousel':
        return <ParallaxCarouselPreview />
      
      default:
        return <ArticleListPreview />
    }
  }

  const currentComponent = components.find(c => c.id === activeComponent)

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sidebar - Hidden on Mobile */}
      <Sidebar
        components={components}
        activeComponent={activeComponent}
        onSelectComponent={setActiveComponent}
        primaryColor={primaryColor}
        onPrimaryColorChange={setPrimaryColor}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
              {/* Sidebar toggle for when collapsed */}
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={cn(
                    "p-2 hover:bg-muted rounded-lg transition-all active:scale-95",
                    !isSidebarCollapsed && "md:hidden"
                )}
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                 {/* Mobile Sidebar Dropdown */}
                 <div className="md:hidden relative">
                   <select 
                     value={activeComponent}
                     onChange={(e) => setActiveComponent(e.target.value)}
                     className="appearance-none bg-muted border border-border rounded-lg px-4 py-2 pr-10 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
                   >
                     {components.map(c => (
                       <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                   </select>
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                     <ChevronDown className="h-4 w-4" />
                   </div>
                 </div>

                 <div className="hidden md:block">
                   <h1 className="text-xl font-bold tracking-tight">{currentComponent?.name}</h1>
                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">
                     Atlas Blocks Component
                   </p>
                 </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="rounded-xl p-2.5 transition-all hover:bg-muted border border-border shadow-sm active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Preview Content */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12 overflow-x-hidden">
          <div className="md:hidden mb-8">
             <h1 className="text-3xl font-extrabold tracking-tight mb-2">{currentComponent?.name}</h1>
             <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Documentation</p>
          </div>
          {renderPreview()}
        </main>
      </div>
    </div>
  )
}

export default App

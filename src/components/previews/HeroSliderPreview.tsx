import { useState } from 'react'
import { HeroSlider } from '../HeroSlider'
import { DocPage } from '../DocPage'

const initialSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
    headline: "Unleash Your Creative Potential",
    link: "#"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=900&fit=crop",
    headline: "Master Modern Technology",
    link: "#"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop",
    headline: "Build Your Digital Empire",
    link: "#"
  }
]

const componentCode = `import { useState, useEffect, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "./ui/button"

export interface SlideItem {
  id: number | string
  image: string
  headline?: string
  link: string
}

export interface HeroSliderProps {
  slides: SlideItem[]
  autoPlayInterval?: number
  backgroundColor?: string
  align?: "default" | "wide" | "full"
  className?: string
}

export function HeroSlider({
  slides = [],
  autoPlayInterval = 5000,
  backgroundColor,
  align = "full",
  className,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }, [currentIndex, slides.length, goToSlide])

  const prevSlide = useCallback(() => {
    if (slides.length <= 1) return
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }, [currentIndex, slides.length, goToSlide])

  useEffect(() => {
    if (autoPlayInterval <= 0 || slides.length <= 1) return
    const interval = setInterval(() => { nextSlide() }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [nextSlide, autoPlayInterval, slides.length])

  if (!slides || slides.length === 0) return null

  return (
    <section className={cn(
      "relative overflow-hidden",
      align === "wide" && "max-w-7xl mx-auto rounded-3xl",
      align === "full" && "w-full",
      align === "default" && "max-w-6xl mx-auto rounded-3xl",
      className
    )} style={{ backgroundColor }}>
      <div className="relative h-[400px] md:h-[500px] lg:h-[700px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.id} className={cn(
            "absolute inset-0 h-full w-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
            index === currentIndex ? "translate-x-0 scale-100 opacity-100 z-10" : index < currentIndex ? "-translate-x-1/2 scale-110 opacity-0 z-0" : "translate-x-1/2 scale-110 opacity-0 z-0"
          )}>
            <a href={slide.link} className="relative block h-full w-full group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] group-hover:scale-105" style={{ backgroundImage: \`url(\${slide.image})\` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              {slide.headline && (
                <div className="relative z-20 flex h-full items-center justify-center p-12 text-center">
                  <div className="max-w-4xl px-4">
                    <h2 className={cn("text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl transition-all duration-1000 delay-300", index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0")}>{slide.headline}</h2>
                  </div>
                </div>
              )}
            </a>
          </div>
        ))}
        {/* Navigation omitted for brevity in code preview */}
      </div>
    </section>
  )
}`

const usageCode = `import { HeroSlider } from "@/components/HeroSlider"

const slides = [
  { id: 1, image: "/hero-1.jpg", headline: "Welcome", link: "/welcome" }
]

export default function HomePage() {
  return (
    <HeroSlider slides={slides} autoPlayInterval={6000} />
  )
}`

const apiProps = [
  { name: "slides", type: "SlideItem[]", description: "Array of objects containing image, headline, and link for each slide." },
  { name: "autoPlayInterval", type: "number", defaultValue: "5000", description: "Time in ms between automatic transitions. Set to 0 to disable." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'full'", description: "Width and alignment of the slider." },
  { name: "className", type: "string", description: "Additional CSS classes." },
]

export function HeroSliderPreview() {
  const [data, setData] = useState({
    slides: initialSlides,
    autoPlayInterval: 5000,
    align: "full" as const
  })

  return (
    <DocPage
      name="Hero Slider"
      description="A premium full-width carousel with smooth transitions and customizable headlines."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Width</label>
            <select 
              value={data.align} 
              onChange={(e) => setData({ ...data, align: e.target.value as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="default">Default</option>
              <option value="wide">Wide</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Interval (ms)</label>
            <input 
              type="number" 
              step={1000}
              min={0}
              value={data.autoPlayInterval} 
              onChange={(e) => setData({ ...data, autoPlayInterval: Number(e.target.value) })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-20"
            />
          </div>
        </div>
      }
    >
      <HeroSlider 
        {...data}
      />
    </DocPage>
  )
}

import { useState, useEffect, useCallback } from 'react'
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
  /**
   * List of slides to display
   */
  slides: SlideItem[]
  
  /**
   * Auto-play interval in ms (0 to disable)
   * @default 5000
   */
  autoPlayInterval?: number
  
  /**
   * Section background color
   */
  backgroundColor?: string
  
  /**
   * Alignment of the component
   * @default "full"
   */
  align?: "default" | "wide" | "full"
  
  /**
   * Additional CSS classes
   */
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
    
    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)
    
    return () => clearInterval(interval)
  }, [nextSlide, autoPlayInterval, slides.length])

  if (!slides || slides.length === 0) return null

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        align === "wide" && "max-w-7xl mx-auto rounded-3xl",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto rounded-3xl",
        className
      )}
      style={{ backgroundColor }}
    >
      <div className="relative h-[400px] md:h-[500px] lg:h-[700px] w-full overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 h-full w-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
              index === currentIndex 
                ? "translate-x-0 scale-100 opacity-100 z-10" 
                : index < currentIndex 
                  ? "-translate-x-1/2 scale-110 opacity-0 z-0" 
                  : "translate-x-1/2 scale-110 opacity-0 z-0"
            )}
          >
            <a 
              href={slide.link} 
              className="relative block h-full w-full group"
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] group-hover:scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              
              {/* Content */}
              {slide.headline && (
                <div className="relative z-20 flex h-full items-center justify-center p-12 text-center">
                  <div className="max-w-4xl px-4">
                    <h2 className={cn(
                      "text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl",
                      "transition-all duration-1000 delay-300",
                      index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    )}>
                      {slide.headline}
                    </h2>
                  </div>
                </div>
              )}
            </a>
          </div>
        ))}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-black/40 hover:border-white/40 h-12 w-12"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-black/40 hover:border-white/40 h-12 w-12"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Indicators/Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.preventDefault(); goToSlide(index); }}
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-full",
                  index === currentIndex ? "w-10 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


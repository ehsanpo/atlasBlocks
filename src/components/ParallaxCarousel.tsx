import { useState, useRef, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { ChevronRight } from 'lucide-react'

export interface ParallaxSlideItem {
  id: number | string
  bgImage: string
  logoImage: string
  title: string
  subtitle: string
  link: string
}

export interface ParallaxCarouselProps {
  items: ParallaxSlideItem[]
  className?: string
}

export function ParallaxCarousel({
  items = [],
  className,
}: ParallaxCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollX, setScrollX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollX(scrollRef.current.scrollLeft)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll)
      return () => el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const onMouseLeave = () => {
    setIsDragging(false)
  }

  const onMouseUp = () => {
    setIsDragging(false)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  if (!items || items.length === 0) return null

  return (
    <section className={cn("py-16 overflow-hidden bg-black", className)}>
      <div 
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className={cn(
          "flex overflow-x-auto scrollbar-hide px-4 md:px-[10%] select-none active:cursor-grabbing",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 md:gap-8 transition-transform duration-500 ease-out pointer-events-none">
          {items.map((item, index) => {
            // Parallax Calculation
            const itemWidth = 330 // CARD_WIDTH (300) + GAP
            const targetX = index * itemWidth
            const parallaxAmount = (targetX - scrollX) / 3

            return (
              <div 
                key={item.id} 
                className="shrink-0 w-[300px] md:w-[330px] p-[15px] pointer-events-auto"
              >
                <div className="bg-white overflow-hidden rounded-xl shadow-2xl transition-all duration-400 group">
                  {/* Card Body */}
                  <div className="relative h-[250px] w-full overflow-hidden">
                    {/* Parallax Background */}
                    <div 
                      className="absolute top-0 left-[-50%] h-full w-[200%] bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${item.bgImage})`,
                        transform: `translateX(${-parallaxAmount}px)`
                      }}
                    />
                    
                    {/* Logo/Center Link */}
                    <a 
                      href={item.link}
                      onClick={(e) => isDragging && e.preventDefault()}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full overflow-hidden z-10 shadow-xl transition-transform hover:scale-110 duration-400 bg-white p-2"
                    >
                      <img 
                        src={item.logoImage} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                      />
                    </a>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pb-8 bg-white relative">
                    <div className="pr-12">
                      <h3 className="text-[#690911] font-bold text-sm leading-tight line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                    
                    {/* Action Button */}
                    <a 
                      href={item.link}
                      onClick={(e) => isDragging && e.preventDefault()}
                      className="absolute right-6 top-6 w-9 h-9 bg-[#ff7b1a] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

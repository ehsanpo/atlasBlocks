import { useState } from 'react'
import { ParallaxCarousel } from '../ParallaxCarousel'
import { DocPage } from '../DocPage'

const initialItems = [
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    logoImage: "https://api.dicebear.com/7.x/identicon/svg?seed=shop1",
    title: "Eco Fashion Collective",
    subtitle: "Sustainable Style",
    link: "#"
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    logoImage: "https://api.dicebear.com/7.x/identicon/svg?seed=shop2",
    title: "Minimalist Tech Gear",
    subtitle: "Premium Accessories",
    link: "#"
  },
  {
    id: 3,
    bgImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    logoImage: "https://api.dicebear.com/7.x/identicon/svg?seed=shop3",
    title: "Urban Sneaker Vault",
    subtitle: "Exclusive Kicks",
    link: "#"
  },
  {
    id: 4,
    bgImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    logoImage: "https://api.dicebear.com/7.x/identicon/svg?seed=shop4",
    title: "Sonic Sound Lab",
    subtitle: "Premium Audio",
    link: "#"
  },
  {
    id: 5,
    bgImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    logoImage: "https://api.dicebear.com/7.x/identicon/svg?seed=shop5",
    title: "Modern Living Studio",
    subtitle: "Interior Design",
    link: "#"
  },
  {
    id: 6,
    bgImage: "https://images.unsplash.com/photo-1526170315870-ef0d96f69a53?w=800&q=80",
    logoImage: "https://api.dicebear.com/7.x/identicon/svg?seed=shop6",
    title: "Retro Camera Shop",
    subtitle: "Vintage Imaging",
    link: "#"
  }
]

const componentCode = `import { useState, useRef, useEffect } from 'react'
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

  return (
    <section className={cn("py-16 overflow-hidden bg-black", className)}>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-[10%]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 md:gap-8">
          {items.map((item, index) => {
            const itemWidth = 330
            const targetX = index * itemWidth
            const parallaxAmount = (targetX - scrollX) / 3

            return (
              <div 
                key={item.id} 
                className="snap-center shrink-0 w-[300px] md:w-[330px] p-[15px]"
              >
                <div className="bg-white overflow-hidden rounded-xl shadow-2xl transition-all duration-400 group">
                  <div className="relative h-[250px] w-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-[-50%] h-full w-[200%] bg-cover bg-center"
                      style={{ 
                        backgroundImage: \\\`url(\\\${item.bgImage})\\\`,
                        transform: \\\`translateX(\\\${-parallaxAmount}px)\\\`
                      }}
                    />
                    <a 
                      href={item.link}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full overflow-hidden z-10 shadow-xl transition-all hover:scale-110 duration-400 bg-white p-2"
                    >
                      <img src={item.logoImage} alt={item.title} className="w-full h-full object-contain" />
                    </a>
                  </div>
                  <div className="p-6 pb-8 bg-white relative">
                    <div className="pr-12">
                      <h3 className="text-[#690911] font-bold text-sm leading-tight line-clamp-1">{item.title}</h3>
                      <p className="text-gray-500 text-xs mt-1">{item.subtitle}</p>
                    </div>
                    <a href={item.link} className="absolute right-6 top-6 w-9 h-9 bg-[#ff7b1a] rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
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
}`

const usageCode = `import { ParallaxCarousel } from "@/components/ParallaxCarousel"

const items = [
  {
    id: 1,
    bgImage: "/images/bg-1.jpg",
    logoImage: "/images/logo-1.png",
    title: "Shop Title",
    subtitle: "Official Shop",
    link: "#"
  }
]

export default function Page() {
  return <ParallaxCarousel items={items} />
}`

const apiProps = [
  { name: "items", type: "ParallaxSlideItem[]", description: "Array of items with background, logo, title, and subtitle." },
  { name: "className", type: "string", description: "Additional CSS classes." },
]

export function ParallaxCarouselPreview() {
  const [data, setData] = useState({
    items: initialItems,
  })

  return (
    <DocPage
      name="Parallax Swipe Carousel"
      description="An interactive horizontal carousel with a smooth parallax scrolling effect on background images."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
    >
      <ParallaxCarousel 
        items={data.items}
      />
    </DocPage>
  )
}

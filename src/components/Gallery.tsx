import { useState } from "react"
import { cn } from "@/lib/utils"
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react"

export interface GalleryImage {
  id: number | string
  url: string
  alt: string
  title?: string
  category?: string
}

export interface GalleryProps {
  images: GalleryImage[]
  layout?: "grid" | "masonry"
  columns?: 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  align?: "default" | "wide" | "full"
  className?: string
}

export function Gallery({
  images = [],
  layout = "grid",
  columns = 3,
  gap = "md",
  align = "default",
  className,
}: GalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4 md:gap-6",
    lg: "gap-8"
  }

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  }

  const handleNext = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx((selectedImageIdx + 1) % images.length)
  }

  const handlePrev = () => {
    if (selectedImageIdx === null) return
    setSelectedImageIdx((selectedImageIdx - 1 + images.length) % images.length)
  }

  return (
    <section
      className={cn(
        "py-12 md:py-20 lg:py-24",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
    >
      <div className={cn(
        layout === "grid" ? "grid" : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4",
        layout === "grid" && gapClasses[gap],
        layout === "grid" && columnClasses[columns as keyof typeof columnClasses]
      )}>
        {images.map((image, idx) => (
          <div 
            key={image.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-muted cursor-pointer shadow-sm transition-all duration-500 hover:shadow-2xl",
              layout === "grid" ? "aspect-square" : "break-inside-avoid mb-4"
            )}
            onClick={() => setSelectedImageIdx(idx)}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Maximize2 className="h-6 w-6" />
              </div>
              {image.title && (
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg drop-shadow-md">{image.title}</p>
                  {image.category && <p className="text-white/80 text-xs uppercase font-bold tracking-widest">{image.category}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedImageIdx !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300 px-4">
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedImageIdx(null)}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-10 w-10 md:h-16 md:w-16" />
          </button>

          <div className="max-w-5xl h-full flex flex-col items-center justify-center p-4">
            <img 
              src={images[selectedImageIdx].url} 
              alt={images[selectedImageIdx].alt} 
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"
            />
            <div className="mt-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{images[selectedImageIdx].title}</h3>
              <p className="text-white/60">{images[selectedImageIdx].alt}</p>
            </div>
          </div>

          <button 
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors"
            onClick={handleNext}
          >
            <ChevronRight className="h-10 w-10 md:h-16 md:w-16" />
          </button>
        </div>
      )}
    </section>
  )
}

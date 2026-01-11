import { useState } from 'react'
import { Gallery } from '../Gallery'
import { DocPage } from '../DocPage'

const sampleImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop", alt: "Mountain landscape", title: "Alpine Serenity", category: "Nature" },
  { id: 2, url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=800&fit=crop", alt: "Misty forest", title: "Forbidden Forest", category: "Abstract" },
  { id: 3, url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop", alt: "Foggy meadow", title: "Whispering Winds", category: "Landscape" },
  { id: 4, url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=800&fit=crop", alt: "Green hills", title: "Emerald Expanse", category: "Travel" },
  { id: 5, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop", alt: "Sunlight through trees", title: "Golden Canopy", category: "Nature" },
  { id: 6, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop", alt: "Yosemite Valley", title: "Granite Giants", category: "Travel" },
]

const componentCode = `import { useState } from "react"
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
  backgroundColor?: string
  className?: string
}

export function Gallery({
  images = [],
  layout = "grid",
  columns = 3,
  gap = "md",
  align = "default",
  backgroundColor,
  className,
}: GalleryProps) {
  // Implementation with Lightbox...
}`

const usageCode = `import { Gallery } from "@/components/Gallery"

const images = [
  { id: 1, url: "/img1.jpg", alt: "A forest", title: "Morning Mist" }
]

export default function Page() {
  return (
    <Gallery 
      images={images} 
      columns={3} 
      gap="md" 
    />
  )
}`

const apiProps = [
  { name: "images", type: "GalleryImage[]", description: "Array of image objects with URLs and optional titles." },
  { name: "columns", type: "2 | 3 | 4", defaultValue: "3", description: "Number of grid columns on Desktop." },
  { name: "gap", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Spacing between images." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment." },
]

export function GalleryPreview() {
  const [data, setData] = useState({
    images: sampleImages,
    columns: 3 as const,
    gap: "md" as const,
    align: "default" as const
  })

  return (
    <DocPage
      name="Gallery Block"
      description="A sleek image showcase with instant light-box functionality and responsive grid options."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Columns</label>
            <select 
              value={data.columns} 
              onChange={(e) => setData({ ...data, columns: Number(e.target.value) as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Gap</label>
            <select 
              value={data.gap} 
              onChange={(e) => setData({ ...data, gap: e.target.value as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
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
        </div>
      }
    >
      <div className="w-full">
        <Gallery 
          {...data}
        />
      </div>
    </DocPage>
  )
}

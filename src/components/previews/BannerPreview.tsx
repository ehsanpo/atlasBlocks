import { useState } from 'react'
import { Banner } from '../Banner'
import { DocPage } from '../DocPage'

const initialBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    text: "Experience the Future of Design",
    link: "#design"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    text: "Collaborate with Experts Worldwide",
    link: "#collaborate"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    text: "Growth Strategies for Your Business",
    link: "#growth"
  }
]

const componentCode = `import { cn } from "@/lib/utils"

export interface BannerItem {
  id: number | string
  image: string
  text: string
  link: string
}

export interface BannerProps {
  title?: string
  banners: BannerItem[]
  align?: "default" | "wide" | "full"
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function Banner({
  title,
  banners = [],
  align = "default",
  columns,
  className,
}: BannerProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  const gridClass = columns 
    ? columnClasses[columns] 
    : cn(
      "grid-cols-1",
      banners.length >= 2 && "md:grid-cols-2",
      banners.length >= 3 && "lg:grid-cols-3"
    )

  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
    >
      <div className="container mx-auto">
        {title && (
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl text-left">
            {title}
          </h2>
        )}
        
        <div className={cn("grid gap-6 md:gap-8", gridClass)}>
          {/* Banner mapping... */}
        </div>
      </div>
    </section>
  )
}`

const usageCode = `import { Banner } from "@/components/Banner"

const banners = [
  {
    id: 1,
    image: "/banners/innovation.jpg",
    text: "Pioneering New Technologies",
    link: "/innovation"
  }
]

export default function Home() {
  return (
    <Banner 
      title="Our Services"
      banners={banners}
      columns={3}
    />
  )
}`

const apiProps = [
  { name: "title", type: "string", description: "Optional heading for the banner section." },
  { name: "banners", type: "BannerItem[]", description: "List of banner items with images, text, and links." },
  { name: "columns", type: "1 | 2 | 3 | 4", description: "Force a specific number of columns on desktop." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment and width." },
]

export function BannerPreview() {
  const [data, setData] = useState({
    title: "Explore Our Solutions",
    banners: initialBanners,
    align: "default" as const,
    columns: 3 as any
  })

  return (
    <DocPage
      name="Banner"
      description="A high-impact visual section with background images and overlay text."
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
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Columns</label>
            <select 
              value={data.columns} 
              onChange={(e) => setData({ ...data, columns: e.target.value ? Number(e.target.value) : undefined })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="">Auto</option>
              <option value="1">1 Column</option>
              <option value="2">2 Columns</option>
              <option value="3">3 Columns</option>
              <option value="4">4 Columns</option>
            </select>
          </div>
        </div>
      }
    >
      <Banner 
        {...data}
      />
    </DocPage>
  )
}

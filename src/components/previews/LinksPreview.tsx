import { useState } from 'react'
import { Links } from '../Links'
import { DocPage } from '../DocPage'

const sampleLinks = [
  {
    id: 1,
    title: "Global Reach",
    bodyText: "Expanding our digital presence across continents with seamless high-speed infrastructure.",
    icon: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop",
    isIcon: false,
    linkText: "Learn More",
    linkUrl: "#"
  },
  {
    id: 2,
    title: "Cloud Solutions",
    bodyText: "Enterprise-grade cloud infrastructure tailored to your most demanding scaling needs.",
    icon: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop",
    isIcon: false,
    linkText: "View Details",
    linkUrl: "#"
  },
  {
    id: 3,
    title: "Eco Architecture",
    bodyText: "Sustainability meets modern aesthetics in our latest green-energy project series.",
    icon: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=600&fit=crop",
    isIcon: false,
    linkText: "Read Case Study",
    linkUrl: "#"
  }
]

const componentCode = `import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface LinkItem {
  id: number | string
  icon?: string
  isIcon?: boolean
  title: string
  bodyText?: string
  linkText?: string
  linkUrl: string
}

export interface LinksProps {
  links: LinkItem[]
  align?: "default" | "wide" | "full"
  className?: string
}

export function Links({
  links = [],
  align = "default",
  className,
}: LinksProps) {
  return (
    <section className={cn(
      "py-12 md:py-16 lg:py-20 text-center",
      align === "wide" && "max-w-7xl mx-auto px-4",
      align === "full" && "w-full",
      align === "default" && "max-w-6xl mx-auto px-4",
      className
    )}>
      <div className="container mx-auto">
        <div className={cn(
          "grid gap-12 md:gap-8 lg:gap-12 grid-cols-1",
          links.length === 2 && "md:grid-cols-2",
          links.length === 3 && "md:grid-cols-3",
          links.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {links.map((item) => (
            <div key={item.id} className="flex flex-col items-center group">
              {item.icon && (
                <a href={item.linkUrl} className="mb-8 block w-full transition-transform duration-500 group-hover:scale-105">
                  <div className={cn(
                    "mx-auto flex items-center justify-center transition-all duration-300",
                    item.isIcon ? "w-16 h-16 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white text-primary" : "w-full aspect-video rounded-xl overflow-hidden border border-border shadow-sm group-hover:shadow-md"
                  )}>
                    <img src={item.icon} alt={item.title} className={cn("object-contain", item.isIcon ? "w-8 h-8 group-hover:invert duration-300" : "w-full h-full object-cover")} />
                  </div>
                </a>
              )}
              <div className="flex flex-1 flex-col px-4 text-center">
                <a href={item.linkUrl} className="hover:text-primary transition-colors"><h3 className="mb-4 text-xl font-bold md:text-2xl">{item.title}</h3></a>
                {item.bodyText && <div className="mb-8 text-muted-foreground prose prose-sm max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: item.bodyText }} />}
                {item.linkText && <div className="mt-auto"><Button variant="outline" size="sm" asChild><a href={item.linkUrl}>{item.linkText}</a></Button></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}`

const usageCode = `import { Links } from "@/components/Links"

const items = [
  { id: 1, title: "Support", linkUrl: "/support", linkText: "Contact Us" }
]

export default function Footer() {
  return (
    <Links links={items} align="wide" />
  )
}`

const apiProps = [
  { name: "links", type: "LinkItem[]", description: "Array of items to display. Supports icons or images." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Width and alignment of the container." },
]

export function LinksPreview() {
  const [data, setData] = useState({
    links: sampleLinks,
    align: "default" as const,
    columns: undefined as any,
    textAlign: "center" as const,
    cardStyle: "none" as const
  })

  return (
    <DocPage
      name="Links"
      description="A flexible grid of columns with icons/images, descriptions, and action buttons."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Columns</label>
            <select 
              value={data.columns || ''} 
              onChange={(e) => setData({ ...data, columns: e.target.value ? Number(e.target.value) as any : undefined })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="">Auto</option>
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Text Align</label>
            <select 
              value={data.textAlign} 
              onChange={(e) => setData({ ...data, textAlign: e.target.value as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="center">Center</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Style</label>
            <select 
              value={data.cardStyle} 
              onChange={(e) => setData({ ...data, cardStyle: e.target.value as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="none">Standard</option>
              <option value="flat">Flat Card</option>
              <option value="elevated">Elevated Card</option>
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
      <Links 
        {...data}
      />
    </DocPage>
  )
}

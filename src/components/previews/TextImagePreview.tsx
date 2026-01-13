import { useState } from 'react'
import { TextImage } from '../TextImage'
import { DocPage } from '../DocPage'

const initialLinks = [
  { id: 1, text: "Get Started Now", url: "#" },
  { id: 2, text: "Our Philosophy", url: "#" }
]

const componentCode = `import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface TextImageLink {
  id: number | string
  text: string
  url: string
}

export interface TextImageProps {
  headline?: string
  bodyText?: string
  image?: string
  imageOnLeft?: boolean
  addPadding?: boolean
  links?: TextImageLink[]
  align?: "default" | "wide" | "full"
  className?: string
}

export function TextImage({
  headline,
  bodyText,
  image,
  imageOnLeft = false,
  addPadding = true,
  links = [],
  align = "default",
  className,
}: TextImageProps) {
  return (
    <section className={cn(
      "overflow-hidden transition-all duration-500",
      addPadding ? "py-12 md:py-20 lg:py-24" : "p-0",
      align === "wide" && "max-w-7xl mx-auto px-4",
      align === "full" && "w-full",
      align === "default" && "max-w-6xl mx-auto px-4",
      className
    )}>
      <div className={cn("container mx-auto", !addPadding && "p-0 max-w-none")}>
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:items-center gap-8 md:gap-12 lg:gap-16", !addPadding && "gap-0")}>
          <div className={cn("relative min-h-[350px] md:min-h-[450px] lg:min-h-[600px] overflow-hidden group", imageOnLeft ? "md:order-1" : "md:order-2", addPadding && "rounded-3xl shadow-2xl")}>
            {image && <img src={image} alt={headline || ""} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-105" />}
          </div>
          <div className={cn("flex flex-col justify-center text-left", imageOnLeft ? "md:order-2" : "md:order-1", !addPadding && "p-8 md:p-12 lg:p-20")}>
            {headline && <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground leading-[1.1]">{headline}</h2>}
            {bodyText && <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: bodyText }} />}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {links.map((link) => <Button key={link.id} size="lg" asChild><a href={link.url}>{link.text}</a></Button>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}`

const usageCode = `import { TextImage } from "@/components/TextImage"

export default function Section() {
  return (
    <TextImage 
      headline="Innovation at Scale"
      bodyText="<p>We push the boundaries of what's possible with modern web technologies.</p>"
      image="/innovation.jpg"
      imageOnLeft={true}
    />
  )
}`

const apiProps = [
  { name: "headline", type: "string", description: "Main heading for the section." },
  { name: "bodyText", type: "string (HTML)", description: "Description or body text, supports HTML." },
  { name: "image", type: "string", description: "URL for the feature image." },
  { name: "imageOnLeft", type: "boolean", defaultValue: "false", description: "Whether to place the image on the left side." },
  { name: "addPadding", type: "boolean", defaultValue: "true", description: "Whether to add vertical padding and rounded corners." },
  { name: "links", type: "TextImageLink[]", description: "Array of CTA buttons." },
]

export function TextImagePreview() {
  const [data, setData] = useState({
    headline: "Design Meets Performance",
    bodyText: "<p>Experience the perfect harmony of stunning aesthetics and lightning-fast speed. Our components are optimized for every device and every user.</p><p>Built with the latest technologies to ensure your project stays ahead of the curve.</p>",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
    imageOnLeft: false,
    addPadding: true,
    links: initialLinks,
    align: "default" as const
  })

  return (
    <DocPage
      name="Text & Image"
      description="A versatile side-by-side layout for featuring content with high-quality visuals."
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
            <input 
              type="checkbox" 
              id="imageOnLeft"
              checked={data.imageOnLeft} 
              onChange={(e) => setData({ ...data, imageOnLeft: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="imageOnLeft" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Image on Left</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="addPadding"
              checked={data.addPadding} 
              onChange={(e) => setData({ ...data, addPadding: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="addPadding" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Add Padding</label>
          </div>
        </div>
      }
    >
      <TextImage 
        {...data}
      />
    </DocPage>
  )
}

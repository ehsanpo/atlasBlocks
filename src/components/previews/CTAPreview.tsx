import { useState } from 'react'
import { CTA } from '../CTA'
import { DocPage } from '../DocPage'

const initialLinks = [
  { id: 1, text: "Get Started Now", url: "#" },
  { id: 2, text: "Learn More", url: "#" }
]

const componentCode = `import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface CTALink {
  id: number | string
  text: string
  url: string
}

export interface CTAProps {
  headline?: string
  subheadline?: string
  links?: CTALink[]
  backgroundImage?: string
  backgroundColor?: string
  align?: "default" | "wide" | "full"
  className?: string
}

export function CTA({
  headline,
  subheadline,
  links = [],
  backgroundImage,
  backgroundColor,
  align = "default",
  className,
}: CTAProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20 text-center relative overflow-hidden",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
      style={{ 
        backgroundColor,
        backgroundImage: backgroundImage ? \`url(\${backgroundImage})\` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50 z-0" />
      )}
      
      <div className={cn("container mx-auto relative z-10", backgroundImage && "text-white")}>
        {headline && (
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl drop-shadow-sm">
            {headline}
          </h2>
        )}
        
        {subheadline && (
          <div 
            className="box-content mx-auto mb-10 max-w-[600px] text-lg opacity-90 md:text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
        
        {links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <Button
                key={link.id}
                variant={backgroundImage ? "secondary" : "default"}
                size="lg"
                asChild
              >
                <a href={link.url}>
                  {link.text}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}`

const usageCode = `import { CTA } from "@/components/CTA"

export default function CTASection() {
  return (
    <CTA 
      headline="Join Our Community"
      subheadline="Start your journey with us today and unlock exclusive benefits."
      links={[{ id: 1, text: "Sign Up", url: "/signup" }]}
      backgroundImage="/cta-bg.jpg"
    />
  )
}`

const apiProps = [
  { name: "headline", type: "string", description: "The main heading of the CTA block." },
  { name: "subheadline", type: "string (HTML)", description: "Secondary text or description below the headline." },
  { name: "links", type: "CTALink[]", description: "Array of button labels and target URLs." },
  { name: "backgroundImage", type: "string", description: "URL for a background image." },
  { name: "backgroundColor", type: "string", description: "Background color if no image is used." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Width and alignment of the container." },
]

export function CTAPreview() {
  const [data, setData] = useState({
    headline: "Ready to Start Your Next Project?",
    subheadline: "Join over 5,000 teams who build better software with our tools and components.",
    links: initialLinks,
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop",
    align: "default" as const
  })

  return (
    <DocPage
      name="Call to Action"
      description="A high-conversion section designed to drive users toward a specific goal."
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
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Headline</label>
            <input 
              type="text" 
              value={data.headline} 
              onChange={(e) => setData({ ...data, headline: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-48"
            />
          </div>
        </div>
      }
    >
      <CTA 
        {...data}
      />
    </DocPage>
  )
}

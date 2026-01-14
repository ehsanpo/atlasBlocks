import { useState } from 'react'
import { Footer } from '../Footer'
import { DocPage } from '../DocPage'

const sampleSections = [
  {
    title: "Product",
    links: [
      { label: "Features", url: "#" },
      { label: "Integrations", url: "#" },
      { label: "Pricing", url: "#" },
      { label: "Changelog", url: "#" },
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", url: "#" },
      { label: "Careers", url: "#" },
      { label: "Blog", url: "#" },
      { label: "Contact", url: "#" },
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Documentation", url: "#" },
      { label: "Help Center", url: "#" },
      { label: "Community", url: "#" },
      { label: "API Status", url: "#" },
    ]
  }
]

const componentCode = `import { cn } from "@/lib/utils"
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react"

export interface FooterLink {
  label: string
  url: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  logo?: React.ReactNode
  description?: string
  sections: FooterSection[]
  copyright?: string
  align?: "default" | "wide" | "full"
  className?: string
}

export function Footer({
  logo = <span className="text-xl font-bold">Atlas Blocks</span>,
  description = "Building the future of the web with premium components.",
  sections = [],
  copyright = "...",
  align = "default",
  className,
}: FooterProps) {
  return (
    <footer className={cn(
      "border-t bg-muted/50 py-12",
      align === "wide" && "max-w-7xl mx-auto px-4",
      align === "full" && "w-full",
      align === "default" && "max-w-6xl mx-auto px-4",
      className
    )}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            {logo}
            {description && <p className="mt-4 text-sm text-muted-foreground">{description}</p>}
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.url} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {copyright && (
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            {copyright}
          </div>
        )}
      </div>
    </footer>
  )
}`

const usageCode = `import { Footer } from "@/components/Footer"

const sections = [
  { title: "Links", links: [{ label: "Home", url: "/" }] }
]

export default function Page() {
  return (
    <Footer 
      description="Sustainable designs for modern brands."
      baseSections={sections} 
    />
  )
}`

const apiProps = [
  { name: "logo", type: "ReactNode", description: "Brand logo element." },
  { name: "description", type: "string", description: "Brief brand description." },
  { name: "sections", type: "FooterSection[]", description: "Array of link columns." },
  { name: "copyright", type: "string", description: "Small print at the bottom." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment." },
]

export function FooterPreview() {
  const [data, setData] = useState({
    description: "Building the future of the web with premium components and state-of-the-art design systems.",
    sections: sampleSections,
    align: "default" as const,
    gradientBackground: false
  })

  return (
    <DocPage
      name="Footer"
      description="A navigation-rich footer for the bottom of every page."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="gradientBackground"
              checked={data.gradientBackground} 
              onChange={(e) => setData({ ...data, gradientBackground: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="gradientBackground" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Gradient Effect</label>
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
        <Footer 
          {...data}
        />
      </div>
    </DocPage>
  )
}

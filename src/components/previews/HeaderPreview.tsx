import { useState } from 'react'
import { Header } from '../Header'
import { DocPage } from '../DocPage'

const sampleLinks = [
  { label: "Products", url: "#", children: [
    { label: "Cloud Engine", url: "#" },
    { label: "Edge Computing", url: "#" },
    { label: "Global DB", url: "#" },
  ]},
  { label: "Pricing", url: "#" },
  { label: "Resources", url: "#", children: [
    { label: "Documentation", url: "#" },
    { label: "API Reference", url: "#" },
    { label: "Guides", url: "#" },
  ]},
  { label: "Company", url: "#" },
]

const componentCode = `import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown, Rocket } from "lucide-react"
import { Button } from "./ui/button"

export interface NavLink {
  label: string
  url: string
  children?: NavLink[]
}

export interface HeaderProps {
  logo?: React.ReactNode
  links: NavLink[]
  ctaText?: string
  ctaUrl?: string
  sticky?: boolean
  transparent?: boolean
}

export function Header({
  logo,
  links = [],
  ctaText = "Get Started",
  ctaUrl = "#",
  sticky = true,
  transparent = false,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  return (
    <header className={cn(
      "w-full border-b",
      sticky && "sticky top-0 z-50",
      transparent && !scrolled && "bg-transparent",
      "bg-background"
    )}>
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          {logo}
          <ul className="hidden md:flex gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.url} className="text-sm font-medium hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Button asChild>
          <a href={ctaUrl}>{ctaText}</a>
        </Button>
      </nav>
    </header>
  )
}`

const usageCode = `import { Header } from "@/components/Header"

const links = [
  { label: "Features", url: "#" },
  { label: "Blog", url: "#" }
]

export default function Layout({ children }) {
  return (
    <>
      <Header links={links} sticky={true} />
      <main>{children}</main>
    </>
  )
}`

const apiProps = [
  { name: "logo", type: "ReactNode", description: "Brand logo element." },
  { name: "links", type: "NavLink[]", description: "Navigation links with optional dropdowns." },
  { name: "ctaText", type: "string", defaultValue: "Get Started", description: "Text for the prominent CTA button." },
  { name: "sticky", type: "boolean", defaultValue: "true", description: "Whether the header stays at the top on scroll." },
  { name: "transparent", type: "boolean", defaultValue: "false", description: "Transparent background that fills on scroll." },
]

export function HeaderPreview() {
  const [data, setData] = useState({
    ctaText: "Get Started",
    sticky: true,
    transparent: false,
    links: sampleLinks
  })

  return (
    <DocPage
      name="Header"
      description="A high-performance navigation bar with mobile-responsive menu and dropdowns."
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
              id="sticky"
              checked={data.sticky} 
              onChange={(e) => setData({ ...data, sticky: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="sticky" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Sticky</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="transparent"
              checked={data.transparent} 
              onChange={(e) => setData({ ...data, transparent: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="transparent" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Transparent Initial</label>
          </div>
        </div>
      }
    >
      <div className="w-full relative h-[600px] border rounded-2xl overflow-y-auto bg-muted/5 shadow-inner">
        <Header 
          {...data}
        />
        <div className="p-12 text-center text-muted-foreground pt-40 flex flex-col items-center">
          <div className="bg-background/80 backdrop-blur border border-border p-6 rounded-2xl shadow-xl max-w-sm">
             <h4 className="font-bold text-foreground mb-2">Scroll Demo Area</h4>
             <p className="text-sm">Scroll down inside this box to test the <strong>Sticky</strong> and <strong>Transparent</strong> behavior.</p>
          </div>
          <div className="h-[2000px] mt-8 bg-gradient-to-b from-transparent via-primary/5 to-muted/20 w-full rounded-2xl" />
        </div>
      </div>
    </DocPage>
  )
}

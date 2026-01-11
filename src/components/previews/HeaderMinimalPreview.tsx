import { useState } from 'react'
import { HeaderMinimal } from '../HeaderMinimal'
import { DocPage } from '../DocPage'

const componentCode = `import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

export interface NavLink {
  key: string
  href: string
  label: string
}

export interface HeaderMinimalProps {
  logoText?: string
  logoImage?: string
  navLinks?: NavLink[]
  githubUrl?: string
  githubLabel?: string
  currentPage?: string
  className?: string
}

export function HeaderMinimal({
  logoText = "Atlas Blocks",
  logoImage,
  navLinks = [],
  githubUrl = "https://github.com",
  githubLabel = "GITHUB",
  currentPage = "home",
  className,
}: HeaderMinimalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className={cn("fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[400px] md:max-w-2xl transition-all duration-300", className)}>
      <div className="rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between border border-white/10 bg-[#050505]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
        <a href="#" className="font-black text-lg tracking-tighter uppercase flex items-center gap-2.5 group shrink-0">
          <div className="w-6 h-6 md:w-5 md:h-5 bg-primary rounded-lg group-hover:scale-110 transition-transform duration-300" />
          <span className="text-white text-base md:text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F24E1E] group-hover:via-[#FFC700] group-hover:to-[#1ABCFE] transition-all duration-300">
            {logoText}
          </span>
        </a>
        
        <div className="hidden md:flex gap-8 font-mono text-[10px] tracking-widest font-medium text-white/70">
          {navLinks.map((link) => (
            <a 
              key={link.key} 
              href={link.href} 
              className={cn(
                "transition-colors hover:text-white relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                currentPage === link.key ? "text-white after:w-full" : ""
              )}
            >
              {link.label}
            </a>
          ))}
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
            {githubLabel} <Icons.ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white/90 p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-90">
          {isOpen ? <Icons.X className="w-5 h-5" /> : <Icons.Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className={cn(
        "absolute top-[calc(100%+12px)] left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex-col gap-2 origin-top transition-all duration-300 shadow-2xl shadow-black/80 ring-1 ring-white/5",
        isOpen ? "flex scale-100 opacity-100" : "hidden scale-95 opacity-0"
      )}>
        {navLinks.map((link) => (
          <a key={link.key} href={link.href} onClick={() => setIsOpen(false)} className={cn("text-sm font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between group", currentPage === link.key ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5")}>
            {link.label}
            <Icons.ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-white/50 w-4 h-4" />
          </a>
        ))}
      </div>
    </nav>
  )
}`

const usageCode = `import { HeaderMinimal } from "@/components/HeaderMinimal"

export default function Layout() {
  return (
    <HeaderMinimal 
      logoText="Atlas Blocks"
      currentPage="home"
      navLinks={[
        { key: "home", href: "#", label: "HOME" },
        { key: "download", href: "#", label: "DOWNLOAD" },
        { key: "online", href: "#", label: "ONLINE" },
        { key: "roadmap", href: "#", label: "ROADMAP" },
      ]}
    />
  )
}`

const apiProps = [
  { name: "logoText", type: "string", defaultValue: "Atlas Blocks", description: "Text for the brand logo." },
  { name: "logoImage", type: "string", description: "Optional image URL for the logo icon." },
  { name: "navLinks", type: "NavLink[]", description: "Array of navigation links." },
  { name: "currentPage", type: "string", defaultValue: "home", description: "Key of the active page for styling." },
  { name: "githubUrl", type: "string", description: "External project URL." },
]

export function HeaderMinimalPreview() {
  const [data, setData] = useState({
    logoText: "Atlas Blocks",
    currentPage: "home",
    githubUrl: "https://github.com",
    githubLabel: "GITHUB",
    navLinks: [
      { key: "home", href: "#", label: "HOME" },
      { key: "features", href: "#", label: "FEATURES" },
      { key: "about", href: "#", label: "ABOUT" },
      { key: "contact", href: "#", label: "CONTACT" },
    ]
  })

  return (
    <DocPage
      name="Minimalist Floating Header"
      description="A sleek, centered floating navigation bar with glassmorphism effects and built-in mobile responsive menu."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Brand</label>
            <input 
              type="text" 
              value={data.logoText} 
              onChange={(e) => setData({ ...data, logoText: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Active Key</label>
            <input 
              type="text" 
              value={data.currentPage} 
              onChange={(e) => setData({ ...data, currentPage: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
        </div>
      }
    >
      <div className="relative h-[400px] w-full bg-grid-premium/10 rounded-3xl overflow-hidden border border-border">
         <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
         <HeaderMinimal {...data} className="absolute !top-10" />
         <div className="flex items-center justify-center h-full text-muted-foreground font-mono text-[10px] uppercase tracking-[0.3em]">
            Header Container Preview
         </div>
      </div>
    </DocPage>
  )
}

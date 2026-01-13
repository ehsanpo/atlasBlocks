import { useState } from 'react'
import { HeroPremium } from '../HeroPremium'
import { DocPage } from '../DocPage'

const componentCode = `import React from "react"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

export interface HeroPremiumProps {
  tag?: string
  titleLine1?: string
  titleLine2?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  className?: string
}

export function HeroPremium({
  tag = "System v2.0 Online",
  titleLine1 = "Supercharge",
  titleLine2 = "your web app",
  primaryButtonText = "Download v2.0",
  primaryButtonLink = "#",
  secondaryButtonText = "Documentation",
  secondaryButtonLink = "#",
  className,
}: HeroPremiumProps) {
  return (
    <section 
      className={cn("relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-background", className)}
    >
        {/* Background Elements */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, oklch(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--primary) / 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none mix-blend-screen animate-pulse duration-[5000ms]"></div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 border border-white/5 rounded-full pl-2 pr-4 py-1 bg-black/40 backdrop-blur-md hover:border-white/10 transition-colors">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{tag}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-black text-6xl md:text-9xl tracking-tighter uppercase leading-[0.85] select-none text-white drop-shadow-2xl">
                {titleLine1} <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">{titleLine2}</span>
            </h1>
            
            {/* Actions */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                 <a 
                    href={primaryButtonLink} 
                    className="h-14 px-10 bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all rounded-full flex items-center gap-3 hover:scale-105 active:scale-95"
                 >
                         <span>{primaryButtonText}</span>
                         <Icons.ArrowDown className="w-5 h-5" />
                 </a>
                 <a 
                    href={secondaryButtonLink} 
                    className="h-14 px-10 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest rounded-full flex items-center gap-3 transition-all hover:bg-white/5 hover:scale-105 active:scale-95"
                 >
                    <Icons.BookOpen className="w-5 h-5" />
                    <span>{secondaryButtonText}</span>
                 </a>
            </div>
        </div>
        
    </section>
  )
}`

const usageCode = `import { HeroPremium } from "@/components/HeroPremium"

export default function Section() {
  return (
    <HeroPremium 
      tag="System v2.0 Online"
      titleLine1="Modern"
      titleLine2="Workflows."
      primaryButtonText="Get Started"
      secondaryButtonText="Learn More"
    />
  )
}`

const apiProps = [
  { name: "tag", type: "string", defaultValue: "System v2.0 Online", description: "Status tag shown above the title." },
  { name: "titleLine1", type: "string", defaultValue: "Supercharge", description: "First line of the main title." },
  { name: "titleLine2", type: "string", defaultValue: "your web app", description: "Second line of the main title (with gradient)." },
  { name: "primaryButtonText", type: "string", defaultValue: "Download v2.0", description: "Text for the primary button." },
  { name: "primaryButtonLink", type: "string", defaultValue: "#", description: "URL for the primary button." },
  { name: "secondaryButtonText", type: "string", defaultValue: "Documentation", description: "Text for the secondary button." },
  { name: "secondaryButtonLink", type: "string", defaultValue: "#", description: "URL for the secondary button." },
]

export function HeroPremiumPreview() {
  const [data, setData] = useState({
    tag: "System v2.0 Online",
    titleLine1: "Supercharge",
    titleLine2: "your web app",
    primaryButtonText: "Download v2.0",
    primaryButtonLink: "#",
    secondaryButtonText: "Documentation",
    secondaryButtonLink: "#",
  })

  return (
    <DocPage
      name="Premium Hero Block"
      description="A futuristic, high-end hero section with animated backgrounds, glow effects, and precision typography."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Tag</label>
            <input 
              type="text" 
              value={data.tag} 
              onChange={(e) => setData({ ...data, tag: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Title L1</label>
            <input 
              type="text" 
              value={data.titleLine1} 
              onChange={(e) => setData({ ...data, titleLine1: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Title L2</label>
            <input 
              type="text" 
              value={data.titleLine2} 
              onChange={(e) => setData({ ...data, titleLine2: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Primary Btn</label>
            <input 
              type="text" 
              value={data.primaryButtonText} 
              onChange={(e) => setData({ ...data, primaryButtonText: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Secondary Btn</label>
            <input 
              type="text" 
              value={data.secondaryButtonText} 
              onChange={(e) => setData({ ...data, secondaryButtonText: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
        </div>
      }
    >
      <HeroPremium 
        {...data}
      />
    </DocPage>
  )
}

import { useState } from 'react'
import { FeatureBlock } from '../FeatureBlock'
import { DocPage } from '../DocPage'

const initialFeatures = [
  {
    title: "Next-Gen Design",
    description: "Experience the pinnacle of modern web aesthetics with our pixel-perfect components.",
    icon: (
      <div className="w-5 h-5 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
        </div>
      </div>
    )
  },
  {
    title: "Ultra Performance",
    description: "Built for speed and optimized for high-performance applications across all platforms.",
    icon: (
      <div className="w-5 h-5 flex items-center justify-center text-primary">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
          <circle cx="0" cy="0" r="2.05" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      </div>
    )
  }
]

const componentCode = `import React from "react"
import { cn } from "@/lib/utils"

export interface FeatureBlockItem {
  icon?: string | React.ReactNode
  title: string
  description: string
}

export interface FeatureBlockProps {
  tag?: string
  headline: string
  features?: FeatureBlockItem[]
  image: string
  appTitle?: string
  imageOnLeft?: boolean
  backgroundColor?: string
  className?: string
}

export function FeatureBlock({
  tag,
  headline,
  features = [],
  image,
  appTitle = "preview-v1",
  imageOnLeft = false,
  backgroundColor,
  className,
}: FeatureBlockProps) {
  return (
    <section 
      className={cn("py-20 overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
          imageOnLeft && "direction-rtl"
        )}>
          <div className={cn(
            "space-y-6 reveal-wrapper",
            imageOnLeft ? "lg:order-2" : "lg:order-1"
          )}>
            {tag && (
              <span className="inline-block font-mono text-xs text-primary uppercase tracking-widest border border-primary/20 bg-primary/5 px-2 py-1 rounded">
                {tag}
              </span>
            )}
            <h2 
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
            {features.length > 0 && (
              <ul className="space-y-4 pt-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0">
                      {typeof feature.icon === 'string' ? (
                        <img src={feature.icon} alt="" className="w-5 h-5 object-contain" />
                      ) : (
                        feature.icon
                      )}
                    </div>
                    <div>
                      <h4 className="text-foreground font-bold text-sm uppercase">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={cn(
            "relative group reveal-wrapper perspective-container",
            imageOnLeft ? "lg:order-1" : "lg:order-2"
          )}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505] rotate-3d hover:transition-transform duration-500">
                 <div className="h-8 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-[8px] opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 text-yellow-500 opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 text-green-500 opacity-70"></div>
                    <div className="ml-auto text-[10px] font-mono text-muted-foreground/50">{appTitle}</div>
                 </div>
                 <img src={image} alt={headline} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}`

const usageCode = `import { FeatureBlock } from "@/components/FeatureBlock"

export default function Section() {
  return (
    <FeatureBlock 
      tag="Premium"
      headline="Future<br/>Ready."
      image="/app-screenshot.png"
      features={[
        {
          title: "Modern UI",
          description: "Stunning aesthetics for your application.",
          icon: <MyIcon />
        }
      ]}
    />
  )
}`

const apiProps = [
  { name: "tag", type: "string", description: "Small label shown above the headline." },
  { name: "headline", type: "string", description: "Main title (supports HTML/line breaks)." },
  { name: "features", type: "FeatureBlockItem[]", description: "Array of features with icons and text." },
  { name: "image", type: "string", description: "Main application/product image for the mockup." },
  { name: "appTitle", type: "string", defaultValue: "preview-v1", description: "Title text in the window bar." },
  { name: "imageOnLeft", type: "boolean", defaultValue: "false", description: "Switch image and text positions." },
]

export function FeatureBlockPreview() {
  const [data, setData] = useState({
    tag: "Aesthetics",
    headline: "Premium<br/>Interfaces.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    appTitle: "atlas-pro-v1",
    imageOnLeft: false,
    features: initialFeatures
  })

  return (
    <DocPage
      name="Product Feature Block"
      description="A high-end product feature section with 3D perspective mockup and glassmorphism details."
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
              id="imageOnLeft"
              checked={data.imageOnLeft} 
              onChange={(e) => setData({ ...data, imageOnLeft: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="imageOnLeft" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Image on Left</label>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Headline</label>
            <input 
              type="text" 
              value={data.headline} 
              onChange={(e) => setData({ ...data, headline: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">App Title</label>
            <input 
              type="text" 
              value={data.appTitle} 
              onChange={(e) => setData({ ...data, appTitle: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>

        </div>
      }
    >
      <FeatureBlock 
        {...data}
      />
    </DocPage>
  )
}

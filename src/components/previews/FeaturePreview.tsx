import { useState } from 'react'
import { Feature } from '../Feature'
import { DocPage } from '../DocPage'

const sampleFeatures = [
  { id: 1, title: "Lightning Fast", description: "Experience blazing fast load times with our optimized global delivery network.", iconName: "Zap" as const },
  { id: 2, title: "Secure by Design", description: "Built-in enterprise-grade security to keep your data safe and compliant.", iconName: "Shield" as const },
  { id: 3, title: "Global Scale", description: "Deploy your infrastructure across 30+ regions worldwide with just one click.", iconName: "Globe" as const },
  { id: 4, title: "Smart Analytics", description: "Get deep insights into your users' behavior with our real-time tracking.", iconName: "BarChart3" as const },
  { id: 5, title: "Infinite Growth", description: "Scale your business without limits using our flexible tiered pricing models.", iconName: "TrendingUp" as const },
  { id: 6, title: "24/7 Support", description: "Our expert team is always available to help you resolve any technical issues.", iconName: "LifeBuoy" as const },
]

const componentCode = `import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

export interface FeatureItem {
  id: number | string
  title: string
  description: string
  iconName: keyof typeof Icons
}

export interface FeatureProps {
  headline?: string
  subheadline?: string
  features: FeatureItem[]
  columns?: 2 | 3 | 4
  align?: "default" | "wide" | "full"
  backgroundColor?: string
  className?: string
}

export function Feature({
  headline = "Why Choose Us",
  subheadline = "Detailed features that make our platform stand out from the competition.",
  features = [],
  columns = 3,
  align = "default",
  backgroundColor,
  className,
}: FeatureProps) {
  // Implementation...
}`

const usageCode = `import { Feature } from "@/components/Feature"

const features = [
  { id: 1, title: "Fast", description: "It is fast.", iconName: "Zap" }
]

export default function Section() {
  return (
    <Feature 
      headline="Our Core Features"
      features={features}
      columns={3}
    />
  )
}`

const apiProps = [
  { name: "headline", type: "string", defaultValue: "Why Choose Us", description: "The main heading for the section." },
  { name: "subheadline", type: "string", description: "Supporting description below the heading." },
  { name: "features", type: "FeatureItem[]", description: "Array of feature objects with icons and text." },
  { name: "columns", type: "2 | 3 | 4", defaultValue: "3", description: "Number of columns to show on Desktop." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment." },
]

export function FeaturePreview() {
  const [data, setData] = useState({
    headline: "Built for Modern Teams",
    subheadline: "Everything you need to build, scale, and grow your digital products at any scale.",
    features: sampleFeatures,
    columns: 3 as const,
    textAlign: "center" as const,
    iconPosition: "top" as const,
    align: "default" as const
  })

  return (
    <DocPage
      name="Feature Block"
      description="A flexible grid for highlighting key features or capabilities with icons."
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
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Text Align</label>
            <select 
              value={data.textAlign} 
              onChange={(e) => setData({ ...data, textAlign: e.target.value as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="center">Center</option>
              <option value="left">Left</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Icon Position</label>
            <select 
              value={data.iconPosition} 
              onChange={(e) => setData({ ...data, iconPosition: e.target.value as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="top">Top</option>
              <option value="side">Side</option>
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
      <Feature 
        {...data}
      />
    </DocPage>
  )
}

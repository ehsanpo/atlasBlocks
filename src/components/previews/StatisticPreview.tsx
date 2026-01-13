import { useState } from 'react'
import { Statistic } from '../Statistic'
import { DocPage } from '../DocPage'

const sampleStats = [
  { id: 1, label: "Happy Clients", value: "2.5", suffix: "k+", description: "Satisfied customers across the globe." },
  { id: 2, label: "Projects Done", value: "450", suffix: "+", description: "Successfully delivered digital experiences." },
  { id: 3, label: "Years Experience", value: "12", suffix: "", description: "A decade of mastering modern technologies." },
  { id: 4, label: "Support Hours", value: "24/7", suffix: "", description: "Dedicated assistance whenever you need it." },
]

const componentCode = `import { cn } from "@/lib/utils"

export interface StatItem {
  id: number | string
  label: string
  value: string
  suffix?: string
  description?: string
}

export interface StatisticProps {
  headline?: string
  stats: StatItem[]
  columns?: 2 | 3 | 4
  align?: "default" | "wide" | "full"
  className?: string
}

export function Statistic({
  headline,
  stats = [],
  columns = 4,
  align = "default",
  className,
}: StatisticProps) {
  // Implementation...
}`

const usageCode = `import { Statistic } from "@/components/Statistic"

const stats = [
  { id: 1, label: "Users", value: "10", suffix: "M" }
]

export default function Page() {
  return (
    <Statistic 
      headline="Our Impact"
      stats={stats}
      columns={4}
    />
  )
}`

const apiProps = [
  { name: "headline", type: "string", description: "Optional section heading." },
  { name: "stats", type: "StatItem[]", description: "Array of data points to display." },
  { name: "columns", type: "2 | 3 | 4", defaultValue: "4", description: "Grid layout for desktop screens." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container width." },
]

export function StatisticPreview() {
  const [data, setData] = useState({
    headline: "The Impact of Atlas Blocks",
    stats: sampleStats,
    columns: 4 as const,
    align: "default" as const
  })

  return (
    <DocPage
      name="Statistic Block"
      description="Showcase your results and milestones with large, dynamic counters and metadata."
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
        <Statistic 
          {...data}
        />
      </div>
    </DocPage>
  )
}

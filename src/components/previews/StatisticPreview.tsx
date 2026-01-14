import { useState } from 'react'
import { Statistic } from '../Statistic'
import { DocPage } from '../DocPage'

const sampleStats = [
  { id: 1, label: "Downloads", value: "2.5", suffix: "k+", description: "npm installs this month" },
  { id: 2, label: "Components", value: "28", suffix: "", description: "Production-ready blocks" },
  { id: 3, label: "Bundle Size", value: "12", suffix: "kb", description: "Tree-shakeable components" },
  { id: 4, label: "GitHub Stars", value: "847", suffix: "", description: "And growing daily" },
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
  return (
    <section className={cn(
      "py-12 md:py-16 lg:py-20",
      align === "wide" && "max-w-7xl mx-auto px-4",
      align === "full" && "w-full",
      align === "default" && "max-w-6xl mx-auto px-4",
      className
    )}>
      <div className="container mx-auto">
        {headline && (
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-5xl">{headline}</h2>
        )}
        <div className={cn(
          "grid gap-8",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary md:text-6xl">
                {stat.value}{stat.suffix}
              </div>
              <div className="mb-2 text-lg font-semibold">{stat.label}</div>
              {stat.description && (
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
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

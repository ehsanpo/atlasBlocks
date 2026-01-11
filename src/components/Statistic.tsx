import { cn } from "@/lib/utils"

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
  backgroundColor?: string
  className?: string
}

export function Statistic({
  headline,
  stats = [],
  columns = 4,
  align = "default",
  backgroundColor,
  className,
}: StatisticProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
      style={{ backgroundColor }}
    >
      {headline && (
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{headline}</h2>
        </div>
      )}

      <div
        className={cn(
          "grid gap-8 text-center",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-2 lg:grid-cols-4"
        )}
      >
        {stats.map((stat) => (
          <div key={stat.id} className="relative p-6 rounded-2xl border border-transparent hover:border-border transition-all duration-300">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-2 flex">
                {stat.value}
                {stat.suffix && <span className="text-primary ml-1">{stat.suffix}</span>}
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {stat.label}
              </span>
              {stat.description && (
                <p className="font-mono text-xs text-muted-foreground max-w-[150px] leading-relaxed">
                  {stat.description}
                </p>
              )}
            </div>
            {/* Subtle highlight effect */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity rounded-2xl -z-10" />
          </div>
        ))}
      </div>
    </section>
  )
}

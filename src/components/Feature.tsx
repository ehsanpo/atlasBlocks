import { cn } from "@/lib/utils"
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
  textAlign?: "center" | "left"
  iconPosition?: "top" | "side"
  align?: "default" | "wide" | "full"
  backgroundColor?: string
  className?: string
}

export function Feature({
  headline = "Why Choose Us",
  subheadline = "Detailed features that make our platform stand out from the competition.",
  features = [],
  columns = 3,
  textAlign = "center",
  iconPosition = "top",
  align = "default",
  backgroundColor,
  className,
}: FeatureProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-20 lg:py-24",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
      style={{ backgroundColor }}
    >
      <div className={cn(
        "mx-auto max-w-2xl mb-16",
        textAlign === "center" ? "text-center" : "text-left"
      )}>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">{headline}</h2>
        <p className="text-lg text-muted-foreground">{subheadline}</p>
      </div>

      <div
        className={cn(
          "grid gap-8 md:gap-12",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {features.map((feature) => {
          const Icon = (Icons[feature.iconName] as any) || Icons.CheckCircle
          return (
            <div 
              key={feature.id} 
              className={cn(
                "group relative p-8 rounded-3xl border border-border bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/20",
                iconPosition === "top" ? "flex flex-col" : "flex flex-row gap-6",
                textAlign === "center" && iconPosition === "top" ? "items-center text-center" : "items-start text-left"
              )}
            >
              <div className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6",
                iconPosition === "top" ? "mb-6" : "mb-0"
              )}>
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                <p className="font-mono text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface LinkItem {
  id: number | string
  icon?: string
  isIcon?: boolean
  title: string
  bodyText?: string
  linkText?: string
  linkUrl: string
}

export interface LinksProps {
  links: LinkItem[]
  align?: "default" | "wide" | "full"
  columns?: 1 | 2 | 3 | 4
  textAlign?: "left" | "center" | "right"
  cardStyle?: "none" | "flat" | "elevated"
  className?: string
}

export function Links({
  links = [],
  align = "default",
  columns,
  textAlign = "center",
  cardStyle = "none",
  className,
}: LinksProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  const gridClass = columns 
    ? columnClasses[columns] 
    : cn(
      "grid-cols-1",
      links.length === 2 && "md:grid-cols-2",
      links.length === 3 && "md:grid-cols-3",
      links.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
    )

  return (
    <section
      className={cn(
        "py-12 md:py-20",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
    >
      <div className="container mx-auto">
        <div className={cn("grid gap-12 md:gap-8 lg:gap-10", gridClass)}>
          {links.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "flex flex-col group transition-all duration-300",
                textAlign === "left" && "items-start text-left",
                textAlign === "center" && "items-center text-center",
                textAlign === "right" && "items-end text-right",
                cardStyle === "flat" && "p-8 rounded-2xl border border-border bg-card hover:border-primary/20",
                cardStyle === "elevated" && "p-8 rounded-2xl border border-border bg-card hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1"
              )}
            >
              {/* Icon/Image */}
              {item.icon && (
                <a 
                  href={item.linkUrl} 
                  className="mb-8 block transition-transform duration-500 group-hover:scale-105"
                >
                  <div className={cn(
                    "flex items-center justify-center transition-all duration-300",
                    item.isIcon ? "w-16 h-16 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground text-primary" : "w-full aspect-video rounded-xl overflow-hidden border border-border shadow-sm group-hover:shadow-md"
                  )}>
                    <img
                      src={item.icon}
                      alt={item.title}
                      className={cn(
                        "object-contain",
                        item.isIcon ? "w-8 h-8 group-hover:brightness-0 group-hover:invert duration-300" : "w-full h-full object-cover"
                      )}
                    />
                  </div>
                </a>
              )}
              
              {/* Content */}
              <div className={cn(
                "flex flex-col transition-all duration-300",
                cardStyle !== "none" ? "px-0" : "px-4"
              )}>
                <a href={item.linkUrl} className="hover:text-primary transition-colors">
                  <h3 className="mb-4 text-xl font-bold md:text-2xl tracking-tight">
                    {item.title}
                  </h3>
                </a>
                
                {item.bodyText && (
                  <div 
                    className="font-mono mb-8 text-muted-foreground prose prose-sm max-w-none dark:prose-invert leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.bodyText }}
                  />
                )}
                
                {item.linkText && (
                  <div className="mt-auto">
                    <Button
                      variant={cardStyle !== "none" ? "default" : "outline"}
                      size="sm"
                      className="rounded-full px-6 font-bold uppercase tracking-widest text-[10px]"
                      asChild
                    >
                      <a href={item.linkUrl}>
                        {item.linkText}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


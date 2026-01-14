import { cn } from "@/lib/utils"

export interface BannerItem {
  id: number | string
  image: string
  text: string
  link: string
}

export interface BannerProps {
  title?: string
  banners: BannerItem[]
  align?: "default" | "wide" | "full"
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function Banner({
  title,
  banners = [],
  align = "default",
  columns,
  className,
}: BannerProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  const gridClass = columns 
    ? columnClasses[columns] 
    : cn(
      "grid-cols-1",
      banners.length >= 2 && "md:grid-cols-2",
      banners.length >= 3 && "lg:grid-cols-3"
    )

  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
    >
      <div className="container mx-auto">
        {title && (
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl text-left">
            {title}
          </h2>
        )}
        
        <div className={cn("grid gap-6 md:gap-8", gridClass)}>
          {banners.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="group relative block min-h-[300px] overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90 mt-auto" />
              
              <div className="relative z-10 flex h-full items-end justify-start p-8">
                <h3 className="text-xl font-bold text-white drop-shadow-md transition-all duration-300 group-hover:translate-x-2 md:text-2xl text-left">
                  {item.text}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}


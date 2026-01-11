import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface TextImageLink {
  id: number | string
  text: string
  url: string
}

export interface TextImageProps {
  /**
   * Main headline
   */
  headline?: string
  
  /**
   * Body text (supports HTML)
   */
  bodyText?: string
  
  /**
   * Image URL
   */
  image?: string
  
  /**
   * Position the image on the left side
   * @default false
   */
  imageOnLeft?: boolean
  
  /**
   * Add extra padding to the section
   * @default true
   */
  addPadding?: boolean
  
  /**
   * Action links
   */
  links?: TextImageLink[]
  
  /**
   * Section background color
   */
  backgroundColor?: string
  
  /**
   * Alignment of the component
   * @default "default"
   */
  align?: "default" | "wide" | "full"
  
  /**
   * Additional CSS classes
   */
  className?: string
}

export function TextImage({
  headline,
  bodyText,
  image,
  imageOnLeft = false,
  addPadding = true,
  links = [],
  backgroundColor,
  align = "default",
  className,
}: TextImageProps) {
  return (
    <section
      className={cn(
        "overflow-hidden transition-all duration-500",
        addPadding ? "py-12 md:py-20 lg:py-24" : "p-0",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
      style={{ backgroundColor }}
    >
      <div className={cn("container mx-auto", !addPadding && "p-0 max-w-none")}>
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:items-center gap-8 md:gap-12 lg:gap-16",
          !addPadding && "gap-0"
        )}>
          {/* Image Column */}
          <div className={cn(
            "relative min-h-[350px] md:min-h-[450px] lg:min-h-[600px] overflow-hidden group",
            imageOnLeft ? "md:order-1" : "md:order-2",
            addPadding && "rounded-3xl shadow-2xl"
          )}>
            {image && (
              <img
                src={image}
                alt={headline || ""}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Text Column */}
          <div className={cn(
            "flex flex-col justify-center text-left",
            imageOnLeft ? "md:order-2" : "md:order-1",
            !addPadding && "p-8 md:p-12 lg:p-20"
          )}>
            {headline && (
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                {headline}
              </h2>
            )}
            
            {bodyText && (
              <div 
                className="prose prose-lg max-w-none text-muted-foreground dark:prose-invert leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: bodyText }}
              />
            )}
            
            {links.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                  <Button
                    key={link.id}
                    size="lg"
                    asChild
                  >
                    <a href={link.url}>
                      {link.text}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface CTALink {
  id: number | string
  text: string
  url: string
}

export interface CTAProps {
  headline?: string
  subheadline?: string
  links?: CTALink[]
  backgroundImage?: string
  align?: "default" | "wide" | "full"
  className?: string
}

export function CTA({
  headline,
  subheadline,
  links = [],
  backgroundImage,
  align = "default",
  className,
}: CTAProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20 text-center relative overflow-hidden",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Overlay (only if image exists) */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50 z-0" />
      )}
      
      <div className={cn("container mx-auto relative z-10", backgroundImage && "text-white")}>
        {headline && (
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl drop-shadow-sm">
            {headline}
          </h2>
        )}
        
        {subheadline && (
          <div 
            className="box-content mx-auto mb-10 max-w-[600px] text-lg opacity-90 md:text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
        )}
        
        {links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <Button
                key={link.id}
                variant={backgroundImage ? "secondary" : "default"}
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
    </section>
  )
}


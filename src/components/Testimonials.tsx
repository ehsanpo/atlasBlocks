import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

export interface TestimonialItem {
  id: number | string
  image: string
  name: string
  role?: string
  testimonial: string
}

export interface TestimonialsProps {
  /**
   * Section headline
   */
  headline?: string
  
  /**
   * Section description
   */
  description?: string
  
  /**
   * List of testimonials
   */
  testimonials: TestimonialItem[]
  
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

export function Testimonials({
  headline,
  description,
  testimonials = [],
  backgroundColor,
  align = "default",
  className,
}: TestimonialsProps) {
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
      <div className="container mx-auto text-center">
        {(headline || description) && (
          <div className="mx-auto mb-16 max-w-2xl">
            {headline && (
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                {headline}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className={cn(
          "grid gap-8 md:gap-10",
          "grid-cols-1",
          testimonials.length >= 2 && "md:grid-cols-2",
          testimonials.length >= 3 && "lg:grid-cols-3"
        )}>
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group"
            >
              <Quote className="absolute top-6 right-8 h-8 w-8 text-primary/10 transition-colors group-hover:text-primary/20" />
              
              <blockquote className="mb-8 text-muted-foreground leading-relaxed italic relative z-10 text-lg">
                "{item.testimonial}"
              </blockquote>

              <div className="mt-auto flex items-center space-x-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/10 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-foreground">
                    {item.name}
                  </div>
                  {item.role && (
                    <div className="text-sm text-primary font-medium tracking-tight">
                      {item.role}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


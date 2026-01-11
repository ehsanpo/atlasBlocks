import { useState } from 'react'
import { Testimonials } from '../Testimonials'
import { DocPage } from '../DocPage'

const initialTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechFlow",
    image: "https://i.pravatar.cc/150?u=sarah",
    testimonial: "Implementing these components saved us weeks of development time. The quality and flexibility are unmatched."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Frontend Engineer",
    image: "https://i.pravatar.cc/150?u=michael",
    testimonial: "The clean code and excellent documentation made integration a breeze. It's now our go-to for all new projects."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Product Designer",
    image: "https://i.pravatar.cc/150?u=elena",
    testimonial: "Finally, a component library that truly values design. Every element feels premium and polished."
  }
]

const componentCode = `import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

export interface TestimonialItem {
  id: number | string
  image: string
  name: string
  role?: string
  testimonial: string
}

export interface TestimonialsProps {
  headline?: string
  description?: string
  testimonials: TestimonialItem[]
  backgroundColor?: string
  align?: "default" | "wide" | "full"
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
    <section className={cn(
      "py-12 md:py-16 lg:py-20",
      align === "wide" && "max-w-7xl mx-auto px-4",
      align === "full" && "w-full",
      align === "default" && "max-w-6xl mx-auto px-4",
      className
    )} style={{ backgroundColor }}>
      <div className="container mx-auto text-center">
        {(headline || description) && (
          <div className="mx-auto mb-16 max-w-2xl text-center">
            {headline && <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{headline}</h2>}
            {description && <p className="font-mono text-lg text-muted-foreground leading-relaxed">{description}</p>}
          </div>
        )}
        <div className={cn(
          "grid gap-8 md:gap-10 grid-cols-1",
          testimonials.length >= 2 && "md:grid-cols-2",
          testimonials.length >= 3 && "lg:grid-cols-3"
        )}>
          {testimonials.map((item) => (
            <div key={item.id} className="flex flex-col rounded-2xl border border-border bg-card p-8 text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group">
              <Quote className="absolute top-6 right-8 h-8 w-8 text-primary/10 transition-colors group-hover:text-primary/20" />
              <blockquote className="mb-8 text-muted-foreground leading-relaxed italic relative z-10 text-lg">"{item.testimonial}"</blockquote>
              <div className="mt-auto flex items-center space-x-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/10 shadow-sm">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-foreground">{item.name}</div>
                  {item.role && <div className="text-sm text-primary font-medium tracking-tight">{item.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}`

const usageCode = `import { Testimonials } from "@/components/Testimonials"

const feedback = [
  { id: 1, name: "Joe", testimonial: "Awesome!", image: "..." }
]

export default function About() {
  return (
    <Testimonials 
      headline="Customer Love" 
      testimonials={feedback} 
    />
  )
}`

const apiProps = [
  { name: "headline", type: "string", description: "Main heading for the testimonials section." },
  { name: "description", type: "string", description: "Supporting text below the headline." },
  { name: "testimonials", type: "TestimonialItem[]", description: "Array of testimonial data with names, roles, and images." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment and width." },
]

export function TestimonialsPreview() {
  const [data, setData] = useState({
    headline: "Trusted by Modern Teams",
    description: "Join thousands of satisfied users who have transformed their workflow with our premium component library.",
    testimonials: initialTestimonials,
    align: "default" as const
  })

  return (
    <DocPage
      name="Testimonials"
      description="A social proof section featuring customer feedback with images and ratings."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
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
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Headline</label>
            <input 
              type="text" 
              value={data.headline} 
              onChange={(e) => setData({ ...data, headline: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-48"
            />
          </div>
        </div>
      }
    >
      <Testimonials 
        {...data}
      />
    </DocPage>
  )
}

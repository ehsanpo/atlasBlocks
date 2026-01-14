import { useState, useMemo } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface PostProject {
  id: number | string
  title: string
  image: string
  categories: string[]
  link: string
  date?: string
  excerpt?: string
}

export interface Category {
  id: number | string
  slug: string
  name: string
}

export interface FilterPostProps {
  projects: PostProject[]
  categories: Category[]
  showFilters?: boolean
  align?: "default" | "wide" | "full"
  columns?: 2 | 3 | 4
  className?: string
}

export function FilterPost({
  projects = [],
  categories = [],
  showFilters = true,
  align = "default",
  columns = 3,
  className,
}: FilterPostProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects
    return projects.filter(project => project.categories.includes(activeCategory))
  }, [projects, activeCategory])

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
        {showFilters && (
          <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                activeCategory === "all" 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              )}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                  activeCategory === category.slug 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105" 
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        <div className={cn(
          "grid gap-8",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/20"
            >
              <a href={project.link} className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.categories.slice(0, 1).map(catSlug => {
                    const catName = categories.find(c => c.slug === catSlug)?.name || catSlug
                    return (
                      <span key={catSlug} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground bg-primary rounded-full shadow-lg">
                        {catName}
                      </span>
                    )
                  })}
                </div>
              </a>
              
              <div className="p-6 flex flex-1 flex-col text-left">
                {project.date && (
                  <time className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    {project.date}
                  </time>
                )}
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  <a href={project.link}>{project.title}</a>
                </h3>
                {project.excerpt && (
                  <p className="font-mono text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                    {project.excerpt}
                  </p>
                )}
                <div className="mt-auto pt-4 border-t border-border">
                   <a href={project.link} className="text-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4 flex items-center gap-2">
                      Read More
                      <div className="h-0.5 w-4 bg-primary rounded-full transition-all group-hover:w-8" />
                   </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-4">
            <p className="text-xl text-muted-foreground font-medium">No posts matched your selection.</p>
            <Button
              variant="outline"
              onClick={() => setActiveCategory("all")}
              className="mt-6 rounded-full px-8"
            >
              Show all posts
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

